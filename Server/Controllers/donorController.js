const { get } = require("mongoose");
const Donor = require("../Models/doner");
const DonorApplication = require("../models/donorApplications");

const donorController = {
  getDonors: async (req, res) => {
    try {
      const donors = await Donor.find();
      return res.status(200).json(donors);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Donors not found" });
    }
  },

  getDonor: async (req, res) => {
    try {
      const donor = await Donor.findById(req.params.Email);
      return res.status(200).json(donor);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Donor not found" });
    }
  },

  getDonorApplication: async (req, res) => {
    try {
      const donorApplication = await DonorApplication.findById(
        req.params.Email
      );
      return res.status(200).json(donorApplication);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Donor not found" });
    }
  },
  addDonorApplication: async (req, res) => {
    try {
      const {
        Email,
        status,
        step1q1,
        step1q2,
        step1q3,
        step1q4,
        step2q1,
        step2q2,
        step2q3,
        step2q4,
        step2q5,
        step2q6,
        step3q1,
        step3q2,
        step4q1,
        step4q2,
        step4q3,
        step4q4,
        step5q1,
        step5q2,
        step5q3,
        step5q4,
        step6q1,
        step6q2,
        step6q3,
      } = req.body;
      const donorApplication = new DonorApplication({
        Email,
        step1q1,
        step1q2,
        step1q3,
        step1q4,
        step2q1,
        step2q2,
        step2q3,
        step2q4,
        step2q5,
        step2q6,
        step3q1,
        step3q2,
        step4q1,
        step4q2,
        step4q3,
        step4q4,
        step5q1,
        step5q2,
        step5q3,
        step5q4,
        step6q1,
        step6q2,
        step6q3,
        status,
      });
      await donorApplication.save();
      return res.status(200).json({ message: "Donor Application Successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Donor Application Failed", error });
    }
  },

  findDonor: async (req, res) => {
    try {
        const {Email, Title, RequestLocation, RequestDate, RequestBloodGroup, RequestMessage} = req.body;
        const donors = await Donor.find({ BloodGroup: RequestBloodGroup });
        if(donors.length === 0){
            return res.status(400).json({message: "No donors found"});
        }
        console.log(donors);

        const donationRequest = {
            Email,
            Title,
            RequestLocation,
            RequestDate,
            RequestBloodGroup,
            RequestMessage,
        };

        for (const donor of donors) {
            if(donor.Email === Email){
                continue;
            } else {
            donor.DonationRequest.push(donationRequest);
            await donor.save();
            }
        }

        return res.status(200).json({message: "Donation Request Successful"});

    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Donation Request Failed" , error});
    }
    },

    getDonationRequest: async (req, res) => {

        try {
            const Email = req.params.Email;
            const donor = await Donor.findOne({Email});
            const donationRequest = donor.DonationRequest;
            return res.status(200).json(donationRequest);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Donation Request not found"});
        }
    },
};

module.exports = donorController;
