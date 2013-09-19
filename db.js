var mongoose = require("mongoose");

var uristring = process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/gapp';
var mongoOptions = {
	db: {
		safe: true
	}
};

var db = mongoose.connect(uristring, mongoOptions, function(err, res) {
	if (err) {
	console.log('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
	console.log('Succeeded connected to: ' + uristring);
	}
});

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var geo = new Schema({
	loc: {
		type: [Number],
		index: '2dsphere'
	}
})

var placeSchema = new Schema({
	type: {
		type: String,
	},
	where: {
		type: String,
	},
	dateCreated: {
		type: Date,
	},
	dateModified: {
		type: Date,
	},
	status: {
		type: Boolean,
	},
	habitat: {
		type: Boolean,
	},
	foodSource: {
		type: Boolean,
	},
	noPesticides: {
		type: Boolean,
	},
	image: {
		type: String,
	},
	loc: {
		type: Array,
		index: '2dsphere',
		required: true
	},
	comments: [],
	support: []
})

exports.Place = mongoose.model('places', placeSchema);