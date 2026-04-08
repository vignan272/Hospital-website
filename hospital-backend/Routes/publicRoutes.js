const express = require("express");
const router = express.Router();
const Doctor = require("../Models/Doctor");
const Hospital = require("../Models/HospitalDetails");
const timeSlots = require("../config/slots");
const Appointment = require("../Models/Appointment");
const DoctorAvailability = require("../Models/DoctorAvailability");

// ✅ LOCAL DATE FORMAT FUNCTION (VERY IMPORTANT)
const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// ========================
// GET ALL DOCTORS
// ========================
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("hospital", "name location address contactNumber")
      .select("-password -email");

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================
// GET ALL HOSPITALS
// ========================
router.get("/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================
// AVAILABLE SLOTS
// ========================
router.get("/available-slots", async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({ message: "doctorId and date required" });
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    // ✅ BOOKED
    const bookedAppointments = await Appointment.find({
      doctor: doctorId,
      appointmentDate: { $gte: start, $lte: end },
      finalStatus: { $ne: "Rejected" },
    });

    const bookedSlots = bookedAppointments.map((a) => a.appointmentTime);

    // ✅ BLOCKED
    const blocked = await DoctorAvailability.findOne({
      doctor: doctorId,
      date: { $gte: start, $lte: end },
    });

    const blockedSlots = blocked ? blocked.blockedSlots : [];

    // ✅ FINAL SLOTS
    const slots = timeSlots.map((slot) => ({
      time: slot,
      isBooked: bookedSlots.includes(slot) || blockedSlots.includes(slot),
    }));

    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================
// CALENDAR AVAILABILITY
// ========================
router.get("/availability-by-date", async (req, res) => {
  try {
    const { doctorId } = req.query;

    if (!doctorId) {
      return res.status(400).json({ message: "doctorId required" });
    }

    const days = 30;
    const result = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = -1; i < days; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      const start = new Date(currentDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(currentDate);
      end.setHours(23, 59, 59, 999);

      // 🔴 PAST DATE
      if (start < today) {
        result.push({
          date: formatLocalDate(start), // ✅ FIXED
          status: "red",
          available: 0,
        });
        continue;
      }

      // ✅ BOOKED COUNT
      const bookedCount = await Appointment.countDocuments({
        doctor: doctorId,
        appointmentDate: { $gte: start, $lte: end },
        finalStatus: { $ne: "Rejected" },
      });

      // ✅ BLOCKED COUNT
      const blocked = await DoctorAvailability.findOne({
        doctor: doctorId,
        date: { $gte: start, $lte: end },
      });

      const blockedCount = blocked ? blocked.blockedSlots.length : 0;

      const totalSlots = timeSlots.length;
      const available = totalSlots - (bookedCount + blockedCount);

      let status = "green";

      if (available <= 0) {
        status = "red";
      } else if (bookedCount >= 2) {
        status = "yellow";
      }

      result.push({
        date: formatLocalDate(start), // ✅ FIXED
        totalSlots,
        booked: bookedCount,
        blocked: blockedCount,
        available,
        status,
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
