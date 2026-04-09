import React, { useState } from "react";
import "./HealthCheckup.css";
import clipboard from "../../images/clipboard.png";
import { useNavigate } from "react-router-dom";
function HealthCheckup() {
  // ❗ NOTHING SELECTED INITIALLY
  const [active, setActive] = useState(-1);
  const navigate = useNavigate();

  const icons = [
    {
      id: 0,
      icon: "❤️",
      title: "Early Detection",
      desc: "Identify diseases early and prevent complications.",
    },
    {
      id: 1,
      icon: "🩺",
      title: "Doctor Visit",
      desc: "Regular consultation improves health.",
    },
    {
      id: 2,
      icon: "🤝",
      title: "Preventive Care",
      desc: "Reduce risks through preventive actions.",
    },
    {
      id: 3,
      icon: "📋",
      title: "Lab Tests",
      desc: "Detect hidden issues early.",
    },
    {
      id: 4,
      icon: "🧪",
      title: "Screening",
      desc: "Advanced screenings for better safety.",
    },
    {
      id: 5,
      icon: "💊",
      title: "Medication",
      desc: "Timely medicines ensure recovery.",
    },
  ];

  return (
    <div className="health">
      {/* HEADING */}
      <div className="top-heading">
        <h1>REGULAR HEALTH CHECK-UPS</h1>
      </div>

      {/* LEFT SIDE */}
      <div className="icons-section">
        <p className="icons-intro">
          Explore how regular checkups improve your health
        </p>

        <h3 className="sub-heading">Why Regular Checkups Matter</h3>

        {/* ICONS */}
        <div className="icons-row">
          {icons.map((item, index) => (
            <div
              key={item.id}
              className={`icon-wrapper 
                ${active >= index ? `wave-${index}` : ""} 
                ${active === index ? "active" : ""}`}
              onClick={() => setActive(active === index ? -1 : index)}
            >
              <div className="icon-circle">{item.icon}</div>
            </div>
          ))}
        </div>

        {/* 🔥 CARD (ONLY ON CLICK) */}
        {active !== -1 && (
          <div className="info-panel">
            <h2>{icons[active].title}</h2>
            <p>{icons[active].desc}</p>
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="form-section">
        <div className="heading-row">
          <h2>Check Your Health Plan</h2>
          <img src={clipboard} alt="clip" />
        </div>

        <p className="form-desc">
          Get personalized health checkup recommendations based on your age,
          gender, and lifestyle.
        </p>

        <div className="health-form">
          <select>
            <option>Select Age Group</option>
            <option>18-25</option>
            <option>26-40</option>
            <option>40+</option>
          </select>

          <select>
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select>
            <option>Select Checkup Type</option>
            <option>Basic</option>
            <option>Advanced</option>
          </select>

          <button onClick={() => navigate("/doctors")}>
            Get Recommendation
          </button>
        </div>
      </div>
    </div>
  );
}

export default HealthCheckup;
