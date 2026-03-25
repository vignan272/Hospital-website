const express = require("express");
const router = express.Router();

// controllers
const {
  registerPatient,
  loginPatient,
  bookAppointment,
  getMyAppointments,
  getAllDoctors,
} = require("../Controllers/patientController");

// middleware
const { verifyToken, isPatient } = require("../Middlewares/authMiddleware");

// Patient Register
router.post("/register", registerPatient);

// Patient Login
router.post("/login", loginPatient);

// Get All Doctors
router.get("/doctors", getAllDoctors);

// Patient Book Appointment
router.post("/book-slot", verifyToken, isPatient, bookAppointment);

// Patient View Their Appointments
router.get("/my-appointments", verifyToken, isPatient, getMyAppointments);

module.exports = router;
