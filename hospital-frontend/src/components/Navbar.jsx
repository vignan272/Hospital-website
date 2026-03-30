import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../assets/header.jpeg";

function Navbar({ auth, setAuth }) {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(null);
  const [lockedMenu, setLockedMenu] = useState(null); // 🔥 NEW

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

  // 🔥 HOVER LOGIC
  const handleMouseEnter = (menu) => {
    if (!lockedMenu) setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    if (!lockedMenu) setActiveMenu(null);
  };

  // 🔥 CLICK LOCK LOGIC
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
                  <Link to="/doctors/specialty/cardiology" onClick={closeAll}>
                    Cardiology
                  </Link>
                </li>
                <li>
                  <Link to="/doctors/specialty/neurology" onClick={closeAll}>
                    Neurology
                  </Link>
                </li>
                <li>
                  <Link to="/doctors/specialty/orthopedics" onClick={closeAll}>
                    Orthopedics
                  </Link>
                </li>
                <li>
                  <Link to="/doctors/specialty/gynecology" onClick={closeAll}>
                    Gynecology
                  </Link>
                </li>
                <li>
                  <Link to="/doctors" onClick={closeAll}>
                    View All Doctors
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* HOSPITAL */}
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
                  <Link to="/Location/Hyderabad" onClick={closeAll}>
                    Hyderabad
                  </Link>
                </li>
                <li>
                  <Link to="/Location/Warangal" onClick={closeAll}>
                    Warangal
                  </Link>
                </li>
                <li>
                  <Link to="/Location/Karimnagar" onClick={closeAll}>
                    Karimnagar
                  </Link>
                </li>
                <li>
                  <Link to="/Location/Vijayawada" onClick={closeAll}>
                    Vijayawada
                  </Link>
                </li>
                <li>
                  <Link to="/Location/Visakhapatnam" onClick={closeAll}>
                    Visakhapatnam
                  </Link>
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
                  <Link to="/preventive-health" onClick={closeAll}>
                    Preventive Health
                  </Link>
                </li>
                <li>
                  <Link to="/diagnostic-tests" onClick={closeAll}>
                    Diagnostic Tests
                  </Link>
                </li>
                <li>
                  <Link to="/home-care" onClick={closeAll}>
                    Home Care
                  </Link>
                </li>
                <li>
                  <Link to="/offers" onClick={closeAll}>
                    Offers
                  </Link>
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
                  <Link to="/Blog" onClick={closeAll}>
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link to="/Diseases" onClick={closeAll}>
                    Diseases
                  </Link>
                </li>
                <li>
                  <Link to="/Symptom" onClick={closeAll}>
                    Symptoms
                  </Link>
                </li>
                <li>
                  <Link to="/Medicine" onClick={closeAll}>
                    Medicine
                  </Link>
                </li>
                <li>
                  <Link to="/Surgery" onClick={closeAll}>
                    Surgery Cost
                  </Link>
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
                  <Link to="/AboutUs" onClick={closeAll}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/Success" onClick={closeAll}>
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link to="/Privacy" onClick={closeAll}>
                    Privacy Policies
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {isLoggedIn && (
            <li>
              <Link
                to="/my-appointments"
                className="nav-link"
                onClick={closeAll}
              >
                My Appointments
              </Link>
            </li>
          )}
        </ul>

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
