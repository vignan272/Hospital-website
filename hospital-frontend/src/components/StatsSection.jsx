import React from "react";
import "./StatsSection.css";

function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stat">
        <h2>24+</h2>
        <p>Years Experience</p>
      </div>

      <div className="stat">
        <h2>50+</h2>
        <p>Doctors</p>
      </div>

      <div className="stat">
        <h2>1L+</h2>
        <p>Patients Treated</p>
      </div>
    </section>
  );
}

export default StatsSection;
