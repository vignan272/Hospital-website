import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./FillOp.css";

function FillOp() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  // 👤 Patient editable fields
  const [patient, setPatient] = useState({
    name: "",
    dateOfBirth: "",
    phone: "",
    gender: "Male",
  });

  const [formData, setFormData] = useState({
    weight: "",
    healthCheckupType: "in-person",
    symptoms: "",
    medicalHistory: "",
  });

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // 🔥 Fetch patient details (auto-fill)
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8080/api/patient/patient_details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setPatient({
          name: res.data.name || "",
          dateOfBirth: res.data.dateOfBirth
            ? res.data.dateOfBirth.split("T")[0]
            : "",
          phone: res.data.phone || "",
          gender: res.data.gender || "Male",
        });
      } catch (err) {
        console.error("Error fetching patient:", err);
      }
    };

    fetchPatient();
  }, []);

  // 🔹 Handle patient input
  const handlePatientChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 FIXED: FILE LIMIT (MAX 5) WITH APPEND
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    // Check if adding these would exceed limit
    if (reports.length + newFiles.length > 5) {
      alert(
        `❌ You can upload maximum 5 reports only. You already have ${reports.length} file(s) selected.`,
      );
      return;
    }

    // ✅ FIX: Append new files to existing reports array
    setReports((prevReports) => [...prevReports, ...newFiles]);

    // Clear the input value so the same files can be selected again if needed
    e.target.value = "";
  };

  const removeReport = (index) => {
    setReports(reports.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reports.length === 0) {
      alert("⚠️ Please upload at least one medical report");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("appointmentId", appointmentId);

      // 👤 Patient editable data
      data.append("name", patient.name);
      data.append("dateOfBirth", patient.dateOfBirth);
      data.append("phone", patient.phone);
      data.append("gender", patient.gender);

      // 📝 Form
      data.append("weight", formData.weight);
      data.append("healthCheckupType", formData.healthCheckupType);
      data.append("symptoms", formData.symptoms);
      data.append("medicalHistory", formData.medicalHistory);

      // 📁 Reports (max 5) - ✅ Each file appended with same key
      reports.forEach((file) => {
        data.append("reports", file);
      });

      await axios.post("http://localhost:8080/api/patient/create-op", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percentCompleted);
        },
      });

      alert("✅ OP Submitted Successfully");
      navigate("/my-appointments");
    } catch (error) {
      console.error("FULL ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to submit OP");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fillOp_container">
      <div className="fillOp_card">
        <div className="fillOp_header">
          <div className="fillOp_headerIcon">📝</div>
          <h2 className="fillOp_title">Fill OP Form</h2>
          <p className="fillOp_subtitle">
            Please provide accurate medical information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="fillOp_form">
          {/* 👤 PATIENT INFO SECTION */}
          <div className="fillOp_section">
            <div className="fillOp_sectionTitle">
              <span className="fillOp_sectionIcon">👤</span>
              <h3>Patient Information</h3>
            </div>

            <div className="fillOp_formGroup">
              <label className="fillOp_label">Full Name *</label>
              <input
                type="text"
                name="name"
                className="fillOp_input"
                value={patient.name}
                onChange={handlePatientChange}
                placeholder="Enter patient's full name"
                required
              />
            </div>

            <div className="fillOp_row">
              <div className="fillOp_formGroup">
                <label className="fillOp_label">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="fillOp_input"
                  value={patient.dateOfBirth}
                  onChange={handlePatientChange}
                  required
                />
              </div>

              <div className="fillOp_formGroup">
                <label className="fillOp_label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className="fillOp_input"
                  value={patient.phone}
                  onChange={handlePatientChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            <div className="fillOp_formGroup">
              <label className="fillOp_label">Gender *</label>
              <div className="fillOp_radioGroup">
                <label className="fillOp_radioLabel">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={patient.gender === "Male"}
                    onChange={handlePatientChange}
                  />
                  <span>Male</span>
                </label>
                <label className="fillOp_radioLabel">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={patient.gender === "Female"}
                    onChange={handlePatientChange}
                  />
                  <span>Female</span>
                </label>
                <label className="fillOp_radioLabel">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={patient.gender === "Other"}
                    onChange={handlePatientChange}
                  />
                  <span>Other</span>
                </label>
              </div>
            </div>
          </div>

          {/* 📝 MEDICAL INFORMATION SECTION */}
          <div className="fillOp_section">
            <div className="fillOp_sectionTitle">
              <span className="fillOp_sectionIcon">🏥</span>
              <h3>Medical Information</h3>
            </div>

            <div className="fillOp_row">
              <div className="fillOp_formGroup">
                <label className="fillOp_label">Weight (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  className="fillOp_input"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Enter weight in kg"
                  step="0.1"
                  required
                />
              </div>

              <div className="fillOp_formGroup">
                <label className="fillOp_label">Checkup Type *</label>
                <select
                  name="healthCheckupType"
                  className="fillOp_select"
                  value={formData.healthCheckupType}
                  onChange={handleChange}
                >
                  <option value="in-person">🏥 In Person</option>
                  <option value="online">💻 Online</option>
                </select>
              </div>
            </div>

            <div className="fillOp_formGroup">
              <label className="fillOp_label">Symptoms *</label>
              <textarea
                name="symptoms"
                className="fillOp_textarea"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Describe your symptoms in detail..."
                rows="4"
                required
              />
            </div>

            <div className="fillOp_formGroup">
              <label className="fillOp_label">Medical History</label>
              <textarea
                name="medicalHistory"
                className="fillOp_textarea"
                value={formData.medicalHistory}
                onChange={handleChange}
                placeholder="Previous illnesses, surgeries, allergies, etc."
                rows="3"
              />
            </div>
          </div>

          {/* 📁 REPORTS SECTION */}
          <div className="fillOp_section">
            <div className="fillOp_sectionTitle">
              <span className="fillOp_sectionIcon">📋</span>
              <h3>Medical Reports</h3>
            </div>

            <div className="fillOp_fileUpload">
              <label className="fillOp_fileLabel">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="fillOp_fileInput"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <div className="fillOp_fileDropzone">
                  <span className="fillOp_fileIcon">📁</span>
                  <p>Click or drag files to upload</p>
                  <small>Maximum 5 files (PDF, JPG, PNG)</small>
                </div>
              </label>
            </div>

            {reports.length > 0 && (
              <div className="fillOp_fileList">
                <div className="fillOp_fileListHeader">
                  <h4>Selected Files ({reports.length}/5)</h4>
                  {reports.length < 5 && (
                    <small className="fillOp_hint">
                      You can add {5 - reports.length} more file(s)
                    </small>
                  )}
                </div>
                {reports.map((file, index) => (
                  <div key={index} className="fillOp_fileItem">
                    <div className="fillOp_fileInfo">
                      <span className="fillOp_fileName">📄 {file.name}</span>
                      <small className="fillOp_fileSize">
                        {(file.size / 1024).toFixed(2)} KB
                      </small>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeReport(index)}
                      className="fillOp_removeFile"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PROGRESS BAR */}
          {loading && uploadProgress > 0 && (
            <div className="fillOp_progressContainer">
              <div className="fillOp_progressBar">
                <div
                  className="fillOp_progressFill"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="fillOp_progressText">{uploadProgress}% Uploaded</p>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button type="submit" className="fillOp_submitBtn" disabled={loading}>
            {loading ? (
              <>
                <span className="fillOp_spinner"></span>
                Submitting...
              </>
            ) : (
              "Submit OP Form"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FillOp;
