import React, { useState } from "react";
import axios from "axios";
import "./AddHospital.css";

function AddHospital() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    address: "",
    contactNumber: "",
  });

  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/admin/add-hospital",
        form,
        config,
      );

      alert("Hospital Added ✅");

      setForm({
        name: "",
        location: "",
        address: "",
        contactNumber: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="add-hospital-container">
      <div className="add-hospital-card">
        <h2>Add Hospital</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Hospital Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Location"
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <input
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <input
              type="text"
              placeholder="Contact Number"
              value={form.contactNumber}
              onChange={(e) =>
                setForm({ ...form, contactNumber: e.target.value })
              }
            />
          </div>

          <button type="submit">Add Hospital</button>
        </form>
      </div>
    </div>
  );
}

export default AddHospital;
