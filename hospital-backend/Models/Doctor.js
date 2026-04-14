const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    specialization: { type: String, required: true },

    experience: { type: Number, default: 0 },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hospitals",
      required: true,
    },

    availability: {
      type: [String],
      default: [],
    },

    profileImage: {
      type: String,
      default: "",
    },

    // ✅ Leave Management
    leaves: [
      {
        from: { type: Date, required: true },
        to: { type: Date, required: true },
        reason: { type: String, default: "" },
      },
    ],

    // ✅ Block Dates / Surgery / Partial Slots
    blockedSlots: [
      {
        date: { type: Date, required: true },

        type: {
          type: String,
          enum: ["FULL_DAY", "PARTIAL", "SURGERY"],
          default: "FULL_DAY",
        },

        slots: {
          type: [String],
          default: [],
        },

        reason: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true, // ✅ VERY IMPORTANT
  },
);

module.exports = mongoose.model("doctors", DoctorSchema);
