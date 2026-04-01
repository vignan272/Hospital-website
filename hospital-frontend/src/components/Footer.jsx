import React from "react";
import { Link } from "react-router-dom";
import footerImg from "../images/footerImg.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* COLUMN 1 */}
        <div className="footer-col footer-about">
          <img src={footerImg} className="footer-logo" alt="Ecstacy logo" />

          <p className="footer-tag">Caring for your health is all we do</p>

          <p className="footer-desc">
            Ecstacy is a globally recognised healthcare brand with operations in
            multiple countries providing world-class medical services and
            patient care.
          </p>
        </div>

        {/* COLUMN 2 */}
        <div className="footer-col">
          <h3>FOR PATIENTS</h3>
          <ul>
            <li>
              <Link to="/hospitalsLocation">Hospitals</Link>
            </li>
            <li>
              <Link to="/doctors">Doctors</Link>
            </li>
            <li>
              <Link to="/Surgery">Surgery Cost</Link>
            </li>
            <li>
              <Link to="/preventive-health">Health Checkups</Link>
            </li>
            <li>
              <Link to="/Medicine">Medicines</Link>
            </li>
            <li>
              <Link to="/Symptom">Symptoms</Link>
            </li>
            <li>
              <Link to="/Diseases">Diseases</Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 3 */}
        <div className="footer-col">
          <h3>COMPANY</h3>
          <ul>
            <li>
              <Link to="/AboutUs">About Us</Link>
            </li>
            <li>
              <Link to="/contactpage">Contact Us</Link>
            </li>
            <li>
              <Link to="/Success">Success Stories</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policies</Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 4 */}
        <div className="footer-col">
          <h3>QUICK LINKS</h3>
          <ul>
            <li>
              <Link to="/book-appointment">Book An Appointment</Link>
            </li>
            <li>
              <Link to="/diagnostic-tests">Diagnostics And Tests</Link>
            </li>
            <li>
              <Link to="/home-care">Home Health Services</Link>
            </li>
            <li>
              <Link to="/Blog">Blogs</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Ecstacy Hospital. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
