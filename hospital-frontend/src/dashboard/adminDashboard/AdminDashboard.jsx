// AdminDashboard.jsx
import React from "react";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./AdminDashboard.css";

import AddDoctor from "./addDoctor";
import AddHospital from "./AddHospital";
import AllDoctors from "./allDoctors";
import AllAppointments from "./Allappointment";
import Leaves from "./Leaves"; // ✅ ADD THIS IMPORT

function AdminDashboard({ setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth({
      isLoggedIn: false,
      role: null,
    });
    navigate("/patient-login", { replace: true });
  };

  return (
    <div className="admin-dashboard_adminDashboard">
      {/* SIDEBAR */}
      <aside className="sidebar_adminDashboard">
        <div className="sidebar-header_adminDashboard">
          <div className="logo_adminDashboard">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>ecstasy Admin</span>
          </div>
        </div>

        <nav className="sidebar-nav_adminDashboard">
          <NavLink
            to="/admin-dashboard/appointments"
            className={({ isActive }) =>
              `nav-link_adminDashboard ${isActive ? "active_adminDashboard" : ""}`
            }
          >
            <svg
              className="nav-icon_adminDashboard"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Appointments
          </NavLink>

          <NavLink
            to="/admin-dashboard/doctors"
            className={({ isActive }) =>
              `nav-link_adminDashboard ${isActive ? "active_adminDashboard" : ""}`
            }
          >
            <svg
              className="nav-icon_adminDashboard"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Doctors
          </NavLink>

          <NavLink
            to="/admin-dashboard/add-doctor"
            className={({ isActive }) =>
              `nav-link_adminDashboard ${isActive ? "active_adminDashboard" : ""}`
            }
          >
            <svg
              className="nav-icon_adminDashboard"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </svg>
            Add Doctor
          </NavLink>

          <NavLink
            to="/admin-dashboard/add-hospital"
            className={({ isActive }) =>
              `nav-link_adminDashboard ${isActive ? "active_adminDashboard" : ""}`
            }
          >
            <svg
              className="nav-icon_adminDashboard"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H9v8H5a2 2 0 0 1-2-2z"></path>
            </svg>
            Add Hospital
          </NavLink>

          {/* ✅ ADD LEAVES NAVLINK HERE */}
          <NavLink
            to="/admin-dashboard/leaves"
            className={({ isActive }) =>
              `nav-link_adminDashboard ${isActive ? "active_adminDashboard" : ""}`
            }
          >
            <svg
              className="nav-icon_adminDashboard"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect x="3" y="6" width="18" height="16" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            Leaves
          </NavLink>
        </nav>

        <button onClick={handleLogout} className="logout-btn_adminDashboard">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content_adminDashboard">
        <div className="content-wrapper_adminDashboard">
          <Routes>
            <Route index element={<Navigate to="appointments" />} />
            <Route path="appointments" element={<AllAppointments />} />
            <Route path="doctors" element={<AllDoctors />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="add-hospital" element={<AddHospital />} />
            {/* ✅ ADD LEAVES ROUTE HERE */}
            <Route path="leaves" element={<Leaves />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
