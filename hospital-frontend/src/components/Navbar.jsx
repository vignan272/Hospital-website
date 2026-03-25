import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../assets/header.jpeg";

function Navbar({ auth, setAuth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  // Update token and role when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    setToken(null);
    setRole(null);

    setAuth({
      isLoggedIn: false,
      role: null,
    });

    navigate("/patient-login", { replace: true });
  };

  // Helper to close menu on click
  const closeMenu = () => setActiveMenu(null);

  // Handle specialties navigation
  const handleSpecialtiesClick = () => {
    navigate("/specialties");
    closeMenu();
  };

  // Check if user is logged in
  const isLoggedIn = !!token && role === "patient";

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" onClick={closeMenu} className="logo-link">
          <img src={logoImg} className="logo" alt="Ecstasy Hospital Logo" />
        </Link>

        <ul className="nav-menu">
          {/* FIND A DOCTOR DROPDOWN */}
          <li
            className="dropdown"
            onMouseEnter={() => setActiveMenu("doctor")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="nav-link dropdown-toggle">
              <Link to="/doctors" onClick={closeMenu}>
                Find a Doctor
              </Link>
              <span
                className={`arrow ${activeMenu === "doctor" ? "open" : ""}`}
              >
                ▼
              </span>
            </span>

            {activeMenu === "doctor" && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/doctors/specialty/cardiology" onClick={closeMenu}>
                    Cardiology
                  </Link>
                </li>
                <li>
                  <Link to="/doctors/specialty/neurology" onClick={closeMenu}>
                    Neurology
                  </Link>
                </li>
                <li>
                  <Link to="/doctors/specialty/orthopedics" onClick={closeMenu}>
                    Orthopedics
                  </Link>
                </li>
                <li>
                  <Link to="/doctors/specialty/gynecology" onClick={closeMenu}>
                    Gynecology
                  </Link>
                </li>
                <li>
                  <Link to="/doctors" onClick={closeMenu}>
                    View All Doctors
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* FIND A HOSPITAL DROPDOWN */}
          <li
            className="dropdown"
            onMouseEnter={() => setActiveMenu("hospital")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="nav-link dropdown-toggle">
              <Link to="/hospitalsLocation" onClick={closeMenu}>
                Find a Hospital
              </Link>
              <span
                className={`arrow ${activeMenu === "doctor" ? "open" : ""}`}
              >
                ▼
              </span>
            </span>

            {activeMenu === "hospital" && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/Location/Hyderabad" onClick={closeMenu}>
                    Hyderabad
                  </Link>
                </li>
                <li>
                  <Link to="/Location/Warangal" onClick={closeMenu}>
                    Warangal
                  </Link>
                </li>
                <li>
                  <Link to="/Location/Karimnagar" onClick={closeMenu}>
                    Karimnagar
                  </Link>
                </li>
                <li>
                  <Link to="/Location/Vijayawada" onClick={closeMenu}>
                    Vijayawada
                  </Link>
                </li>
                <li>
                  <Link to="/Location/Visakhapatnam" onClick={closeMenu}>
                    Visakhapatnam
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* SPECIALTIES DROPDOWN */}
          <li
            className="dropdown"
            onMouseEnter={() => setActiveMenu("specialties")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="nav-link dropdown-toggle">
              <span
                onClick={handleSpecialtiesClick}
                style={{ cursor: "pointer" }}
              >
                Specialties
              </span>
              <span
                className={`arrow ${activeMenu === "specialties" ? "open" : ""}`}
              >
                ▼
              </span>
            </span>

            {activeMenu === "specialties" && (
              <ul className="dropdown-menu grid-menu">
                <li>
                  <Link to="/specialties/Cardiology" onClick={closeMenu}>
                    Cardiology
                  </Link>
                </li>
                <li>
                  <Link to="/specialties/Orthopedices" onClick={closeMenu}>
                    Orthopedics
                  </Link>
                </li>
                <li>
                  <Link to="/specialties/Neurology" onClick={closeMenu}>
                    Neurology
                  </Link>
                </li>
                <li>
                  <Link to="/specialties/Gynecology" onClick={closeMenu}>
                    Gynecology
                  </Link>
                </li>
                <li>
                  <Link to="/specialties/Oncology" onClick={closeMenu}>
                    Oncology
                  </Link>
                </li>
                <li>
                  <Link to="/specialties/Pediatrics" onClick={closeMenu}>
                    Pediatrics
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* SERVICES DROPDOWN */}
          <li
            className="dropdown"
            onMouseEnter={() => setActiveMenu("services")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="nav-link dropdown-toggle">
              Services
              <span
                className={`arrow ${activeMenu === "services" ? "open" : ""}`}
              >
                ▼
              </span>
            </span>

            {activeMenu === "services" && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/preventive-health" onClick={closeMenu}>
                    Preventive Health
                  </Link>
                </li>
                <li>
                  <Link to="/diagnostic-tests" onClick={closeMenu}>
                    Diagnostic Tests
                  </Link>
                </li>
                <li>
                  <Link to="/home-care" onClick={closeMenu}>
                    Home Care
                  </Link>
                </li>
                <li>
                  <Link to="/offers" onClick={closeMenu}>
                    Offers
                  </Link>
                </li>
                <li>
                  <Link to="/ambulance" onClick={closeMenu}>
                    24/7 Ambulance
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* REGULAR LINKS */}
          <li>
            <Link to="/about" className="nav-link" onClick={closeMenu}>
              About
            </Link>
          </li>
          {/* PATIENT SPECIFIC LINK */}
          {isLoggedIn && (
            <li>
              <Link
                to="/my-appointments"
                className="nav-link"
                onClick={closeMenu}
              >
                My Appointments
              </Link>
            </li>
          )}
        </ul>

        {/* AUTH BUTTONS */}
        <div className="nav-auth">
          {isLoggedIn ? (
            <>
              <button
                className="appoint-btn"
                onClick={() => navigate("/book-appointment")}
              >
                Book Appointment
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            !token && (
              <Link to="/patient-login">
                <button className="appoint-btn">Login / Signup</button>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
