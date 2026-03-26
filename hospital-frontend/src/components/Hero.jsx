import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hospital from "../images/medicover.png";
import "./Hero.css";

function Hero() {
  const [lineLayout, setLineLayout] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!lineLayout && !isAnimating) {
      setIsAnimating(true);

      // Create particles effect
      const circleItems = document.querySelectorAll(".circle-item");
      const newParticles = [];

      circleItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        newParticles.push({
          id: index,
          x: rect.left,
          y: rect.top,
          angle: index * 72 * (Math.PI / 180),
          distance: 100 + Math.random() * 50,
        });
      });

      setParticles(newParticles);

      setTimeout(() => {
        setLineLayout(true);
        setParticles([]);
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }, 600);
    }
  };

  // Rest of your handlers...
  const handleBookAppointment = (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "patient") {
      navigate("/book");
    } else {
      navigate("/patient-login");
    }
  };

  const handleSearchDoctor = () => navigate("/doctors");
  const handleFindDoctors = () => navigate("/doctors");
  const handleSpecialties = () => navigate("/specialties");
  const handleOurHospitals = () => navigate("/hospitalsLocation");
  const handleAboutUs = () => navigate("/about");

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

        <div className="circle-container">
          <div
            className={`circle-wrapper ${lineLayout ? "line-layout" : ""} ${isAnimating ? "explode-animation" : ""}`}
            onClick={handleClick}
          >
            {/* Circle items with the same content */}
            <div className="circle-item" onClick={handleFindDoctors}>
              <div className="circle-content">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                  alt=""
                />
                <p>Find Doctors</p>
              </div>
            </div>
            <div className="circle-item" onClick={handleBookAppointment}>
              <div className="circle-content">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                  alt=""
                />
                <p>Book Appointment</p>
              </div>
            </div>
            <div className="circle-item" onClick={handleSpecialties}>
              <div className="circle-content">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
                  alt=""
                />
                <p>Specialties</p>
              </div>
            </div>
            <div className="circle-item" onClick={handleOurHospitals}>
              <div className="circle-content">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
                  alt=""
                />
                <p>Our Hospitals</p>
              </div>
            </div>
            <div className="circle-item" onClick={handleAboutUs}>
              <div className="circle-content">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
                  alt=""
                />
                <p>About Us</p>
              </div>
            </div>
          </div>

          {/* Particles effect */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: particle.x,
                top: particle.y,
                "--angle": particle.angle,
                "--distance": `${particle.distance}px`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
