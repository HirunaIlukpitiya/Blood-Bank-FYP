const mongoose = require("mongoose");

const donationCampSchema = mongoose.Schema({
    CampName: {
        type: String,
        required: true,
    },
    CampLocation: {
        type: String,
        required: true,
    },
    CampDateTime: {
        type: String,
        required: true,
    },
    CampDescription: {
        type: String,
        required: true,
    },
    CampOrganizer: {
        type: String,
        required: true,
    },
    CampContact: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
}
);

const DonationCamp = mongoose.model("DonationCamp", donationCampSchema);
module.exports = DonationCamp;