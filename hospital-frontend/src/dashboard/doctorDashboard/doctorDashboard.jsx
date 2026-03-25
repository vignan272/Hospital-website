import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils";
import { useNavigate } from "react-router-dom";

function DoctorDashboard({ setAuth }) {
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ FIXED LOGOUT
  const handleLogout = () => {
    // clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // update React auth state (VERY IMPORTANT)
    setAuth({
      isLoggedIn: false,
      role: null,
    });

    // redirect to login
    navigate("/patient-login", { replace: true });
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/doctor/appointments",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setAppointments(res.data);
    } catch (err) {
      handleError("Failed to load appointments");
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

      handleSuccess(res.data.message || "Accepted");
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

      handleSuccess(res.data.message || "Rejected");
      fetchAppointments();
    } catch (err) {
      handleError("Reject Failed");
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Accepted") return styles.accepted;
    if (status === "Rejected") return styles.rejected;
    return styles.pending;
  };

  return (
    <div>
      {/* 🔥 TOP BAR */}
      <div style={styles.topbar}>
        <h2>Doctor Dashboard 👨‍⚕️</h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* 🔥 CONTENT */}
      <div style={styles.container}>
        {appointments.length === 0 ? (
          <div style={styles.empty}>No Appointments Found</div>
        ) : (
          <div style={styles.grid}>
            {appointments.map((app) => (
              <div key={app._id} style={styles.card}>
                {/* Header */}
                <div style={styles.header}>
                  <h3>{app.patient?.name}</h3>
                  <span style={getStatusStyle(app.finalStatus)}>
                    {app.finalStatus}
                  </span>
                </div>

                {/* Info */}
                <p>
                  <strong>Email:</strong> {app.patient?.email}
                </p>

                <p style={styles.hospital}>🏥 {app.hospital?.name || "N/A"}</p>

                <p>
                  <strong>Description:</strong>{" "}
                  {app.description || "No description"}
                </p>

                <p style={styles.date}>
                  📅 {new Date(app.appointmentDate).toLocaleDateString()} | ⏰{" "}
                  {app.appointmentTime}
                </p>

                {/* Buttons */}
                {app.adminStatus === "Accepted" &&
                  app.doctorStatus === "Pending" && (
                    <div style={styles.btnGroup}>
                      <button
                        style={styles.acceptBtn}
                        onClick={() => handleAccept(app._id)}
                      >
                        Accept
                      </button>

                      <button
                        style={styles.rejectBtn}
                        onClick={() => handleReject(app._id)}
                      >
                        Reject
                      </button>
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

const styles = {
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#1e293b",
    color: "#fff",
  },

  logoutBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  container: {
    padding: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  hospital: {
    fontSize: "14px",
    color: "#555",
  },

  date: {
    fontSize: "13px",
    color: "#777",
  },

  accepted: {
    background: "#22c55e",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "20px",
  },

  rejected: {
    background: "#ef4444",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "20px",
  },

  pending: {
    background: "#facc15",
    color: "#000",
    padding: "4px 10px",
    borderRadius: "20px",
  },

  btnGroup: {
    marginTop: "12px",
    display: "flex",
    gap: "10px",
  },

  acceptBtn: {
    flex: 1,
    padding: "8px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },

  rejectBtn: {
    flex: 1,
    padding: "8px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },

  empty: {
    textAlign: "center",
    color: "#777",
  },
};

export default DoctorDashboard;
