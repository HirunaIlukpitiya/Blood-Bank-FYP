const mongoose = require("mongoose");

const threshold = mongoose.Schema({
    bloodGroup: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    keyName: {
        type: String,
        required: true,
    },

    
});

const thresholdSchema = mongoose.Schema({
    bloodBankId: {
        type: String,
        required: true,
    },
    Thresholds: [threshold],
},
{
    timestamps: true,
}
);

const Threshold = mongoose.model("Threshold", thresholdSchema);
module.exports = Threshold;