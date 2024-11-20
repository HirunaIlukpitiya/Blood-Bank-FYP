const { get } = require("mongoose");
const Threshold = require("../models/Threshold");

const ThresholdController = {
  addThreshold: async (req, res) => {
    const { bloodGroup, productName, value } = req.body;
    const fieldName = `${bloodGroup}${productName}`;
    try {
      const existingThreshold = await Threshold.findOne({
        bloodBankId: req.params.bloodBankId,
      });

      if (existingThreshold) {
        existingThreshold.Thresholds.push({
          bloodGroup,
          productName,
          value,
          keyName: fieldName,
        });
        await existingThreshold.save();
        return res.status(200).send(existingThreshold);
      }

      if (!existingThreshold) {
        const newThreshold = new Threshold({
          bloodBankId: req.params.bloodBankId,
          Thresholds: [
            {
              bloodGroup,
              productName,
              value,
              keyName: fieldName,
            },
          ],
        });

        await newThreshold.save();
        return res.status(200).send(newThreshold);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to add Threshold" });
    }
  },

  deleteThreshold: async (req, res) => {
    const _id = req.params.thresholdId;
    try {
      const existingThreshold = await Threshold.findOne({
        bloodBankId: req.params.bloodBankId,
      });

      if (!existingThreshold) {
        return res.status(404).json({ message: "Threshold not found" });
      }

      existingThreshold.Thresholds = existingThreshold.Thresholds.filter(
        (threshold) => threshold._id != _id
      );
      await existingThreshold.save();
      return res.status(200).send(existingThreshold);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to delete Threshold" });
    }
  },

  getThreshold: async (req, res) => {
    try {
      const threshold = await Threshold.findOne({
        bloodBankId: req.params.bloodBankId,
      });

      if (!threshold) {
        return res.status(404).json({ message: "Threshold not found" });
      }

      return res.status(200).send(threshold);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get Threshold" });
    }
  },
};

module.exports = ThresholdController;
