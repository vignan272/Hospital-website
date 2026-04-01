import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADD
import "./FillerSection.css";

function FillerSection() {
  const navigate = useNavigate(); // ✅ ADD

  return (
    <section className="filler-section">
      {/* LEFT IMAGE */}
      <div className="filler-right">
        <div className="bg-box"></div>
        <img
          src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80"
          alt="Hospital Infrastructure"
          className="filler-img"
        />
      </div>

      {/* RIGHT TEXT */}
      <div className="filler-left">
        <h2>World-Class Infrastructure</h2>
        <p>
          Our hospitals are equipped with cutting-edge technology, modern
          facilities, and a patient-first environment to deliver the best care.
        </p>

        {/* 🔥 BUTTON NAVIGATION */}
        <button className="filler-btn" onClick={() => navigate("/aboutus")}>
          Explore More
        </button>
      </div>
    </section>
  );
}

export default FillerSection;
