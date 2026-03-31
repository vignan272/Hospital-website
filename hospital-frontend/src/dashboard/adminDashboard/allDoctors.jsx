// AllDoctors.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./allDoctors.css";

function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [editDoctor, setEditDoctor] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/admin/doctors",
        config,
      );
      setDoctors(res.data);
    } catch {
      alert("Error fetching doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(
          `http://localhost:8080/api/admin/delete-doctor/${id}`,
          config,
        );
        fetchDoctors();
      } catch {
        alert("Error deleting doctor");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editDoctor.name);
      formData.append("email", editDoctor.email);
      formData.append("password", editDoctor.password || "");
      formData.append("specialization", editDoctor.specialization);
      formData.append("experience", editDoctor.experience);
      formData.append("hospital", editDoctor.hospital?._id || "");

      if (file) {
        formData.append("profileImage", file);
      }

      await axios.put(
        `http://localhost:8080/api/admin/update-doctor/${editDoctor._id}`,
        formData,
        config,
      );

      setEditDoctor(null);
      setFile(null);
      fetchDoctors();
    } catch (err) {
      alert("Error updating doctor");
    }
  };

  // Get unique specializations for filter
  const specializations = [
    "all",
    ...new Set(doctors.map((doc) => doc.specialization).filter(Boolean)),
  ];

  // Filter doctors based on search and specialization
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization =
      selectedSpecialization === "all" ||
      doc.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  const stats = {
    total: doctors.length,
    specializations: specializations.length - 1,
    avgExperience:
      (
        doctors.reduce((sum, doc) => sum + (doc.experience || 0), 0) /
        doctors.length
      ).toFixed(1) || 0,
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="doctors-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Doctors Directory</h1>
          <p className="page-subtitle">Manage and update doctor profiles</p>
        </div>
        <button
          className="add-doctor-btn"
          onClick={() => (window.location.href = "/admin-dashboard/add-doctor")}
        >
          <span>+</span> Add New Doctor
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👨‍⚕️</div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Doctors</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏥</div>
          <div className="stat-info">
            <h3>{stats.specializations}</h3>
            <p>Specializations</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>{stats.avgExperience}</h3>
            <p>Avg. Experience (yrs)</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-wrapper">
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-wrapper">
          <label className="filter-label">Specialization:</label>
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="filter-select"
          >
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec === "all" ? "All Specializations" : spec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="empty-state">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <h3>No doctors found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="doctors-grid">
          {filteredDoctors.map((doc, index) => (
            <div
              key={doc._id}
              className="doctor-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {editDoctor?._id === doc._id ? (
                // Edit Mode
                <div className="edit-form">
                  <div className="edit-header">
                    <h3>Edit Doctor Profile</h3>
                    <button
                      className="close-edit"
                      onClick={() => {
                        setEditDoctor(null);
                        setFile(null);
                      }}
                    >
                      ×
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      value={editDoctor.name}
                      onChange={(e) =>
                        setEditDoctor({ ...editDoctor, name: e.target.value })
                      }
                      className="edit-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      value={editDoctor.email}
                      onChange={(e) =>
                        setEditDoctor({ ...editDoctor, email: e.target.value })
                      }
                      className="edit-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>New Password (optional)</label>
                    <input
                      type="password"
                      placeholder="Leave blank to keep current"
                      onChange={(e) =>
                        setEditDoctor({
                          ...editDoctor,
                          password: e.target.value,
                        })
                      }
                      className="edit-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Specialization</label>
                    <input
                      value={editDoctor.specialization}
                      onChange={(e) =>
                        setEditDoctor({
                          ...editDoctor,
                          specialization: e.target.value,
                        })
                      }
                      className="edit-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Experience (years)</label>
                    <input
                      type="number"
                      value={editDoctor.experience}
                      onChange={(e) =>
                        setEditDoctor({
                          ...editDoctor,
                          experience: e.target.value,
                        })
                      }
                      className="edit-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Profile Image</label>
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        id="file-upload"
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="file-upload"
                        className="file-upload-label"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                        </svg>
                        Choose Image
                      </label>
                      {file && <span className="file-name">{file.name}</span>}
                    </div>
                  </div>

                  {file && (
                    <div className="image-preview">
                      <img src={URL.createObjectURL(file)} alt="preview" />
                    </div>
                  )}

                  <div className="edit-actions">
                    <button
                      className="btn-cancel"
                      onClick={() => {
                        setEditDoctor(null);
                        setFile(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button className="btn-save" onClick={handleUpdate}>
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="doctor-imageee">
                    {doc.profileImage ? (
                      <img src={doc.profileImage} alt={doc.name} />
                    ) : (
                      <div className="doctor-avatar-placeholder">
                        {doc.name?.charAt(0) || "D"}
                      </div>
                    )}
                    <div className="doctor-specialization-badge">
                      {doc.specialization || "General"}
                    </div>
                  </div>

                  <div className="doctor-info">
                    <h3 className="doctor-name">{doc.name}</h3>
                    <p className="doctor-email">{doc.email}</p>

                    <div className="doctor-details">
                      <div className="detail-item">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>{doc.specialization || "Not specified"}</span>
                      </div>
                      <div className="detail-item">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{doc.experience || 0} years experience</span>
                      </div>
                      <div className="detail-item">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H9v8H5a2 2 0 0 1-2-2z"></path>
                        </svg>
                        <span>{doc.hospital?.name || "Not assigned"}</span>
                      </div>
                    </div>

                    <div className="doctor-actions">
                      <button
                        className="action-btn edit"
                        onClick={() => setEditDoctor(doc)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                          <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                        </svg>
                        Edit
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(doc._id)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllDoctors;
