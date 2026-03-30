const express = require("express");
const router = express.Router();
const Doctor = require("../Models/Doctor");
const Hospital = require("../Models/HospitalDetails");

// @route   GET /api/public/doctors
// @desc    Get all doctors with their hospital details
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("hospital", "name location address contactNumber")
      .select("-password -email");

    // ✅ Cloudinary already gives full image URL
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/public/hospitals
// @desc    Get all hospital details
router.get("/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
