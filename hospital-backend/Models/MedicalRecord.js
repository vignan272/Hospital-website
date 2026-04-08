const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
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
    },

    // 📄 Cloudinary PDF URLs
    testReports: [
      {
        url: String,
        public_id: String,
      },
    ],

    prescriptions: [String], // 💊
    diseases: [String], // 🦠
    treatments: [String], // 🏥

    notes: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("medicalrecords", medicalRecordSchema);
