const mongoose = require("mongoose");

const networkDiscountsSchema = new mongoose.Schema({
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
	doctorConsultationDiscount: {
		type: Number,
		required: true,
	},
	discountIPDRoomRent: {
		type: Number,
		required: true,
	},
	panIndiaCoverage: {
		type: Boolean,
		required: true,
	},
});

networkDiscountsSchema.virtual("healthPackages", {
	ref: "HealthPackages",
	localField: "_id",
	foreignField: "networkDiscounts",
});

const networkDiscounts = mongoose.model(
	"NetworkDiscounts",
	networkDiscountsSchema
);

module.exports = networkDiscounts;
