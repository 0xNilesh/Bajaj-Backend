const mongoose = require("mongoose");

const hospitalCashBenefitsSchema = new mongoose.Schema({
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
	hospiCashPerDay: {
		type: Number,
		required: true,
	},
	maxDaysOfHospitalization: {
		type: Number,
		required: true,
	},
	maxDaysOfICUHospitalization: {
		type: Number,
		required: true,
	},
});

hospitalCashBenefitsSchema.virtual("healthPackages", {
	ref: "HealthPackages",
	localField: "_id",
	foreignField: "hospitalCashBenefitsId",
});

const hospitalCashBenefits = mongoose.model(
	"HospitalCashBenefits",
	hospitalCashBenefitsSchema
);

module.exports = hospitalCashBenefits;
