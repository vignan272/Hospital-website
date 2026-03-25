import React, { useEffect, useRef } from "react";
import "./About.css";

function About() {
  const sectionRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const pos = sectionRef.current.getBoundingClientRect().top;
      const screen = window.innerHeight;

      if (pos < screen - 100) {
        sectionRef.current.classList.add("show");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="about-medicover" ref={sectionRef}>
      <div className="about-container">
        {/* TEXT SECTION */}

        <div className="about-text">
          <h2>Bringing European Health Standards To India</h2>

          <p>
            Medicover is the leading Multispecialty Hospital chain in India. It
            is one of the largest healthcare providers in Europe with a
            significant presence in India.
          </p>

          <p>
            The group provides a broad spectrum of healthcare services including
            clinics, hospitals, fertility centres and diagnostic labs with
            advanced medical technologies.
          </p>

          {/* STATS SECTION */}

          <div className="about-stats">
            <div className="stat">
              <h3>24+</h3>
              <p>Years Experience</p>
            </div>

            <div className="stat">
              <h3>040 68334455</h3>
              <p>Call to ask any questions</p>
            </div>
          </div>
        </div>

        {/* IMAGE SECTION */}

        <div className="about-images">
          <img
            src="https://www.medicoverhospitals.in/images/bring01.webp"
            className="img-main"
            alt="hospital"
          />

          <img
            src="https://www.medicoverhospitals.in/images/bring02.webp"
            className="img-overlay"
            alt="hospital"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
