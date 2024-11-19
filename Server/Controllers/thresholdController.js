
const Threshold = require("../models/Threshold");

const ThresholdController = {

    addThreshold : async (req, res) => {
        const {
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

        const { bloodGroup, productName } = req.body;
        const fieldName = `${bloodGroup}${productName}`;

        const existingThreshold = await Threshold.findOne({ bloodBankId: req.body.bloodBankId });

        if (existingThreshold) {
            existingThreshold[fieldName] = req.body[fieldName];
            await existingThreshold.save();
            return res.status(200).send(existingThreshold);
        }
        
        try {
            const threshold = new Threshold(req.body);
            await threshold.save();
            res.status(201).send(threshold);
        } catch (e) {
            res.status(400).send(e);
        }
    }
};

module.exports = ThresholdController;