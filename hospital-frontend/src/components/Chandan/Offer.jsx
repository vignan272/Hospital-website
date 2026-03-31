import React, { useState } from "react";
import "./Offer.css";

const Offer = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample data for offers - you can expand this
  const offers = [
    {
      id: 1,
      h3: "Exclusive Health Checkup Package for Women!",
      img: "https://static.vecteezy.com/system/resources/previews/027/298/490/large_2x/doctor-posing-portrait-free-photo.jpg",
      package: "2999",
      location: "SANGAMNER",
      test: "Complete Blood Count, Lipid Profile, Thyroid Profile, Vitamin D, Vitamin B12, Blood Sugar, Liver Function Test, Kidney Function Test, Urine Analysis",
      discount: "40% OFF",
      validity: "Limited slots",
    },
    {
      id: 2,
      h3: "Exclusive Health Checkup Package",
      img: "https://static.vecteezy.com/system/resources/previews/027/298/490/large_2x/doctor-posing-portrait-free-photo.jpg",
      package: "2499",
      location: "KAKINADA",
      test: "Complete Blood Count, Lipid Profile, Thyroid Profile, Vitamin D, Blood Sugar, Liver Function Test",
      discount: "35% OFF",
      validity: "Limited slots",
    },
    {
      id: 3,
      h3: "Kidney Stones Special Screening Package",
      img: "https://static.vecteezy.com/system/resources/previews/027/298/490/large_2x/doctor-posing-portrait-free-photo.jpg",
      package: "3999",
      location: "WARANGAL",
      test: "Urine Analysis, Ultrasound KUB, Creatinine, Uric Acid, Calcium, Complete Blood Count",
      discount: "50% OFF",
      validity: "Early bird",
    },
  ];

  return (
    <div>
      <div class="offers-container_offers">
        <div class="header_offers">
          <div class="title-section_offers">
            <h1 class="main-title_offers">Exclusive Offers</h1>
            <p class="subtitle_offers">
              Limited time healthcare deals just for you
            </p>
          </div>
          <div class="select-wrapper_offers">
            <select class="location-select_offers">
              <option>📍 Select Location</option>
              <option>Sangamner</option>
              <option>Kakinada</option>
              <option>Warangal</option>
            </select>
          </div>
        </div>

        <div class="cards-grid_offers">
          {offers.map((offer, index) => (
            <div class="card_offers" key={offer.id}>
              <div
                class={`card-badge_offers ${
                  index === 0
                    ? ""
                    : index === 1
                      ? "badge-featured_offers"
                      : "badge-limited_offers"
                }`}
              >
                {index === 0
                  ? "🔥 Popular"
                  : index === 1
                    ? "✨ Featured"
                    : "⚡ Limited"}
              </div>
              <img
                src={offer.img}
                alt="Offer Image"
                class="card-image_offers"
              />
              <div class="card-content_offers">
                <h3 class="card-title_offers">{offer.h3}</h3>
                <div class="location-tag_offers">
                  <span class="location-icon_offers">📍</span>
                  <span>{offer.location}</span>
                </div>
                <div class="date-tag_offers">
                  <span class="date-icon_offers">📅</span>
                  <span>{index === 2 ? "Jun 30, 2026" : "Mar 31, 2026"}</span>
                </div>
                <div class="offer-details_offers">
                  <span class="discount-badge_offers">{offer.discount}</span>
                  <span class="validity_offers">{offer.validity}</span>
                </div>
                <button
                  class="avail-btn_offers"
                  onClick={() => setSelectedItem(offer)}
                >
                  Avail Offer →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedItem.h3}</h2>
            <img src={selectedItem.img} width="200" alt="Offer" />

            <p>
              <b>Price:</b> ₹{selectedItem.package}
            </p>
            <p>
              <b>Location:</b> {selectedItem.location}
            </p>
            <p>
              <b>Test:</b> {selectedItem.test}
            </p>

            <p>
              <b>Offer:</b> {selectedItem.discount} + Free Doctor Consultation
            </p>

            <button
              onClick={() => setSelectedItem(null)}
              className="modal_button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
