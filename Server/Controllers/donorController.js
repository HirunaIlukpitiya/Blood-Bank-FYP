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
      if (req.params.id === "null") {
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

      const unreadCount = donor.DonationRequest.filter((request) => request.ReadStatus === "unread").length;
      const dateLeft = dateToNextDonate(donor.LastDonatedDate, donor.Frequency);
      console.log(dateLeft);
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
      let donorApplication;
      let userInfo = {};
      if (req.params.Email !="null") {
        console.log("param emsil ",req.params.Email);
        const donor = await Donor.findOne({Email : req.params.Email})
        console.log(donor)
        if (donor) {
          const donorId = donor._id;
          userInfo = {
            FirstName: donor.FirstName,
            LastName: donor.LastName,
          };
          console.log("donor id ",donorId);

          donorApplication = await DonorApplication.findOne({Id: donorId, status: "Pending" });
        }
      } else {
        console.log("param id " ,req.params.id);
        const donor = await Donor.findById(req.params.id);
        if (donor) {
          userInfo = {
            FirstName: donor.FirstName,
            LastName: donor.LastName,
          };
          donorApplication = await DonorApplication.findOne({Id: req.params.id});
        }
      }
      if (!donorApplication) {
        return res.status(400).json({ message: "Donor Application not found" });
      }
      return res.status(200).json({donorApplication: donorApplication, userInfo: userInfo});
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
      const existingDonorApplications = await DonorApplication.find({Id: Id});
      if (existingDonorApplications.length > 0) {
        for (const existingDonorApplication of existingDonorApplications) {
          if (existingDonorApplication.status === "Pending") {
            return res.status(400).json({ message: "Donor Application already exists" });
          }
        }
      }
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
            const eligibility = eligibilityCal(donor.LastDonatedDate, donor.Frequency);
            console.log(eligibility);
            if(donor._id == Id){
                continue;
            }
            if(eligibility) {
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
    },

    updateDonorApplication : async (req,res) => {
      try {
        const type = req.params.type;
        const officerId = req.params.userId;
        
        if (type == "tab1") {
          const verified = req.body.verified;
          const barCode = req.body.barCode;
          const donorId = req.body.donorId;

          const donorApplication = await DonorApplication.findOneAndUpdate(
            {Id: donorId},
            {$set: {      
              'registrationData.verified': verified,
              'registrationData.barCode': barCode,
              'registrationData.officerId': officerId,
            }},
            {new: true}
          );
          console.log(donorApplication)
          if (!donorApplication) {
            return res.status(400).json({message: "Donor Application not found"});
          }
          return res.status(200).json({message: "Donor Application Updated Successfully"});
        }
        if (type == "tab2") {
          const CVS = req.body.CVS;
          const BP = req.body.BP;
          const donorId = req.body.donorId;
          const Remark = req.body.Remark;
          const OutCome = req.body.OutCome;
          const RemarkToDeferral = req.body.RemarkToDeferral;

          let donorApplication = await DonorApplication.findOneAndUpdate(
            {Id: donorId},
            {$set: {      
              "medicalAssessment.CVS": CVS,
              "medicalAssessment.BP": BP,
              "medicalAssessment.Remark": Remark,
              "medicalAssessment.OutCome": OutCome,
              "medicalAssessment.RemarkToDeferral": RemarkToDeferral,
              "medicalAssessment.officerId": officerId,

            }},
            {new: true}
          );

          if (OutCome == "tempDeferral" || OutCome == "permDeferral") {
            donorApplication = await DonorApplication.findOneAndUpdate(
              {Id: donorId},
              {$set: {status: "Rejected"}},
              {new: true}
            )
          }

          console.log(donorApplication)
          if (!donorApplication) {
            return res.status(400).json({message: "Donor Application not found"});
          }
          return res.status(200).json({message: "Donor Application Updated Successfully"});
        }

        if (type == "tab3") {
          const HbLevel = req.body.HbLevel;
          const donorId = req.body.donorId;
          const BagType = req.body.BagType;

          let donorApplication = await DonorApplication.findOneAndUpdate(
            {Id: donorId},
            {$set: {      
              "HbandBagType.HbLevel": HbLevel,
              "HbandBagType.BagType": BagType,
              "HbandBagType.officerId": officerId,
            }},
            {new: true}
          );

          if (donorApplication.medicalAssessment.OutCome === "moreThan" && HbLevel === "lessThan") {
            donorApplication = await DonorApplication.findOneAndUpdate(
              {Id: donorId},
              {$set: {status: "Rejected"}},
              {new: true}
            )
          } else {
            donorApplication = await DonorApplication.findOneAndUpdate(
              {Id: donorId},
              {$set: {status: "Approved"}},
              {new: true}
            )

            const bloodDonor = await Donor.findById(donorId);
            const donationData = {
              DonatedDate: new Date().toISOString(),
              DonatedLocation : "Kosgama",
              DonationNumber : donorApplication.registrationData.barCode,
            };
            bloodDonor.DonationData.push(donationData);
            bloodDonor.LastDonatedDate = new Date().toISOString();
            await bloodDonor.save();

          }

          console.log(donorApplication)
          if (!donorApplication) {
            return res.status(400).json({message: "Donor Application not found"});
          }
          return res.status(200).json({message: "Donor Application Updated Successfully"});
        }

      } catch (error) {
        console.log(error)
        res.status(500).json({message: "Cannot Save data"})
      }
    },

    updateReadStatus : async (req, res) => {
      try {
        const donorId = req.params.donorId;
        const requestId = req.params.requestId;
        const donor = await Donor.findById(donorId);
        const request = donor.DonationRequest.id(requestId);
        request.ReadStatus = "read";
        await donor.save();
        return res.status(200).json({message: "Read Status Updated Successfully"});
      } catch (error) {
        console.log(error);
        res.status(500).json({message: "Cannot Update Read Status"});
      }
    }


};

module.exports = donorController;
