const mongoose = require("mongoose");

const healthCheckupSchema = new mongoose.Schema({
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
	numberOfDiagnosticTests: {
		type: Number,
	},
	maxBenefits: {
		type: Number,
		required: true,
	},
	labPackagesIds: [
		{
			labPackagesId: {
				type: mongoose.Schema.Types.ObjectId,
			},
		},
	],
});

healthCheckupSchema.virtual("healthPackages", {
	ref: "HealthPackages",
	localField: "_id",
	foreignField: "healthCheckupId",
});

const healthCheckup = mongoose.model("HealthCheckup", healthCheckupSchema);

module.exports = healthCheckup;
