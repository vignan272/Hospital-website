const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Appointment = require("../Models/Appointment");
const Patient = require("../Models/Patient");
const Doctor = require("../Models/Doctor");
const DoctorAvailability = require("../Models/DoctorAvailability");
const Hospital = require("../Models/HospitalDetails"); // Added Hospital model
const { sendDoctorAppointmentEmail } = require("../Services/emailService");

// ========================
// Admin Login
// ========================
exports.adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin23@gmail.com" && password === "admin23") {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      message: "Admin login successful",
      token,
      role: "admin", // ✅ ADD THIS
    });
  }

  res.status(401).json({
    message: "Invalid credentials",
  });
};

// ========================
// Appointments Management
// ========================
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("hospital", "name location") // ✅ DIRECT hospital

      .sort({ createdAt: -1 }); // newest first

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.adminAcceptAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { adminStatus: "Accepted" },
      { returnDocument: "after" }, // ✅ updated (no warning)
    )
      .populate("patient")
      .populate("doctor")
      .populate("hospital"); // ✅ important

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const patient = appointment.patient;
    const doctor = appointment.doctor;

    // 📧 send email to doctor
    await sendDoctorAppointmentEmail(doctor, patient, appointment);

    res.json({
      message: "Appointment accepted by admin & doctor notified",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        adminStatus: "Rejected",
        finalStatus: "Rejected",
      },
      { new: true },
    );

    res.json({
      message: "Appointment rejected",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Hospital Management
// ========================

exports.addHospital = async (req, res) => {
  try {
    const { name, location, address, contactNumber } = req.body;

    // Check if hospital already exists by name/location to avoid duplicates
    const existingHospital = await Hospital.findOne({ name, location });
    if (existingHospital) {
      return res
        .status(400)
        .json({ message: "Hospital at this location already exists" });
    }

    const hospital = new Hospital({
      name,
      location,
      address,
      contactNumber,
    });

    await hospital.save();

    res.status(201).json({
      message: "Hospital added successfully",
      hospital,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Doctor Management
// ========================

exports.addDoctor = async (req, res) => {
  try {
    const { password, ...doctorData } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = new Doctor({
      ...doctorData,
      password: hashedPassword,

      profileImage: req.file ? req.file.path : "",
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("hospital", "name location")
      .select("-password");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // ✅ handle image update
    if (req.file) {
      req.body.profileImage = req.file.path;
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("hospital", "name");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({
      message: "Doctor updated successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.blockSlots = async (req, res) => {
  try {
    const { doctorId, date, slots } = req.body;

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const availability = await DoctorAvailability.findOneAndUpdate(
      {
        doctor: doctorId,
        date: start,
      },
      {
        $set: { blockedSlots: slots },
      },
      {
        upsert: true,
        new: true,
      },
    );

    res.json({
      message: "Slots blocked successfully",
      availability,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
