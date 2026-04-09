const Doctor = require("../Models/Doctor");
const Appointment = require("../Models/Appointment");
const MedicalRecord = require("../Models/MedicalRecord");
const Op = require("../Models/Op");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendPatientAppointmentEmail } = require("../Services/emailService");

// ========================
// Doctor Login
// ========================
exports.doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Populate hospital data
    const doctor = await Doctor.findOne({ email }).populate(
      "hospital",
      "name location address contactNumber",
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // ✅ Send full doctor details
    res.json({
      message: "Doctor login successful",
      token,
      role: "doctor",
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        experience: doctor.experience,
        profileImage: doctor.profileImage,
        hospital: doctor.hospital, // ✅ full hospital object
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =======================
// Get Doctor Appointments
// ========================
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user.id,
      adminStatus: "Accepted",
    })
      .populate("patient", "name email phone")
      .populate("hospital", "name location")
      .populate("medicalRecord") // 🔥 IMPORTANT - Now frontend will see app.medicalRecord
      .sort({ appointmentDate: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Accept Appointment
// ========================
exports.doctorAcceptAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, doctor: req.user.id }, // 🔥 FIX
      {
        doctorStatus: "Accepted",
        finalStatus: "Confirmed",
      },
      { new: true },
    )
      .populate("patient")
      .populate("doctor")
      .populate("hospital");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found or not assigned to you",
      });
    }

    await sendPatientAppointmentEmail(
      appointment.patient,
      appointment.doctor,
      appointment,
    );

    res.json({
      message: "Appointment confirmed & patient notified",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Reject Appointment
// ========================
exports.doctorRejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, doctor: req.user.id }, // 🔥 FIX
      {
        doctorStatus: "Rejected",
        finalStatus: "Rejected",
      },
      { new: true },
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found or not assigned to you",
      });
    }

    res.json({
      message: "Appointment rejected",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Patient History (Doctor-specific)
// ========================
exports.getPatientHistory = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.params.patientId,
      doctor: req.user.id,
    })
      .populate("doctor", "name specialization")
      .populate("hospital", "name location")
      .sort({ appointmentDate: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//=====================
// Get My Patients (for Doctor Dashboard)
//=====================
exports.getMyPatients = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctor: req.user.id,
      finalStatus: "Confirmed",
    }).populate("patient", "-password -__v");

    // 🔥 Remove duplicates safely
    const patientMap = new Map();

    appointments.forEach((appt) => {
      if (appt.patient) {
        patientMap.set(appt.patient._id.toString(), appt.patient);
      }
    });

    const uniquePatients = Array.from(patientMap.values());

    res.json({
      count: uniquePatients.length,
      patients: uniquePatients,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Add Medical Record
// ========================
// ========================
// Add Medical Record
// ========================
exports.addMedicalRecord = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { prescriptions, diseases, treatments, notes } = req.body;

    // 🔍 Find appointment
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // 🔒 Security: only assigned doctor
    if (appointment.doctor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // 🔒 Only confirmed appointment
    if (appointment.finalStatus !== "Confirmed") {
      return res.status(400).json({
        message: "Appointment not confirmed",
      });
    }

    // ❌ Prevent duplicate record
    const existingRecord = await MedicalRecord.findOne({
      appointment: appointmentId,
    });

    if (existingRecord) {
      return res.status(400).json({
        message: "Medical record already exists for this appointment",
      });
    }

    // 🔥 JSON parse
    let parsedPrescriptions = JSON.parse(prescriptions || "[]");
    let parsedDiseases = JSON.parse(diseases || "[]");
    let parsedTreatments = JSON.parse(treatments || "[]");

    // 📄 Upload PDFs
    const testReports =
      req.files?.map((file) => ({
        url: file.path,
        public_id: file.filename,
      })) || [];

    const record = new MedicalRecord({
      patient: appointment.patient,
      doctor: appointment.doctor,
      appointment: appointment._id,
      prescriptions: parsedPrescriptions,
      diseases: parsedDiseases,
      treatments: parsedTreatments,
      notes,
      testReports,
    });

    await record.save();

    // 🔥 IMPORTANT LINKING - ONLY ONCE
    appointment.medicalRecord = record._id;
    appointment.opStatus = "Filled";
    await appointment.save(); // ✅ Only once now

    res.status(201).json({
      message: "Medical record added successfully",
      record,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ========================
// Get Patient Medical Records by appointment id
// ========================
exports.getMedicalRecordByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const record = await MedicalRecord.findOne({
      appointment: appointmentId,
    })
      .populate("doctor", "name specialization")
      .populate("patient", "name email");

    if (!record) {
      return res.status(404).json({
        message: "No medical record found for this appointment",
      });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      patient: req.params.patientId,
      doctor: req.user.id, // 🔥 IMPORTANT
    })
      .populate("doctor", "name specialization")
      .sort({ createdAt: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Get Doctor OPs
// ========================
exports.getDoctorOps = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const ops = await Op.find({ doctor: doctorId })
      .populate("patient", "name email phone gender dateOfBirth")
      .populate({
        path: "appointment",
        select: "appointmentDate appointmentTime status",
      })
      .populate({
        path: "pastRecords",
        populate: {
          path: "doctor",
          select: "name specialization",
        },
      })
      .sort({ createdAt: -1 });

    res.json({
      count: ops.length,
      ops,
    });
  } catch (error) {
    console.error("GET DOCTOR OPS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Doctor Review OP & Final Decision
// ========================
exports.reviewOpDecision = async (req, res) => {
  try {
    const doctorId = req.user.id;

    // 🔒 Role check here (instead of middleware)
    if (req.user.role !== "doctor") {
      return res.status(403).json({
        message: "Doctor access required",
      });
    }

    const { opId } = req.params;
    const { decision, doctorNotes } = req.body;

    if (!["Confirmed", "Rejected"].includes(decision)) {
      return res.status(400).json({
        message: "Decision must be Confirmed or Rejected",
      });
    }

    const op = await Op.findById(opId);

    if (!op) {
      return res.status(404).json({ message: "OP not found" });
    }

    // 🔒 Ensure only assigned doctor
    if (op.doctor.toString() !== doctorId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const appointment = await Appointment.findById(op.appointment);

    op.doctorNotes = doctorNotes;
    op.opStatus = "Reviewed";
    op.reviewedAt = new Date();
    await op.save();

    appointment.finalStatus = decision;
    await appointment.save();

    res.json({
      message: `Appointment ${decision} successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
