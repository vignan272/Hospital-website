import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils";
import { useNavigate } from "react-router-dom";
import AppointmentsView from "./AppointmentsView";
import OpReviewsView from "./OpReviewsView";
import PatientsView from "./PatientsView";
import LeaveSlotBook from "./LeaveSlotBook";
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
  // ✅ Updated: Added "leave" as possible menu option
  const [activeMenu, setActiveMenu] = useState("appointments");
  const [ops, setOps] = useState([]);
  const [loadingOps, setLoadingOps] = useState(false);
  const [notes, setNotes] = useState({});
  const [selectedOp, setSelectedOp] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const doctor = JSON.parse(localStorage.getItem("doctor"));

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

  const fetchOps = async () => {
    setLoadingOps(true);
    try {
      const res = await axios.get("http://localhost:8080/api/doctor/ops", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOps(res.data.ops);
    } catch {
      handleError("Failed to load OPs");
    } finally {
      setLoadingOps(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchOps();
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

  const handleOpDecision = async (opId, decision) => {
    try {
      await axios.put(
        `http://localhost:8080/api/doctor/op-decision/${opId}`,
        {
          decision,
          doctorNotes: notes[opId] || "",
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      handleSuccess(`OP ${decision}`);
      fetchOps();
      fetchAppointments();
    } catch {
      handleError("Failed to update OP");
    }
  };

  // ✅ Updated: Added "leave" menu item
  const menuItems = [
    { id: "appointments", label: "My Appointments", icon: "📅" },
    { id: "ops", label: "OP Review", icon: "🩺" },
    { id: "patients", label: "Patients", icon: "👥" },
    { id: "leave", label: "Leave / Slot", icon: "📆" },
  ];

  return (
    <div
      className={`main-container_Dashboard ${
        isSidebarCollapsed ? "sidebar-collapsed_Dashboard" : ""
      }`}
    >
      {/* SIDEBAR */}
      <div
        className={`sidebar_Dashboard ${
          isSidebarCollapsed ? "collapsed_Dashboard" : ""
        }`}
      >
        <div className="sidebar-header_Dashboard">
          {!isSidebarCollapsed && <h2 className="logo_Dashboard">MediFlow</h2>}
          <button
            className="collapse-btn_Dashboard"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? "→" : "←"}
          </button>
        </div>
        <hr className="sidebar-divider_Dashboard" />

        <nav className="sidebar-nav_Dashboard">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-btn_Dashboard ${
                activeMenu === item.id ? "active_Dashboard" : ""
              }`}
              onClick={() => {
                setActiveMenu(item.id);
              }}
            >
              <span className="menu-icon_Dashboard">{item.icon}</span>
              {!isSidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer_Dashboard">
          <button
            className="logout-btn-sidebar_Dashboard"
            onClick={handleLogout}
          >
            <span className="menu-icon_Dashboard">🚪</span>
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="content_Dashboard">
        {/* HEADER */}
        <div className="top-header_Dashboard animate-fadeInDown_Dashboard">
          <div className="doctor-profile_Dashboard">
            <div className="doctor-avatar-wrapper_Dashboard">
              <img
                src={
                  doctor?.profileImage ||
                  "https://ui-avatars.com/api/?background=0D72A1&color=fff&name=" +
                    (doctor?.name || "Doctor")
                }
                alt="doctor"
                className="doctor-avatar_Dashboard"
              />
              <div className="avatar-status_Dashboard online_Dashboard"></div>
            </div>

            <div className="doctor-details_Dashboard">
              <h3 className="welcome-text_Dashboard">Welcome back,</h3>
              <h2 className="doctor-name_Dashboard">
                {doctor?.name || "Doctor"} 🩺
              </h2>
              <div className="doctor-meta_Dashboard">
                <span className="specialization-badge_Dashboard">
                  {doctor?.specialization}
                </span>
                <span className="hospital-name_Dashboard">
                  🏥 {doctor?.hospital?.name}
                </span>
              </div>
            </div>
          </div>

          <div className="header-actions_Dashboard">
            <div className="search-bar_Dashboard">
              <span className="search-icon_Dashboard">🔍</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input_Dashboard"
              />
            </div>
            <button
              className="logout-btn-header_Dashboard"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* APPOINTMENTS VIEW */}
        {activeMenu === "appointments" && (
          <AppointmentsView
            appointments={appointments}
            loading={loading}
            stats={stats}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            searchTerm={searchTerm}
            handleAccept={handleAccept}
            handleReject={handleReject}
            getOpByAppointment={(id) =>
              ops.find((op) => op.appointment?._id === id)
            }
            setSelectedOp={setSelectedOp}
          />
        )}

        {/* OP REVIEWS VIEW */}
        {activeMenu === "ops" && (
          <OpReviewsView
            ops={ops}
            loadingOps={loadingOps}
            notes={notes}
            setNotes={setNotes}
            handleOpDecision={handleOpDecision}
            setSelectedOp={setSelectedOp}
          />
        )}

        {/* ✅ LEAVE/SLOT VIEW */}
        {activeMenu === "leave" && <LeaveSlotBook />}

        {/* PATIENTS VIEW WITH UPDATED BUTTON */}
        {activeMenu === "patients" && (
          <>
            <PatientsView searchTerm={searchTerm} token={token} />

            {/* ✅ UPDATED BUTTON - Now uses setActiveMenu instead of navigate */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                className="leave-slot-btn"
                onClick={() => setActiveMenu("leave")}
              >
                ➕ Leave / Slot Book
              </button>
            </div>
          </>
        )}
      </div>

      {/* OP MODAL */}
      {selectedOp && (
        <div
          className="op-modal-overlay_Dashboard"
          onClick={() => setSelectedOp(null)}
        >
          <div
            className="op-modal_Dashboard"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="op-modal-header_Dashboard">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <h2>🩺 OP Review</h2>
                <span
                  className={`status-badge_Dashboard ${
                    selectedOp.opStatus === "Reviewed"
                      ? "status-accepted_Dashboard"
                      : "status-pending_Dashboard"
                  }`}
                >
                  {selectedOp.opStatus}
                </span>
              </div>
              <button
                className="modal-close_Dashboard"
                onClick={() => setSelectedOp(null)}
              >
                ✕
              </button>
            </div>

            <div className="op-modal-body_Dashboard">
              <div className="modal-patient-info_Dashboard">
                <div className="modal-avatar_Dashboard">
                  {selectedOp.patient?.name?.charAt(0)}
                </div>
                <div>
                  <h3>{selectedOp.patient?.name}</h3>
                  <p>{selectedOp.patient?.email}</p>
                </div>
              </div>

              <div className="modal-details_Dashboard">
                <div className="info-grid_Dashboard">
                  <div className="info-item_Dashboard">
                    <span>📅</span>
                    <div>
                      <p className="info-label_Dashboard">Date</p>
                      <p className="info-value_Dashboard">
                        {new Date(
                          selectedOp.appointment?.appointmentDate,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="info-item_Dashboard">
                    <span>⏰</span>
                    <div>
                      <p className="info-label_Dashboard">Time</p>
                      <p className="info-value_Dashboard">
                        {selectedOp.appointment?.appointmentTime}
                      </p>
                    </div>
                  </div>

                  <div className="info-item_Dashboard">
                    <span>⚖️</span>
                    <div>
                      <p className="info-label_Dashboard">Weight</p>
                      <p className="info-value_Dashboard">
                        {selectedOp.weight} kg
                      </p>
                    </div>
                  </div>

                  <div className="info-item_Dashboard">
                    <span>🩺</span>
                    <div>
                      <p className="info-label_Dashboard">Checkup Type</p>
                      <p className="info-value_Dashboard">
                        {selectedOp.healthCheckupType}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="medical-info_Dashboard">
                  <div className="medical-row_Dashboard">
                    <span>🤒</span>
                    <div>
                      <p className="info-label_Dashboard">Symptoms</p>
                      <p className="info-value_Dashboard">
                        {selectedOp.symptoms}
                      </p>
                    </div>
                  </div>

                  <div className="medical-row_Dashboard">
                    <span>📜</span>
                    <div>
                      <p className="info-label_Dashboard">Medical History</p>
                      <p className="info-value_Dashboard">
                        {selectedOp.medicalHistory}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedOp.uploadedReports?.length > 0 && (
                  <a
                    href={selectedOp.uploadedReports[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="report-link_Dashboard"
                    style={{ display: "inline-block", marginTop: "16px" }}
                  >
                    📄 View Report
                  </a>
                )}

                {selectedOp.opStatus !== "Reviewed" && (
                  <textarea
                    className="notes-textarea_Dashboard"
                    placeholder="Enter doctor notes..."
                    value={notes[selectedOp._id] || ""}
                    onChange={(e) =>
                      setNotes({ ...notes, [selectedOp._id]: e.target.value })
                    }
                    style={{ marginTop: "16px" }}
                  />
                )}
              </div>
            </div>

            {selectedOp.opStatus !== "Reviewed" && (
              <div className="op-modal-footer_Dashboard">
                <button
                  className="modal-btn_Dashboard modal-confirm_Dashboard"
                  onClick={() => {
                    handleOpDecision(selectedOp._id, "Confirmed");
                    setSelectedOp(null);
                  }}
                >
                  ✔ Confirm
                </button>
                <button
                  className="modal-btn_Dashboard modal-reject_Dashboard"
                  onClick={() => {
                    handleOpDecision(selectedOp._id, "Rejected");
                    setSelectedOp(null);
                  }}
                >
                  ✖ Reject
                </button>
              </div>
            )}

            {selectedOp.opStatus === "Reviewed" && (
              <div
                className="status-footer_Dashboard accepted-footer_Dashboard"
                style={{ margin: "16px", borderRadius: "12px" }}
              >
                📝 {selectedOp.doctorNotes || "No notes provided"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;
