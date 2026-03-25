import React from 'react'
import "./Offer.css"
const Offer = () => {
  return (
    <div>
      <div class="offers">
  <div class="header">
    <h1>Offers</h1>
    <select>
      <option>Select Location</option>
      <option>Sangamner</option>
      <option>Kakinada</option>
      <option>Warangal</option>
    </select>
  </div>

  <div class="cards">

    {/* <!-- Card 1 --> */}
    <div class="card">
      <img src="https://static.vecteezy.com/system/resources/previews/027/298/490/large_2x/doctor-posing-portrait-free-photo.jpg" alt="Offer Image"/>
      <div class="content">
        <h3>Exclusive Health Checkup Package for Women! -Sangamner</h3>
        <p class="location">SANGAMNER | Mar 31, 2026</p>
        <button>Avail Offer</button>
      </div>
    </div>

    {/* <!-- Card 2 --> */}
    <div class="card">
      <img src="https://static.vecteezy.com/system/resources/previews/027/298/490/large_2x/doctor-posing-portrait-free-photo.jpg" alt="Offer Image"/>
      <div class="content">
        <h3>Exclusive Health Checkup Package - Kakinada</h3>
        <p class="location">KAKINADA | Mar 31, 2026</p>
        <button>Avail Offer</button>
      </div>
    </div>

    {/* <!-- Card 3 --> */}
    <div class="card">
      <img src="https://static.vecteezy.com/system/resources/previews/027/298/490/large_2x/doctor-posing-portrait-free-photo.jpg" alt="Offer Image"/>
      <div class="content">
        <h3>Kidney Stones Special Screening Package - Warangal</h3>
        <p class="location">WARANGAL | Jun 30, 2026</p>
        <button>Avail Offer</button>
      </div>
    </div>

  </div>
</div>
    </div>
  )
}

export default Offer
