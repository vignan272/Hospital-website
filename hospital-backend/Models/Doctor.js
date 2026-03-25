const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number },

  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hospitals",
    required: true,
  },

  availability: { type: [String] },

  profileImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("doctors", DoctorSchema);
