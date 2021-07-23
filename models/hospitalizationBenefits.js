const mongoose = require("mongoose");

const hospitalizationBenefitsSchema = new mongoose.Schema({
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
	freeRoomUpgrade: {
		type: Boolean,
		required: true,
	},
	admissionConciergeService: {
		type: Boolean,
		required: true,
	},
	emergencyRoomChange: {
		type: Boolean,
		required: true,
	},
});

hospitalizationBenefitsSchema.virtual("healthPackages", {
	ref: "HealthPackages",
	localField: "_id",
	foreignField: "hospitalizationBenefitsId",
});

const hospitalizationBenefits = mongoose.model(
	"HospitalizationBenefits",
	hospitalizationBenefitsSchema
);

module.exports = hospitalizationBenefits;
