const mongoose = require("mongoose");

const registrationData = mongoose.Schema({
  verified: {
    type: String,
    required: false,
    default: "",
  },
  barCode: {
    type: String,
    required: false,
    default: "",
  },
  officerId : {
    type: String,
    required : false,
    default: ""
  }
});

const medicalAssessment = mongoose.Schema({
  CVS: {
    type: String,
    required: false,
    default: "",
  },
  BP: {
    type: String,
    required: false,
    default: "",
  },
  Remark: {
    type: String,
    required: false,
    default: "",
  },
  OutCome: {
    type: String,
    required: false,
    default: "",
  },
  RemarkToDeferral: {
    type: String,
    required: false,
    default: "",
  },
    officerId: {
    type: String,
    required: false,
    default: "",
    }
});

const HbandBagType = mongoose.Schema({
  HbLevel: {
    type: String,
    required: false,
    default: "",
  },
  BagType: {
    type: String,
    required: false,
    default: "",
  },
  officerId: {
    type: String,
    required: false,
    default: "",
  }
});

const donorApplicationSchema = mongoose.Schema({
  Id: {
    type: String,
    required: true,
  },
  step1q1: {
    type: String,
    required: true,
  },
  step1q2: {
    type: String,
    required: false,
  },
  step1q3: {
    type: String,
    required: true,
  },
  step1q4: {
    type: String,
    required: true,
  },
  step2q1: {
    type: String,
    required: true,
  },
  step2q2: {
    type: Object,
    required: false,
  },
  step2q3: {
    type: String,
    required: true,
  },
  step2q4: {
    type: String,
    required: true,
  },
  step2q5: {
    type: String,
    required: true,
  },
  step2q6: {
    type: String,
    required: true,
  },
  step3q1: {
    type: String,
    required: true,
  },
  step3q2: {
    type: String,
    required: true,
  },
  step4q1: {
    type: String,
    required: true,
  },
  step4q2: {
    type: String,
    required: true,
  },
  step4q3: {
    type: String,
    required: true,
  },
  step4q4: {
    type: String,
    required: true,
  },
  step5q1: {
    type: String,
    required: true,
  },
  step5q2: {
    type: String,
    required: true,
  },
  step5q3: {
    type: String,
    required: true,
  },
  step5q4: {
    type: String,
    required: true,
  },
  step6q1: {
    type: String,
    required: true,
  },
  step6q2: {
    type: String,
    required: true,
  },
  step6q3: {
    type: String,
    required: true,
  },
  registrationData: {
    type: registrationData,
    required: false,
  },
  medicalAssessment: {
    type: medicalAssessment,
    required: false,
  },
  HbandBagType: { 
    type: HbandBagType,
    required: false 
},
  status: {
    default: "Pending",
    type: String,
    required: false,
  },
});

const DonorApplication = mongoose.model(
  "DonorApplication",
  donorApplicationSchema
);
module.exports = DonorApplication;
