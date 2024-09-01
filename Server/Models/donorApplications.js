const mongoose = require('mongoose');

const donorApplicationSchema = mongoose.Schema(
    {
        FirstName: {
        type: String,
        required: true,
        },
        NIC:{
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
        PhoneNumber: {
        type: String,
        required: true,
        },
        BloodType: {
        type: String,
        required: true,
        },
        BirthDate: {
        type: String,
        required: true
        },
    }
);

module.exports = mongoose.model('donorApplication', donorApplicationSchema);
