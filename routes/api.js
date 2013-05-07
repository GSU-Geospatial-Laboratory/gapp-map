var fs = require('fs');

var fmt = require('fmt');
var amazonS3 = require('awssum-amazon-s3');

var db = require('../db.js');

var s3 = new amazonS3.S3({
	'accessKeyId': process.env.AMAZON_S3_KEY,
	'secretAccessKey': process.env.AMAZON_S3_SECRET,
	'region': amazonS3.US_EAST_1
});

function uploadItem(item, req) {
	//console.log(item)
	var fileName = item.path.substring(5) + '.jpg'
	//console.log(fileName)
	// create a read stream
	var bodyStream = fs.createReadStream(item.filename);

	var options = {
		BucketName: 'gapp-map',
		ObjectName: fileName,
		Acl: 'public-read',
		ContentLength: item.size,
		Body: bodyStream
	};

	fmt.field('Uploading', fileName + ' (' + item.size + ')');
	s3.PutObject(options, function(err, data) {
		if (err) {
			fmt.field('UploadFailed', fileName);
			console.log(err);

			// put this item back on the queue if retries is less than the cut-off
			if (item.retries > 2) {
				fmt.field('UploadCancelled', fileName);
			} else {
				// try again
				item.retries = item.retries ? item.retries + 1 : 1;
				uploadItemQueue.push(item);
			}

			callback();
			return;
		}

		fmt.field('Uploaded', fileName);
	});
	return fileName;
}

function isOn(val){
	if (val=='on'){
		return true;
	}else{return false}
}

function saveItem(req, fileName) {
	if (req.body) {
		var currentTime = new Date();
		console.log(req.body)

		var place = new db.Place({
			type: req.param('type'),
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
	var pictureUrl = '/path/to/default/pictures';
	var fileUploadMessage = '';
	if (req.files.length == 0 || req.files.file.size == 0) {
		fileUploadMessage = 'No file uploaded at ' + new Date().toString();
		var responseObj = {
			image: false,
			url: null
		}
	} else {
		var file = req.files.file;
		fileName = uploadItem(file, req)
		fileUploadMessage = '<b>"' + file.name + '"<b> uploaded to the server at ' + new Date().toString();
		pictureUrl = file.name;
		var responseObj = {
			image: true,
			url: fileName
		}
	}
	saveItem(req, fileName);
	res.send(JSON.stringify(responseObj));
}

exports.getPlace = function(req,res){
		db.Place.find({
			status : true
		}).exec(function(err, result) {
			res.type('application/json');
			res.jsonp({
				data : result
			})
		})
}
