const express = require("express");
const router = new express.Router();
const doctorConsultation = require("../models/doctorConsultation");
const healthCheckup = require("../models/healthCheckup");
const teleConsultations = require("../models/teleConsultations");
const networkDiscounts = require("../models/networkDiscounts");
const labPackages = require("../models/labPackages");
const healthInsurance = require("../models/healthInsurance");
const hospitalizationBenefits = require("../models/hospitalizationBenefits");
const hospitalCashBenefits = require("../models/hospitalCashBenefits");
const healthPackage = require("../models/healthPackage");
const articlesCollection = require("../models/articlesCollection");

// Features API Map
const featuresAPIMap = {
	doctorConsultationId: doctorConsultation,
	healthCheckupId: healthCheckup,
	hospitalCashBenefitsId: hospitalCashBenefits,
	hospitalizationBenefitsId: hospitalizationBenefits,
	healthInsuranceId: healthInsurance,
	labPackagesId: labPackages,
	networkDiscountsId: networkDiscounts,
	teleConsultationsId: teleConsultations,
};

const featuresNameAPIMap = {
	doctorConsultationId: "Doctor Consultation",
	healthCheckupId: "Health Checkup",
	hospitalCashBenefitsId: "Hospital Cash Benefits",
	hospitalizationBenefitsId: "Hospitalization Benefits",
	healthInsuranceId: "Health Insurance",
	labPackagesId: "Lab Packages",
	networkDiscountsId: "Network Discounts",
	teleConsultationsId: "Tele Consultations",
};

const sendFeaturesData = async (obj) => {
	const responseArray = [];

	for (const prop in obj._doc) {
		if (featuresAPIMap[prop] !== undefined) {
			const package = featuresAPIMap[prop];
			const response = await package.find({
				_id: obj[prop],
			});
			responseArray.push(response[0]);
		}
	}

	return responseArray;
};

// Health Packages Requests
router.post("/healthPackage/add", async (req, res) => {
	try {
		const obj = new healthPackage(req.body);
		const doc = await obj.save();
		res.status(200).send(doc);
	} catch (err) {
		res.send(err.message);
	}
});

