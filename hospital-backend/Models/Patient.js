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
  },

  address: {
    type: String,
  },

  dateOfBirth: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PatientModel = mongoose.model("patients", PatientSchema);

module.exports = PatientModel;
