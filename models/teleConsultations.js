const mongoose = require("mongoose");

const teleConsultationsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	numberOfDoctors: {
		type: Number,
		required: true,
	},
	typesOfPhysicians: [
		{
			physician: {
				type: String,
				required: true,
			},
		},
	],
	panIndiaCoverage: {
		type: Boolean,
		required: true,
	},
});

teleConsultationsSchema.virtual("healthPackages", {
	ref: "HealthPackages",
	localField: "_id",
	foreignField: "teleConsultationsId",
});

const teleConsultations = mongoose.model(
	"TeleConsultations",
	teleConsultationsSchema
);

module.exports = teleConsultations;
