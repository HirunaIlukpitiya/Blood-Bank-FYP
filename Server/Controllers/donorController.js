const { get } = require("mongoose");
const Donor = require("../Models/donor");
const DonorApplication = require("../Models/donorApplications");
const { eligibilityCal, dateToNextDonate } = require("../utils");

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
      let donor;
      if (!req.params.id) {
        donor = await Donor.findOne({Email: req.params.Email});
      } else {
        donor = await Donor.findById(req.params.id)
        console.log(donor)
      }
      return res.status(200).json(donor);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Donor not found" });
    }
  },

  getDonorDashDetails : async (req, res) => {
    try {
      const donor = await Donor.findById(req.params.id);

      const unreadCount = donor.DonationRequest.filter((request) => request.status === "unread").length;
      const dateLeft = dateToNextDonate(donor.LastDonationDate, donor.Frequency);
      const details = {
        DonationRequest : unreadCount,
        DateToNextDonate : dateLeft,
        DonationData : donor.DonationData.length,
        DonorStatus : donor.DonorStatus,
        Frequency : donor.Frequency,
        FirstName : donor.FirstName,
        BloodGroup : donor.BloodGroup,
      }
      return res.status(200).json(details);
    } catch {
      console.log(error);
      return res.status(500).json({message: "Donor Dashboard Details not found"});
    }
  },

  getDonorApplication: async (req, res) => {
    try {
      let donorApplication = [];
      if (req.params.Email) {
        donorApplication = await DonorApplication.findOne({Email : req.params.Email});
      } else {
        donorApplication = await DonorApplication.findById(req.params.id);
      }
      
      return res.status(200).json(donorApplication);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Donor not found" });
    }
  },
  addDonorApplication: async (req, res) => {
    try {
      const {
        Id,
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
        Id,
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
        const {Id, Title, RequestLocation, RequestDate, RequestBloodGroup, RequestMessage} = req.body;
        const donors = await Donor.find({ BloodGroup: RequestBloodGroup });
        if(donors.length === 0){
            return res.status(400).json({message: "No donors found"});
        }

        const donationRequest = {
            Id,
            Title,
            RequestLocation,
            RequestDate,
            RequestBloodGroup,
            RequestMessage,
        };

        const createdRequest = {
            Title,
            RequestDate,
            RequestLocation,
            RequestBloodGroup,
            RequestMessage,
        }

        const reqCreater = await Donor.findById(Id);
        if(!reqCreater){
            return res.status(400).json({message: "Creater Profile not found"});
        }
        reqCreater.CreatedRequest.push(createdRequest);
        await reqCreater.save();

        for (const donor of donors) {
            const eligibility = eligibilityCal(donor.LastDonationDate, donor.Frequency);
            console.log(eligibility);
            if(donor._id = Id){
                continue;
            } else if(eligibility) {
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
            const donor = await Donor.findById(req.params.id);
            const donationRequest = donor.DonationRequest;
            return res.status(200).json(donationRequest);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Donation Request not found"});
        }
    },

    getCreatedRequest: async (req, res) => {
        try {
            const donor = await Donor.findById(req.params.id);
            const createdRequest = donor.CreatedRequest;
            return res.status(200).json(createdRequest);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Created Request not found"});
        }
    },

    getDonationResponse: async (req, res) => {
        try {
            const donor = await Donor.findById(req.params.id);
            const donationResponse = donor.DonationResponse;
            return res.status(200).json(donationResponse);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Donation Response not found"});
        }
    },

    getDonationData: async (req, res) => {
        try {
            const donor = await Donor.findById(req.params.id);
            const donationData = donor.DonationData;
            return res.status(200).json(donationData);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Donation Data not found"});
        }
    }


};

module.exports = donorController;
