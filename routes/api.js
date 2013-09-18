var fs = require('fs');
var gm = require('gm'),
	imageMagick = gm.subClass({
		imageMagick: true
	});

var json2csv = require('json2csv-customgapp');
var async = require('async');

var fmt = require('fmt');
var amazonS3 = require('awssum-amazon-s3');

var db = require('../db.js');

var s3 = new amazonS3.S3({
	'accessKeyId': process.env.AMAZON_S3_KEY,
	'secretAccessKey': process.env.AMAZON_S3_SECRET,
	'region': amazonS3.US_EAST_1
});

var uploadItemQueue = async.queue(uploadItem, 3);
uploadItemQueue.drain = function() {
	fmt.line();
	fmt.title('Finished');
	fmt.field('UploadedFiles', argv._.length);
	fmt.sep();
};

function isImage(type) {
	if (type == 'image/jpeg' || type == 'image/png') {
		return true;
	} else {
		return false;
	}
}

function updateData() {
	db.Place.find({
		status: true
	}).exec(function(err, result) {
		// console.log(result)
		json2csv({
			data: result,
			fields: ['type', 'where', 'dateCreated', 'habitat', 'foodSource', 'noPesticides', 'image', 'loc'],
			fieldNames: ['Type of Garden', 'Where is the garden', 'Date Added', 'Provides pollinator habitat', 'Provides pollinator food source', 'Does not use pesticides', 'Latitude, Longitude', "Link to Image"]
		}, function(err, csv) {
			if (err) console.log(err);
			fs.writeFile("public/download/data.csv", csv, function(err) {
				if (err) {
					console.log(err);
				} else {
					console.log("data.csv successfully updated!");
				}
			});
		});
	})
}

function uploadItem(item, req) {
	console.log(item)
	var fileName = item.path.substring(5) + '.jpg'
	//console.log('filename: ' + fileName)

	fs.stat(item.path, function(err, file_info) {
		if (err) {
			console.log(err, 'Error reading file');
			return;
		}
		//console.log(file_info)
		// create a read stream
		var bodyStream = fs.createReadStream(item.path);

		var options = {
			BucketName: 'gapp-map',
			ObjectName: fileName,
			Acl: 'public-read',
			ContentLength: file_info.size,
			Body: bodyStream
		};

		fmt.field('Uploading', fileName + ' (' + item.size + ')');
		s3.PutObject(options, function(err, data) {
			if (err) {
				fmt.field('UploadFailed', fileName);
				//console.log(err);
				fileName = null;
				// put this item back on the queue if retries is less than the cut-off
				if (item.retries > 2) {
					fmt.field('UploadCancelled', fileName);
					fileName = null;
				} else {
					// try again
					item.retries = item.retries ? item.retries + 1 : 1;
					uploadItemQueue.push(item);
				}

				//callback();
				return;
			}

			fmt.field('Uploaded', fileName);
		});
	})
	return fileName;
}

function isOn(val) {
	if (val == 'on') {
		return true;
	} else {
		return false
	}
}

function saveItem(req, fileName) {
	console.log(req.param('loc'))
	if (req.body) {
		var currentTime = new Date();

		var place = new db.Place({
			type: req.param('type'),
			where: req.param('where'),
			status: true,
			image: fileName,
			dateCreated: currentTime,
			dateModified: currentTime,
			habitat: isOn(req.param('habitat')),
			foodSource: isOn(req.param('foodSource')),
			noPesticides: isOn(req.param('noPesticides')),
			loc: req.param('loc')
		})
		place.save(function(err) {
			if (err) {
				console.log(err)
			}else{
				updateData();
			}
		})
	} else {
		db.Place.update({
			_id: req.body.data.id
		}, {
			$push: {
				type: req.body.data.type,
				status: true,
				dateCreated: new Date(),
			}
		}, {
			upsert: true
		}, function(err) {
			console.log(err)
		})
	}
}


exports.name = function(req, res) {
	res.json({
		name: 'Bob'
	});
};

exports.addPlace = function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	var fileName = null;

	var fileUploadMessage = '';
	if (req.files.length == 0 || req.files.file.size == 0) {
		fileUploadMessage = 'No file uploaded at ' + new Date().toString();
		var responseObj = {
			image: false,
			url: null
		}
	} else {
		var file = req.files.file;
		if (isImage(file.type)) {
			fileName = uploadItem(file, req)

		} else {
			fileName = 'not an image';
		}
		fileUploadMessage = '<b>"' + file.name + '"<b> uploaded to the server at ' + new Date().toString();
		pictureUrl = file.name;
		var responseObj = {
			image: true,
			url: fileName
		}
	}
	if (fileName != 'not an image') {
		saveItem(req, fileName);

		//console.log(data)
	}

	res.send(JSON.stringify(responseObj));
}

exports.getPlace = function(req, res) {
	db.Place.find({
		status: true
	}).exec(function(err, result) {
		var responseObj = {
			data: result
		}
		res.type('json');
		res.send(responseObj)
	})
}