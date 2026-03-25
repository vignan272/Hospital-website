import React from "react";
import { Link } from "react-router-dom";
import "./Center.css";

const centers = [
  { category: "Cardiology", name: "Cardiology", icon: "❤️" },
  { category: "Cardiothoracic", name: "Cardiothoracic", icon: "🫀" },
  { category: "Critical", name: "Critical Care", icon: "🏥" },
  { category: "Oncology", name: "Oncology", icon: "🧬" },
  { category: "Orthopedices", name: "Orthopedics", icon: "🦴" },
  { category: "Nephrology", name: "Nephrology", icon: "🧫" },
  { category: "Neurosurgery", name: "Neurosurgery", icon: "⚕️" },
  { category: "Gastroenterology", name: "Gastroenterology", icon: "🫃" },
  { category: "Surgery", name: "General Surgery", icon: "🔬" },
  { category: "Gynecology", name: "Gynecology", icon: "👁️" },
  { category: "Andrology", name: "Andrology", icon: "🧠" },
  { category: "Cosmetic", name: "Cosmetic Surgery", icon: "👶" },
];

function Center() {
  return (
    <div className="centers-container">
      <h2 className="title">Center of Excellence</h2>

      <div className="grid">
        {centers.map((item, index) => (
          <Link to={`/${item.category}`} key={index} className="card3">
            <div className="icon">{item.icon}</div>
            <p>{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Center;
