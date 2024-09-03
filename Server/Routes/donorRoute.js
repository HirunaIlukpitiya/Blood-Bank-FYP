
const router = require('express').Router();

const {addDonorApplication, findDonor, getDonationRequest} = require('../Controllers/donorController');

router.post("/addDonorApplication", addDonorApplication);
router.post("/findDonor", findDonor);
router.get("/getDonationRequest/:Email", getDonationRequest);



module.exports = router;