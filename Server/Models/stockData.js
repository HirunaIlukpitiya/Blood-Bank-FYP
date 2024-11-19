const mongoose = require("mongoose");

const stockDataSchema = mongoose.Schema(
    {
        bloodbankId: {
            type: String,
            required: true,
        },
        APositivePlatelets: {
            type: Number,
            required: false,
            default: 0,
        },
        ANegativePlatelets: {
            type: Number,
            required: false,
            default: 0,
        },
        BPositivePlatelets: {
            type: Number,
            required: false,
            default: 0,
        },
        BNegativePlatelets: {
            type: Number,
            required: false,
            default: 0,
        },
        ABPositivePlatelets: {
            type: Number,
            required: false,
            default: 0,
        },
        ABNegativePlatelets: {
            type: Number,
            required: false,
            default: 0,
        },
        OPositivePlatelets: {
            type: Number,
            required: false,
            default: 0,
        },
        ONegativePlatelets: {
            type: Number,
            required: false,
            default: 0,
        },
        APositivePlasma: {
            type: Number,
            required: false,
            default: 0,
        },
        ANegativePlasma: {
            type: Number,
            required: false,
            default: 0,
        },
        BPositivePlasma: {
            type: Number,
            required: false,
            default: 0,
        },
        BNegativePlasma: {
            type: Number,
            required: false,
            default: 0,
        },
        ABPositivePlasma: {
            type: Number,
            required: false,
            default: 0,
        },
        ABNegativePlasma: {
            type: Number,
            required: false,
            default: 0,
        },
        OPositivePlasma: {
            type: Number,
            required: false,
            default: 0,
        },
        ONegativePlasma: {
            type: Number,
            required: false,
            default: 0,
        },
        APositiveRBC: {
            type: Number,
            required: false,
            default: 0,
        },
        ANegativeRBC: {
            type: Number,
            required: false,
            default: 0,
        },
        BPositiveRBC: {
            type: Number,
            required: false,
            default: 0,
        },
        BNegativeRBC: {
            type: Number,
            required: false,
            default: 0,
        },
        ABPositiveRBC: {
            type: Number,
            required: false,
            default: 0,
        },
        ABNegativeRBC: {
            type: Number,
            required: false,
            default: 0,
        },
        OPositiveRBC: {
            type: Number,
            required: false,
            default: 0,
        },
        ONegativeRBC: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const StockData = mongoose.model("StockData", stockDataSchema);
module.exports = StockData;