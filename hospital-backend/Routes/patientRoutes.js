const express = require("express");
const router = express.Router();

// controllers
const {
  registerPatient,
  loginPatient,
  bookAppointment,
  getMyAppointments,
  getAllDoctors,
  getPatientDetails,
  getMyMedicalRecords,
  createOp,
  getMyMedicalRecordByAppointment,
} = require("../Controllers/patientController");

// middleware
const { verifyToken, isPatient } = require("../Middlewares/authMiddleware");

// upload
const uploadReports = require("../Middlewares/uploadReports");
const upload = require("../Middlewares/upload");

// ========================
// Patient Register
// ========================
router.post("/register", upload.single("photo"), registerPatient);

// ========================
// Patient Login
// ========================
router.post("/login", loginPatient);

// ========================
// Get All Doctors
// ========================
router.get("/doctors", getAllDoctors);

// ========================
// Book Appointment
// ========================
router.post("/book-slot", verifyToken, isPatient, bookAppointment);

// ========================
// Fill OP (Hybrid)
// ========================
router.post(
  "/create-op",
  verifyToken,
  isPatient,
  uploadReports.array("reports", 5), // ✅ limit added
  createOp,
);

// ========================
// Get My Appointments
// ========================
router.get("/my-appointments", verifyToken, isPatient, getMyAppointments);

// ========================
// Get Patient Details
// ========================
router.get("/patient_details", verifyToken, isPatient, getPatientDetails);

// ========================
// Get My Medical Records
// ========================
router.get("/my-medical-records", verifyToken, isPatient, getMyMedicalRecords);

router.get(
  "/medical-record/:appointmentId",
  verifyToken,
  getMyMedicalRecordByAppointment,
);

module.exports = router;
