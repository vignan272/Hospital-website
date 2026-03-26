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
          {/* <li
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
          </li> */}

          <li
            className="dropdown"
            onMouseEnter={() => setActiveMenu("specialties")}
            // onMouseLeave={() => setActiveMenu(null)}
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
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/specialties/Cardiology"
                    onClick={() => setActiveMenu(null)}
                  >
                    Cardiology
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specialties/Cardiothoracic"
                    onClick={() => setActiveMenu(null)}
                  >
                    Cardiothoracic
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specialties/Critical"
                    onClick={() => setActiveMenu(null)}
                  >
                    Critical care
                  </Link>
                </li>
                <li>
                  <Link to="/Oncology" onClick={() => setActiveMenu(null)}>
                    Oncology
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specialties/Orthopedices"
                    onClick={() => setActiveMenu(null)}
                  >
                    Orthopedices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specialties/Nephrology"
                    onClick={() => setActiveMenu(null)}
                  >
                    Nephrology
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specialties/Neurology"
                    onClick={() => setActiveMenu(null)}
                  >
                    Neurology
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specialties/Gastroenterology"
                    onClick={() => setActiveMenu(null)}
                  >
                    Gastroenterology
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specialties/Surgery"
                    onClick={() => setActiveMenu(null)}
                  >
                    General Surgery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specialties/Gynecology"
                    onClick={() => setActiveMenu(null)}
                  >
                    Gynecology
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specialties/Andrology"
                    onClick={() => setActiveMenu(null)}
                  >
                    Andrology
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specialties/Cosmetic"
                    onClick={() => setActiveMenu(null)}
                  >
                    Cosmetic Surgery
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
              </ul>
            )}
          </li>
          <li
            className="dropdown"
            onMouseEnter={() => setActiveMenu("patient")}
            // onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="nav-link dropdown-toggle">
              For Patients
              <span
                className={`arrow ${activeMenu === "patient" ? "open" : ""}`}
              >
                ▼
              </span>
            </span>

            {activeMenu === "patient" && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/Blog" onClick={() => setActiveMenu(null)}>
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link to="/Diseases" onClick={() => setActiveMenu(null)}>
                    Diseases
                  </Link>
                </li>
                <li>
                  <Link to="/Symptom" onClick={() => setActiveMenu(null)}>
                    Symptoms
                  </Link>
                </li>
                <li>
                  <Link to="/Medicine" onClick={() => setActiveMenu(null)}>
                    Medicine
                  </Link>
                </li>
                <li>
                  <Link to="/Surgery" onClick={() => setActiveMenu(null)}>
                    Surgery Cost
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* REGULAR LINKS */}
          <li
            className="dropdown"
            onMouseEnter={() => setActiveMenu("about")}
            // onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="nav-link dropdown-toggle">
              About
              <span className={`arrow ${activeMenu === "about" ? "open" : ""}`}>
                ▼
              </span>
            </span>

            {activeMenu === "about" && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/AboutUs" onClick={() => setActiveMenu(null)}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/Success" onClick={() => setActiveMenu(null)}>
                    Sucess Stories
                  </Link>
                </li>
                <li>
                  <Link to="/Privacy" onClick={() => setActiveMenu(null)}>
                    Privacy Policies
                  </Link>
                </li>
              </ul>
            )}
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
