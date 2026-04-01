import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TopHeader.css";
import ambulance from "../images/ambulance.png";

function TopHeader() {
  const ambulanceRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    setSearch(searchQuery);
  }, [location]);

  useEffect(() => {
    moveAmbulance();
  }, [search]);

  const moveAmbulance = () => {
    if (search.length > 0 && ambulanceRef.current) {
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
      const query = search.trim();

      if (query) {
        navigate(`/doctors?search=${encodeURIComponent(query)}`);
      } else {
        navigate("/doctors");
      }

      // ✅ Smooth clear (UX improvement)
      setTimeout(() => {
        setSearch("");
      }, 200);
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