router.post("/healthPackage/find", async (req, res) => {
	try {
		const obj = req.body;
		const objToFind = obj;

		const response = await healthPackage.findOne(objToFind).exec();

		const finalResponse = {
			healthPackageData: {
				title: response.title,
				description: response.description,
				url: response.url,
			},
			featuresData: [],
		};

		finalResponse.featuresData = await sendFeaturesData(response);

		res.status(200).send(finalResponse);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

const arr = {
	"60f92d6dd4a05a2c842f0014": "Pro Health Solution",
	"60f92e34d4a05a2c842f0016": "Super Health Solution",
	"60f92eb8d4a05a2c842f0018": "Health Plus Solution",
	"60fa3c47834e7b37d0101d9c": "Hospicare",
	"60fa81a8834e7b37d0101da3": "Complete Health Solution",
	"60fa826f834e7b37d0101da5": "Complete Health Solution – Platinum",
	"60fa82d7834e7b37d0101da7": "Complete Health Solution – Silver",
	"60fa8867834e7b37d0101da9": "Swasthya Care",
	"60fa97bb834e7b37d0101dab": "Health Preventive Package Essential",
	"60fa9a19834e7b37d0101dad": "Diabetes Care – Basic",
	"60fa9ae9834e7b37d0101daf": "Diabetes Care – Plus",
	"60fa9baf834e7b37d0101db1": "Cardiac Care – Plus",
	"60fa9c36834e7b37d0101db3": "Cardiac Care – Basic",
	"60fa9e34834e7b37d0101db5": "Super Top-Up",
	"60fa9f59834e7b37d0101db7": "Healthy Body Package Essential",
	"60faa011834e7b37d0101db9": "Healthy Body Package Classic",
	"60face3fcc9be3001541e382": "Health Prime",
};

router.post("/healthPackage/find/all", async (req, res) => {
	try {
		const response = await healthPackage.find({}).exec();
		const finalResponse = [];

		for (let i = 0; i < response.length; i++) {
			const obj = response[i];
			const objToSend = {
				title: obj.title,
				description: obj.description,
				benefits: [],
			};
			for (const prop in obj._doc) {
				if (featuresAPIMap[prop] !== undefined) {
					const package = featuresNameAPIMap[prop];
					objToSend.benefits.push(package);
				}
			}
			finalResponse[i] = objToSend;
		}

		// console.log(finalResponse);
		res.status(200).send(finalResponse);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Doctor Consultation Requests
router.post("/doctorConsultation/add", async (req, res) => {
	try {
		const obj = new doctorConsultation(req.body);
		const doc = await obj.save();
		res.status(200).send(doc);
	} catch (err) {
		res.send(err.message);
	}
});

router.post("/doctorConsultation/find", async (req, res) => {
	try {
		const obj = req.body;
		const objToFind = obj;

		if (obj.maxBenefits) {
			objToFind.maxBenefits = { $lte: req.body.maxBenefits };
		}

		const response = await doctorConsultation.find(objToFind).exec();

		res.status(200).send(response);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/doctorConsultation/hp/find", async (req, res) => {
	try {
		const obj = req.body;

		const response = await doctorConsultation.findOne(obj).exec();

		await response
			.populate({
				path: "healthPackages",
				select: {
					title: 1,
					description: 1,
					url: 1,
					_id: 0,
				},
			})
			.execPopulate();

		res.status(200).send(response.healthPackages);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Lab Packages Requests
router.post("/labPackages/add", async (req, res) => {
	try {
		const obj = new labPackages(req.body);
		const doc = await obj.save();
		res.status(200).send(doc);
	} catch (err) {
		res.send(err.message);
	}
});

router.post("/labPackages/find", async (req, res) => {
	try {
		const obj = req.body;
		const objToFind = obj;

		if (obj.maxBenefits) {
			objToFind.maxBenefits = { $lte: req.body.maxBenefits };
		}

		const response = await labPackages.find(objToFind).exec();

		res.status(200).send(response);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/labPackages/hp/find", async (req, res) => {
	try {
		const obj = req.body;

		const response = await labPackages.findOne(obj).exec();

		await response
			.populate({
				path: "healthPackages",
				select: {
					title: 1,
					description: 1,
					url: 1,
					_id: 0,
				},
			})
			.execPopulate();

		res.status(200).send(response.healthPackages);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Health Checkup Requests
router.post("/healthCheckup/add", async (req, res) => {
	try {
		const obj = new healthCheckup(req.body);
		const doc = await obj.save();
		res.status(200).send(doc);
	} catch (err) {
		res.send(err.message);
	}
});

router.post("/healthCheckup/find", async (req, res) => {
	try {
		const obj = req.body;
		const objToFind = obj;

		if (obj.maxBenefits) {
			objToFind.maxBenefits = { $lte: req.body.maxBenefits };
		}
		if (obj.numberOfDiagnosticTests) {
			objToFind.numberOfDiagnosticTests = {
				$gte: req.body.numberOfDiagnosticTests,
			};
		}

		const response = await healthCheckup.find(objToFind).exec();

		res.status(200).send(response);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/healthCheckup/hp/find", async (req, res) => {
	try {
		const obj = req.body;

		const response = await healthCheckup.findOne(obj).exec();

		await response
			.populate({
				path: "healthPackages",
				select: {
					title: 1,
					description: 1,
					url: 1,
					_id: 0,
				},
			})
			.execPopulate();

		res.status(200).send(response.healthPackages);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Health Insurance Requests
router.post("/healthInsurance/add", async (req, res) => {
	try {
		const obj = new healthInsurance(req.body);
		const doc = await obj.save();
		res.status(200).send(doc);
	} catch (err) {
		res.send(err.message);
	}
});

router.post("/healthInsurance/find", async (req, res) => {
	try {
		const obj = req.body;
		const objToFind = obj;

		if (obj.amountCovered) {
			objToFind.amountCovered = { $lte: req.body.amountCovered };
		}
		if (obj.numberOfAdultsCovered) {
			objToFind.numberOfAdultsCovered = {
				$gte: req.body.numberOfAdultsCovered,
			};
		}
		if (obj.numberOfChildrenCovered) {
			objToFind.numberOfChildrenCovered = {
				$gte: req.body.numberOfChildrenCovered,
			};
		}

		console.log(objToFind);

		const response = await healthInsurance.find(objToFind).exec();

		res.status(200).send(response);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/healthInsurance/hp/find", async (req, res) => {
	try {
		const obj = req.body;

		const response = await healthInsurance.findOne(obj).exec();

		await response
			.populate({
				path: "healthPackages",
				select: {
					title: 1,
					description: 1,
					url: 1,
					_id: 0,
				},
			})
			.execPopulate();

		res.status(200).send(response.healthPackages);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Hospital Cash Benefits Requests
router.post("/hospitalCashBenefits/add", async (req, res) => {
	try {
		const obj = new hospitalCashBenefits(req.body);
		const doc = await obj.save();
		res.status(200).send(doc);
	} catch (err) {
		res.send(err.message);
	}
});

router.post("/hospitalCashBenefits/find", async (req, res) => {
	try {
		const obj = req.body;
		const objToFind = obj;

		if (obj.hospiCashPerDay) {
			objToFind.hospiCashPerDay = { $gte: req.body.hospiCashPerDay };
		}
		if (obj.maxDaysOfHospitalization) {
			objToFind.maxDaysOfHospitalization = {
				$lte: req.body.maxDaysOfHospitalization,
			};
		}
		if (obj.maxDaysOfICUHospitalization) {
			objToFind.maxDaysOfICUHospitalization = {
				$lte: req.body.maxDaysOfICUHospitalization,
			};
		}

		console.log(objToFind);

		const response = await hospitalCashBenefits.find(objToFind).exec();

		res.status(200).send(response);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/hospitalCashBenefits/hp/find", async (req, res) => {
	try {
		const obj = req.body;

		const response = await hospitalCashBenefits.findOne(obj).exec();

		await response
			.populate({
				path: "healthPackages",
				select: {
					title: 1,
					description: 1,
					url: 1,
					_id: 0,
				},
			})
			.execPopulate();

		res.status(200).send(response.healthPackages);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Hospitalization Benefits
router.post("/hospitalizationBenefits/add", async (req, res) => {
	try {
		const obj = new hospitalizationBenefits(req.body);
		const doc = await obj.save();
		res.status(200).send(doc);
	} catch (err) {
		res.send(err.message);
	}
});

router.post("/hospitalizationBenefits/find", async (req, res) => {
	try {
		const obj = req.body;
		const objToFind = obj;

		const response = await hospitalizationBenefits.find(objToFind).exec();

		res.status(200).send(response);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/hospitalizationBenefits/hp/find", async (req, res) => {
	try {
		const obj = req.body;

		const response = await hospitalizationBenefits.findOne(obj).exec();

		await response
			.populate({
				path: "healthPackages",
				select: {
					title: 1,
					description: 1,
					url: 1,
					_id: 0,
				},
			})
			.execPopulate();

		res.status(200).send(response.healthPackages);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Network Discounts Requests
router.post("/networkDiscounts/add", async (req, res) => {
	try {
		const obj = new networkDiscounts(req.body);
		const doc = await obj.save();
		res.status(200).send(doc);
	} catch (err) {
		res.send(err.message);
	}
});

router.post("/networkDiscounts/find", async (req, res) => {
	try {
		const obj = req.body;
		const objToFind = obj;

		if (obj.doctorConsultationDiscount) {
			objToFind.doctorConsultationDiscount = {
				$gte: req.body.doctorConsultationDiscount,
			};
		}
		if (obj.discountIPDRoomRent) {
			objToFind.discountIPDRoomRent = {
				$gte: req.body.discountIPDRoomRent,
			};
		}

		const response = await networkDiscounts.find(objToFind).exec();

		res.status(200).send(response);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/networkDiscounts/hp/find", async (req, res) => {
	try {
		const obj = req.body;

		const response = await networkDiscounts.findOne(obj).exec();

		await response
			.populate({
				path: "healthPackages",
				select: {
					title: 1,
					description: 1,
					url: 1,
					_id: 0,
				},
			})
			.execPopulate();

		res.status(200).send(response.healthPackages);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Tele Consultation Requests
router.post("/teleConsultations/add", async (req, res) => {
	try {
		const obj = new teleConsultations(req.body);
		const doc = await obj.save();
		res.status(200).send(doc);
	} catch (err) {
		res.send(err.message);
	}
});

router.post("/teleConsultations/find", async (req, res) => {
	try {
		const obj = req.body;
		const objToFind = obj;

		if (obj.numberOfDoctors) {
			objToFind.numberOfDoctors = {
				$lte: req.body.numberOfDoctors,
			};
		}

		const response = await teleConsultations.find(objToFind).exec();

		res.status(200).send(response);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/teleConsultations/hp/find", async (req, res) => {
	try {
		const obj = req.body;

		const response = await teleConsultations.find(obj).exec();

		console.log(response);

		await response[0]
			.populate({
				path: "healthPackages",
				select: {
					title: 1,
					description: 1,
					url: 1,
					_id: 0,
				},
			})
			.execPopulate();

		console.log(response[0].healthPackages);

		res.status(200).send(response[0].healthPackages);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Articles Requests
router.post("/articles/add", async (req, res) => {
	try {
		const obj = new articlesCollection(req.body);
		const doc = await obj.save();
		res.status(200).send(doc);
	} catch (err) {
		res.send(err.message);
	}
});

router.post("/articles/find", async (req, res) => {
	try {
		const obj = req.body;
		const objToFind = obj;

		const response = await articlesCollection.find(objToFind).exec();

		res.status(200).send(response);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

module.exports = router;
