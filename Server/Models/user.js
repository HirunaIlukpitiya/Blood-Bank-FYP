const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    bloodBankId: {
      type: String,
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    NIC: {
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
    Phone: {
      type: String,
      required: true,
    },
    RoleId: {
      type: String,
      required: true,
    },
    AccountType: {
      type: String,
      required: true,
    },
    ActiveStatus: {
      type: Boolean,
      default: false,
      required: false,
    },
    RegNumber: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
