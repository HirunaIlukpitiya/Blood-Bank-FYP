const Doner = require("../Models/doner");
const BloodBank = require("../Models/bloodBank");

const testController = {
    
    testGet: async (req, res) => {
        res.status(200).json({message : "Protected Router Accessed"});
    }
}

module.exports = testController;