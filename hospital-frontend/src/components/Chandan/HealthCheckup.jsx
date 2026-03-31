import React, { useState } from "react";
import "./HealthCheckup.css";
import healthImg from "../../images/HealthCare.png";

function HealthCheckup() {
  const [activeIndex, setActiveIndex] = useState(null);

  // ✅ EXACT POSITIONS (YOU CAN ADJUST THESE SLIGHTLY)
  const points = [
    { title: "BMI Monitoring", desc: "Tracks BMI", top: "18%", left: "52%" },
    { title: "Diagnosis", desc: "MRI scanning", top: "32%", left: "25%" },
    { title: "Devices", desc: "Monitoring tools", top: "60%", left: "28%" },
    { title: "Treatment", desc: "Doctor care", top: "65%", left: "75%" },
    { title: "X-Ray", desc: "Chest imaging", top: "78%", left: "50%" },
    { title: "Lab Tests", desc: "Sample analysis", top: "48%", left: "82%" },
    { title: "Dental Care", desc: "Oral checkups", top: "72%", left: "65%" },
    {
      title: "Respiratory",
      desc: "Breathing tracking",
      top: "82%",
      left: "35%",
    },
  ];

  return (
    <div className="explain-section_HealthCheckup">
      <h1>Healthcare Process Explained</h1>
      <p>Understand each stage visually</p>

      <div className="image-box_HealthCheckup">
        <img src={healthImg} alt="healthcare" />

        {points.map((point, index) => (
          <div
            key={index}
            className="point_HealthCheckup"
            style={{ top: point.top, left: point.left }}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <div className="dot11_HealthCheckup" />

            {activeIndex === index && (
              <div className="card_HealthCheckup">
                <h4>{point.title}</h4>
                <p>{point.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HealthCheckup;
