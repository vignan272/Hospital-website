import React, { useState } from "react";
import "./AboutUs.css";

const AboutUs = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* HERO */}
      <div className="hero-content">
        <h1>Where caring for your Health is all we do</h1>
        <p>
          We are dedicated to providing unparalleled healthcare services
          worldwide. With advanced facilities and a compassionate team, your
          well-being is our priority.
        </p>
      </div>

      {/* ABOUT */}
      <section className="about-section">
        <div className="image-grid">
          <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600" />
          <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289" />
          <img src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b" />
          <img src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc" />

          <div className="play-btn">▶</div>
        </div>

        <div className="about-content">
          <h2>About Us</h2>
          <p>
            Ecstasy Solutions is a leading healthcare provider delivering
            high-quality services with advanced infrastructure and compassionate
            care. We operate across multiple locations with a strong commitment
            to innovation, patient satisfaction, and world-class treatment
            standards. Ecstasy is a leading Multispecialty Hospital chain with a
            significant presence in India. We provide a broad spectrum of health
            care services and have an extensive network of clinics, hospitals,
            specialty care facilities, Fertility Centers, and diagnostic labs.
            Medicover Hospitals is spread across the Four states of Telangana,
            Andhra Pradesh, Maharashtra and Karnataka treating millions of
            patients every year with a focus on augmenting healthcare standards
            in India. We have renowned medical teams who work with the greatest
            technologies and international evidence-based protocols which offer
            the most comprehensive treatment across all specialties of
            medicines.
          </p>

          <div className="contact">
            <div className="box">📞 040 68334455</div>
            <div className="box">✉ info@ecstasysolutions.com</div>
          </div>
        </div>
      </section>

      {/* SPECIALITY */}
      <div class="speciality-section">
        <div class="left-text">
          <h2>
            Ecstasy Solutions has also established <br />
            focus specialty centers
          </h2>
        </div>

        {/* <!-- ✅ REAL WRAPPER --> */}
        <div class="cards">
          <div class="special-card">
            <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800" />

            <div class="overlay">
              <div>
                <h3>Ecstasy</h3>
                <p>Women and Child Hospitals</p>
              </div>
            </div>
          </div>

          <div class="special-card">
            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800" />

            <div class="overlay">
              <div>
                <h3>Ecstasy</h3>
                <p>Cancer Institute</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* WHO */}
      <section class="who-section">
        {/* <!-- LEFT MAP --> */}
        <div class="map">
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" />
        </div>

        {/* <!-- RIGHT CONTENT --> */}
        <div class="who-content">
          <h2>Who we are ?</h2>

          <p>
            Ecstasy Solutions is one of the most respected healthcare brands in
            the world with presence in multiple countries across the globe.
          </p>

          {/* <!-- COUNTRY LIST --> */}
          <div class="countries">
            <ul>
              <li>Bosnia</li>
              <li>Bulgaria</li>
              <li>Denmark</li>
              <li>Georgia</li>
              <li>Greece</li>
              <li>India</li>
              <li>Norway</li>
              <li>Romania</li>
              <li>Sweden</li>
              <li>Ukraine</li>
            </ul>

            <ul>
              <li>Herzegovina</li>
              <li>Cyprus</li>
              <li>Finland</li>
              <li>Germany</li>
              <li>Hungary</li>
              <li>Moldova</li>
              <li>Poland</li>
              <li>Serbia</li>
              <li>Turkey</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CORE */}
      <section class="core-section">
        <h2 class="title">Core Value</h2>
        <p class="subtitle">
          Disaster Recovery Planning, Business Continuity Management, & Disaster
          Recovery.
        </p>

        <div class="core-container">
          {/* <!-- LEFT CARDS --> */}
          <div class="core-grid">
            <div class="card6">
              <img src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png" />
              <p>Teamwork</p>
            </div>

            <div class="card6">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
              <p>Entrepreneurship</p>
            </div>

            <div class="card6">
              <img src="https://cdn-icons-png.flaticon.com/512/4202/4202843.png" />
              <p>Empowerment</p>
            </div>

            <div class="card6">
              <img src="https://cdn-icons-png.flaticon.com/512/929/929426.png" />
              <p>Integrity</p>
            </div>

            <div class="card6">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" />
              <p>Passion for quality</p>
            </div>
          </div>

          {/* <!-- RIGHT BOX --> */}
          <div class="mission-box">
            <div class="mission">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
              <h3>Mission</h3>
              <p>"Caring for your health is all we do."</p>
            </div>

            <hr />

            <div class="vision">
              <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" />
              <h3>Vision</h3>
              <p>
                To be globally recognized for excellence in patient-centric
                healthcare with precision treatment and affordability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
