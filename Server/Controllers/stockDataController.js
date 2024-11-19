const StockData = require("../Models/stockData");
const BloodBank = require("../Models/bloodBank");

const stockDataController = {
     
    addStockData: async (req, res) => {
    const {
        bloodBankId,
        APositivePlatelets,
        ANegativePlatelets,
        BPositivePlatelets,
        BNegativePlatelets,
        ABPositivePlatelets,
        ABNegativePlatelets,
        OPositivePlatelets,
        ONegativePlatelets,
        APositivePlasma,
        ANegativePlasma,
        BPositivePlasma,
        BNegativePlasma,
        ABPositivePlasma,
        ABNegativePlasma,
        OPositivePlasma,
        ONegativePlasma,
        APositiveRBC,
        ANegativeRBC,
        BPositiveRBC,
        BNegativeRBC,
        ABPositiveRBC,
        ABNegativeRBC,
        OPositiveRBC,
        ONegativeRBC
    } = req.body;

    const recordExists = await StockData.findOne({ bloodBankId });
    if (recordExists) {
        return res.status(400).json({ message: "Stock data already exists" });
    }

    try {
        const newStockData = new StockData({
            bloodBankId,
            APositivePlatelets,
            ANegativePlatelets,
            BPositivePlatelets,
            BNegativePlatelets,
            ABPositivePlatelets,
            ABNegativePlatelets,
            OPositivePlatelets,
            ONegativePlatelets,
            APositivePlasma,
            ANegativePlasma,
            BPositivePlasma,
            BNegativePlasma,
            ABPositivePlasma,
            ABNegativePlasma,
            OPositivePlasma,
            ONegativePlasma,
            APositiveRBC,
            ANegativeRBC,
            BPositiveRBC,
            BNegativeRBC,
            ABPositiveRBC,
            ABNegativeRBC,
            OPositiveRBC,
            ONegativeRBC
        });

        await newStockData.save();
        res.status(201).json(newStockData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    },

    getStockData: async (req, res) => {
        const { bloodBankId } = req.params;
    try {
        const stockData = await StockData.findOne({ bloodBankId });
        if (!stockData) {
            return res.status(404).json({ message: "Stock data not found" });
        }
        res.status(200).json(stockData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    },

    updateStockData: async (req, res) => {
        const { bloodBankId } = req.params;
        
    }

};

module.exports = stockDataController;

