const express = require("express");
const router = express.Router();

const {
  doctorLogin,
  getDoctorAppointments,
  doctorAcceptAppointment,
  doctorRejectAppointment,
  getPatientHistory,
  addMedicalRecord,
  getMyPatients,
  getDoctorOps,
  reviewOpDecision,
  getMedicalRecordByAppointment,
  getMedicalRecords,
} = require("../Controllers/doctorController");
const { verifyToken, allowDoctor } = require("../Middlewares/authMiddleware");

// ✅ Import the CORRECT upload middleware (Cloudinary one that accepts PDFs)
const uploadReports = require("../Middlewares/uploadReports"); // Make sure this is the Cloudinary version

// Login
router.post("/login", doctorLogin);

// Appointments
router.get("/appointments", verifyToken, getDoctorAppointments);
router.put("/accept/:id", verifyToken, doctorAcceptAppointment);
router.put("/reject/:id", verifyToken, doctorRejectAppointment);

// OP (Outpatient Forms)
router.get("/ops", verifyToken, getDoctorOps);

// Patients
router.get("/patients", verifyToken, getMyPatients);
router.get(
  "/patients/:patientId/history",
  verifyToken,
  allowDoctor,
  getPatientHistory,
);

// Medical Records
router.post(
  "/add-record/:appointmentId",
  verifyToken,
  allowDoctor,
  uploadReports.array("reports", 5), // ✅ This will now accept PDFs
  addMedicalRecord,
);

router.get(
  "/medical-record/:appointmentId",
  verifyToken,
  allowDoctor,
  getMedicalRecordByAppointment,
);

router.get(
  "/patients/:patientId/medical-records",
  verifyToken,
  allowDoctor,
  getMedicalRecords,
);

// OP Decision
router.put("/op-decision/:opId", verifyToken, allowDoctor, reviewOpDecision);

module.exports = router;
