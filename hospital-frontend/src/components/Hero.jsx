import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hospital from "../images/medicover.png";
import "./Hero.css";

function Hero() {
  const [lineLayout, setLineLayout] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLineLayout(true);
  };

  // ✅ Book Appointment Logic
  const handleBookAppointment = (e) => {
    e.stopPropagation(); // prevent parent click

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "patient") {
      navigate("/book");
    } else {
      navigate("/patient-login");
    }
  };

  // ✅ Search Doctor Logic
  const handleSearchDoctor = () => {
    navigate("/doctors");
  };

  return (
    <section className={`hero ${lineLayout ? "shrink" : ""}`}>
      <h1>Your Health Is Our Priority</h1>
      <p>Find the best doctors and hospitals near you</p>

      <div className="hero-search">
        <select>
          <option>Select Location</option>
          <option>Hyderabad</option>
          <option>Vizag</option>
          <option>Guntur</option>
        </select>

        <select>
          <option>Select Specialty</option>
          <option>Cardiology</option>
          <option>Neurology</option>
          <option>Dermatology</option>
        </select>

        <button onClick={handleSearchDoctor}>Search Doctor</button>
      </div>

      <div className="hero-body">
        <div className="hero-hospital">
          <img src={hospital} alt="Hospital" />
        </div>

        <div className={`circle-wrapper ${lineLayout ? "line-layout" : ""}`}>
          {/* FIND DOCTORS */}
          <div className="circle-item" onClick={handleClick}>
            <div className="circle-content">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                alt=""
              />
              <p>Find Doctors</p>
            </div>
          </div>

          {/* BOOK APPOINTMENT */}
          <div className="circle-item" onClick={handleClick}>
            <div className="circle-content" onClick={handleBookAppointment}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                alt=""
              />
              <p>Book Appointment</p>
            </div>
          </div>

          {/* HEALTH CHECKUPS */}
          <div className="circle-item" onClick={handleClick}>
            <div className="circle-content">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
                alt=""
              />
              <p>Health Checkups</p>
            </div>
          </div>

          {/* HOSPITALS */}
          <div className="circle-item" onClick={handleClick}>
            <div className="circle-content">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
                alt=""
              />
              <p>Our Hospitals</p>
            </div>
          </div>

          {/* SECOND OPINION */}
          <div className="circle-item" onClick={handleClick}>
            <div className="circle-content">
              <img
                src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
                alt=""
              />
              <p>Second Opinion</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
