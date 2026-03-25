const Patient = require("../Models/Patient");
const Doctor = require("../Models/Doctor");
const Appointment = require("../Models/Appointment");
const { sendAdminAppointmentEmail } = require("../Services/emailService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// ========================
// Register Patient
// ========================
exports.registerPatient = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingPatient = await Patient.findOne({ email });

    if (existingPatient) {
      return res.status(400).json({
        message: "Patient already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = new Patient({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await patient.save();

    res.status(201).json({
      message: "Patient registered successfully",
      patient,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Patient Login
// ========================
exports.loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: patient._id, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Get All Doctors
// ========================
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Book Appointment
// ========================
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    // ✅ Get doctor to fetch hospital
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // ✅ Create appointment WITH hospital
    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      hospital: doctor.hospital, // 🔥 ADD THIS
      appointmentDate: date,
      appointmentTime: time,
      description: description,
      adminStatus: "Pending",
      doctorStatus: "Pending",
      finalStatus: "Pending",
    });

    await appointment.save();

    const patient = await Patient.findById(req.user.id);

    await sendAdminAppointmentEmail(patient, doctor, appointment);

    res.json({
      message: "Appointment request sent to admin",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id,
    })
      .populate("doctor")
      .populate("hospital"); // ✅ ADD THIS

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
