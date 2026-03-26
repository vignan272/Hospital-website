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
            <Link to="/Nephrology">Nephrology</Link>
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/387/387569.png" />
            <Link to="/specialties/Oncology">Oncology</Link>
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" />
            <Link to="/specialties/Critical">Emergency & Critical Care</Link>
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" />
            <Link to="/specialties/Urology">Urology</Link>
          </div>

          {showMore && (
            <>
              <div className="ex-card">
                <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" />
                Organ Transplantation
              </div>

              <div className="ex-card">
                <img src="https://cdn-icons-png.flaticon.com/512/387/387569.png" />
                <Link to="/specialties/Orthopedices">Orthopedices</Link>
              </div>

              <div className="ex-card">
                <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" />
                Robotic Surgery
              </div>

              <div className="ex-card">
                <img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" />
                <Link to="/specialties/Gynecology">Obstetric & Gynecology</Link>
              </div>
            </>
          )}
        </div>

        {!showMore && (
          <button className="view-more" onClick={() => setShowMore(true)}>
            View More
          </button>
        )}
      </div>

      {/* RIGHT SECTION */}

      <div className="excellence-right">
        <div className="women-header">Women & Child</div>

        <div className="women-grid">
          <div className="women-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" />
            <p>Gynecology</p>
          </div>

          <div className="women-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" />
            <p>Obstetrics</p>
          </div>

          <div className="women-card">
            <img src="https://cdn-icons-png.flaticon.com/512/387/387569.png" />
            <p>Pregnancy Delivery</p>
          </div>

          <div className="women-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" />
            <p>Child Care</p>
          </div>

          <div className="women-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" />
            <p>NICU</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Excellence;
