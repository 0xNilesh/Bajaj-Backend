const mongoose = require("mongoose");

const healthPackagesSchema = new mongoose.Schema({
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
	rubyHallCard: {
		type: String,
		trim: true,
	},
	preferredGender: {
		type: String,
		trim: true,
	},
	preferredMinAge: {
		type: Number,
	},
	preferredMaxAge: {
		type: Number,
	},
	preferredHealthConditions: [
		{
			healthCondition: {
				type: String,
				required: true,
			},
		},
	],
	url: {
		type: "String",
	},
	imgUrl: {
		type: "String",
	},
	doctorConsultationId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "DoctorConsultation",
	},
	healthCheckupId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "HealthCheckup",
	},
	hospitalCashBenefitsId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "HospitalCashBenefits",
	},
	hospitalizationBenefitsId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "HospitalizationBenefits",
	},
	healthInsuranceId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "HealthInsurance",
	},
	labPackagesId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "LabPackages",
	},
	networkDiscountsId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "NetworkDiscounts",
	},
	teleConsultationsId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "TeleConsultations",
	},
});

const healthPackages = mongoose.model("HealthPackages", healthPackagesSchema);

module.exports = healthPackages;
