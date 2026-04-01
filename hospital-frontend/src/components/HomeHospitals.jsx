import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hospitalData } from "../data/hospitals"; // ✅ use central data
import "./HomeHospitals.css";

function HomeHospitals() {
  const navigate = useNavigate();
  const cities = Object.keys(hospitalData);
  useEffect(() => {
    Object.values(hospitalData).forEach((item) => {
      const img = new Image();
      img.src = item.img;
    });
  }, []);

  return (
    <section className="home-hospitals">
      <h2>Our Hospitals</h2>

      <div className="home-slider">
        {cities.map((city) => (
          <div className="home-card" key={city}>
            <div className="flip-inner">
              {/* FRONT */}
              <div className="card-front">
                <h3>{city}</h3>
              </div>

              {/* BACK */}
              <div className="card-back">
                <img
                  src={hospitalData[city].img}
                  alt={city}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x200?text=Hospital")
                  }
                />

                <h4>Ecstasy Hospital</h4>
                <p>{hospitalData[city].desc}</p>

                {/* 🔥 NAVIGATION */}
                <button onClick={() => navigate(`/Location/${city}`)}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeHospitals;
