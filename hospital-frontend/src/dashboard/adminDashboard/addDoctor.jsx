import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddDoctor.css";

function AddDoctor() {
  const [hospitals, setHospitals] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    hospital: "",
  });

  const [file, setFile] = useState(null); // ✅ image file

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  // 🔹 Load hospitals
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/public/hospitals")
      .then((res) => setHospitals(res.data))
      .catch(() => alert("Error loading hospitals"));
  }, []);

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("specialization", form.specialization);
      formData.append("experience", form.experience);
      formData.append("hospital", form.hospital);

      if (file) {
        formData.append("profileImage", file);
      }

      await axios.post(
        "http://localhost:8080/api/admin/add-doctor",
        formData,
        config,
      );

      alert("Doctor Added ✅");

      // reset form
      setForm({
        name: "",
        email: "",
        password: "",
        specialization: "",
        experience: "",
        hospital: "",
      });

      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Error adding doctor");
    }
  };

  return (
    <div className="add-doctor-container">
      <div className="form-card">
        <h2>Add Doctor</h2>

        <form onSubmit={handleSubmit} className="doctor-form">
          <div className="form-grid">
            <input
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email Address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <input
              placeholder="Specialization"
              value={form.specialization}
              onChange={(e) =>
                setForm({ ...form, specialization: e.target.value })
              }
            />

            <input
              placeholder="Experience (Years)"
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
            />

            <select
              required
              value={form.hospital}
              onChange={(e) => setForm({ ...form, hospital: e.target.value })}
            >
              <option value="">Select Hospital</option>
              {hospitals.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.name}
                </option>
              ))}
            </select>

            {/* ✅ IMAGE INPUT */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {/* ✅ IMAGE PREVIEW */}
            {file && (
              <div style={{ marginTop: "10px" }}>
                <p>Preview:</p>
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  width="120"
                  style={{ borderRadius: "8px" }}
                />
              </div>
            )}
          </div>

          <button className="submit-btn">Add Doctor</button>
        </form>
      </div>
    </div>
  );
}

export default AddDoctor;
