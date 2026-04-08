const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    select: false, // ✅ security best practice
  },

  address: String,

  dateOfBirth: Date,

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },

  insurance: {
    type: Boolean,
    default: false,
  },

  insuranceCompany: {
    type: String,
  },

  bloodType: String,

  emergencyContact: String,

  photo: String, // ✅ Cloudinary URL

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("patients", PatientSchema);
