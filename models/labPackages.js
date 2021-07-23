const mongoose = require("mongoose");

const labPackagesSchema = new mongoose.Schema({
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
	maxBenefits: {
		type: Number,
		required: true,
	},
	multipleClaims: {
		type: Boolean,
		required: true,
	},
	cappingOnIndividual: {
		type: Boolean,
		required: true,
	},
	healthCheckupIds: [
		{
			healthCheckupId: {
				type: mongoose.Schema.Types.ObjectId,
			},
		},
	],
});

labPackagesSchema.virtual("healthPackages", {
	ref: "HealthPackages",
	localField: "_id",
	foreignField: "labPackagesId",
});

const labPackages = mongoose.model("LabPackages", labPackagesSchema);

module.exports = labPackages;
