import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { handleError, handleSuccess } from "../utils";
import "./BookAppointment.css";
import {
  FaHospital,
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaArrowRight,
  FaCheckCircle,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdDescription } from "react-icons/md";

const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function BookAppointment() {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [availability, setAvailability] = useState([]);
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDoctorDetails, setSelectedDoctorDetails] = useState(null);
  const [calendarValue, setCalendarValue] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resHospitals, resDoctors] = await Promise.all([
          axios.get("http://localhost:8080/api/public/hospitals"),
          axios.get("http://localhost:8080/api/public/doctors"),
        ]);
        setHospitals(resHospitals.data);
        setDoctors(resDoctors.data);
      } catch {
        handleError("Failed to load data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedHospital) {
      setFilteredDoctors(
        doctors.filter((doc) => doc.hospital?._id === selectedHospital),
      );
      setDoctorId("");
      setSelectedDoctorDetails(null);
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedHospital, doctors]);

  // ✅ FIXED: Fetch availability and use backend status
  useEffect(() => {
    if (!doctorId) return;

    const fetchAvailability = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/public/availability-by-date?doctorId=${doctorId}`,
        );

        console.log("🔍 Backend Response:", res.data);

        // ✅ IMPORTANT FIX: Use the status from backend, don't force "red"
        const formatted = res.data.map((item) => ({
          date: item.date, // Backend already returns YYYY-MM-DD format
          status: item.status, // Use actual status: "green", "yellow", "black", or "red"
        }));

        console.log("✅ Formatted Availability:", formatted);

        setAvailability(formatted);
        const doctor = filteredDoctors.find((doc) => doc._id === doctorId);
        setSelectedDoctorDetails(doctor);
      } catch (error) {
        console.error("❌ Failed to fetch availability:", error);
        handleError("Failed to load availability");
      }
    };
    fetchAvailability();
  }, [doctorId, filteredDoctors]);

  useEffect(() => {
    setDate("");
    setSlots([]);
    setTime("");
  }, [doctorId]);

  useEffect(() => {
    if (!doctorId || !date) return;

    const fetchSlots = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/public/available-slots?doctorId=${doctorId}&date=${date}`,
        );
        setSlots(res.data);
      } catch {
        handleError("Failed to load time slots");
      }
    };
    fetchSlots();
  }, [doctorId, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/patient/book-slot",
        { doctorId, date, time, description },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleSuccess("Appointment booked successfully!");

      // Reset form
      setSelectedHospital("");
      setDoctorId("");
      setDate("");
      setTime("");
      setDescription("");
      setCurrentStep(1);
      setSelectedDoctorDetails(null);
      setCalendarValue(new Date());
    } catch {
      handleError("Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && !selectedHospital) {
      handleError("Please select a hospital");
      return;
    }
    if (currentStep === 2 && !doctorId) {
      handleError("Please select a doctor");
      return;
    }
    if (currentStep === 3 && !date) {
      handleError("Please select a date");
      return;
    }
    if (currentStep === 4 && !time) {
      handleError("Please select a time slot");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // ✅ UPDATED: Check if date is blocked or on leave (black) OR fully booked (red)
  const isDateUnavailable = (dateString) => {
    const found = availability.find((d) => d.date === dateString);
    return found?.status === "red" || found?.status === "black";
  };

  // Get date status for styling
  const getDateStatus = (dateString) => {
    const found = availability.find((d) => d.date === dateString);
    if (found?.status === "green") return "available";
    if (found?.status === "yellow") return "limited";
    if (found?.status === "red") return "blocked";
    if (found?.status === "black") return "black";
    return "unknown";
  };

  // Custom calendar tile content
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formatted = formatLocalDate(date);
      const found = availability.find((d) => d.date === formatted);

      // Show different dots based on status
      if (found?.status === "red") {
        return (
          <div className="calendar-status">
            <div className="status-dot red"></div>
          </div>
        );
      }
      if (found?.status === "yellow") {
        return (
          <div className="calendar-status">
            <div className="status-dot yellow"></div>
          </div>
        );
      }
      if (found?.status === "green") {
        return (
          <div className="calendar-status">
            <div className="status-dot green"></div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="booking-container">
      <div className="booking-wrapper">
        {/* Progress Steps */}
        <div className="progress-steps">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`step ${currentStep >= step ? "active" : ""}`}
            >
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 && "Hospital"}
                {step === 2 && "Doctor"}
                {step === 3 && "Date"}
                {step === 4 && "Time"}
                {step === 5 && "Confirm"}
              </div>
            </div>
          ))}
        </div>

        <div className="booking-card">
          <div className="card-header">
            <h2>Book Appointment</h2>
            <p>Schedule your consultation with expert doctors</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Hospital Selection */}
            {currentStep === 1 && (
              <div className="step-content fade-in">
                <div className="input-group">
                  <FaHospital className="input-icon" />
                  <select
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                    className="booking-input"
                    required
                  >
                    <option value="">Select Hospital</option>
                    {hospitals.map((h) => (
                      <option key={h._id} value={h._id}>
                        {h.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Doctor Selection */}
            {currentStep === 2 && (
              <div className="step-content fade-in">
                <div className="input-group">
                  <FaUserMd className="input-icon" />
                  <select
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="booking-input"
                    required
                    disabled={!selectedHospital}
                  >
                    <option value="">Select Doctor</option>
                    {filteredDoctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.name} - {doc.specialization || "General Physician"}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedDoctorDetails && (
                  <div className="doctor-preview slide-up">
                    <div className="doctor-avatar">
                      <FaStethoscope />
                    </div>
                    <div className="doctor-info">
                      <h4>{selectedDoctorDetails.name}</h4>
                      <p>
                        {selectedDoctorDetails.specialization ||
                          "General Physician"}
                      </p>
                      <small>
                        {selectedDoctorDetails.experience}+ years experience
                      </small>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Date Selection - Enhanced Calendar */}
            {currentStep === 3 && doctorId && (
              <div className="step-content fade-in">
                <div className="calendar-wrapper-enhanced">
                  <div className="calendar-legend">
                    <div className="legend-item">
                      <div className="status-dot green"></div>
                      <span>Available</span>
                    </div>
                    <div className="legend-item">
                      <div className="status-dot yellow"></div>
                      <span>Limited Slots</span>
                    </div>
                    <div className="legend-item">
                      <div className="status-dot red"></div>
                      <span>Fully Booked</span>
                    </div>
                    <div className="legend-item">
                      <div className="status-dot black"></div>
                      <span>Leave / Surgery / Blocked</span>
                    </div>
                  </div>

                  <Calendar
                    onChange={(value) => {
                      const d = new Date(value);
                      const formatted = formatLocalDate(d);

                      // Check if date is blocked/leave (black) OR fully booked (red)
                      if (isDateUnavailable(formatted)) {
                        const found = availability.find(
                          (a) => a.date === formatted,
                        );
                        const errorMsg =
                          found?.status === "black"
                            ? "Doctor is not available on this date (Leave/Surgery/Blocked)"
                            : "No slots available on this date (Fully Booked)";
                        handleError(errorMsg);
                        return;
                      }

                      setDate(formatted);
                      setCalendarValue(value);
                    }}
                    value={calendarValue}
                    minDate={new Date()}
                    prevLabel={<FaChevronLeft />}
                    nextLabel={<FaChevronRight />}
                    prev2Label={null}
                    next2Label={null}
                    tileClassName={({ date, view }) => {
                      if (view === "month") {
                        const formatted = formatLocalDate(date);
                        const found = availability.find(
                          (d) => d.date === formatted,
                        );

                        if (found) {
                          // ✅ Apply different styles based on status
                          if (found.status === "black") {
                            return "calendar-tile calendar-blocked";
                          }
                          if (found.status === "red") {
                            return "calendar-tile calendar-red";
                          }
                          if (found.status === "green") {
                            return "calendar-tile calendar-green";
                          }
                          if (found.status === "yellow") {
                            return "calendar-tile calendar-yellow";
                          }
                        }

                        return "calendar-tile";
                      }
                      return "";
                    }}
                    tileDisabled={({ date, view }) => {
                      if (view === "month") {
                        const formatted = formatLocalDate(date);
                        const found = availability.find(
                          (d) => d.date === formatted,
                        );
                        // ✅ Disable if black (leave/blocked) OR red (fully booked) OR past date
                        return (
                          found?.status === "red" ||
                          found?.status === "black" ||
                          date < new Date().setHours(0, 0, 0, 0)
                        );
                      }
                      return false;
                    }}
                    tileContent={tileContent}
                  />
                </div>

                {/* Selected Date Display */}
                {date && (
                  <div className="selected-date-enhanced">
                    <div className="selected-date-icon-wrapper">
                      <FaCalendarAlt className="selected-date-icon" />
                    </div>
                    <div className="selected-date-info">
                      <span className="selected-date-label">Selected Date</span>
                      <span className="selected-date-value">
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="selected-date-check">
                      <FaCheckCircle />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Time Selection */}
            {currentStep === 4 && date && (
              <div className="step-content fade-in">
                <div className="slot-container">
                  {slots.length === 0 ? (
                    <div className="no-slots">
                      <FaClock />
                      <p>No available slots for this date</p>
                    </div>
                  ) : (
                    <>
                      <div className="slot-header">
                        <h4>Available Time Slots</h4>
                        <p>Select your preferred time</p>
                      </div>
                      <div className="slot-grid">
                        {slots.map((slot, i) => (
                          <button
                            key={i}
                            type="button"
                            disabled={slot.isBooked}
                            onClick={() => setTime(slot.time)}
                            className={`slot-btn ${
                              slot.isBooked ? "slot-booked" : "slot-free"
                            } ${time === slot.time ? "slot-selected" : ""}`}
                          >
                            <FaClock className="slot-icon" />
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 5 && (
              <div className="step-content fade-in">
                <div className="appointment-summary">
                  <h3>Appointment Summary</h3>
                  <div className="summary-item">
                    <FaHospital />
                    <div>
                      <strong>Hospital</strong>
                      <p>
                        {
                          hospitals.find((h) => h._id === selectedHospital)
                            ?.name
                        }
                      </p>
                    </div>
                  </div>
                  <div className="summary-item">
                    <FaUserMd />
                    <div>
                      <strong>Doctor</strong>
                      <p>
                        {filteredDoctors.find((d) => d._id === doctorId)?.name}
                      </p>
                    </div>
                  </div>
                  <div className="summary-item">
                    <FaCalendarAlt />
                    <div>
                      <strong>Date</strong>
                      <p>
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="summary-item">
                    <FaClock />
                    <div>
                      <strong>Time</strong>
                      <p>{time}</p>
                    </div>
                  </div>
                  <div className="summary-item">
                    <MdDescription />
                    <div>
                      <strong>Description</strong>
                      <textarea
                        placeholder="Describe your problem (e.g., symptoms, duration, etc.)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="description-input"
                        rows="3"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="navigation-buttons">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="nav-btn prev"
                >
                  <FaArrowLeft /> Back
                </button>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="nav-btn next"
                >
                  Next <FaArrowRight />
                </button>
              ) : (
                <button
                  type="submit"
                  className="booking-btn"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Confirm Appointment"}
                  {!loading && <FaCheckCircle />}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
