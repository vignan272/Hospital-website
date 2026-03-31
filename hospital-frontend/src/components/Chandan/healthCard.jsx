import { useState } from "react";
import doctorImg from "../../images/FamilyHealth.png"; // your image

import "./healthCard.css";

function HealthCard() {
  const [active, setActive] = useState("none");
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    ward: "",
    doctor: "",
    date: "",
  });

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle actions
  const handleAction = () => {
    if (active === "hospital") {
      setResult({
        icon: "🛏️",
        title: "Bed Booked Successfully",
        detail: `Ward: ${formData.ward || "Not selected"}`,
      });
    }

    if (active === "chamber") {
      setResult({
        icon: "👨‍⚕️",
        title: "Appointment Confirmed",
        detail: `Doctor: ${formData.doctor || "Not selected"}`,
      });
    }
  };

  return (
    <div className="health-page_healthCare">
      {/* HERO */}
      <section
        className="hero-bg_healthCare"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,102,204,0.5)), url(${doctorImg})`,
        }}
      >
        <div className="hero-content_healthCare">
          <h1>
            Health Care <br />
            <span>For Whole Family</span>
          </h1>

          <p>
            In healthcare sector, service excellence is the facility of the
            hospital as healthcare service provider to consistently.
          </p>

          <button
            className="hero-btn_healthCare"
            onClick={() => {
              document.querySelector(".services_healthCare")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Check Our Services
          </button>
        </div>
      </section>

      {/* CARDS */}
      <section className="services_healthCare">
        <div
          className={`card_healthCare ${active === "hospital" ? "active_healthCare" : ""}`}
          onClick={() => {
            setActive("hospital");
            setResult(null);
          }}
        >
          <h3>Hospitality</h3>
          <p>
            Clinical excellence must be the priority for any health care
            provider.
          </p>
        </div>

        <div
          className={`card_healthCare ${active === "emergency" ? "active_healthCare" : ""}`}
          onClick={() => {
            setActive("emergency");
            setResult(null);
          }}
        >
          <h3>Emergency Care</h3>
          <p>
            Clinical excellence must be the priority for any health care
            provider.
          </p>
        </div>

        <div
          className={`card_healthCare ${active === "chamber" ? "active_healthCare" : ""}`}
          onClick={() => {
            setActive("chamber");
            setResult(null);
          }}
        >
          <h3>Chamber Service</h3>
          <p>
            Clinical excellence must be the priority for any health care
            provider.
          </p>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <div className="dynamic-layout_healthCare">
        {/* FORM SECTION */}
        <div className="form-section_healthCare">
          {active === "hospital" && (
            <div className="action-box_healthCare">
              <h2>Book a Bed</h2>

              <input
                name="name"
                placeholder="Patient Name"
                onChange={handleChange}
              />
              <input name="age" placeholder="Age" onChange={handleChange} />

              <select name="ward" onChange={handleChange}>
                <option>Select Ward</option>
                <option>General</option>
                <option>ICU</option>
                <option>Private Room</option>
              </select>

              <button className="action-btn_healthCare" onClick={handleAction}>
                Confirm Booking
              </button>
            </div>
          )}

          {active === "emergency" && (
            <div className="action-box_healthCare">
              <h2>Emergency Support</h2>
              <p>Click below to call emergency services</p>

              <a href="tel:+106723563567" className="action-btn_healthCare">
                📞 Call Now
              </a>
            </div>
          )}

          {active === "chamber" && (
            <div className="action-box_healthCare">
              <h2>Book Appointment</h2>

              <input
                name="name"
                placeholder="Patient Name"
                onChange={handleChange}
              />
              <input type="date" name="date" onChange={handleChange} />

              <select name="doctor" onChange={handleChange}>
                <option>Select Doctor</option>
                <option>General Physician</option>
                <option>Cardiologist</option>
                <option>Pediatrician</option>
              </select>

              <button className="action-btn_healthCare" onClick={handleAction}>
                Book Appointment
              </button>
            </div>
          )}
        </div>

        {/* RESULT SECTION */}
        <div className="result-section_healthCare">
          {result && (
            <div className="result-card_healthCare">
              <div className="result-icon_healthCare">{result.icon}</div>
              <h3>{result.title}</h3>
              <p>{result.detail}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HealthCard;
