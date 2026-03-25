import React, { useRef } from "react";
import "./TopHeader.css";
import ambulance from "../images/ambulance (2).png";

function TopHeader() {
  const ambulanceRef = useRef();
  const inputRef = useRef();

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

  return (
    <div className="top-header">
      <ul>
        <li>📞 +91 9876543210</li>

        <li>
          <span className="whatsapp-contact">
            <i className="fa-brands fa-whatsapp"></i> WhatsApp
          </span>
        </li>

        <li>👤 Patient Portal</li>
        <li>🏥 Home Care</li>
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
