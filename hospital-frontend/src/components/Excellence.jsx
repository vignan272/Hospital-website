import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Excellence.css";
function Excellence() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="excellence">
      {/* LEFT SECTION */}

      <div className="excellence-left">
        <h2>Center of Excellence</h2>

        <div className="excellence-grid">
          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/833/833472.png" />
            <Link to="/specialties/cardiology">Cardiology</Link>
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" />
            <Link to="/specialties/cardiothoracic">Cardiothoracic</Link>
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" />
            <Link to="/specialties/Neurology">Neuro Sciences</Link>
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" />
            <Link to="/specialties/Gastroenterology">Gastroenterology</Link>
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" />
            <Link to="/specialties/Nephrology">Nephrology</Link>
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/387/387569.png" />
            <Link to="/specialties/Oncology">Oncology</Link>
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" />
            <Link to="/specialties/Surgery">General Surgery</Link>
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" />
            <Link to="/specialties/Andrology">Andrology</Link>
          </div>

          {showMore && (
            <>
              <div className="ex-card">
                <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" />
                <Link to="/specialties/Critical">Critical care</Link>
              </div>

              <div className="ex-card">
                <img src="https://cdn-icons-png.flaticon.com/512/387/387569.png" />
                <Link to="/doctors/specialty/orthopedics">Orthopedices</Link>
              </div>

              <div className="ex-card">
                <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" />
                <Link to="/specialties/Cosmetic">Cosmetic Surgery</Link>
              </div>

              <div className="ex-card">
                <img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" />
                <Link to="/specialties/Gynecology">Obstetric & Gynecology</Link>
              </div>
            </>
          )}
        </div>

        <button className="view-more" onClick={() => setShowMore(!showMore)}>
          {showMore ? "View Less" : "View More"}
        </button>
      </div>

      {/* RIGHT SECTION */}

      <div className="excellence-right">
        <div className="women-header">Women & Child</div>

        <div className="women-grid">
          <Link
            to="/doctors/specialty/gynecology"
            className="women-card"
            style={{ textDecoration: "none" }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" />
            <p>Gynecology</p>
          </Link>

          <Link
            to="/Medicine"
            className="women-card"
            style={{ textDecoration: "none" }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" />
            <p>Medicine</p>
          </Link>

          <Link
            to="/doctors"
            className="women-card"
            style={{ textDecoration: "none" }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/387/387569.png" />
            <p>Doctor</p>
          </Link>

          <Link
            to="/home-care"
            className="women-card"
            style={{ textDecoration: "none" }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" />
            <p>Home Care</p>
          </Link>

          <Link
            to="/Symptom"
            className="women-card"
            style={{ textDecoration: "none" }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" />
            <p>NICU</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Excellence;
