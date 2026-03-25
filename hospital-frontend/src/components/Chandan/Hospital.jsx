import React, { useState } from "react";
import "./Hospital.css";

const Hospital = () => {
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

  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState(null);

  const specialtyData = {
    Cardiology: {
      title: "Cardiology ❤️",
      desc: "Focuses on heart and blood vessels.",
      issues: "Heart attack, BP, chest pain",
    },
    Neurology: {
      title: "Neurology 🧠",
      desc: "Brain and nervous system.",
      issues: "Stroke, migraine, seizures",
    },
    Orthopedics: {
      title: "Orthopedics 🦴",
      desc: "Bones and joints.",
      issues: "Fractures, arthritis, back pain",
    },
    Gynecology: {
      title: "Gynecology 👩",
      desc: "Women’s health.",
      issues: "Pregnancy, PCOS, fertility",
    },
    Dermatology: {
      title: "Dermatology 🧴",
      desc: "Skin and hair.",
      issues: "Acne, allergy, hair loss",
    },
  };

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

  return (
    <div>
      <div className="breadcrumb">Home / Hospitals</div>

      {/* HERO */}
      <section className="hero2">
        <div className="hero-left">
          <h1>Ecstasy Hospitals – Trusted Multispeciality Hospitals</h1>
          <p>Expert doctors, advanced technology, and patient-first care.</p>

          <div className="buttons">
            <button className="blue">Book Appointment</button>
            <button className="green">WhatsApp</button>
            <button className="light">Second Opinion</button>
          </div>

          {/* SPECIALTY */}
          <div className="specialty-slider">
            <div id="specialtyInfo">
              {selectedSpec && specialtyData[selectedSpec] && (
                <div className="info-card">
                  <h2>{specialtyData[selectedSpec]?.title}</h2>
                  <p>
                    <b>What is it:</b> {specialtyData[selectedSpec]?.desc}
                  </p>
                  <p>
                    <b>Common Issues:</b> {specialtyData[selectedSpec]?.issues}
                  </p>
                </div>
              )}
            </div>

            {Object.keys(specialtyData).map((spec) => (
              <div
                key={spec}
                className={`specialty-circle ${selectedSpec === spec ? "active" : ""}`}
                onClick={() => setSelectedSpec(spec)}
              >
                <div className="circle-img">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2966/2966489.png"
                    alt=""
                  />
                </div>
                <p>{spec}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-img">
          <img
            src="https://www.medicoverhospitals.in/images/bring01.webp"
            alt=""
          />
        </div>
      </section>

      {/* STATES */}
      <div className="states">
        <h2>State We Are Serving</h2>

        <div className="state-grid">
          <div className="state-card">
            <img
              src="https://www.mapsofindia.com/maps/telangana/telangana-map.jpg"
              alt=""
            />
            <div className="state-name">Telangana</div>
          </div>

          <div className="state-card">
            <img
              src="https://www.pikpng.com/pngl/m/209-2094688_andhra-pradesh-with-23-districts-tada-andhra-pradesh.png"
              alt=""
            />
            <div className="state-name">Andhra Pradesh</div>
          </div>

          <div className="state-card">
            <img
              src="https://www.mapsofindia.com/maps/maharashtra/maharashtra-map.jpg"
              alt=""
            />
            <div className="state-name">Maharashtra</div>
          </div>

          <div className="state-card">
            <img
              src="https://www.mapsofindia.com/maps/karnataka/karnataka-map.jpg"
              alt=""
            />
            <div className="state-name">Karnataka</div>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="section">
        <h2>Our Hospitals Across Other Cities</h2>

        <div className="filters1">
          {data.map((city) => (
            <label className="filter-box" key={city}>
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
        <div className="cards">
          {filteredCities.map((city) => (
            <div className="card5" key={city}>
              <img
                src={`https://picsum.photos/100/80?random=${city}`}
                alt={city}
                onError={(e) => (e.target.style.display = "none")}
              />
              <div>
                <h3>{city}</h3>
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
