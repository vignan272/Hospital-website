const Patient = require("../Models/Patient");
const Doctor = require("../Models/Doctor");
const Appointment = require("../Models/Appointment");
const Op = require("../Models/Op");
const MedicalRecord = require("../Models/MedicalRecord");
const { sendAdminAppointmentEmail } = require("../Services/emailService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// ========================
// Register Patient
// ========================
exports.registerPatient = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      dateOfBirth,
      gender,
      bloodType,
      emergencyContact,
      insurance,
      insuranceCompany,
    } = req.body;

    // ✅ Convert insurance to boolean
    const insuranceValue = insurance === "true" || insurance === true;

    // ✅ Validation
    if (insuranceValue && !insuranceCompany) {
      return res.status(400).json({
        message: "Insurance company is required when insurance is true",
      });
    }

    // ✅ Check existing user
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({
        message: "Patient already registered",
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 📸 Cloudinary image
    const photoUrl = req.file ? req.file.path : "";

    // ✅ Create patient
    const patient = new Patient({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      dateOfBirth,
      gender,
      bloodType,
      emergencyContact,
      insurance: insuranceValue,
      insuranceCompany,
      photo: photoUrl,
    });

    await patient.save();

    res.status(201).json({
      message: "Patient registered successfully",
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        insurance: patient.insurance,
        insuranceCompany: patient.insuranceCompany,
        photo: patient.photo,
      },
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

    // ✅ Always fetch password explicitly
    const patient = await Patient.findOne({ email }).select("+password");

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    // 🔥 Debug (remove later)
    console.log("Entered Password:", password);
    console.log("DB Password:", patient.password);

    // ✅ Compare passwords
    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: patient._id, role: "patient" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // ✅ Send full patient data
    res.json({
      message: "Login successful",
      token,
      role: "patient",
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        address: patient.address,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        bloodType: patient.bloodType,
        emergencyContact: patient.emergencyContact,
        insurance: patient.insurance,
        insuranceCompany: patient.insuranceCompany,
        photo: patient.photo,
        createdAt: patient.createdAt,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
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

    // ✅ Get doctor
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // 🔥 STEP 3: CHECK SLOT (ADD THIS)

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const existing = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate: { $gte: start, $lte: end },
      appointmentTime: time,
      finalStatus: { $ne: "Rejected" },
    });

    if (existing) {
      return res.status(400).json({
        message: "Slot already booked. Please choose another time.",
      });
    }

    // ✅ CREATE APPOINTMENT (FIX DATE HERE ALSO)
    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      hospital: doctor.hospital,
      appointmentDate: new Date(date), // 🔥 IMPORTANT FIX
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
      .populate("hospital")
      .populate("op");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Get Patient Details
// ========================

exports.getPatientDetails = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select("-password");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patientData = {
      id: patient._id,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      bloodType: patient.bloodType,
      emergencyContact: patient.emergencyContact,
      insurance: patient.insurance, // ✅ ADD
      insuranceCompany: patient.insuranceCompany, // ✅ ADD
      photo: patient.photo,
      createdAt: patient.createdAt,
    };

    res.json(patientData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Get My Medical Records (Patient)
// ========================
exports.getMyMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      patient: req.user.id, // 🔐 only logged-in patient
    })
      .populate("doctor", "name specialization")
      .sort({ createdAt: -1 });

    res.json({
      count: records.length,
      records,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ========================
// Create OP (Patient)
// ========================
exports.createOp = async (req, res) => {
  try {
    const {
      appointmentId,
      weight,
      healthCheckupType,
      symptoms,
      medicalHistory,
      name,
      dateOfBirth,
      phone,
    } = req.body;

    // 🔹 1. Validate Appointment
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.doctorStatus !== "Accepted") {
      return res.status(400).json({
        message: "Doctor has not accepted appointment yet",
      });
    }

    // 🔹 2. Prevent duplicate OP
    const existingOp = await Op.findOne({ appointment: appointmentId });
    if (existingOp) {
      return res.status(400).json({
        message: "OP already exists for this appointment",
      });
    }

    // 🔹 3. Get patient details
    const patient = await Patient.findById(req.user.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // 🔹 4. Fetch past medical records (AUTO)
    const pastRecords = await MedicalRecord.find({
      patient: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const pastRecordIds = pastRecords.map((record) => record._id);

    // 🔹 5. Handle uploaded reports
    let uploadedReports = [];
    if (req.files && req.files.length > 0) {
      uploadedReports = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    // 🔹 6. Create OP (Editable Snapshot)
    const op = new Op({
      patient: patient._id,
      doctor: appointment.doctor,
      appointment: appointment._id,

      // 👤 Editable Snapshot
      name: name || patient.name,
      dateOfBirth: dateOfBirth || patient.dateOfBirth,
      phone: phone || patient.phone,
      gender: patient.gender,

      // 📝 Form Data
      weight,
      healthCheckupType,
      symptoms,
      medicalHistory,

      // 📁 Reports
      uploadedReports,
      pastRecords: pastRecordIds,
    });

    await op.save();

    // 🔥 7. Link OP to Appointment
    appointment.op = op._id;
    appointment.opStatus = "Filled";
    await appointment.save();

    // ✅ RESPONSE
    res.status(201).json({
      message: "OP created successfully",
      op,
      pastRecordsCount: pastRecords.length,
    });
  } catch (error) {
    console.error("CREATE OP ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
