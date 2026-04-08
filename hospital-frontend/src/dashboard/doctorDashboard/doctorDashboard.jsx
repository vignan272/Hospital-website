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
  const [activeMenu, setActiveMenu] = useState("appointments");
  const [showPatientsMenu, setShowPatientsMenu] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    setAuth({ isLoggedIn: false, role: null });
    navigate("/patient-login");
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/doctor/appointments",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setAppointments(res.data);

      setStats({
        total: res.data.length,
        accepted: res.data.filter((a) =>
          ["accepted", "confirmed"].includes(a.finalStatus?.toLowerCase()),
        ).length,
        rejected: res.data.filter(
          (a) => a.finalStatus?.toLowerCase() === "rejected",
        ).length,
        pending: res.data.filter(
          (a) => a.finalStatus?.toLowerCase() === "pending",
        ).length,
      });
    } catch {
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
      await axios.put(
        `http://localhost:8080/api/doctor/accept/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleSuccess("Accepted");
      fetchAppointments();
    } catch {
      handleError("Error");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/doctor/reject/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      handleSuccess("Rejected");
      fetchAppointments();
    } catch {
      handleError("Error");
    }
  };

  const normalizeStatus = (status) => {
    if (!status) return "";
    const s = status.toLowerCase();
    if (s === "confirmed") return "accepted";
    return s;
  };

  const filteredAppointments =
    activeFilter === "all"
      ? appointments
      : appointments.filter(
          (a) => normalizeStatus(a.finalStatus) === activeFilter,
        );

  const getStatusClass = (status) => {
    const s = status?.toLowerCase();

    if (s === "accepted" || s === "confirmed")
      return "status-accepted_doctorDashboard";

    if (s === "rejected") return "status-rejected_doctorDashboard";

    return "status-pending_doctorDashboard";
  };

  return (
    <div className="main-container_doctorDashboard">
      {/* SIDEBAR */}
      <div className="sidebar_doctorDashboard">
        <h2>Dashboard</h2>
        <hr />

        <button
          className={`menu-btn ${activeMenu === "appointments" ? "active" : ""}`}
          onClick={() => {
            setActiveMenu("appointments");
            setShowPatientsMenu(false);
          }}
        >
          📅 My Appointments
        </button>

        <button
          className="menu-btn"
          onClick={() => setShowPatientsMenu(!showPatientsMenu)}
        >
          🩺 Patients
        </button>

        {showPatientsMenu && (
          <div className="submenu">
            <button
              onClick={() => setActiveMenu("view")}
              className="submenu-btn"
            >
              👁 View
            </button>
            <button
              onClick={() => setActiveMenu("uploads")}
              className="submenu-btn"
            >
              📤 Uploads
            </button>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="content_doctorDashboard">
        {/* HEADER */}
        <div className="top-header_doctorDashboard">
          <div className="doctor-profile">
            <div className="doctor-avatar"></div>
            <div className="doctor-details">
              <h3>Welcome Doctor ,</h3>
              <h2 className="doctor-name">Swaroop 🩺 </h2>
            </div>
          </div>

          <button
            className="logout-btn-header_doctorDashboard"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* APPOINTMENTS */}
        {activeMenu === "appointments" && (
          <>
            {/* STATS */}
            <div className="stats-container_doctorDashboard">
              <div className="stat-card_doctorDashboard stat-total_doctorDashboard">
                <h3>{stats.total}</h3>
                <p>Total</p>
              </div>
              <div className="stat-card_doctorDashboard stat-pending_doctorDashboard">
                <h3>{stats.pending}</h3>
                <p>Pending</p>
              </div>
              <div className="stat-card_doctorDashboard stat-accepted_doctorDashboard">
                <h3>{stats.accepted}</h3>
                <p>Accepted</p>
              </div>
              <div className="stat-card_doctorDashboard stat-rejected_doctorDashboard">
                <h3>{stats.rejected}</h3>
                <p>Rejected</p>
              </div>
            </div>

            {/* FILTER */}
            <div className="filter-tabs_doctorDashboard">
              {["all", "pending", "accepted", "rejected"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`filter-tab_doctorDashboard ${
                    activeFilter === f ? "active_doctorDashboard" : ""
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* CARDS */}
            {filteredAppointments.length === 0 ? (
              <div className="empty-state_doctorDashboard">
                <div className="empty-emoji_doctorDashboard">
                  {activeFilter === "pending" && ""}
                  {activeFilter === "accepted" && ""}
                  {activeFilter === "rejected" && ""}
                  {activeFilter === "all" && ""}
                </div>

                <h3>
                  {activeFilter === "pending" && "No Pending Slots"}
                  {activeFilter === "accepted" && "No Accepted Appointments"}
                  {activeFilter === "rejected" && "No Rejected Appointments"}
                  {activeFilter === "all" && "No Appointments Found"}
                </h3>

                <p>You're all caught up </p>
              </div>
            ) : (
              <div className="appointments-grid_doctorDashboard">
                {filteredAppointments.map((app) => (
                  <div
                    key={app._id}
                    className="appointment-card_doctorDashboard"
                  >
                    {/* HEADER */}
                    <div className="card-header_doctorDashboard">
                      <div className="patient-info_doctorDashboard">
                        <div className="patient-avatar_doctorDashboard">
                          {app.patient?.name?.charAt(0)}
                        </div>
                        <div>
                          <h3>{app.patient?.name}</h3>
                          <p>{app.patient?.email}</p>
                        </div>
                      </div>

                      <span
                        className={`status-badge_doctorDashboard ${getStatusClass(app.finalStatus)}`}
                      >
                        {app.finalStatus === "Confirmed"
                          ? "Accepted"
                          : app.finalStatus}
                      </span>
                    </div>

                    {/* BODY */}
                    <div className="card-body_doctorDashboard">
                      <div className="info-grid_doctorDashboard">
                        <div>
                          <p className="label">🏥 Hospital</p>
                          <p className="value">{app.hospital?.name}</p>
                        </div>
                        <div>
                          <p className="label">📝 Description</p>
                          <p className="value">{app.description}</p>
                        </div>
                        <div>
                          <p className="label">📅 Date</p>
                          <p className="value">
                            {new Date(app.appointmentDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="label">⏰ Time</p>
                          <p className="value">{app.appointmentTime}</p>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    {app.finalStatus === "Pending" && (
                      <div className="card-actions_doctorDashboard">
                        <button
                          className="accept-btn_doctorDashboard"
                          onClick={() => handleAccept(app._id)}
                        >
                          ✔ Accept
                        </button>
                        <button
                          className="reject-btn_doctorDashboard"
                          onClick={() => handleReject(app._id)}
                        >
                          ✖ Reject
                        </button>
                      </div>
                    )}

                    {/* FOOTER */}
                    {app.finalStatus !== "Pending" && (
                      <div
                        className={`status-footer_doctorDashboard ${
                          ["Accepted", "Confirmed"].includes(app.finalStatus)
                            ? "accepted-footer_doctorDashboard"
                            : "rejected-footer_doctorDashboard"
                        }`}
                      >
                        {["Accepted", "Confirmed"].includes(app.finalStatus)
                          ? "✔ Appointment Confirmed"
                          : "✖ Appointment Declined"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeMenu === "view" && <h2>Patient View</h2>}
        {activeMenu === "uploads" && <h2>Upload Reports</h2>}
      </div>
    </div>
  );
}

export default DoctorDashboard;
