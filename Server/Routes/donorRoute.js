
const router = require('express').Router();

const {addDonorApplication, findDonor, getDonationRequest, getCreatedRequest, getDonor, getDonorDashDetails, getDonorApplication, getDonors, getDonationResponse, getDonationData, updateDonorApplication} = require('../Controllers/donorController');

router.post("/addDonorApplication", addDonorApplication);
router.post("/findDonor", findDonor);
router.get("/getDonationRequest/:id", getDonationRequest);
router.get("/getCreatedRequest/:id", getCreatedRequest);
router.get("/getDonor/:id/:Email", getDonor);
router.get("/getDonorDashDetails/:id", getDonorDashDetails);
router.get("/getDonorApplication/:id/:Email/get", getDonorApplication);
router.get("/getDonors", getDonors);
router.get("/getDonationResponse/:id", getDonationResponse);
router.get("/getDonationData/:id", getDonationData);
router.put("/updateDonorApplication/:userId/:type", updateDonorApplication);

module.exports = router;