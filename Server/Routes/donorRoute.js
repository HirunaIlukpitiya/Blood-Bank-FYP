
const router = require('express').Router();

const {addDonorApplication, findDonor, getDonationRequest, getCreatedRequest, getDonor, getDonorDashDetails, getDonorApplication, getDonors, getDonationResponse, getDonationData} = require('../Controllers/donorController');

router.post("/addDonorApplication", addDonorApplication);
router.post("/findDonor", findDonor);
router.get("/getDonationRequest/:id", getDonationRequest);
router.get("/getCreatedRequest/:id", getCreatedRequest);
router.get("/getDonor/:id/:Email", getDonor);
router.get("/getDonorDashDetails/:id", getDonorDashDetails);
router.get("/getDonorApplication/:id/:Email", getDonorApplication);
router.get("/getDonors", getDonors);
router.get("/getDonationResponse/:id", getDonationResponse);
router.get("/getDonationData/:id", getDonationData);

module.exports = router;