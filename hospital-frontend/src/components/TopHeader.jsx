import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TopHeader.css";
import ambulance from "../images/ambulance (2).png";

function TopHeader() {
  const ambulanceRef = useRef();
  const inputRef = useRef();
  const navigate = useNavigate();

  const moveAmbulance = () => {
    if (inputRef.current.value.length > 0) {
      const headerWidth = document.querySelector(".top-header").offsetWidth;
      const ambulanceWidth = ambulanceRef.current.offsetWidth;
      const moveDistance = headerWidth - ambulanceWidth - 10;

      ambulanceRef.current.style.transform = `translateX(${moveDistance}px)`;
    } else {
      ambulanceRef.current.style.transform = "translateX(0px)";
    }
  };

  const openWhatsApp = () => {
    const message = "Book an appointment";
    const url = `https://wa.me/917013525030?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="top-header">
      <ul>
        <li>
          <a
            href="tel:+917013525030"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            📞 +91 7013525030
          </a>
        </li>
        <li>
          <span
            className="whatsapp-contact"
            onClick={openWhatsApp}
            style={{ cursor: "pointer" }}
          >
            <i className="fa-brands fa-whatsapp"></i> WhatsApp
          </span>
        </li>
        {/* ✅ WORKING REDIRECT */}
        <li onClick={() => navigate("/blog")} style={{ cursor: "pointer" }}>
          👤 Patient Portal
        </li>
        <li
          onClick={() => navigate("/home-care")}
          style={{ cursor: "pointer" }}
        >
          🏥 Home Care
        </li>{" "}
      </ul>

      <div className="search-box">
        <i className="fa fa-search"></i>

        <input
          type="text"
          placeholder="Search Doctor"
          ref={inputRef}
          onInput={moveAmbulance}
        />
      </div>

      <img
        src={ambulance}
        className="ambulance-img"
        ref={ambulanceRef}
        alt="Ambulance"
      />
    </div>
  );
}

export default TopHeader;
