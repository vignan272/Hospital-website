// Allappointment.jsx - Enhanced UI
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Allappointment.css";

function AllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/admin/appointments",
        config,
      );
      setAppointments(res.data);
    } catch (err) {
      alert("Error fetching appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/accept/${id}`,
        {},
        config,
      );
      fetchAppointments();
    } catch (err) {
      alert("Error accepting appointment");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/reject/${id}`,
        {},
        config,
      );
      fetchAppointments();
    } catch (err) {
      alert("Error rejecting appointment");
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      Accepted: { class: "badge-accepted", icon: "✓" },
      Rejected: { class: "badge-rejected", icon: "✗" },
      Pending: { class: "badge-pending", icon: "⏳" },
    };
    const badge = badges[status] || badges.Pending;
    return (
      <span className={`status-badge ${badge.class}`}>
        {badge.icon} {status}
      </span>
    );
  };

  const filteredAppointments = appointments.filter((app) => {
    if (filter === "all") return true;
    return app.adminStatus?.toLowerCase() === filter.toLowerCase();
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.adminStatus === "Pending").length,
    accepted: appointments.filter((a) => a.adminStatus === "Accepted").length,
    rejected: appointments.filter((a) => a.adminStatus === "Rejected").length,
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="appointments-container">
      <div className="page-header">
        <h1 className="page-title">Appointments</h1>
        <p className="page-subtitle">
          Manage and review all patient appointments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Appointments</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pending}</h3>
            <p>Pending Review</p>
          </div>
        </div>
        <div className="stat-card accepted">
          <div className="stat-icon">✓</div>
          <div className="stat-info">
            <h3>{stats.accepted}</h3>
            <p>Accepted</p>
          </div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-icon">✗</div>
          <div className="stat-info">
            <h3>{stats.rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-tab ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`filter-tab ${filter === "accepted" ? "active" : ""}`}
          onClick={() => setFilter("accepted")}
        >
          Accepted
        </button>
        <button
          className={`filter-tab ${filter === "rejected" ? "active" : ""}`}
          onClick={() => setFilter("rejected")}
        >
          Rejected
        </button>
      </div>

      {/* Appointments Grid */}
      {filteredAppointments.length === 0 ? (
        <div className="empty-state">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <h3>No appointments found</h3>
          <p>No appointments match the current filter</p>
        </div>
      ) : (
        <div className="appointments-grid">
          {filteredAppointments.map((a, index) => (
            <div
              key={a._id}
              className="appointment-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="card-header">
                <div className="patient-info">
                  <div className="patient-avatar">
                    {a.patient?.name?.charAt(0) || "P"}
                  </div>
                  <div>
                    <h3 className="patient-name">
                      {a.patient?.name || "Unknown Patient"}
                    </h3>
                    <p className="doctor-name">
                      Dr. {a.doctor?.name || "Unassigned"}
                    </p>
                  </div>
                </div>
                {getStatusBadge(a.adminStatus)}
              </div>

              <div className="card-body">
                <div className="info-row">
                  <span className="info-label">🏥 Hospital</span>
                  <span className="info-value">
                    {a.hospital?.name || "N/A"}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">📝 Description</span>
                  <span className="info-value">
                    {a.description || "No description provided"}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">📅 Date & Time</span>
                  <span className="info-value">
                    {new Date(a.appointmentDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    {" • "}
                    {a.appointmentTime}
                  </span>
                </div>
              </div>

              {a.adminStatus === "Pending" && (
                <div className="card-actions">
                  <button
                    className="btn-accept"
                    onClick={() => handleAccept(a._id)}
                  >
                    <span>✓</span> Accept Appointment
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => handleReject(a._id)}
                  >
                    <span>✗</span> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllAppointments;
