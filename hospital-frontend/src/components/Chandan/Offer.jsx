import React from "react";
import "./Offer.css";

const Offer = () => {
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
          {/* Card 1 */}
          <div class="card_offers">
            <div class="card-badge_offers">🔥 Popular</div>
            <img
              src="https://static.vecteezy.com/system/resources/previews/027/298/490/large_2x/doctor-posing-portrait-free-photo.jpg"
              alt="Offer Image"
              class="card-image_offers"
            />
            <div class="card-content_offers">
              <h3 class="card-title_offers">
                Exclusive Health Checkup Package for Women!
              </h3>
              <div class="location-tag_offers">
                <span class="location-icon_offers">📍</span>
                <span>SANGAMNER</span>
              </div>
              <div class="date-tag_offers">
                <span class="date-icon_offers">📅</span>
                <span>Mar 31, 2026</span>
              </div>
              <div class="offer-details_offers">
                <span class="discount-badge_offers">40% OFF</span>
                <span class="validity_offers">Limited slots</span>
              </div>
              <button class="avail-btn_offers">Avail Offer →</button>
            </div>
          </div>

          {/* Card 2 */}
          <div class="card_offers">
            <div class="card-badge_offers badge-featured_offers">
              ✨ Featured
            </div>
            <img
              src="https://static.vecteezy.com/system/resources/previews/027/298/490/large_2x/doctor-posing-portrait-free-photo.jpg"
              alt="Offer Image"
              class="card-image_offers"
            />
            <div class="card-content_offers">
              <h3 class="card-title_offers">
                Exclusive Health Checkup Package
              </h3>
              <div class="location-tag_offers">
                <span class="location-icon_offers">📍</span>
                <span>KAKINADA</span>
              </div>
              <div class="date-tag_offers">
                <span class="date-icon_offers">📅</span>
                <span>Mar 31, 2026</span>
              </div>
              <div class="offer-details_offers">
                <span class="discount-badge_offers">35% OFF</span>
                <span class="validity_offers">Limited slots</span>
              </div>
              <button class="avail-btn_offers">Avail Offer →</button>
            </div>
          </div>

          {/* Card 3 */}
          <div class="card_offers">
            <div class="card-badge_offers badge-limited_offers">⚡ Limited</div>
            <img
              src="https://static.vecteezy.com/system/resources/previews/027/298/490/large_2x/doctor-posing-portrait-free-photo.jpg"
              alt="Offer Image"
              class="card-image_offers"
            />
            <div class="card-content_offers">
              <h3 class="card-title_offers">
                Kidney Stones Special Screening Package
              </h3>
              <div class="location-tag_offers">
                <span class="location-icon_offers">📍</span>
                <span>WARANGAL</span>
              </div>
              <div class="date-tag_offers">
                <span class="date-icon_offers">📅</span>
                <span>Jun 30, 2026</span>
              </div>
              <div class="offer-details_offers">
                <span class="discount-badge_offers">50% OFF</span>
                <span class="validity_offers">Early bird</span>
              </div>
              <button class="avail-btn_offers">Avail Offer →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
