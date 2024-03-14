const mongoose = require("mongoose");

const donerSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // NIC: {
    //   type: String,
    //   required: true,
    // },
    // bloodGroup: {
    //   type: String,
    //   required: true,
    // },
    // phone: {
    //   type: String,
    //   required: true,
    // },
    // address: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Doner = mongoose.model("Doner", donerSchema);
module.exports = Doner;
