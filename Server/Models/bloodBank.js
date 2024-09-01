const mongoose = require("mongoose");

const bloodBankSchema = mongoose.Schema(
    {
        BankName: {
        type: String,
        required: true,
        },
        Email: {
        type: String,
        required: true,
        },
        RegNumber: {
        type: String,
        required: true,
        },
        Password: {
        type: String,
        required: false,
        },
        Phone: {
        type: String,
        required: true,
        },
        Address: {
        type: String,
        required: true,
        },
        RoleId: {
        type: String,
        required: true,
        },
        ActiveStatus: {
        default: false,
        type: Boolean,
        default: false,
        },
    },
    {
        timestamps: true,
    }
);
const BloodBank = mongoose.model("BloodBank", bloodBankSchema);
module.exports = BloodBank;