import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../assets/header.jpeg";

function Navbar({ auth, setAuth }) {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(null);
  const [lockedMenu, setLockedMenu] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);

    setAuth({
      isLoggedIn: false,
      role: null,
    });

    navigate("/patient-login", { replace: true });
  };

  const handleMouseEnter = (menu) => {
    if (!lockedMenu) setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    if (!lockedMenu) setActiveMenu(null);
  };

  const handleClick = (menu) => {
    if (lockedMenu === menu) {
      setLockedMenu(null);
      setActiveMenu(null);
    } else {
      setLockedMenu(menu);
      setActiveMenu(menu);
    }
  };

  const closeAll = () => {
    setActiveMenu(null);
    setLockedMenu(null);
  };

  const isLoggedIn = !!token && role === "patient";

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <Link to="/" onClick={closeAll} className="logo-link">
          <img src={logoImg} className="logo" alt="logo" />
        </Link>

        <ul className="nav-menu">
          {/* FIND DOCTOR */}
          <li
            className="dropdown"
            onMouseEnter={() => handleMouseEnter("doctor")}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className="nav-link dropdown-toggle"
              onClick={() => handleClick("doctor")}
            >
              <Link to="/doctors">Find a Doctor</Link>
              <span
                className={`arrow ${activeMenu === "doctor" ? "open" : ""}`}
              >
                ▼
              </span>
            </span>

            {activeMenu === "doctor" && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/doctors/specialty/cardiology">Cardiology</Link>
                </li>
                <li>
                  <Link to="/doctors/specialty/neurology">Neurology</Link>
                </li>
                <li>
                  <Link to="/doctors/specialty/orthopedics">Orthopedics</Link>
                </li>
                <li>
                  <Link to="/doctors/specialty/gynecology">Gynecology</Link>
                </li>
                <li>
                  <Link to="/doctors">View All Doctors</Link>
                </li>
              </ul>
            )}
          </li>

          {/* FIND HOSPITAL */}
          <li
            className="dropdown"
            onMouseEnter={() => handleMouseEnter("hospital")}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className="nav-link dropdown-toggle"
              onClick={() => handleClick("hospital")}
            >
              <Link to="/hospitalsLocation">Find a Hospital</Link>
              <span
                className={`arrow ${activeMenu === "hospital" ? "open" : ""}`}
              >
                ▼
              </span>
            </span>

            {activeMenu === "hospital" && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/Location/Hyderabad">Hyderabad</Link>
                </li>
                <li>
                  <Link to="/Location/Warangal">Warangal</Link>
                </li>
                <li>
                  <Link to="/Location/Karimnagar">Karimnagar</Link>
                </li>
                <li>
                  <Link to="/location/Nizamabad">Nizamabad</Link>
                </li>
                <li>
                  <Link to="/Location/Vijayawada">Vijayawada</Link>
                </li>
                <li>
                  <Link to="/location/Tirupati">Tirupati</Link>
                </li>
                <li>
                  <Link to="/location/Nellore">Nellore</Link>
                </li>
                <li>
                  <Link to="/Location/Visakhapatnam">Visakhapatnam</Link>
                </li>
                <li>
                  <Link to="/location/Guntur">Guntur</Link>
                </li>
              </ul>
            )}
          </li>

          {/* 🔥 SPECIALTIES (FIXED WITH YOUR OLD LINKS) */}
          <li
            className="dropdown"
            onMouseEnter={() => handleMouseEnter("specialties")}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className="nav-link dropdown-toggle"
              onClick={() => handleClick("specialties")}
            >
              <Link to="/specialties">Specialties</Link>
              <span
                className={`arrow ${activeMenu === "specialties" ? "open" : ""}`}
              >
                ▼
              </span>
            </span>

            {activeMenu === "specialties" && (
              <ul className="dropdown-menu grid-menu">
                <li>
                  <Link to="/specialties/Cardiology">Cardiology</Link>
                </li>
                <li>
                  <Link to="/specialties/Cardiothoracic">Cardiothoracic</Link>
                </li>
                <li>
                  <Link to="/specialties/Critical">Critical care</Link>
                </li>
                <li>
                  <Link to="/specialties/Oncology">Oncology</Link>
                </li>
                <li>
                  <Link to="/specialties/Orthopedices">Orthopedices</Link>
                </li>
                <li>
                  <Link to="/specialties/Nephrology">Nephrology</Link>
                </li>
                <li>
                  <Link to="/specialties/Neurology">Neurology</Link>
                </li>
                <li>
                  <Link to="/specialties/Gastroenterology">
                    Gastroenterology
                  </Link>
                </li>
                <li>
                  <Link to="/specialties/Surgery">General Surgery</Link>
                </li>
                <li>
                  <Link to="/specialties/Gynecology">Gynecology</Link>
                </li>
                <li>
                  <Link to="/specialties/Andrology">Andrology</Link>
                </li>
                <li>
                  <Link to="/specialties/Cosmetic">Cosmetic Surgery</Link>
                </li>
              </ul>
            )}
          </li>

          {/* SERVICES */}
          <li
            className="dropdown"
            onMouseEnter={() => handleMouseEnter("services")}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className="nav-link dropdown-toggle"
              onClick={() => handleClick("services")}
            >
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
                  <Link to="/preventive-health">Preventive Health</Link>
                </li>
                <li>
                  <Link to="/diagnostic-tests">Diagnostic Tests</Link>
                </li>
                <li>
                  <Link to="/home-care">Home Care</Link>
                </li>
                <li>
                  <Link to="/offers">Offers</Link>
                </li>
                <li>
                  <Link to="/InsurancePartners">InsurancePartners</Link>
                </li>
              </ul>
            )}
          </li>

          {/* PATIENT */}
          <li
            className="dropdown"
            onMouseEnter={() => handleMouseEnter("patient")}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className="nav-link dropdown-toggle"
              onClick={() => handleClick("patient")}
            >
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
                  <Link to="/Blog">Blogs</Link>
                </li>
                <li>
                  <Link to="/Diseases">Diseases</Link>
                </li>
                <li>
                  <Link to="/Symptom">Symptoms</Link>
                </li>
                <li>
                  <Link to="/Medicine">Medicine</Link>
                </li>
                <li>
                  <Link to="/Surgery">Surgery Cost</Link>
                </li>
              </ul>
            )}
          </li>

          {/* ABOUT */}
          <li
            className="dropdown"
            onMouseEnter={() => handleMouseEnter("about")}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className="nav-link dropdown-toggle"
              onClick={() => handleClick("about")}
            >
              About
              <span className={`arrow ${activeMenu === "about" ? "open" : ""}`}>
                ▼
              </span>
            </span>

            {activeMenu === "about" && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/AboutUs">About Us</Link>
                </li>
                <li>
                  <Link to="/Leadership">Leadership</Link>
                </li>
                <li>
                  <Link to="/Success">Success Stories</Link>
                </li>
                <li>
                  <Link to="/Privacy">Privacy Policies</Link>
                </li>
                <li>
                  <Link to="/contactpage">Contact Us</Link>
                </li>
              </ul>
            )}
          </li>

          {isLoggedIn && (
            <li>
              <Link to="/my-appointments" className="nav-link">
                My Appointments
              </Link>
            </li>
          )}
        </ul>

        {/* AUTH */}
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
            <Link to="/patient-login">
              <button className="appoint-btn">Login / Signup</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
