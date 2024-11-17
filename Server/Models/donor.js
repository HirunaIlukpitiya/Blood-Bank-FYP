const mongoose = require("mongoose");

const donationDataSchema = mongoose.Schema(
  {
    DonatedDate: {
      type: String,
      required: true,
    },
    DonatedLocation: {
      type: String,
      required: true,
    },
    DonationNumber: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const donationRequestSchema = mongoose.Schema(
  {
    Email : {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    RequestDate: {
      type: String,
      required: true,
    },
    RequestLocation: {
      type: String,
      required: true,
    },
    RequestBloodGroup: {
      type: String,
      required: true,
    },
    RequestMessage: {
      type: String,
      required: true
    },
    ReadStatus: {
      default: "unread",
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const donationResponseSchema = mongoose.Schema(
  {
    PhoneNumber:{
      type: String,
      required: true,
    },
    Name:{
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const createdRequestSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    RequestDate: {
      type: String,
      required: true,
    },
    RequestLocation: {
      type: String,
      required: true,
    },
    RequestBloodGroup: {
      type: String,
      required: true,
    },
    RequestMessage: {
      type: String,
      required: true
    },
    RequestStatus: {
      default: "Pending",
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const donorSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: false,
    },
    NIC: {
      type: String,
      required: true,
    },
    BloodGroup: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: false,
    },
    District: {
      type: String,
      required: false,
    },
    City: {
      type: String,
      required: false,
    },
    NearByHospital: {
      type: String,
      required: false,
    },
    LastDonatedDate: {
      default: "",
      type: String,
      required: false,
    },
    DonationData: {
      type: [donationDataSchema],
      required: false,
    },
    DonationRequest: {
      type: [donationRequestSchema],
      required: false,
    },
    DonationResponse: {
      type: [donationResponseSchema],
      required: false,
    },
    CreatedRequest: {
      type: [createdRequestSchema],
      required: false,
    },
    DonorStatus: {
      default : "Active",
      type: String,
      required: false,
    },
    ActiveStatus: {
      default: false,
      type: Boolean,
      required: false,
    },
    Image: {
      type: String,
      required: true,
    },
    QRcode: {
      type: String,
      required: false,
    },
    Frequency: {
      default: "4",
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Donor = mongoose.model("Donor", donorSchema);
module.exports = Donor;
