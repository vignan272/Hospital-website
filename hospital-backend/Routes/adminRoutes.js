const express = require("express");
const router = express.Router();

const upload = require("../Middlewares/upload");

// In adminRoutes.js
const adminLogin = require("../Controllers/adminController").adminLogin;
const getAllAppointments =
  require("../Controllers/adminController").getAllAppointments;
const adminAcceptAppointment =
  require("../Controllers/adminController").adminAcceptAppointment;
const rejectAppointment =
  require("../Controllers/adminController").rejectAppointment;
const addDoctor = require("../Controllers/adminController").addDoctor;
const getDoctors = require("../Controllers/adminController").getDoctors;
const deleteDoctor = require("../Controllers/adminController").deleteDoctor;
const updateDoctor = require("../Controllers/adminController").updateDoctor;
const addHospital = require("../Controllers/adminController").addHospital;
const blockSlots = require("../Controllers/adminController").blockSlots;
const getLeaveRequests =
  require("../Controllers/adminController").getLeaveRequests;
const approveLeave = require("../Controllers/adminController").approveLeave;
const rejectLeave = require("../Controllers/adminController").rejectLeave;

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

router.post("/block-slots", blockSlots);

// ========================
// HOSPITAL
// ========================
router.post("/add-hospital", addHospital);
// ========================
// Leave
// ========================
router.get("/leave-requests", getLeaveRequests);
router.put("/approve-leave", approveLeave);
router.put("/reject-leave", rejectLeave);

module.exports = router;
