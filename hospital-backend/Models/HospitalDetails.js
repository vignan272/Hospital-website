const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String },
    contactNumber: { type: String },
  },
  { timestamps: true },
);

// This name "hospitals" is what the Doctor model uses to "link"
module.exports = mongoose.model("hospitals", HospitalSchema);
