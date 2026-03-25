const express = require("express");
const router = express.Router();

const upload = require("../Middlewares/upload"); // ✅ ADD THIS

const {
  adminLogin,
  getAllAppointments,
  adminAcceptAppointment,
  rejectAppointment,
  addDoctor,
  getDoctors,
  deleteDoctor,
  updateDoctor,
  addHospital,
} = require("../Controllers/adminController");

// ========================
// AUTH
// ========================
router.post("/login", adminLogin);

// ========================
// APPOINTMENTS
// ========================
router.get("/appointments", getAllAppointments);
router.put("/accept/:id", adminAcceptAppointment);
router.put("/reject/:id", rejectAppointment);

// ========================
// DOCTOR
// ========================

// ✅ ADD upload here
router.post("/add-doctor", upload.single("profileImage"), addDoctor);

router.get("/doctors", getDoctors);
router.delete("/delete-doctor/:id", deleteDoctor);

// ✅ ALSO ADD HERE (for updating image)
router.put("/update-doctor/:id", upload.single("profileImage"), updateDoctor);

// ========================
// HOSPITAL
// ========================
router.post("/add-hospital", addHospital);

module.exports = router;
