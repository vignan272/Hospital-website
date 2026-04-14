import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookDoctor.css";

function BookDoctor() {
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });

  // 🔥 Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/doctors");
        setDoctors(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctors();
  }, []);

  // 🔄 Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🚀 Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/admin/book-appointment",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("✅ Appointment booked successfully");

      // reset form
      setFormData({
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        doctorId: "",
        date: "",
        time: "",
        reason: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to book appointment");
    }
  };

  return (
    <div className="bookDoctor_container">
      <h2>Book Doctor (Treatment / Surgery)</h2>

      <form className="bookDoctor_form" onSubmit={handleSubmit}>
        {/* Patient Info */}
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="patientEmail"
          placeholder="Patient Email"
          value={formData.patientEmail}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="patientPhone"
          placeholder="Patient Phone"
          value={formData.patientPhone}
          onChange={handleChange}
          required
        />

        {/* Doctor Dropdown */}
        <select
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name} ({doc.specialization})
            </option>
          ))}
        </select>

        {/* Date & Time */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        {/* Reason */}
        <textarea
          name="reason"
          placeholder="Treatment / Surgery Details"
          value={formData.reason}
          onChange={handleChange}
          required
        />

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default BookDoctor;
