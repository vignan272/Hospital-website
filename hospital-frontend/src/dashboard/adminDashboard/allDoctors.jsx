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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    hospitalId: "",
  });

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

  const handleAddDoctor = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newDoctor.name);
      formData.append("email", newDoctor.email);
      formData.append("password", newDoctor.password);
      formData.append("specialization", newDoctor.specialization);
      formData.append("experience", newDoctor.experience);
      if (newDoctor.hospitalId) {
        formData.append("hospital", newDoctor.hospitalId);
      }
      if (file) {
        formData.append("profileImage", file);
      }

      await axios.post(
        "http://localhost:8080/api/admin/add-doctor",
        formData,
        config,
      );

      setShowAddModal(false);
      setNewDoctor({
        name: "",
        email: "",
        password: "",
        specialization: "",
        experience: "",
        hospitalId: "",
      });
      setFile(null);
      fetchDoctors();
    } catch (err) {
      alert("Error adding doctor");
    }
  };

  const specializations = [
    "all",
    ...new Set(doctors.map((doc) => doc.specialization).filter(Boolean)),
  ];

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
      doctors.length > 0
        ? (
            doctors.reduce((sum, doc) => sum + (doc.experience || 0), 0) /
            doctors.length
          ).toFixed(1)
        : 0,
  };

  if (loading) {
    return (
      <div className="allDoctors_loadingContainer">
        <div className="allDoctors_spinner"></div>
        <p className="allDoctors_loadingText">Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="allDoctors_container">
      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="allDoctors_modalOverlay">
          <div className="allDoctors_modal">
            <div className="allDoctors_modalHeader">
              <h2 className="allDoctors_modalTitle">Add New Doctor</h2>
              <button
                className="allDoctors_modalClose"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div className="allDoctors_modalBody">
              <div className="allDoctors_formGroup">
                <label className="allDoctors_formLabel">Full Name *</label>
                <input
                  type="text"
                  className="allDoctors_formInput"
                  value={newDoctor.name}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, name: e.target.value })
                  }
                  placeholder="Enter doctor's full name"
                />
              </div>
              <div className="allDoctors_formGroup">
                <label className="allDoctors_formLabel">Email Address *</label>
                <input
                  type="email"
                  className="allDoctors_formInput"
                  value={newDoctor.email}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, email: e.target.value })
                  }
                  placeholder="doctor@example.com"
                />
              </div>
              <div className="allDoctors_formGroup">
                <label className="allDoctors_formLabel">Password *</label>
                <input
                  type="password"
                  className="allDoctors_formInput"
                  value={newDoctor.password}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, password: e.target.value })
                  }
                  placeholder="Create a password"
                />
              </div>
              <div className="allDoctors_formGroup">
                <label className="allDoctors_formLabel">Specialization *</label>
                <input
                  type="text"
                  className="allDoctors_formInput"
                  value={newDoctor.specialization}
                  onChange={(e) =>
                    setNewDoctor({
                      ...newDoctor,
                      specialization: e.target.value,
                    })
                  }
                  placeholder="e.g., Cardiology, Neurology"
                />
              </div>
              <div className="allDoctors_formGroup">
                <label className="allDoctors_formLabel">
                  Experience (years) *
                </label>
                <input
                  type="number"
                  className="allDoctors_formInput"
                  value={newDoctor.experience}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, experience: e.target.value })
                  }
                  placeholder="Years of experience"
                />
              </div>
              <div className="allDoctors_formGroup">
                <label className="allDoctors_formLabel">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="allDoctors_fileInput"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {file && <p className="allDoctors_fileName">{file.name}</p>}
              </div>
            </div>
            <div className="allDoctors_modalFooter">
              <button
                className="allDoctors_btn allDoctors_btnSecondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="allDoctors_btn allDoctors_btnPrimary"
                onClick={handleAddDoctor}
              >
                Add Doctor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="allDoctors_header">
        <div className="allDoctors_headerLeft">
          <h1 className="allDoctors_title">Doctors Directory</h1>
          <p className="allDoctors_subtitle">
            Manage and update doctor profiles
          </p>
        </div>
        <button
          className="allDoctors_addButton"
          onClick={() => setShowAddModal(true)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add New Doctor
        </button>
      </div>

      {/* Stats Cards */}
      <div className="allDoctors_statsGrid">
        <div className="allDoctors_statCard">
          <div className="allDoctors_statIcon allDoctors_statIconBlue">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="allDoctors_statInfo">
            <h3 className="allDoctors_statValue">{stats.total}</h3>
            <p className="allDoctors_statLabel">Total Doctors</p>
          </div>
        </div>
        <div className="allDoctors_statCard">
          <div className="allDoctors_statIcon allDoctors_statIconGreen">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 12h-4l-3 9-4-18-3 9H2"></path>
            </svg>
          </div>
          <div className="allDoctors_statInfo">
            <h3 className="allDoctors_statValue">{stats.specializations}</h3>
            <p className="allDoctors_statLabel">Specializations</p>
          </div>
        </div>
        <div className="allDoctors_statCard">
          <div className="allDoctors_statIcon allDoctors_statIconOrange">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div className="allDoctors_statInfo">
            <h3 className="allDoctors_statValue">{stats.avgExperience}</h3>
            <p className="allDoctors_statLabel">Avg. Experience (yrs)</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="allDoctors_searchBar">
        <div className="allDoctors_searchWrapper">
          <svg
            className="allDoctors_searchIcon"
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
            className="allDoctors_searchInput"
          />
        </div>
        <div className="allDoctors_filterWrapper">
          <label className="allDoctors_filterLabel">Specialization:</label>
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="allDoctors_filterSelect"
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
        <div className="allDoctors_emptyState">
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
          <h3 className="allDoctors_emptyTitle">No doctors found</h3>
          <p className="allDoctors_emptyText">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="allDoctors_grid">
          {filteredDoctors.map((doc, index) => (
            <div
              key={doc._id}
              className="allDoctors_card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {editDoctor?._id === doc._id ? (
                // Edit Mode
                <div className="allDoctors_editForm">
                  <div className="allDoctors_editHeader">
                    <h3 className="allDoctors_editTitle">
                      Edit Doctor Profile
                    </h3>
                    <button
                      className="allDoctors_editClose"
                      onClick={() => {
                        setEditDoctor(null);
                        setFile(null);
                      }}
                    >
                      ×
                    </button>
                  </div>

                  <div className="allDoctors_formGroup">
                    <label className="allDoctors_formLabel">Full Name</label>
                    <input
                      value={editDoctor.name}
                      onChange={(e) =>
                        setEditDoctor({ ...editDoctor, name: e.target.value })
                      }
                      className="allDoctors_formInput"
                    />
                  </div>

                  <div className="allDoctors_formGroup">
                    <label className="allDoctors_formLabel">
                      Email Address
                    </label>
                    <input
                      value={editDoctor.email}
                      onChange={(e) =>
                        setEditDoctor({ ...editDoctor, email: e.target.value })
                      }
                      className="allDoctors_formInput"
                    />
                  </div>

                  <div className="allDoctors_formGroup">
                    <label className="allDoctors_formLabel">
                      New Password (optional)
                    </label>
                    <input
                      type="password"
                      placeholder="Leave blank to keep current"
                      onChange={(e) =>
                        setEditDoctor({
                          ...editDoctor,
                          password: e.target.value,
                        })
                      }
                      className="allDoctors_formInput"
                    />
                  </div>

                  <div className="allDoctors_formGroup">
                    <label className="allDoctors_formLabel">
                      Specialization
                    </label>
                    <input
                      value={editDoctor.specialization}
                      onChange={(e) =>
                        setEditDoctor({
                          ...editDoctor,
                          specialization: e.target.value,
                        })
                      }
                      className="allDoctors_formInput"
                    />
                  </div>

                  <div className="allDoctors_formGroup">
                    <label className="allDoctors_formLabel">
                      Experience (years)
                    </label>
                    <input
                      type="number"
                      value={editDoctor.experience}
                      onChange={(e) =>
                        setEditDoctor({
                          ...editDoctor,
                          experience: e.target.value,
                        })
                      }
                      className="allDoctors_formInput"
                    />
                  </div>

                  <div className="allDoctors_formGroup">
                    <label className="allDoctors_formLabel">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="allDoctors_fileInput"
                    />
                    {file && (
                      <div className="allDoctors_imagePreview">
                        <img src={URL.createObjectURL(file)} alt="preview" />
                      </div>
                    )}
                  </div>

                  <div className="allDoctors_editActions">
                    <button
                      className="allDoctors_btn allDoctors_btnSecondary"
                      onClick={() => {
                        setEditDoctor(null);
                        setFile(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="allDoctors_btn allDoctors_btnPrimary"
                      onClick={handleUpdate}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode - Modern Card Design
                <div className="allDoctors_cardInner">
                  <div className="allDoctors_cardImageWrapper">
                    {doc.profileImage ? (
                      <img
                        src={doc.profileImage}
                        alt={doc.name}
                        className="allDoctors_cardImage"
                      />
                    ) : (
                      <div className="allDoctors_avatarPlaceholder">
                        {doc.name?.charAt(0) || "D"}
                      </div>
                    )}
                  </div>

                  <div className="allDoctors_cardInfo">
                    <h3 className="allDoctors_doctorName">{doc.name}</h3>

                    {/* Specialization badge */}
                    <span className="allDoctors_specialBadge">
                      {doc.specialization || "General Physician"}
                    </span>

                    {/* Hospital */}
                    <div className="allDoctors_infoRow">
                      🏥 {doc.hospital?.name || "Yashoda"}
                    </div>

                    {/* Location */}
                    <div className="allDoctors_infoRow">
                      📍 {doc.location || "Downtown"}
                    </div>

                    {/* Experience */}
                    <div className="allDoctors_experience">
                      ⭐ {doc.experience || 0} years experience
                    </div>

                    {/* Buttons */}
                    <div className="allDoctors_cardActions">
                      <button
                        className="allDoctors_actionBtn allDoctors_actionBtnEdit"
                        onClick={() => setEditDoctor(doc)}
                      >
                        Edit
                      </button>

                      <button
                        className="allDoctors_actionBtn allDoctors_actionBtnDelete"
                        onClick={() => handleDelete(doc._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllDoctors;
