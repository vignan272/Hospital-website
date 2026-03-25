import React, { useState } from "react";
import "./Oncology.css";

const Oncology = ({ data }) => {

  const [activeCard, setActiveCard] = useState(null);

  const toggleRead = (index) => {
    if (activeCard === index) {
      setActiveCard(null);
    } else {
      setActiveCard(index);
    }
  };

  return (
    <div className="oncology">

      <h2>{data.title2}</h2>

      <p className="subtitle">
        {data.para2}
      </p>

      <div className="treatment-container">
        {data.box1.map((item, index) => (
          <div
            key={index}
            className={`treatment-card ${activeCard === index ? "active" : ""}`}
          >
            <h3>{item.heading}</h3>

            <p>{item.p1}</p>

            <ul>
              <li>{item.li1}</li>
              <li>{item.li2}</li>
              <li>{item.li3}</li>
            </ul>

            {activeCard === index && (
              <div className="more-text">
                <p>{item.p2}</p>
              </div>
            )}

            <button className="read-btn" onClick={() => toggleRead(index)}>
              {activeCard === index ? "Read Less ↑" : "Read More →"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Oncology;