
const router = require('express').Router();

const {addStockData, getStockData, updateStockData} = require('../Controllers/stockDataController');

router.post("/addStockData", addStockData);
router.get("/getStockData/:bloodBankId", getStockData);
router.put("/updateStockData/:bloodBankId", updateStockData);

module.exports = router;