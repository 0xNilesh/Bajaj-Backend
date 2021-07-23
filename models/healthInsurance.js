const mongoose = require("mongoose");

const healthInsuranceSchema = new mongoose.Schema({
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
	amountCovered: {
		type: Number,
	},
	numberOfAdultsCovered: {
		type: Number,
	},
	numberOfChildrenCovered: {
		type: Number,
	},
	preExpensesCovered: {
		type: Boolean,
	},
	postExpensesCovered: {
		type: Boolean,
	},
});

healthInsuranceSchema.virtual("healthPackages", {
	ref: "HealthPackages",
	localField: "_id",
	foreignField: "healthInsuranceId",
});

const healthInsurance = mongoose.model(
	"HealthInsurance",
	healthInsuranceSchema
);

module.exports = healthInsurance;
