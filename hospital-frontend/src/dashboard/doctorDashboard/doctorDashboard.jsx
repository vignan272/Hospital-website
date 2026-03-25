import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils";
import { useNavigate } from "react-router-dom";
import "./doctorDashboard.css";

function DoctorDashboard({ setAuth }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
  });
  const [activeFilter, setActiveFilter] = useState("all");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth({
      isLoggedIn: false,
      role: null,
    });
    navigate("/patient-login", { replace: true });
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/doctor/appointments",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setAppointments(res.data);

      // Calculate stats
      const statsData = {
        total: res.data.length,
        accepted: res.data.filter((app) => app.finalStatus === "Accepted")
          .length,
        rejected: res.data.filter((app) => app.finalStatus === "Rejected")
          .length,
        pending: res.data.filter((app) => app.finalStatus === "Pending").length,
      };
      setStats(statsData);
    } catch (err) {
      handleError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAccept = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/doctor/accept/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleSuccess(res.data.message || "Appointment Accepted");
      fetchAppointments();
    } catch (err) {
      handleError("Accept Failed");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/doctor/reject/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleSuccess(res.data.message || "Appointment Rejected");
      fetchAppointments();
    } catch (err) {
      handleError("Reject Failed");
    }
  };

  const getFilteredAppointments = () => {
    if (activeFilter === "all") return appointments;
    return appointments.filter((app) => app.finalStatus === activeFilter);
  };

  const getStatusClass = (status) => {
    if (status === "Accepted") return "status-accepted_doctorDashboard";
    if (status === "Rejected") return "status-rejected_doctorDashboard";
    return "status-pending_doctorDashboard";
  };

  const filteredAppointments = getFilteredAppointments();

  return (
    <div className="doctor-dashboard_doctorDashboard">
      {/* Top Navigation Bar */}
      <nav className="navbar_doctorDashboard">
        <div className="navbar-brand_doctorDashboard">
          <div className="logo_doctorDashboard">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>Ecstasy</span>
          </div>
          <h2>Doctor Dashboard</h2>
        </div>
        <div className="navbar-actions_doctorDashboard">
          <button onClick={handleLogout} className="logout-btn_doctorDashboard">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l4-4-4-4M12 3h8v8" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* Stats Cards */}
      <div className="stats-container_doctorDashboard">
        <div className="stat-card_doctorDashboard stat-total_doctorDashboard">
          <div className="stat-icon_doctorDashboard">📋</div>
          <div className="stat-info_doctorDashboard">
            <h3>{stats.total}</h3>
            <p>Total Appointments</p>
          </div>
        </div>
        <div className="stat-card_doctorDashboard stat-pending_doctorDashboard">
          <div className="stat-icon_doctorDashboard">⏳</div>
          <div className="stat-info_doctorDashboard">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card_doctorDashboard stat-accepted_doctorDashboard">
          <div className="stat-icon_doctorDashboard">✅</div>
          <div className="stat-info_doctorDashboard">
            <h3>{stats.accepted}</h3>
            <p>Accepted</p>
          </div>
        </div>
        <div className="stat-card_doctorDashboard stat-rejected_doctorDashboard">
          <div className="stat-icon_doctorDashboard">❌</div>
          <div className="stat-info_doctorDashboard">
            <h3>{stats.rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs_doctorDashboard">
        <button
          className={`filter-tab_doctorDashboard ${activeFilter === "all" ? "active_doctorDashboard" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All
          <span className="filter-count_doctorDashboard">{stats.total}</span>
        </button>
        <button
          className={`filter-tab_doctorDashboard ${activeFilter === "Pending" ? "active_doctorDashboard" : ""}`}
          onClick={() => setActiveFilter("Pending")}
        >
          Pending
          <span className="filter-count_doctorDashboard">{stats.pending}</span>
        </button>
        <button
          className={`filter-tab_doctorDashboard ${activeFilter === "Accepted" ? "active_doctorDashboard" : ""}`}
          onClick={() => setActiveFilter("Accepted")}
        >
          Accepted
          <span className="filter-count_doctorDashboard">{stats.accepted}</span>
        </button>
        <button
          className={`filter-tab_doctorDashboard ${activeFilter === "Rejected" ? "active_doctorDashboard" : ""}`}
          onClick={() => setActiveFilter("Rejected")}
        >
          Rejected
          <span className="filter-count_doctorDashboard">{stats.rejected}</span>
        </button>
      </div>

      {/* Appointments Grid */}
      <div className="appointments-container_doctorDashboard">
        {loading ? (
          <div className="loading-state_doctorDashboard">
            <div className="spinner_doctorDashboard"></div>
            <p>Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="empty-state_doctorDashboard">
            <div className="empty-icon_doctorDashboard">📭</div>
            <h3>No Appointments Found</h3>
            <p>When patients book appointments, they will appear here</p>
          </div>
        ) : (
          <div className="appointments-grid_doctorDashboard">
            {filteredAppointments.map((app) => (
              <div key={app._id} className="appointment-card_doctorDashboard">
                {/* Card Header */}
                <div className="card-header_doctorDashboard">
                  <div className="patient-info_doctorDashboard">
                    <div className="patient-avatar_doctorDashboard">
                      {app.patient?.name?.charAt(0) || "P"}
                    </div>
                    <div>
                      <h3 className="patient-name_doctorDashboard">
                        {app.patient?.name || "Unknown Patient"}
                      </h3>
                      <p className="patient-email_doctorDashboard">
                        {app.patient?.email || "No email"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`status-badge_doctorDashboard ${getStatusClass(app.finalStatus)}`}
                  >
                    {app.finalStatus}
                  </span>
                </div>

                {/* Card Body */}
                <div className="card-body_doctorDashboard">
                  <div className="info-row_doctorDashboard">
                    <span className="info-icon_doctorDashboard">🏥</span>
                    <div>
                      <strong>Hospital</strong>
                      <p>{app.hospital?.name || "N/A"}</p>
                    </div>
                  </div>

                  <div className="info-row_doctorDashboard">
                    <span className="info-icon_doctorDashboard">📝</span>
                    <div>
                      <strong>Description</strong>
                      <p>{app.description || "No description provided"}</p>
                    </div>
                  </div>

                  <div className="info-row_doctorDashboard">
                    <span className="info-icon_doctorDashboard">📅</span>
                    <div>
                      <strong>Date & Time</strong>
                      <p>
                        {new Date(app.appointmentDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}{" "}
                        • {app.appointmentTime}
                      </p>
                    </div>
                  </div>

                  {app.description && (
                    <div className="info-row_doctorDashboard">
                      <span className="info-icon_doctorDashboard">💬</span>
                      <div>
                        <strong>Additional Notes</strong>
                        <p className="description-text_doctorDashboard">
                          {app.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                {app.adminStatus === "Accepted" &&
                  app.doctorStatus === "Pending" && (
                    <div className="card-actions_doctorDashboard">
                      <button
                        className="accept-btn_doctorDashboard"
                        onClick={() => handleAccept(app._id)}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Accept
                      </button>
                      <button
                        className="reject-btn_doctorDashboard"
                        onClick={() => handleReject(app._id)}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        Reject
                      </button>
                    </div>
                  )}

                {/* Status Indicator for Processed Appointments */}
                {app.finalStatus !== "Pending" && (
                  <div
                    className={`status-footer_doctorDashboard ${app.finalStatus === "Accepted" ? "accepted-footer_doctorDashboard" : "rejected-footer_doctorDashboard"}`}
                  >
                    {app.finalStatus === "Accepted" ? (
                      <span>✓ Appointment confirmed</span>
                    ) : (
                      <span>✗ Appointment declined</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;
