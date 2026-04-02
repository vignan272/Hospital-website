import React, { useState } from "react";
import "./Hospital.css";
import Tel from "../../images/Tel.jpeg";
import Ap from "../../images/Ap.jpeg";
import Maharastra from "../../images/Maharstra.jpeg";
import Karnataka from "../../images/karnataka.jpeg";
import { useNavigate } from "react-router-dom";

const Hospital = () => {
  const navigate = useNavigate();
  const data = [
    "Hyderabad",
    "Warangal",
    "Karimnagar",
    "Nizamabad",
    "Khammam",
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Tirupati",
  ];
  const hospitalImages = {
    Hyderabad: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    Warangal: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc",
    Karimnagar: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
    Nizamabad:
      "https://i.pinimg.com/originals/18/64/ed/1864edee1db21f36dad4f7ca1714f887.jpg",
    Visakhapatnam:
      "https://thearchitectsdiary.com/wp-content/uploads/2025/05/hospital-building-design-1-1200x899.jpg",
    Vijayawada:
      "https://www.bestmasterofscienceinnursing.com/wp-content/uploads/2015/03/Shesmedi-Hospital-modern-hospitals.jpg?x86614",
    Guntur:
      "https://www.ebhosworks.com.ng/wp-content/uploads/2022/10/Modern-hospital-exterior-design.jpg",
    Nellore:
      "https://www.yashodahospitals.com/wp-content/uploads/2024/07/Yashoda-Hospitals-Hitech-City-galllery-new.jpg",
    Khammam:
      "https://hospitalarchitects.in/sites/default/files/2024-02/Healthcare%20Architecture%20Designing%20for%20Wellness%20and%20Efficiency.jpg",
    Tirupati:
      "https://img.freepik.com/premium-photo/designing-hospital-buildings-patient-wellness-treatment-focus-care-architecture-concept-hospital-architecture-patient-wellness-carefocused-design-building-design_864588-273431.jpg",
  };

  const specialtyData = {
    Cardiology: {
      title: "Cardiology ❤️",
      desc: "Focuses on heart and blood vessels.",
      issues: "Heart attack, BP, chest pain",
      icon: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
    },

    Neurology: {
      title: "Neurology 🧠",
      desc: "Brain and nervous system.",
      issues: "Stroke, migraine, seizures",
      icon: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
    },

    Orthopedics: {
      title: "Orthopedics 🦴",
      desc: "Bones and joints.",
      issues: "Fractures, arthritis, back pain",
      icon: "https://cdn-icons-png.flaticon.com/512/2966/2966486.png",
    },

    Gynecology: {
      title: "Gynecology 👩",
      desc: "Women’s health.",
      issues: "Pregnancy, PCOS, fertility",
      icon: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
    },

    Dermatology: {
      title: "Dermatology 🧴",
      desc: "Skin and hair.",
      issues: "Acne, allergy, hair loss",
      icon: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
    },
  };
  const [selectedCities, setSelectedCities] = useState([]);

  const [selectedSpec, setSelectedSpec] = useState(null);

  /* FILTER LOGIC */
  const filteredCities =
    selectedCities.length === 0
      ? data
      : data.filter((c) => selectedCities.includes(c));

  const handleCheckbox = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const openWhatsApp = () => {
    const message = "Book an appointment";
    const url = `https://wa.me/917013525030?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="breadcrumb_hospitalPage">Home / Hospitals</div>

      {/* HERO */}
      <section className="hero2_hospitalPage">
        <div className="hero-container_hospitalPage">
          {/* LEFT SIDE */}
          <div className="hero-text_hospitalPage">
            <h1>
              Ecstacy Hospitals – Trusted Multispeciality Hospitals Across India
            </h1>

            <p>
              Welcome to Ecstacy Hospitals, modern medical equipment, and
              patient-centric care. We aim to make healthcare accessible for
              everyone.
            </p>

            <p>
              Our hospitals are equipped for emergency care, specialized
              treatment.
            </p>

            {/* BUTTONS */}
            <div className="hero-buttons_hospitalPage">
              <div
                className="btn-main_hospitalPage"
                onClick={() => navigate("/book-appointment")}
              >
                <span className="btn-icon_hospitalPage">📅</span>
                <span className="btn-text_hospitalPage">Book Appointment</span>
                <span className="btn-arrow_hospitalPage">↗</span>
              </div>

              <div className="btn-main_hospitalPage">
                <span className="btn-icon_hospitalPage">💬</span>
                <span
                  className="btn-text_hospitalPage"
                  onClick={openWhatsApp}
                  style={{ cursor: "pointer" }}
                >
                  What's up
                </span>
                <span className="btn-arrow_hospitalPage">↗</span>
              </div>

              <div
                className="btn-main_hospitalPage"
                onClick={() => navigate("/second-opinion")}
              >
                <span className="btn-icon_hospitalPage">📞</span>
                <span className="btn-text_hospitalPage">
                  Get Second Opinion
                </span>
                <span className="btn-arrow_hospitalPage">↗</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="hero-image_hospitalPage">
            <img
              src="https://www.medicoverhospitals.in/images/bring01.webp"
              alt="hospital"
            />
          </div>
        </div>
      </section>

      {/* SPECIALTY */}
      <h2 className="section-title_hospitalPage">Our Specialties</h2>
      <p className="section-subtitle_hospitalPage">
        Comprehensive care across key medical disciplines.
      </p>
      <div className="specialty-slider_hospitalPage">
        {Object.keys(specialtyData).map((spec) => (
          <div className="specialty-item_hospitalPage" key={spec}>
            <div
              className={`specialty-circle_hospitalPage ${selectedSpec === spec ? "active_hospitalPage" : ""}`}
              onClick={() =>
                setSelectedSpec(selectedSpec === spec ? null : spec)
              }
            >
              <div className="circle-img_hospitalPage">
                <img src={specialtyData[spec].icon} alt={spec} />
              </div>
              <p>{spec}</p>
            </div>

            {/* ✅ CARD UNDER THAT ICON ONLY */}
            {selectedSpec === spec && (
              <div className="info-card_hospitalPage">
                <h4>{specialtyData[spec].title}</h4>
                <p>{specialtyData[spec].desc}</p>
                <span>{specialtyData[spec].issues}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* STATES */}
      <div className="states_hospitalPage">
        <h2>State We Are Serving</h2>

        <div className="state-grid_hospitalPage">
          <div className="state-card_hospitalPage">
            <img src={Tel} alt="Telangana" />

            <div className="state-name_hospitalPage">Telangana</div>
          </div>

          <div className="state-card_hospitalPage">
            <img src={Ap} alt="Andhra Pradesh" />
            <div className="state-name_hospitalPage">Andhra Pradesh</div>
          </div>

          <div className="state-card_hospitalPage">
            <img src={Maharastra} alt="Maharashtra" />
            <div className="state-name_hospitalPage">Maharashtra</div>
          </div>

          <div className="state-card_hospitalPage">
            <img src={Karnataka} alt="Karnataka" />
            <div className="state-name_hospitalPage">Karnataka</div>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="section_hospitalPage">
        <h2>Our Hospitals Across Other Cities</h2>

        <div className="filters1_hospitalPage">
          {data.map((city) => (
            <label className="filter-box_hospitalPage" key={city}>
              <input
                type="checkbox"
                value={city}
                checked={selectedCities.includes(city)}
                onChange={() => handleCheckbox(city)}
              />
              <span>{city}</span>
            </label>
          ))}
        </div>

        {/* CARDS */}
        <div className="cards_hospitalPage">
          {filteredCities.map((doctors) => (
            <div className="card5_hospitalPage" key={doctors}>
              <img
                src={
                  hospitalImages[doctors] ||
                  "https://source.unsplash.com/300x200/?hospital"
                }
                alt={doctors}
              />
              <div>
                <h3>{doctors}</h3>
                <p>Ecstasy Hospital</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hospital;
