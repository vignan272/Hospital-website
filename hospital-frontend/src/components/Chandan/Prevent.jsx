import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Prevent.css";
const Prevent = () => {
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [test, setTest] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const image = [
    {
      id: 1,
      img: "https://cubaheal.com/wp-content/uploads/2019/09/Pediatric-check-up.jpg",
      h3: "Master Health Checkup - Male",
      location: "hyderbad",
      package: "4000",
      test: "heart",
    },
    {
      id: "2",
      img: "https://pranaamhospitals.com/wp-content/uploads/2025/12/female.jpg",
      h3: "Master Health Checkup-Female",
      location: "Dehli",
      package: "6000",
      test: "Kindeny",
    },
    {
      id: "3",
      img: "https://www.healthathomes.com/packages/images/executive-health-check-up.jpeg",
      h3: "Executive Health Checkup",
      location: "hyderbad",
      package: "5000",
      test: "stone",
    },
  ];

  const filteredData = image.filter((item) => {
    return (
      (price === "" || item.package === price) &&
      (location === "" || item.location === location) &&
      (test === "" || item.test === test)
    );
  });

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

  const clearFilters = () => {
    setPrice("");
    setLocation("");
    setTest("");
  };

  return (
    <div>
      <div class="health-banner">
        <div class="banner-container">
          <div class="banner-left">
            <h1>Prevention is Better than Cure</h1>
            <p class="subtitle">Find The Best Health Checkup Packages</p>

            <div class="location-box">
              <h3>Our Locations are</h3>

              <div class="locations">
                <p>
                  <i class="fa-solid fa-location-dot"></i> Telangana
                </p>
                <p>
                  <i class="fa-solid fa-location-dot"></i> Andhra Pradesh
                </p>
                <p>
                  <i class="fa-solid fa-location-dot"></i> Maharashtra
                </p>
                <p>
                  <i class="fa-solid fa-location-dot"></i> Karnataka
                </p>
              </div>
            </div>

            <div class="banner-buttons">
              <button className="book-btn11" onClick={handleClick}>
                <i className="fa-solid fa-calendar"></i> Book Health Checkup
              </button>

              <button class="call-btn11">
                <a
                  href="tel:+917013525030"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <i class="fa-solid fa-phone"></i> Call +91 7013 525030
                </a>
              </button>
            </div>
          </div>

          <div class="banner-right">
            <img
              src="https://tlz.ae/wp-content/uploads/2022/12/TZ-featured-image.png"
              alt="family"
            />
          </div>
        </div>
      </div>

      <div class="packages">
        <h2 class="title">Our Health Checkup Packages in India</h2>

        <div class="packages-container">
          {/* <!-- FILTER SIDEBAR --> */}

          <div class="filters">
            <div class="filter-header">
              <h3>Filters</h3>
              <a href="#" onClick={clearFilters}>
                Clear all
              </a>
            </div>

            <select
              className="filter-box"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Health Packages</option>
              <option value="4000">4000/-</option>
              <option value="5000">5000/-</option>
              <option value="6000">6000/-</option>
            </select>

            <select
              className="filter-box"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Locations</option>
              <option value="hyderbad">Hyderabad</option>
              <option value="Dehli">Delhi</option>
            </select>

            <select
              className="filter-box"
              value={test}
              onChange={(e) => setTest(e.target.value)}
            >
              <option value="">Test Categories</option>
              <option value="Kindeny">Kidney</option>
              <option value="stone">Stone</option>
              <option value="heart">Heart</option>
            </select>
          </div>

          {/* <!-- PACKAGES --> */}

          <div class="package-grid">
            {filteredData.map((item) => (
              <div className="package-card" key={item.id}>
                <img src={item.img} />
                <div className="card-info">
                  <h3>{item.h3}</h3>
                  <button onClick={() => setSelectedItem(item)}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedItem && (
            <div className="modal">
              <div className="modal-content">
                <h2>{selectedItem.h3}</h2>
                <img src={selectedItem.img} width="200" />

                <p>
                  <b>Price:</b> ₹{selectedItem.package}
                </p>
                <p>
                  <b>Location:</b> {selectedItem.location}
                </p>
                <p>
                  <b>Test:</b> {selectedItem.test}
                </p>

                <p>
                  <b>Offer:</b> 20% Discount + Free Doctor Consultation
                </p>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="modal_button"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div class="health-info">
        <div class="container">
          <h2>
            Why Regular Health Checkups are More Important Than You Think?
          </h2>

          <p>
            It's easy to ignore your health when you feel fine. But many severe
            conditions like heart disease, diabetes, cancer and kidney disorders
            often develop quietly without apparent warning signs. By the time
            symptoms appear, it may already be too late. That's why a preventive
            health checkup isn't just a routine, it's a powerful way to secure
            your future health.
          </p>

          <p>
            At Medicover Hospitals, we believe that prevention is not only
            better than a cure but also the key to living well. We have
            affordable health checkup packages for every age group and
            lifestyle.
          </p>

          <h3>The benefits of regular health checkups include:</h3>

          <ul>
            <li>
              <strong>Early Detection of Diseases:</strong> Identify conditions
              such as hypertension, diabetes and heart disease before they
              become serious.
            </li>

            <li>
              <strong>Long-Term Cost Savings:</strong> Finding problems early
              lowers complications, cuts treatment expenses and helps avoid
              major surgeries.
            </li>

            <li>
              <strong>Address Lifestyle-Driven Risks:</strong> Stress, poor diet
              and inactivity raise the chances of lifestyle diseases.
            </li>

            <li>
              <strong>Personalized Care:</strong> From executive health checkups
              to master health checkups, we provide tailored solutions based on
              age and lifestyle.
            </li>

            <li>
              <strong>Peace of Mind:</strong> Packages like Child Health
              Checkup, Preconception and Antenatal packages support wellness at
              every stage of life.
            </li>
          </ul>

          <h2>Who Should Take These Packages?</h2>

          <p>
            We have preventive health checkups for everyone. Choosing the right
            package depends on your age, gender, lifestyle and medical
            background.
          </p>

          <h3>1. Working Professionals</h3>

          <p>
            Hectic work schedules and stress increase lifestyle disease risks.
            Executive health checkups and full-body checkups help detect heart
            disease, diabetes and chronic illness early.
          </p>

          <h3>2. Men and Women</h3>

          <p>
            Different health needs require different screenings. Our cancer
            screening packages and master health checkups cover vital health
            tests.
          </p>

          <h3>3. Elderly</h3>

          <p>
            With aging, health risks increase. Comprehensive cardiac checkups,
            kidney health packages and advanced heart screenings help protect
            long-term wellness.
          </p>

          <h3>4. Children</h3>

          <p>
            Healthy children grow into healthy adults. Our child health checkup
            package includes growth assessments and essential tests.
          </p>

          <h3>5. Couples</h3>

          <p>
            Couples planning a family can benefit from our preconception health
            package. Expecting mothers can take our antenatal health checkup
            package for complete care throughout pregnancy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Prevent;
