const router = require('express').Router();

const {addThreshold, deleteThreshold, getThreshold} = require('../Controllers/thresholdController');

router.post("/addThreshold/:bloodBankId", addThreshold);
router.delete("/deleteThreshold/:bloodBankId/:thresholdId", deleteThreshold);
router.get("/getThreshold/:bloodBankId", getThreshold);

module.exports = router;