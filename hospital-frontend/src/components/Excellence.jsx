import React, { useState } from "react";
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
            Cardiology
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" />
            Cardiothoracic
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" />
            Neuro Sciences
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" />
            Gastroenterology
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" />
            Nephrology
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/387/387569.png" />
            Oncology
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" />
            Emergency & Critical Care
          </div>

          <div className="ex-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" />
            Urology
          </div>

          {showMore && (
            <>
              <div className="ex-card">
                <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" />
                Organ Transplantation
              </div>

              <div className="ex-card">
                <img src="https://cdn-icons-png.flaticon.com/512/387/387569.png" />
                Orthopedics
              </div>

              <div className="ex-card">
                <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" />
                Robotic Surgery
              </div>

              <div className="ex-card">
                <img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" />
                Obstetric & Gynecology
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
