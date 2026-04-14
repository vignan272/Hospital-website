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
// AVAILABLE SLOTS (FIXED - Handles empty slots as FULL DAY)
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

    // ✅ BLOCKED - NOW USING DOCTOR MODEL
    const doctor = await Doctor.findById(doctorId);

    const blockedEntry = doctor.blockedSlots?.find(
      (b) => new Date(b.date).toDateString() === new Date(date).toDateString(),
    );

    let blockedSlots = [];

    if (blockedEntry) {
      if (blockedEntry.slots.length === 0) {
        // 🔴 FULL DAY BLOCK - block all slots
        blockedSlots = [...timeSlots];
      } else {
        // 🟡 PARTIAL BLOCK - block only specific slots
        blockedSlots = blockedEntry.slots;
      }
    }

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
// CALENDAR AVAILABILITY (FIXED - Handles empty slots as FULL DAY)
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
          booked: 0,
          blocked: 0,
          totalSlots: timeSlots.length,
          reason: "Past Date",
        });
        continue;
      }

      // ⚫ CHECK LEAVE FROM DOCTOR SCHEMA (HIGHEST PRIORITY)
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
          status: "black",
          reason: leaveReason,
          available: 0,
          booked: 0,
          blocked: 0,
          totalSlots: timeSlots.length,
        });
        continue;
      }

      // ✅ CHECK BOOKED COUNT
      const bookedCount = await Appointment.countDocuments({
        doctor: doctorId,
        appointmentDate: { $gte: start, $lte: end },
        finalStatus: { $ne: "Rejected" },
      });

      // ✅ CHECK BLOCKED SLOTS FROM DOCTOR MODEL
      const blockedEntry = doctor.blockedSlots?.find(
        (b) => new Date(b.date).toDateString() === start.toDateString(),
      );

      let blockedCount = 0;

      if (blockedEntry) {
        if (blockedEntry.slots.length === 0) {
          // 🔴 FULL DAY BLOCK
          blockedCount = timeSlots.length;
        } else {
          // 🟡 PARTIAL BLOCK
          blockedCount = blockedEntry.slots.length;
        }
      }

      const totalSlots = timeSlots.length;
      const unavailable = bookedCount + blockedCount;
      const available = totalSlots - unavailable;

      // ✅ COLOR LOGIC (FINAL)
      let status = "green";
      let statusReason = "";

      if (unavailable >= totalSlots) {
        status = "red"; // 🔴 FULLY BOOKED OR FULL DAY BLOCK
        statusReason = "Fully Booked";
      } else if (unavailable >= 2) {
        status = "yellow"; // 🟡 PARTIAL (2+ slots unavailable)
        statusReason = "Limited Slots Available";
      } else {
        status = "green"; // 🟢 AVAILABLE
        statusReason = "Available";
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
      `📅 Calendar Availability for doctor ${doctorId}:`,
      result.map((r) => ({
        date: r.date,
        status: r.status,
        blocked: r.blocked,
        booked: r.booked,
        reason: r.reason,
      })),
    );

    res.json(result);
  } catch (error) {
    console.error("Error in availability-by-date:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
