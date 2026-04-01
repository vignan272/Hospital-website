import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomeServicesSlider.css";

// 👉 Use your existing services (replace if needed)
const services = [
  { name: "Preventive Health", route: "/preventive-health" },
  { name: "Diagnostic Tests", route: "/diagnostic-tests" },
  { name: "Home Care", route: "/home-care" },
  { name: "Offers", route: "/offers" },
];

function HomeServicesSlider() {
  const navigate = useNavigate();

  return (
    <section className="home-services">
      <h2>Our Services</h2>

      <div className="services-slider">
        {services.map((service, index) => (
          <div
            className="service-slide-card"
            key={index}
            onClick={() => navigate(service.route)}
          >
            <div className="service-content">
              <h3>{service.name}</h3>
              <p>Explore our {service.name.toLowerCase()} services</p>
              <button>View</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeServicesSlider;
