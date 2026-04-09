import React, { useState } from "react";
import "./InsurancePartners.css";

const data = [
  // TPAs (Using Medical/Document Icons)
  {
    name: "medi assist",
    label: "Medi Assist",
    location: "delhi",
    type: "tpa",
    icon: "https://flamingomedia.mx/medi_assist/img/banner_img_1.png",
  },
  {
    name: "fhpl",
    label: "FHPL",
    location: "mumbai",
    type: "tpa",
    icon: "https://www.priyaveda.com/assets/img/Mediclaim/Cashless/fhpl.jpg",
  },
  {
    name: "paramount",
    label: "Paramount",
    location: "bangalore",
    type: "tpa",
    icon: "https://toppng.com/uploads/preview/paramount-network-logo-vector-free-download-11573914010okag8ij04y.png",
  },
  {
    name: "raksha",
    label: "Raksha",
    location: "delhi",
    type: "tpa",
    icon: "https://yashamanhospital.com/wp-content/uploads/2023/11/raksha.png",
  },

  // Carriers (Using Shield/Finance Icons)
  {
    name: "reliance",
    label: "Reliance",
    location: "delhi",
    type: "carrier",
    icon: "https://1000logos.net/wp-content/uploads/2021/08/Reliance-Industries-Limited-RIL-Logo-1985.png",
  },
  {
    name: "hdfc",
    label: "HDFC ERGO",
    location: "mumbai",
    type: "carrier",
    icon: "https://inhire.in/wp-content/uploads/2024/05/HDFC-BANK-INHIRE-HDFC-JOB.jpg",
  },
  {
    name: "sbi",
    label: "SBI General",
    location: "bangalore",
    type: "carrier",
    icon: "https://www.newznew.com/wp-content/uploads/2024/05/SBI-General-Unveils-Bima-Central.png",
  },
  {
    name: "birla",
    label: "Aditya Birla",
    location: "delhi",
    type: "carrier",
    icon: "https://4.bp.blogspot.com/-OHLwyOL4s6w/UCx_NHNxYLI/AAAAAAAAEEk/0NdzayY3UVs/s1600/aditya+birla+group+logo-2.jpg",
  },
  {
    name: "chola",
    label: "Chola MS",
    location: "mumbai",
    type: "carrier",
    icon: "https://5.imimg.com/data5/SELLER/Default/2024/6/428131644/ZN/PJ/JQ/58739077/how-to-check-cholamandalam-ms-health-insurance-policy-status.jpg",
  },
  {
    name: "iffco",
    label: "Iffco Tokio",
    location: "bangalore",
    type: "carrier",
    icon: "https://image3.mouthshut.com/images/imagesp/925715867s.png",
  },
  {
    name: "icici",
    label: "ICICI Lombard",
    location: "delhi",
    type: "carrier",
    icon: "https://images.seeklogo.com/logo-png/38/1/icici-lombard-logo-png_seeklogo-386969.png",
  },
  {
    name: "tata",
    label: "TATA AIG",
    location: "mumbai",
    type: "carrier",
    icon: "https://img-cdn.publive.online/fit-in/1200x675/filters:format(webp)/smstreet/media/media_files/qgEcI8mXxUel9by0r4B3.jpg",
  },
];

export default function InsurancePartners() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");

  const filterItems = (type) => {
    return data.filter((item) => {
      const matchType = item.type === type;
      const matchSearch = item.label
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchLocation = location === "all" || item.location === location;
      return matchType && matchSearch && matchLocation;
    });
  };

  return (
    <div className="ins-container">
      {/* Header with Title and Controls on opposite sides */}
      <div className="ins-header-flex">
        <div className="ins-title-area">
          <h1>Healthcare Network</h1>
          <p>Cashless healthcare with global leaders</p>
        </div>

        <div className="ins-controls">
          <select
            className="ins-select"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="all">📍 All Cities</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
            <option value="bangalore">Bangalore</option>
          </select>
          <div className="search-input-group">
            <input
              className="ins-input"
              type="text"
              placeholder="Search provider..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon-btn">🔍</span>
          </div>
        </div>
      </div>

      <PartnerSection title="TPA Partners" list={filterItems("tpa")} />
      <PartnerSection
        title="Insurance Carriers"
        list={filterItems("carrier")}
      />
    </div>
  );
}

function PartnerSection({ title, list }) {
  if (list.length === 0) return null;
  return (
    <div className="ins-section">
      <h2 className="ins-section-title">{title}</h2>
      <div className="ins-grid">
        {list.map((item, index) => (
          <div
            className="ins-card animate-fade-in"
            key={item.name}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="ins-image-box">
              <img src={item.icon} alt={item.label} className="ins-logo-img" />
            </div>
            <h3>{item.label}</h3>
            <span className="ins-tag">{item.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
