const mongoose = require("mongoose");

const thresholdSchema = mongoose.Schema({
    bloodbankId: {
        type: String,
        required: true,
    },
    APositivePlatelets: {
        type: Number,
        default: 0,
        required: false
    },
    ANegativePlatelets: {
        type: Number,
        default: 0,
        required: false
    },
    BPositivePlatelets: {
        type: Number,
        default: 0,
        required: false
    },
    BNegativePlatelets: {
        type: Number,
        default: 0,
        required: false
    },
    ABPositivePlatelets: {
        type: Number,
        default: 0,
        required: false
    },
    ABNegativePlatelets: {
        type: Number,
        default: 0,
        required: false
    },
    OPositivePlatelets: {
        type: Number,
        default: 0,
        required: false
    },
    ONegativePlatelets: {
        type: Number,
        default: 0,
        required: false
    },
    APositivePlasma: {
        type: Number,
        default: 0,
        required: false
    },
    ANegativePlasma: {
        type: Number,
        default: 0,
        required: false
    },
    BPositivePlasma: {
        type: Number,
        default: 0,
        required: false
    },
    BNegativePlasma: {
        type: Number,
        default: 0,
        required: false
    },
    ABPositivePlasma: {
        type: Number,
        default: 0,
        required: false
    },
    ABNegativePlasma: {
        type: Number,
        default: 0,
        required: false
    },
    OPositivePlasma: {
        type: Number,
        default: 0,
        required: false
    },
    ONegativePlasma: {
        type: Number,
        default: 0,
        required: false
    },
    APositiveRBC: {
        type: Number,
        default: 0,
        required: false
    },
    ANegativeRBC: {
        type: Number,
        default: 0,
        required: false
    },
    BPositiveRBC: {
        type: Number,
        default: 0,
        required: false
    },
    BNegativeRBC: {
        type: Number,
        default: 0,
        required: false
    },
    ABPositiveRBC: {
        type: Number,
        default: 0,
        required: false
    },
    ABNegativeRBC: {
        type: Number,
        default: 0,
        required: false
    },
    OPositiveRBC: {
        type: Number,
        default: 0,
        required: false
    },
    ONegativeRBC: {
        type: Number,
        default: 0,
        required: false
    }
},
{
    timestamps: true,
}
);

const Threshold = mongoose.model("Threshold", thresholdSchema);
module.exports = Threshold;