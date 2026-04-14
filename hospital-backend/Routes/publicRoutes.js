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

    // Get doctor details for leave and blocked checks
    const doctor = await Doctor.findById(doctorId);

    for (let i = 0; i < days; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      currentDate.setHours(0, 0, 0, 0);

      const start = currentDate;
      const end = new Date(currentDate);
      end.setHours(23, 59, 59, 999);

      // 🔴 PAST DATE (excluding today)
      if (start < today) {
        result.push({
          date: formatLocalDate(start),
          status: "red",
          available: 0,
          reason: "Past Date",
        });
        continue;
      }

      // 🚫 CHECK LEAVE FROM DOCTOR SCHEMA - NOW BLACK
      let isOnLeave = false;
      let leaveReason = "";

      if (doctor && doctor.leaves && doctor.leaves.length > 0) {
        for (const leave of doctor.leaves) {
          const leaveFrom = new Date(leave.from);
          const leaveTo = new Date(leave.to);
          leaveFrom.setHours(0, 0, 0, 0);
          leaveTo.setHours(23, 59, 59, 999);

          if (start >= leaveFrom && start <= leaveTo) {
            isOnLeave = true;
            leaveReason = leave.reason || "Leave";
            break;
          }
        }
      }

      if (isOnLeave) {
        result.push({
          date: formatLocalDate(start),
          status: "black", // ✅ FIXED: Changed from "red" to "black"
          reason: leaveReason,
          available: 0,
        });
        continue;
      }

      // 🚫 CHECK BLOCKED FULL DAY / SURGERY FROM DoctorAvailability - NOW BLACK
      const blocked = await DoctorAvailability.findOne({
        doctor: doctorId,
        date: {
          $gte: start,
          $lte: end,
        },
      });

      if (
        blocked &&
        blocked.blockedSlots &&
        blocked.blockedSlots.length === timeSlots.length
      ) {
        result.push({
          date: formatLocalDate(start),
          status: "black", // ✅ FIXED: Changed from "red" to "black"
          reason: "Full Day Blocked",
          available: 0,
        });
        continue;
      }

      // ✅ CHECK SURGERY/SPECIAL BLOCKS - NOW BLACK
      let hasSurgery = false;
      if (doctor && doctor.surgeries && doctor.surgeries.length > 0) {
        for (const surgery of doctor.surgeries) {
          const surgeryDate = new Date(surgery.date);
          surgeryDate.setHours(0, 0, 0, 0);

          if (start.getTime() === surgeryDate.getTime()) {
            hasSurgery = true;
            break;
          }
        }
      }

      if (hasSurgery) {
        result.push({
          date: formatLocalDate(start),
          status: "black", // ✅ FIXED: Changed from "red" to "black"
          reason: "Surgery",
          available: 0,
        });
        continue;
      }

      // ✅ CHECK BOOKED AND BLOCKED SLOTS COUNT
      const bookedCount = await Appointment.countDocuments({
        doctor: doctorId,
        appointmentDate: { $gte: start, $lte: end },
        finalStatus: { $ne: "Rejected" },
      });

      const blockedCount = blocked ? blocked.blockedSlots.length : 0;
      const totalSlots = timeSlots.length;
      const available = totalSlots - (bookedCount + blockedCount);

      let status = "green";
      let statusReason = "";

      if (available <= 0) {
        status = "red"; // Fully booked stays red
        statusReason = "Fully Booked";
      } else if (available <= Math.ceil(totalSlots / 2)) {
        status = "yellow";
        statusReason = "Limited Slots Available";
      }

      result.push({
        date: formatLocalDate(start),
        totalSlots,
        booked: bookedCount,
        blocked: blockedCount,
        available,
        status,
        reason: statusReason,
      });
    }

    console.log(
      `📅 Availability generated for doctor ${doctorId}:`,
      result.map((r) => ({ date: r.date, status: r.status, reason: r.reason })),
    );

    res.json(result);
  } catch (error) {
    console.error("Error in availability-by-date:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
