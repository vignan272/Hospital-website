import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TopHeader.css";
import ambulance from "../images/ambulance.png";

function TopHeader() {
  const ambulanceRef = useRef();
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery && inputRef.current) {
      inputRef.current.value = searchQuery;
      moveAmbulance();
    }
  }, [location]);

  const moveAmbulance = () => {
    if (inputRef.current && inputRef.current.value.length > 0) {
      const headerWidth = document.querySelector(
        ".top-header_topHeader",
      ).offsetWidth;
      const ambulanceWidth = ambulanceRef.current.offsetWidth;
      const moveDistance = headerWidth - ambulanceWidth - 10;

      ambulanceRef.current.style.transform = `translateX(${moveDistance}px)`;
    } else if (ambulanceRef.current) {
      ambulanceRef.current.style.transform = "translateX(0px)";
    }
  };

  const openWhatsApp = () => {
    const message = "Book an appointment";
    const url = `https://wa.me/917013525030?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = inputRef.current.value.trim();
      if (query) {
        navigate(`/doctors?search=${encodeURIComponent(query)}`);
      } else {
        navigate("/doctors");
      }
    }
  };

  return (
    <div className="top-header_topHeader">
      <ul className="list_topHeader">
        <li>
          <a
            href="tel:+917013525030"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            📞 +91 7013525030
          </a>
        </li>

        <li>
          <span className="whatsapp-contact_topHeader" onClick={openWhatsApp}>
            <i className="fa-brands fa-whatsapp"></i> WhatsApp
          </span>
        </li>

        <li onClick={() => navigate("/blog")}>👤 Patient Portal</li>

        <li onClick={() => navigate("/home-care")}>🏥 Home Care</li>
      </ul>

      <div className="search-box_topHeader">
        <i className="fa fa-search"></i>

        <input
          type="text"
          placeholder="Search Doctor"
          ref={inputRef}
          onInput={moveAmbulance}
          onKeyDown={handleSearch}
        />
      </div>

      <img
        src={ambulance}
        className="ambulance-img_topHeader"
        ref={ambulanceRef}
        alt="Ambulance"
      />
    </div>
  );
}

export default TopHeader;
