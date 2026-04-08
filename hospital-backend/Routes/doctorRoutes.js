const express = require("express");
const router = express.Router();

const {
  doctorLogin,
  getDoctorAppointments,
  doctorAcceptAppointment,
  doctorRejectAppointment,
  getPatientHistory,
  addMedicalRecord,
  getMedicalRecords,
  getMyPatients,
  getDoctorOps,
  reviewOpDecision,
} = require("../Controllers/doctorController");
const { verifyToken, allowDoctor } = require("../Middlewares/authMiddleware");
const uploadReports = require("../Middlewares/upload");

// Login
router.post("/login", doctorLogin);

// Appointments
router.get("/appointments", verifyToken, getDoctorAppointments);
router.put("/accept/:id", verifyToken, doctorAcceptAppointment);
router.put("/reject/:id", verifyToken, doctorRejectAppointment);

// // ========================
// // OP (Outpatient Forms)
// // ========================
router.get("/ops", verifyToken, getDoctorOps);

// // ========================
// // Patients
// // ========================
router.get("/patients", verifyToken, getMyPatients);

router.get(
  "/patients/:patientId/history",
  verifyToken,
  allowDoctor,
  getPatientHistory,
);

// // ========================
// // Medical Records
// // ========================
router.post(
  "/patients/:patientId/medical-records",
  verifyToken,
  allowDoctor,
  uploadReports.array("reports", 5),
  addMedicalRecord,
);

router.get(
  "/patients/:patientId/medical-records",
  verifyToken,
  allowDoctor,
  getMedicalRecords,
);

// // ========================
// // OP Decision
// // ========================
router.put("/op-decision/:opId", verifyToken, allowDoctor, reviewOpDecision);

module.exports = router;
