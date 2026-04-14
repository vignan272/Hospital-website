// Hospital.jsx

import React, { useState } from "react";
import "./Hospital.css";
import Tel from "../../images/Tel.jpeg";
import Ap from "../../images/Ap.jpeg";
import Maharastra from "../../images/Maharstra.jpeg";
import Karnataka from "../../images/karnataka.jpeg";
import { useNavigate } from "react-router-dom";

const Hospital = () => {
  const navigate = useNavigate();
  const data = [
    "Hyderabad",
    "Warangal",
    "Karimnagar",
    "Nizamabad",
    "Khammam",
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Tirupati",
  ];

  // ✅ CORRECT OUTSIDE HOSPITAL IMAGES URLS
  const hospitalImages = {
    Hyderabad:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=250&fit=crop",
    Warangal:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop",
    Karimnagar:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=250&fit=crop",
    Nizamabad:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=250&fit=crop",
    Visakhapatnam:
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=400&h=250&fit=crop",
    Vijayawada:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=400&h=250&fit=crop",
    Guntur:
      "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=400&h=250&fit=crop",
    Nellore:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop",
    Khammam:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&h=250&fit=crop",
    Tirupati:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop",
  };

  // ✅ 8 UNIQUE DIFFERENT ICONS FOR EACH SPECIALTY
  const specialtyData = {
    Cardiology: {
      title: "Cardiology",
      desc: "Expert heart care with advanced diagnostic and treatment facilities.",
      issues: "Heart attack, BP, Chest Pain, Arrhythmia",
      icon: "❤️",
    },
    Neurology: {
      title: "Neurology",
      desc: "Comprehensive care for brain, spine, and nervous system disorders.",
      issues: "Stroke, Migraine, Epilepsy, Parkinson's",
      icon: "🧠",
    },
    Orthopedics: {
      title: "Orthopedics",
      desc: "Advanced bone, joint, and muscle treatments including knee replacement.",
      issues: "Fractures, Arthritis, Back Pain, Sports Injury",
      icon: "🦴",
    },
    Gynecology: {
      title: "Gynecology",
      desc: "Complete women's health services from adolescence to menopause.",
      issues: "Pregnancy, PCOS, Fertility, Menstrual Issues",
      icon: "👩‍⚕️",
    },
    Dermatology: {
      title: "Dermatology",
      desc: "Skin, hair, and nail treatments with cosmetic dermatology.",
      issues: "Acne, Allergy, Hair Loss, Psoriasis",
      icon: "🧴",
    },
    Pediatrics: {
      title: "Pediatrics",
      desc: "Specialized care for children from newborns to adolescents.",
      issues: "Vaccination, Growth Issues, Infections",
      icon: "👶",
    },
    Ophthalmology: {
      title: "Ophthalmology",
      desc: "Eye care including cataract surgery and vision correction.",
      issues: "Cataract, Glaucoma, Vision Problems",
      icon: "👁️",
    },
    Dentistry: {
      title: "Dentistry",
      desc: "Complete dental care including root canal and orthodontics.",
      issues: "Cavities, Gum Disease, Teeth Alignment",
      icon: "🦷",
    },
  };

  const testimonials = [
    {
      name: "Rajesh Kumar",
      text: "Excellent care and treatment. The doctors are very professional and caring.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      text: "Best hospital experience. Clean facilities and very supportive staff.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      text: "Quick service and affordable treatment. Highly recommended!",
      rating: 5,
    },
  ];

  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [expandedBlog, setExpandedBlog] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    department: "",
  });

  const blogPosts = [
    {
      id: 1,
      icon: "❤️",
      title: "5 Signs You Need a Heart Checkup",
      shortDesc:
        "Learn about early warning signs of heart disease and when to consult a cardiologist.",
      fullContent: {
        description:
          "Heart disease is one of the leading causes of death worldwide. Recognizing early warning signs can save lives.",
        points: [
          "Chest pain or discomfort",
          "Shortness of breath",
          "Pain in arms, back, neck, or jaw",
          "Fatigue and weakness",
          "Irregular heartbeat",
        ],
        conclusion:
          "If you experience any of these symptoms, consult a cardiologist immediately.",
      },
      tags: ["Cardiology", "Heart Health", "Prevention"],
    },
    {
      id: 2,
      icon: "🧠",
      title: "Managing Stress for Better Health",
      shortDesc:
        "Simple daily habits to reduce stress and improve your mental wellbeing.",
      fullContent: {
        description:
          "Chronic stress can negatively impact your physical and mental health. Here are effective ways to manage it:",
        points: [
          "Practice deep breathing exercises",
          "Regular physical activity",
          "Get adequate sleep (7-8 hours)",
          "Maintain social connections",
          "Take breaks from digital devices",
        ],
        conclusion:
          "Small daily changes can significantly reduce stress levels.",
      },
      tags: ["Mental Health", "Stress Management", "Wellness"],
    },
    {
      id: 3,
      icon: "🦴",
      title: "Importance of Regular Health Checkups",
      shortDesc:
        "Why preventive healthcare matters for a longer, healthier life.",
      fullContent: {
        description:
          "Regular health checkups help detect potential health issues before they become serious.",
        points: [
          "Early detection of diseases",
          "Better treatment outcomes",
          "Reduced healthcare costs",
          "Peace of mind",
          "Personalized health advice",
        ],
        conclusion:
          "Schedule your annual health checkup today for a healthier tomorrow.",
      },
      tags: ["Preventive Care", "Health Screening", "Wellness"],
    },
  ];

  const filteredCities =
    selectedCities.length === 0
      ? data
      : data.filter((c) => selectedCities.includes(c));

  const handleCheckbox = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = "917013525030";
    const message =
      "Hello Ecstasy Hospital, I would like to book an appointment.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const makeCall = () => {
    window.location.href = "tel:+917013525030";
  };

  const handleBookAppointment = () => {
    navigate("/patient-login");
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const message = `Appointment Request:%0AName: ${formData.name}%0APhone: ${formData.phone}%0ACity: ${formData.city}%0ADepartment: ${formData.department}`;
    const whatsappUrl = `https://wa.me/917013525030?text=${message}`;
    window.open(whatsappUrl, "_blank");
    setFormData({ name: "", phone: "", city: "", department: "" });
  };

  const toggleReadMore = (id) => {
    setExpandedBlog(expandedBlog === id ? null : id);
  };

  return (
    <div>
      <div className="breadcrumb_hospitalPage">Home / Hospitals</div>

      {/* HERO SECTION */}
      <section className="hero2_hospitalPage">
        <div className="hero-container_hospitalPage">
          <div className="hero-text_hospitalPage">
            <h1>
              Ecstasy Hospital – Trusted Multispeciality Hospitals Across India
            </h1>
            <p>
              Welcome to Ecstasy Hospital, modern medical equipment, and
              patient-centric care. We aim to make healthcare accessible for
              everyone.
            </p>
            <p>
              Our hospitals are equipped for emergency care, specialized
              treatment.
            </p>
            <div className="hero-buttons_hospitalPage">
              <div
                className="btn-main_hospitalPage"
                onClick={handleBookAppointment}
              >
                <span className="btn-icon_hospitalPage">📅</span>
                <span className="btn-text_hospitalPage">Book Appointment</span>
                <span className="btn-arrow_hospitalPage">↗</span>
              </div>
              <div className="btn-main_hospitalPage" onClick={openWhatsApp}>
                <span className="btn-icon_hospitalPage">💬</span>
                <span className="btn-text_hospitalPage">WhatsApp</span>
                <span className="btn-arrow_hospitalPage">↗</span>
              </div>
              <div
                className="btn-main_hospitalPage"
                onClick={() => navigate("/second-opinion")}
              >
                <span className="btn-icon_hospitalPage">📞</span>
                <span className="btn-text_hospitalPage">
                  Get Second Opinion
                </span>
                <span className="btn-arrow_hospitalPage">↗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION - WITH CORRECT NAVIGATION */}
      <div className="why-choose-us">
        <h2>Why Choose Ecstasy Hospital?</h2>
        <div className="features-grid">
          {/* Card 1 - Navigates to Emergency page */}
          <div className="feature-card" onClick={() => navigate("/emergency")}>
            <span>🚑</span>
            <h3>24/7 Emergency Care</h3>
            <p>Round-the-clock emergency services with quick response time</p>
            <div className="card-hint">Click to learn more →</div>
          </div>
          {/* Card 2 - Navigates to Doctors page */}
          <div className="feature-card" onClick={() => navigate("/doctors")}>
            <span>👨‍⚕️</span>
            <h3>Expert Doctors</h3>
            <p>200+ experienced specialists across all departments</p>
            <div className="card-hint">Click to learn more →</div>
          </div>
          {/* Card 3 - Navigates to Technology page (Modern Equipment) */}
          <div className="feature-card" onClick={() => navigate("/technology")}>
            <span>🖥️</span>
            <h3>Modern Equipment</h3>
            <p>Latest medical technology for accurate diagnosis</p>
            <div className="card-hint">Click to learn more →</div>
          </div>
          {/* Card 4 - Navigates to Appointment booking */}
          <div className="feature-card" onClick={handleBookAppointment}>
            <span>❤️</span>
            <h3>Patient First Approach</h3>
            <p>Compassionate care with personalized treatment</p>
            <div className="card-hint">Book Appointment →</div>
          </div>
        </div>
      </div>

      {/* OUR SPECIALTIES SECTION - 8 UNIQUE ICONS */}
      <div className="specialties-section_hospitalPage">
        <h2 className="section-title_hospitalPage">Our Specialties</h2>
        <p className="section-subtitle_hospitalPage">
          Comprehensive care across key medical disciplines.
        </p>
        <div className="specialty-slider_hospitalPage">
          {Object.keys(specialtyData).map((spec) => (
            <div
              className="specialty-item_hospitalPage"
              key={spec}
              onClick={() => setSelectedSpec(spec)}
            >
              <div
                className={`specialty-circle_hospitalPage ${selectedSpec === spec ? "active_hospitalPage" : ""}`}
              >
                <span className="specialty-emoji">
                  {specialtyData[spec].icon}
                </span>
              </div>
              <p>{spec}</p>
            </div>
          ))}
        </div>
        {selectedSpec && (
          <div className="specialty-card">
            <h3>
              {specialtyData[selectedSpec].title}{" "}
              {specialtyData[selectedSpec].icon}
            </h3>
            <p>{specialtyData[selectedSpec].desc}</p>
            <span>Common issues: {specialtyData[selectedSpec].issues}</span>
          </div>
        )}
      </div>

      {/* FACILITIES SECTION */}
      <div className="facilities-section">
        <h2>Our Facilities & Amenities</h2>
        <div className="facilities-grid">
          <div className="facility-item">
            <span>🏥</span> 500+ Beds
          </div>
          <div className="facility-item">
            <span>🚑</span> 24/7 Ambulance
          </div>
          <div className="facility-item">
            <span>🔬</span> Advanced Lab
          </div>
          <div className="facility-item">
            <span>💊</span> In-House Pharmacy
          </div>
          <div className="facility-item">
            <span>🩻</span> MRI/CT Scan
          </div>
          <div className="facility-item">
            <span>🏋️</span> Rehabilitation Center
          </div>
          <div className="facility-item">
            <span>🍽️</span> Patient Cafeteria
          </div>
          <div className="facility-item">
            <span>🅿️</span> Free Parking
          </div>
        </div>
      </div>

      {/* PATIENT TESTIMONIALS */}
      <div className="testimonials-section">
        <h2>What Our Patients Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <p>"{testimonial.text}"</p>
              <h4>- {testimonial.name}</h4>
              <div className="rating">{"⭐".repeat(testimonial.rating)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* STATES WE ARE SERVING */}
      <div className="states_hospitalPage">
        <h2>State We Are Serving</h2>
        <div className="state-grid_hospitalPage">
          <div className="state-card_hospitalPage">
            <img src={Tel} alt="Telangana" />
            <div className="state-name_hospitalPage">Telangana</div>
          </div>
          <div className="state-card_hospitalPage">
            <img src={Ap} alt="Andhra Pradesh" />
            <div className="state-name_hospitalPage">Andhra Pradesh</div>
          </div>
          <div className="state-card_hospitalPage">
            <img src={Maharastra} alt="Maharashtra" />
            <div className="state-name_hospitalPage">Maharashtra</div>
          </div>
          <div className="state-card_hospitalPage">
            <img src={Karnataka} alt="Karnataka" />
            <div className="state-name_hospitalPage">Karnataka</div>
          </div>
        </div>
      </div>

      {/* HOSPITALS ACROSS CITIES */}
      <div className="section_hospitalPage">
        <h2>Our Hospitals Across Other Cities</h2>
        <div className="filters1_hospitalPage">
          {data.map((city) => (
            <label className="filter-box_hospitalPage" key={city}>
              <input
                type="checkbox"
                value={city}
                checked={selectedCities.includes(city)}
                onChange={() => handleCheckbox(city)}
              />
              <span>{city}</span>
            </label>
          ))}
        </div>
        <div className="cards_hospitalPage">
          {filteredCities.map((city) => (
            <div
              className="card5_hospitalPage"
              key={city}
              onClick={() => navigate(`/hospital/${city}`)}
            >
              <img src={hospitalImages[city]} alt={city} />
              <div>
                <h3>{city}</h3>
                <p>Ecstasy Hospital</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HEALTH BLOG SECTION */}
      <div className="blog-section">
        <h2>Health Tips & Articles</h2>
        <p className="blog-subtitle">Expert advice for a healthier life</p>
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div className="blog-card" key={post.id}>
              <div className="blog-card-header">
                <span>{post.icon}</span>
              </div>
              <div className="blog-card-content">
                <h3>{post.title}</h3>
                <p>{post.shortDesc}</p>
                <button
                  className="read-more-btn"
                  onClick={() => toggleReadMore(post.id)}
                >
                  {expandedBlog === post.id ? "Read Less ↑" : "Read More →"}
                </button>
                {expandedBlog === post.id && (
                  <div className="blog-expanded-content">
                    <p>{post.fullContent.description}</p>
                    <ul>
                      {post.fullContent.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                    <p>
                      <strong>{post.fullContent.conclusion}</strong>
                    </p>
                    <div className="blog-tags">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="blog-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* APPOINTMENT SECTION */}
      <div className="appointment-section">
        <div className="appointment-info">
          <h2>Book Your Appointment Today</h2>
          <p>
            Get treated by India's best doctors. Same-day appointments
            available.
          </p>
          <div className="contact-details">
            <p>
              📞 Call us: <a href="tel:+917013525030">+91 70135 25030</a>
            </p>
            <p>📧 Email: care@ecstasyhospital.com</p>
            <p>📍 Locations across Telangana, AP, Maharashtra, Karnataka</p>
          </div>
          <div className="appointment-buttons">
            <button className="call-btn" onClick={makeCall}>
              📞 Call Now
            </button>
            <button className="whatsapp-btn" onClick={openWhatsApp}>
              💬 WhatsApp Us
            </button>
            <button className="book-btn" onClick={handleBookAppointment}>
              📅 Book Appointment
            </button>
          </div>
        </div>
        <form className="appointment-form" onSubmit={handleAppointmentSubmit}>
          <h3>Request Appointment via WhatsApp</h3>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleFormChange}
            required
          />
          <select
            name="city"
            value={formData.city}
            onChange={handleFormChange}
            required
          >
            <option value="">Select City</option>
            {data.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          <select
            name="department"
            value={formData.department}
            onChange={handleFormChange}
            required
          >
            <option value="">Select Department</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Orthopedics</option>
            <option>Gynecology</option>
            <option>Dermatology</option>
            <option>Pediatrics</option>
            <option>Ophthalmology</option>
            <option>Dentistry</option>
          </select>
          <button type="submit">Send via WhatsApp →</button>
        </form>
      </div>
    </div>
  );
};

export default Hospital;
