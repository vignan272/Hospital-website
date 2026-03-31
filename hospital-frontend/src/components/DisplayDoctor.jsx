import React, { useEffect, useState, useRef } from "react";
import { getDoctors } from "../api/doctorService";
import "./DisplayDoctor.css";
import { useNavigate } from "react-router-dom";

function DisplayDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [visible, setVisible] = useState(false);

  const sliderRef = useRef();
  const sectionRef = useRef();

  // 🔥 FETCH DOCTORS
  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await getDoctors();
      console.log(data);
      setDoctors(data);
    };
    fetchDoctors();
  }, []);

  // 🔥 SCROLL ANIMATION (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 🔥 SLIDER CONTROLS
  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "patient") {
      navigate("/book-appointment");
    } else {
      navigate("/patient-login");
    }
  };

  return (
    <div className="displayDoctor-section" ref={sectionRef}>
      <h2 className="displayDoctor-title">Meet Our Specialists</h2>

      <div className="displayDoctor-slider-container">
        {/* LEFT BUTTON */}
        <button className="displayDoctor-nav-btn left" onClick={scrollLeft}>
          ‹
        </button>

        {/* SLIDER */}
        <div className="displayDoctor-slider" ref={sliderRef}>
          {doctors.map((doc, index) => (
            <div
              key={doc._id} // ✅ FIXED (important)
              className={`displayDoctor-card ${visible ? "show" : ""}`}
              style={{ transitionDelay: `${index * 0.1}s` }} // 🔥 stagger
            >
              {/* IMAGE */}
              <div className="displayDoctor-image">
                <img
                  src={doc.profileImage || doctorImg}
                  alt={doc.name}
                  onError={(e) => (e.target.src = doctorImg)}
                />
              </div>

              {/* DETAILS */}
              <h3>{doc.name}</h3>
              <p className="displayDoctor-spec">{doc.specialization}</p>
              <p>{doc.experience} years experience</p>

              {/* BUTTON */}
              <button className="displayDoctor-book-btn" onClick={handleClick}>
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <button className="displayDoctor-nav-btn right" onClick={scrollRight}>
          ›
        </button>
      </div>
    </div>
  );
}

export default DisplayDoctor;
