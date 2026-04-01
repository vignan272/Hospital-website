import React, { useState } from "react";
import doctorImg from "../../images/Nabh.png";
import "./NabhCare.css";
import { useNavigate } from "react-router-dom";

function NabhCare() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCard = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="nabh-care">
      <div className="container">
        {/* HERO */}
        <div className="hero-container">
          {/* LEFT */}
          <div className="hero-left">
            <p className="badge">A GLOBAL NETWORK</p>

            <h1>
              NABH Certified Care,
              <br />
              Every Step Of The Way
            </h1>

            <p className="subtext">
              Get access to trusted NABH-accredited hospitals across India with
              advanced medical infrastructure and expert doctors ensuring safe,
              transparent, and high-quality treatment at every stage.
            </p>

            <p className="subtext-light">
              From consultation to recovery, we connect you with the right
              specialists, modern diagnostics, and personalized care plans — all
              in one seamless experience.
            </p>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            <img src={doctorImg} alt="NABH" />

            <div className="stats">
              <div className="stat-card" onClick={() => navigate("/doctors")}>
                <h3>200+</h3>
                <p>Expert Doctors</p>
              </div>

              <div
                className="stat-card"
                onClick={() => navigate("/my-appointments")}
              >
                <h3>400+</h3>
                <p>Active Patients</p>
              </div>

              <div className="stat-card" onClick={() => navigate("/AboutUs")}>
                <h3>98%</h3>
                <p>Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
        {/* ABOUT */}
        <div className="section light fade-up">
          <h2>Why Choose NABH Care?</h2>

          <div className="features">
            {/* 1. HOSPITALS */}
            <div
              className={`feature-card ${activeIndex === 0 ? "active" : ""}`}
              onClick={() => toggleCard(0)}
            >
              <div className="icon">🏥</div>
              <h3>Certified Hospitals</h3>
              <p>All hospitals meet NABH quality standards.</p>

              <div className="expand">
                <img
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop"
                  alt="hospital"
                />

                <div className="details">
                  <div className="detail-item">
                    <span className="dot"></span> Verified hospitals
                  </div>
                  <div className="detail-item">
                    <span className="dot"></span> Quality assurance
                  </div>
                  <div className="detail-item">
                    <span className="dot"></span> Standard care
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SAFETY */}
            <div
              className={`feature-card ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => toggleCard(1)}
            >
              <div className="icon">🛡️</div>
              <h3>Patient Safety First</h3>
              <p>Strict safety protocols for every patient.</p>

              <div className="expand">
                <img
                  src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=800&auto=format&fit=crop"
                  alt="safety"
                />

                <div className="details">
                  <div className="detail-item">
                    <span className="dot"></span> Infection control
                  </div>
                  <div className="detail-item">
                    <span className="dot"></span> Emergency readiness
                  </div>
                  <div className="detail-item">
                    <span className="dot"></span> Monitoring systems
                  </div>
                </div>
              </div>
            </div>

            {/* 3. TECHNOLOGY */}
            <div
              className={`feature-card ${activeIndex === 2 ? "active" : ""}`}
              onClick={() => toggleCard(2)}
            >
              <div className="icon">⚙️</div>
              <h3>Advanced Technology</h3>
              <p>Modern equipment and accurate diagnosis.</p>

              <div className="expand">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
                  alt="technology"
                />

                <div className="details">
                  <div className="detail-item">
                    <span className="dot"></span> AI diagnostics
                  </div>
                  <div className="detail-item">
                    <span className="dot"></span> Modern equipment
                  </div>
                  <div className="detail-item">
                    <span className="dot"></span> Fast reporting
                  </div>
                </div>
              </div>
            </div>

            {/* 4. DOCTORS */}
            <div
              className={`feature-card ${activeIndex === 3 ? "active" : ""}`}
              onClick={() => toggleCard(3)}
            >
              <div className="icon">👨‍⚕️</div>
              <h3>Experienced Doctors</h3>
              <p>Highly skilled specialists.</p>

              <div className="expand">
                <img
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop"
                  alt="doctor"
                />

                <div className="details">
                  <div className="detail-item">
                    <span className="dot"></span> 10+ years experience
                  </div>
                  <div className="detail-item">
                    <span className="dot"></span> Specialists
                  </div>
                  <div className="detail-item">
                    <span className="dot"></span> Trusted care
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div className="section">
          <h2>Our Services</h2>

          <div className="services">
            <div className="service-card" onClick={() => navigate("/doctors")}>
              General Consultation
            </div>

            <div
              className="service-card"
              onClick={() => navigate("/diagnostic-tests")}
            >
              Diagnostics
            </div>

            <div className="service-card" onClick={() => navigate("/surgery")}>
              Surgery
            </div>

            <div
              className="service-card"
              onClick={() => navigate("/home-care")}
            >
              Home Care
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta">
          <h2>Ready to Experience Quality Healthcare?</h2>

          <button onClick={() => navigate("/book-appointment")}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default NabhCare;
