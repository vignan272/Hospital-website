const express = require("express");
const router = express.Router();

const {
  doctorLogin,
  getDoctorAppointments,
  doctorAcceptAppointment, // ✅ CORRECT
  doctorRejectAppointment, // ✅ FIXED NAME
  getPatientHistory,
} = require("../Controllers/doctorController");

const { verifyToken } = require("../Middlewares/authMiddleware");

// Login
router.post("/login", doctorLogin);

// Appointments
router.get("/appointments", verifyToken, getDoctorAppointments);
router.put("/accept/:id", verifyToken, doctorAcceptAppointment);
router.put("/reject/:id", verifyToken, doctorRejectAppointment);

// Patient history
router.get("/patient-history/:patientId", verifyToken, getPatientHistory);

module.exports = router;
