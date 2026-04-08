const mongoose = require("mongoose");

const opSchema = new mongoose.Schema(
  {
    // 🔗 Relations
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patients",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctors",
      required: true,
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointments",
      required: true,
      unique: true, // one OP per appointment
    },

    // 👤 Patient Snapshot (auto-filled)
    name: String,
    dateOfBirth: Date,
    phone: String,
    gender: String,

    // 📝 OP Form (Patient Input)
    weight: Number,

    healthCheckupType: {
      type: String,
      enum: ["online", "in-person"],
      required: true,
    },

    symptoms: {
      type: String,
      required: true,
    },

    medicalHistory: {
      type: String, // simple text
    },

    // 📁 Manual Upload (Patient)
    uploadedReports: [
      {
        url: String,
        public_id: String,
      },
    ],

    // 🔄 Auto-Fetched History (REFERENCE ONLY)
    pastRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "medicalrecords",
      },
    ],

    //  Doctor Review
    doctorNotes: {
      type: String,
      default: "",
    },

    // 🔹 OP Status
    opStatus: {
      type: String,
      enum: ["Pending", "Reviewed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Op", opSchema);
