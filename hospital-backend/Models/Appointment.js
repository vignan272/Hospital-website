const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patients",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctors",
      required: true,
      index: true,
    },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hospitals",
      required: true,
    },

    appointmentDate: Date,
    appointmentTime: String,
    description: String,

    adminStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },

    doctorStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },

    // ✅ ADD THIS BLOCK
    op: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Op",
    },

    opStatus: {
      type: String,
      enum: ["NotFilled", "Filled", "Reviewed"],
      default: "NotFilled",
    },

    finalStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("appointments", AppointmentSchema);
