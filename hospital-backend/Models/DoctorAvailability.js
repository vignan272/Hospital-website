const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctors",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  blockedSlots: {
    type: [String], // ["10:00 AM", "11:00 AM"]
    default: [],
  },
});

module.exports = mongoose.model("doctorAvailability", schema);
