import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import axios from "axios";
import "./Doctor.css";

const Doctor = () => {
  const navigate = useNavigate(); // Add useNavigate hook
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and filter states
  const [search, setSearch] = useState("");
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [specSearch, setSpecSearch] = useState("");

  // Check authentication status
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const getUserRole = () => {
    return localStorage.getItem("role");
  };

  // Handle book appointment click
  const handleBookAppointment = (doctor) => {
    const loggedIn = isLoggedIn();
    const userRole = getUserRole();

    if (loggedIn && userRole === "patient") {
      // Navigate to book appointment page with doctor details
      navigate("/book-appointment", {
        state: {
          doctor: {
            id: doctor._id,
            name: doctor.name,
            specialization: doctor.specialization,
            hospital: doctor.hospital,
            experience: doctor.experience,
            profileImage: doctor.profileImage,
          },
        },
      });
    } else if (loggedIn && userRole !== "patient") {
      // If logged in but not a patient (admin or doctor)
      alert("Please login as a patient to book appointments.");
      navigate("/patient-login", {
        state: {
          from: "/doctors",
          message: "Please login as a patient to book appointments",
        },
      });
    } else {
      // Not logged in - redirect to login page
      navigate("/patient-login", {
        state: {
          from: "/doctors",
          doctor: doctor,
          message: "Please login to book an appointment",
        },
      });
    }
  };

  // Fetch doctors from API
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/public/doctors",
      );
      setDoctors(response.data);
      setFiltered(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to load doctors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle specialization filter
  const handleSpecChange = (e) => {
    const value = e.target.value;
    setSelectedSpecs((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  // Handle city filter
  const handleCityChange = (e) => {
    const value = e.target.value;
    setSelectedCities((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  // Reset all filters
  const resetAllFilters = () => {
    setSearch("");
    setSpecSearch("");
    setSelectedSpecs([]);
    setSelectedCities([]);

    // Reset all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.checked = false;
    });
  };

  // Apply filters
  useEffect(() => {
    let result = [...doctors];

    // Search filter (name, specialization, hospital location)
    if (search) {
      result = result.filter(
        (doc) =>
          doc.name.toLowerCase().includes(search.toLowerCase()) ||
          doc.specialization?.toLowerCase().includes(search.toLowerCase()) ||
          doc.hospital?.location?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Specialization search
    if (specSearch) {
      result = result.filter((doc) =>
        doc.specialization?.toLowerCase().includes(specSearch.toLowerCase()),
      );
    }

    // Specialization filter
    if (selectedSpecs.length > 0) {
      result = result.filter((doc) =>
        selectedSpecs.includes(doc.specialization),
      );
    }

    // City filter (based on hospital location)
    if (selectedCities.length > 0) {
      result = result.filter((doc) =>
        selectedCities.includes(doc.hospital?.location),
      );
    }

    setFiltered(result);
  }, [search, specSearch, selectedSpecs, selectedCities, doctors]);

  if (loading) {
    return <div className="loading-container">Loading doctors...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  // Get unique specializations and cities from actual data
  const uniqueSpecializations = [
    ...new Set(doctors.map((doc) => doc.specialization).filter(Boolean)),
  ];
  const uniqueCities = [
    ...new Set(doctors.map((doc) => doc.hospital?.location).filter(Boolean)),
  ];

  return (
    <div className="doctors-page">
      {/* HEADER */}
      <div className="header1">
        <div className="header1">
          <h1>Doctor Specialities | Centers of Excellence</h1>
          <p>
            At Medicover Hospitals, we have a team of highly skilled
            specialists. Our expert doctors are dedicated to providing the best
            and top quality medical care. From heart health to bone care,
            women's health to child care, our doctors make sure you receive the
            right treatment at the right time.
          </p>
        </div>

        <h2 className="doctor-title">Our Specialist Doctors</h2>

        {/* Search bar */}
        <div className="search-wrapper">
          <div className="search-bar-container">
            <span className="search-text">
              Search Doctors by{" "}
              <span id="searchWord">Name, Specialization, or Location</span>
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Search doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <span className="search-icon">🔍</span> */}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="doctor-page">
        <div className="sidebar">
          <h3>Specialities</h3>
          <div className="sidebar-search">
            <span className="sidebar-search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search Specialities.."
              value={specSearch}
              onChange={(e) => setSpecSearch(e.target.value)}
            />
          </div>

          {/* Dynamic Specializations */}
          {uniqueSpecializations.length > 0 ? (
            uniqueSpecializations.map((spec) => (
              <label key={spec}>
                <input
                  type="checkbox"
                  className="spec-filter"
                  value={spec}
                  onChange={handleSpecChange}
                />
                {spec}
              </label>
            ))
          ) : (
            <p>No specializations available</p>
          )}

          <h3>Select City</h3>
          {uniqueCities.length > 0 ? (
            uniqueCities.map((city) => (
              <label key={city}>
                <input
                  type="checkbox"
                  className="city-filter"
                  value={city}
                  onChange={handleCityChange}
                />
                {city}
              </label>
            ))
          ) : (
            <p>No cities available</p>
          )}

          <button id="resetFilters" onClick={resetAllFilters}>
            Reset All Filters
          </button>
        </div>

        {/* DOCTORS */}
        <div className="doctor-content">
          <div className="doctor-grid">
            {filtered.length > 0 ? (
              filtered.map((doc) => (
                <div key={doc._id} className="doctor-card1">
                  <img
                    src={doc.profileImage || "/default-doctor.jpg"}
                    alt={doc.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-doctor.jpg";
                    }}
                  />
                  <h4>{doc.name}</h4>
                  <p className="specialization">{doc.specialization}</p>
                  <p className="hospital-name">
                    {doc.hospital?.name || "Hospital not specified"}
                  </p>
                  <p className="location">
                    📍 {doc.hospital?.location || "Location not specified"}
                  </p>
                  <p className="experience">
                    ⭐ {doc.experience} years experience
                  </p>
                  <button
                    className="book-btn"
                    onClick={() => handleBookAppointment(doc)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No doctors found matching your criteria.</p>
                <button onClick={resetAllFilters}>Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <section className="why-section">
        <h2>Why Choose Our Specialists?</h2>
        <div className="why-grid">
          <div className="why-card">
            <div className="icon">👨‍⚕️</div>
            <p>Experienced Doctors</p>
          </div>
          <div className="why-card">
            <div className="icon">💻</div>
            <p>Advanced Facilities</p>
          </div>
          <div className="why-card">
            <div className="icon">📅</div>
            <p>Personalized Care</p>
          </div>
          <div className="why-card">
            <div className="icon">🛡️</div>
            <p>Comprehensive Services</p>
          </div>
          <div className="why-card">
            <div className="icon">⏱️</div>
            <p>24/7 Emergency</p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <h2>Three Easy Steps to Book a Doctor Appointment</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon">👨‍⚕️</div>
            <h3>Choose Your Specialty</h3>
            <p>Select the medical specialty that fits your needs</p>
          </div>
          <div className="step-card">
            <div className="step-icon">📅</div>
            <h3>Select a Doctor & Time Slot</h3>
            <p>Browse expert profiles and pick a convenient appointment time</p>
          </div>
          <div className="step-card">
            <div className="step-icon">📄</div>
            <h3>Confirm & Visit</h3>
            <p>
              Receive instant confirmation and visit the hospital as scheduled
            </p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <h2>Why Patients Trust Our Doctors</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>👨‍⚕️ Expert Specialists</h3>
            <p>
              Highly experienced doctors with decades of clinical expertise.
            </p>
          </div>
          <div className="info-card">
            <h3>🏥 Advanced Technology</h3>
            <p>
              Modern medical equipment and world-class diagnostic facilities.
            </p>
          </div>
          <div className="info-card">
            <h3>❤️ Patient-Centered Care</h3>
            <p>Every treatment plan is personalized for each patient.</p>
          </div>
          <div className="info-card">
            <h3>⏱ Quick Appointments</h3>
            <p>Book consultations easily and avoid long waiting times.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Other Medical Services</h2>
        <div className="service-container">
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
              alt="Family Card"
            />
            <div className="overlay">
              Family Card – Get Discounts & Benefits
            </div>
          </div>
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1200&q=80"
              alt="Preventive Health"
            />
            <div className="overlay">Preventive Health Check-ups</div>
          </div>
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80"
              alt="Diagnostics"
            />
            <div className="overlay">Diagnostics & Pathology Tests</div>
          </div>
        </div>
      </section>

      {/* Hospitals Section */}
      <section className="hospitals-section">
        <h2>Our Hospitals</h2>
        <div className="hospital-container">
          <div className="hospital-card">
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop"
              alt="Hyderabad"
            />
            <div className="hospital-overlay">
              <h3>Hyderabad</h3>
            </div>
          </div>
          <div className="hospital-card">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop"
              alt="Bengaluru"
            />
            <div className="hospital-overlay">
              <h3>Bengaluru</h3>
            </div>
          </div>
          <div className="hospital-card">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop"
              alt="Pune"
            />
            <div className="hospital-overlay">
              <h3>Pune</h3>
            </div>
          </div>
          <div className="hospital-card">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
              alt="Navi Mumbai"
            />
            <div className="hospital-overlay">
              <h3>Navi Mumbai</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctor;
