const mongoose = require("mongoose");

const bloodBankSchema = mongoose.Schema(
    {
        // hospitalName: {
        // type: String,
        // required: true,
        // },
        email: {
        type: String,
        required: true,
        },
        regNumber: {
        type: String,
        required: true,
        },
        password: {
        type: String,
        required: true,
        },
        // phone: {
        // type: String,
        // required: true,
        // },
        // address: {
        // type: String,
        // required: true,
        // },
    },
    {
        timestamps: true,
    }
);
const BloodBank = mongoose.model("BloodBank", bloodBankSchema);
module.exports = BloodBank;