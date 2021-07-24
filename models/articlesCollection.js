const mongoose = require("mongoose");

const articlesCollectionSchema = new mongoose.Schema({
	type: {
		type: String,
	},
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	imgSrc: {
		type: String,
	},
	date: {
		type: String,
	},
	readingTime: {
		type: String,
	},
	url: {
		type: String,
	},
	preferredHealthConditions: {
		type: String,
	},
	preferredGender: {
		type: String,
	},
});

const articlesCollection = mongoose.model("Articles", articlesCollectionSchema);

module.exports = articlesCollection;
