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
    RequestDate: {
      type: String,
      required: true,
    },
    RequestLocation: {
      type: String,
      required: true,
    },
    RequestBloodType: {
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
      required: true
    },
    RequestPersonId: {
      type: String,
      required: true
    }

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
  },
  {
    timestamps: true,
  }
);

const donerSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
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
    DonatedCount: {
      type: String,
      required: false,
    },
    LastDonatedDate: {
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
    DonerStatus: {
      type: String,
      required: false,
    },
    ActiveStatus: {
      default: false,
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Doner = mongoose.model("Doner", donerSchema);
module.exports = Doner;
