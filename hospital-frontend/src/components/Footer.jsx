import React from "react";
import footerImg from "../images/footerImg.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* COLUMN 1 */}
        <div className="footer-col footer-about">
          <img src={footerImg} className="footer-logo" alt="Medicover logo" />

          <p className="footer-tag">Caring for your health is all we do</p>

          <p className="footer-desc">
            Medicover is a globally recognised healthcare brand with operations
            in multiple countries providing world-class medical services and
            patient care.
          </p>
        </div>

        {/* COLUMN 2 */}
        <div className="footer-col">
          <h3>FOR PATIENTS</h3>

          <ul>
            <li>Hospitals</li>
            <li>Doctors</li>
            <li>Surgery Cost</li>
            <li>Health Checkups</li>
            <li>Medicines</li>
            <li>Symptoms</li>
            <li>Diseases</li>
            <li>Procedure</li>
          </ul>
        </div>

        {/* COLUMN 3 */}
        <div className="footer-col">
          <h3>COMPANY</h3>

          <ul>
            <li>About Us</li>
            <li>Leadership Team</li>
            <li>Publications</li>
            <li>Careers</li>
            <li>News Room</li>
            <li>Success Stories</li>
            <li>Contact Us</li>
            <li>Privacy Policies</li>
          </ul>
        </div>

        {/* COLUMN 4 */}
        <div className="footer-col">
          <h3>QUICK LINKS</h3>

          <ul>
            <li>Woman And Child</li>
            <li>Book An Appointment</li>
            <li>Diagnostics And Tests</li>
            <li>Home Health Services</li>
            <li>Blogs</li>
            <li>Fitness & Health Calculators</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Medico Hospital. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
