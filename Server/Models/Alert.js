const mangoose = require('mongoose');

const alertSchema = mangoose.Schema({
    bloodBankId:{
        type: String,
        required: true,
    },
    bloodGroup:{
        type: String,
        required: true,
    },
    productName:{
        type: String,
        required: true,
    },
    massageSent :{
        type: Boolean,
        required: false,
        default: false,
    }
});

const Alert = mangoose.model("Alert", alertSchema);
module.exports = Alert;