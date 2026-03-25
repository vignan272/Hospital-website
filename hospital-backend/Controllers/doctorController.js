const Doctor = require("../Models/Doctor");
const Appointment = require("../Models/Appointment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendPatientAppointmentEmail } = require("../Services/emailService");

// ========================
// Doctor Login
// ========================
exports.doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
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

    res.json({
      message: "Doctor login successful",
      token,
      role: "doctor", // ✅ ADD THIS
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
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
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
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
      return res.status(404).json({ message: "Appointment not found" });
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
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        doctorStatus: "Rejected",
        finalStatus: "Rejected",
      },
      { new: true },
    ).populate("hospital");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
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
// Patient History
// ========================
exports.getPatientHistory = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.params.patientId,
    })
      .populate("doctor", "name specialization")
      .populate("hospital", "name location")
      .sort({ appointmentDate: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
