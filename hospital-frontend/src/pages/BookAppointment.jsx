import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleError, handleSuccess } from "../utils";
import bgImage from "../assets/booking.png";

function BookAppointment() {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [selectedHospital, setSelectedHospital] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH HOSPITALS + DOCTORS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resHospitals = await axios.get(
          "http://localhost:8080/api/public/hospitals",
        );
        const resDoctors = await axios.get(
          "http://localhost:8080/api/public/doctors",
        );

        setHospitals(resHospitals.data);
        setDoctors(resDoctors.data);
      } catch (err) {
        handleError("Failed to load data");
      }
    };

    fetchData();
  }, []);

  // 🔥 FILTER DOCTORS BY HOSPITAL
  useEffect(() => {
    if (selectedHospital) {
      const filtered = doctors.filter(
        (doc) => doc.hospital?._id === selectedHospital,
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedHospital, doctors]);

  // 🔥 BOOK APPOINTMENT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8080/api/patient/book-slot",
        {
          doctorId,
          date,
          time,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      handleSuccess("⏳ Appointment requested");

      setStatus(res.data.appointment.adminStatus);

      // reset
      setDoctorId("");
      setDate("");
      setTime("");
      setDescription("");
      setSelectedHospital("");
    } catch (err) {
      handleError("Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h2>Book Appointment</h2>

          <form onSubmit={handleSubmit}>
            {/* 🔥 HOSPITAL */}
            <select
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">Select Hospital</option>
              {hospitals.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.name}
                </option>
              ))}
            </select>

            {/* 🔥 DOCTOR (FILTERED) */}
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">Select Doctor</option>
              {filteredDoctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name} ({doc.specialization})
                </option>
              ))}
            </select>

            {/* DATE */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={styles.input}
              required
            />

            {/* TIME */}
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={styles.input}
              required
            >
              <option value="">Select Time</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>02:00 PM</option>
              <option>04:00 PM</option>
            </select>

            {/* DESCRIPTION */}
            <textarea
              placeholder="Describe your problem..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ ...styles.input, height: "80px" }}
              required
            />

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>

          {status && (
            <div style={styles.statusBox}>
              ⏳ Status: <strong>{status}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
  },
  overlay: {
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "green",
    color: "#fff",
    border: "none",
  },
  statusBox: {
    marginTop: "10px",
    background: "#fff3cd",
    padding: "10px",
  },
};

export default BookAppointment;
