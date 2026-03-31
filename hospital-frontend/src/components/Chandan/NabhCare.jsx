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
    <div className="nabh-care_nabhcare">
      <div className="container_nabhcare">
        {/* HERO */}
        <div className="hero-container_nabhcare">
          {/* LEFT */}
          <div className="hero-left_nabhcare">
            <p className="badge_nabhcare">A GLOBAL NETWORK</p>

            <h1>
              NABH Certified Care,
              <br />
              Every Step Of The Way
            </h1>

            <p className="subtext_nabhcare">
              Get access to trusted NABH-accredited hospitals across India with
              advanced medical infrastructure and expert doctors ensuring safe,
              transparent, and high-quality treatment at every stage.
            </p>

            <p className="subtext-light_nabhcare">
              From consultation to recovery, we connect you with the right
              specialists, modern diagnostics, and personalized care plans — all
              in one seamless experience.
            </p>
          </div>

          {/* RIGHT */}
          <div className="hero-right_nabhcare">
            <img src={doctorImg} alt="NABH" />

            <div
              className="stat-card_nabhcare"
              onClick={() => navigate("/doctors")}
            >
              <h3>200+</h3>
              <p>Expert Doctors</p>
            </div>
            <div onClick={() => navigate("/my-appointments")}>
              400+ Active Patients
            </div>

            <div onClick={() => navigate("/about")}>98% Satisfaction Rate</div>
          </div>
        </div>

        {/* ABOUT */}
        <div className="section_nabhcare light_nabhcare fade-up">
          <h2>Why Choose NABH Care?</h2>

          <div className="features_nabhcare">
            {/* 1. HOSPITALS */}
            <div
              className={`feature-card_nabhcare ${activeIndex === 0 ? "active_nabhcare" : ""}`}
              onClick={() => toggleCard(0)}
            >
              <div className="icon_nabhcare">🏥</div>
              <h3>Certified Hospitals</h3>
              <p>All hospitals meet NABH quality standards.</p>

              <div className="expand_nabhcare">
                <img
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop"
                  alt="hospital"
                />

                <div className="details_nabhcare">
                  <div className="detail-item_nabhcare">
                    <span className="dot_nabhcare"></span> Verified hospitals
                  </div>
                  <div className="detail-item_nabhcare">
                    <span className="dot_nabhcare"></span> Quality assurance
                  </div>
                  <div className="detail-item_nabhcare">
                    <span className="dot_nabhcare"></span> Standard care
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SAFETY */}
            <div
              className={`feature-card_nabhcare ${activeIndex === 1 ? "active_nabhcare" : ""}`}
              onClick={() => toggleCard(1)}
            >
              <div className="icon_nabhcare">🛡️</div>
              <h3>Patient Safety First</h3>
              <p>Strict safety protocols for every patient.</p>

              <div className="expand_nabhcare">
                <img
                  src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=800&auto=format&fit=crop"
                  alt="safety"
                />

                <div className="details_nabhcare">
                  <div className="detail-item_nabhcare">
                    <span className="dot_nabhcare"></span> Infection control
                  </div>
                  <div className="detail-item_nabhcare">
                    <span className="dot_nabhcare"></span> Emergency readiness
                  </div>
                  <div className="detail-item_nabhcare">
                    <span className="dot_nabhcare"></span> Monitoring systems
                  </div>
                </div>
              </div>
            </div>

            {/* 3. TECHNOLOGY */}
            <div
              className={`feature-card_nabhcare ${activeIndex === 2 ? "active_nabhcare" : ""}`}
              onClick={() => toggleCard(2)}
            >
              <div className="icon_nabhcare">⚙️</div>
              <h3>Advanced Technology</h3>
              <p>Modern equipment and accurate diagnosis.</p>

              <div className="expand_nabhcare">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
                  alt="technology"
                />

                <div className="details_nabhcare">
                  <div className="detail-item_nabhcare">
                    <span className="dot_nabhcare"></span> AI diagnostics
                  </div>
                  <div className="detail-item_nabhcare">
                    <span className="dot_nabhcare"></span> Modern equipment
                  </div>
                  <div className="detail-item_nabhcare">
                    <span className="dot_nabhcare"></span> Fast reporting
                  </div>
                </div>
              </div>
            </div>

            {/* 4. DOCTORS */}
            <div
              className={`feature-card_nabhcare ${activeIndex === 3 ? "active_nabhcare" : ""}`}
              onClick={() => toggleCard(3)}
            >
              <div className="icon_nabhcare">👨‍⚕️</div>
              <h3>Experienced Doctors</h3>
              <p>Highly skilled specialists.</p>

              <div className="expand_nabhcare">
                <img
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop"
                  alt="doctor"
                />

                <div className="details_nabhcare">
                  <div className="detail-item_nabhcare">
                    <span className="dot_nabhcare"></span> 10+ years experience
                  </div>
                  <div className="detail-item_nabhcare">
                    <span className="dot_nabhcare"></span> Specialists
                  </div>
                  <div className="detail-item_nabhcare">
                    <span className="dot_nabhcare"></span> Trusted care
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div className="section_nabhcare">
          <h2>Our Services</h2>

          <div className="services_nabhcare">
            <div
              className="service-card_nabhcare"
              onClick={() => navigate("/doctors")}
            >
              General Consultation
            </div>

            <div
              className="service-card_nabhcare"
              onClick={() => navigate("/diagnostic-tests")}
            >
              Diagnostics
            </div>

            <div
              className="service-card_nabhcare"
              onClick={() => navigate("/surgery")}
            >
              Surgery
            </div>

            <div
              className="service-card_nabhcare"
              onClick={() => navigate("/home-care")}
            >
              Home Care
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta_nabhcare">
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
