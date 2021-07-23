const mongoose = require("mongoose");

const doctorConsultationSchema = new mongoose.Schema({
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
	multipleVisits: {
		type: Boolean,
		required: true,
	},
	cappingOnIndividual: {
		type: Boolean,
		required: true,
	},
});

doctorConsultationSchema.virtual("healthPackages", {
	ref: "HealthPackages",
	localField: "_id",
	foreignField: "doctorConsultationId",
});

const doctorConsultation = mongoose.model(
	"DoctorConsultation",
	doctorConsultationSchema
);

module.exports = doctorConsultation;
