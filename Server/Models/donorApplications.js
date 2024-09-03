const mongoose = require('mongoose');

const donorApplicationSchema = mongoose.Schema(
    {
        Email: {
            type: String,
            required: true,
        },
        step1q1: {
            type: String,
            required:false,
        },
        step1q2: {
            type: String,
            required:false,
        },
        step1q3: {
            type: String,
            required:false,
        },
        step1q4: {
            type: String,
            required:false,
        },
        step2q1: {
            type: String,
            required:false,
        },
        step2q2: {
            type: String,
            required:false,
        },
        step2q3: {
            type: String,
            required:false,
        },
        step2q4: {
            type: String,
            required:false,
        },
        step2q5: {
            type: String,
            required:false,
        },
        step2q6: {
            type: String,
            required:false,
        },
        step3q1: {
            type: String,
            required:false,
        },
        step3q2: {
            type: String,
            required:false,
        },
        step4q1: {
            type: String,
            required:false,
        },
        step4q2: {
            type: String,
            required:false,
        },
        step4q3: {
            type: String,
            required:false,
        },
        step4q4: {
            type: String,
            required:false,
        },
        step5q1: {
            type: String,
            required:false,
        },
        step5q2: {
            type: String,
            required:false,
        },
        step5q3: {
            type: String,
            required:false,
        },
        step5q4: {
            type: String,
            required:false,
        },
        step6q1: {
            type: String,
            required:false,
        },
        step6q2: {
            type: String,
            required:false,
        },
        step6q3: {
            type: String,
            required:false,
        },
        status:{
            default: "Pending",
            type: String,
            required:false,
        }
    }
);

const DonorApplication = mongoose.model('DonorApplication', donorApplicationSchema);
module.exports = DonorApplication;
