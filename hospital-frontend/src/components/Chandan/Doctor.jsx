import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add this import
import axios from "axios";
import "./Doctor.css";
import docImg from "../../images/doc.png";
import healthCard from "../../images/healthcard.png";
import healthCheckup from "../../images/healthcheckup.png";
import diagnostics from "../../images/DIAGNOSTICS.png";

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
  const [selectedHospitals, setSelectedHospitals] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;

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
  useEffect(() => {
    setCurrentPage(1);
  }, [filtered]);

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
  useEffect(() => {
    if (location.state?.specializations) {
      setSelectedSpecs(location.state.specializations);
    }
  }, [location.state]);

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
  const handleHospitalChange = (e) => {
    const value = e.target.value;
    setSelectedHospitals((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleExperienceChange = (e) => {
    const value = Number(e.target.value);
    setSelectedExperience((prev) =>
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
    setSelectedHospitals([]);
    setSelectedExperience([]);
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
    // Hospital filter
    if (selectedHospitals.length > 0) {
      result = result.filter((doc) =>
        selectedHospitals.includes(doc.hospital?.name),
      );
    }

    // Experience filter
    if (selectedExperience.length > 0) {
      result = result.filter((doc) =>
        selectedExperience.includes(doc.experience),
      );
    }
    setFiltered(result);
  }, [search, specSearch, selectedSpecs, selectedCities, doctors]);

  if (loading) {
    return <div className="loading-container_doctor">Loading doctors...</div>;
  }

  if (error) {
    return <div className="error-container_doctor">{error}</div>;
  }

  // Get unique specializations and cities from actual data
  const uniqueSpecializations = [
    ...new Set(doctors.map((doc) => doc.specialization).filter(Boolean)),
  ];
  const uniqueCities = [
    ...new Set(doctors.map((doc) => doc.hospital?.location).filter(Boolean)),
  ];
  const uniqueHospitals = [
    ...new Set(doctors.map((doc) => doc.hospital?.name).filter(Boolean)),
  ];

  const uniqueExperience = [
    ...new Set(doctors.map((doc) => doc.experience).filter(Boolean)),
  ];
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filtered.slice(indexOfFirstDoctor, indexOfLastDoctor);

  return (
    <div className="doctors-page_doctor">
      {/* HEADER */}
      <div className="header1_doctor">
        <img src={docImg} alt="Doctors" className="header-bg_doctor" />

        <div className="header-content_doctor">
          <h1>Doctor Specialities | Centers of Excellence</h1>

          <p>
            Find expert doctors across multiple specialties. Get the right care
            at the right time.
          </p>

          <div className="search-wrapper_doctor">
            <div className="search-bar-container_doctor">
              <span className="search-text_doctor">
                Search Doctors by{" "}
                <span id="searchWord_doctor">
                  Name, Specialization, or Location
                </span>
              </span>

              <input
                type="text"
                className="search-input_doctor"
                placeholder="Search doctor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="doctor-page_doctor">
        <div className="sidebar_doctor">
          <h3>Specialities</h3>
          <div className="sidebar-search_doctor">
            {!specSearch && (
              <span className="sidebar-search-icon_doctor">🔍</span>
            )}
            <input
              type="text"
              className="search-input_doctor"
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
                  className="spec-filter_doctor"
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
                  className="city-filter_doctor"
                  value={city}
                  onChange={handleCityChange}
                />
                {city}
              </label>
            ))
          ) : (
            <p>No cities available</p>
          )}
          <h3>Hospital</h3>
          {uniqueHospitals.map((hospital) => (
            <label key={hospital}>
              <input
                type="checkbox"
                value={hospital}
                onChange={handleHospitalChange}
              />
              {hospital}
            </label>
          ))}
          <h3>Experience</h3>
          {uniqueExperience.map((exp) => (
            <label key={exp}>
              <input
                type="checkbox"
                value={exp}
                onChange={handleExperienceChange}
              />
              {exp} years
            </label>
          ))}

          <button id="resetFilters_doctor" onClick={resetAllFilters}>
            Reset All Filters
          </button>
        </div>

        {/* DOCTORS */}
        <div className="doctor-content_doctor">
          <div className="doctor-grid_doctor">
            {filtered.length > 0 ? (
              currentDoctors.map((doc) => (
                <div key={doc._id} className="doctor-card1_doctor">
                  <img
                    src={doc.profileImage || "/default-doctor.jpg"}
                    alt={doc.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-doctor.jpg";
                    }}
                  />
                  <h4>{doc.name}</h4>
                  <p className="specialization_doctor">{doc.specialization}</p>
                  <p className="hospital-name_doctor">
                    {doc.hospital?.name || "Hospital not specified"}
                  </p>
                  <p className="location_doctor">
                    📍 {doc.hospital?.location || "Location not specified"}
                  </p>
                  <p className="experience_doctor">
                    ⭐ {doc.experience} years experience
                  </p>
                  <button
                    className="book-btn_doctor"
                    onClick={() => handleBookAppointment(doc)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))
            ) : (
              <div className="no-results_doctor">
                <p>No doctors found matching your criteria.</p>
                <button onClick={resetAllFilters}>Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pagination_doctor">
        {[...Array(Math.ceil(filtered.length / doctorsPerPage))].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active_doctor" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Why Choose Section */}
      <section className="why-section_doctor">
        <h2>Why Choose Our Specialists?</h2>

        <div className="why-grid_doctor">
          {/* 1 */}
          <div className="why-card_doctor">
            <div className="card-inner_doctor">
              <div className="card-front_doctor front1_doctor">
                <div className="icon_doctor">👨‍⚕️</div>
                <h3>Experienced Doctors</h3>
              </div>
              <div className="card-back_doctor">
                <p>
                  Highly qualified specialists with years of clinical expertise.
                </p>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="why-card_doctor">
            <div className="card-inner_doctor">
              <div className="card-front_doctor front2_doctor">
                <div className="icon_doctor">💻</div>
                <h3>Advanced Facilities</h3>
              </div>
              <div className="card-back_doctor">
                <p>Modern equipment and cutting-edge medical technology.</p>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="why-card_doctor">
            <div className="card-inner_doctor">
              <div className="card-front_doctor front3_doctor">
                <div className="icon_doctor">📅</div>
                <h3>Personalized Care</h3>
              </div>
              <div className="card-back_doctor">
                <p>Customized treatment plans tailored to each patient.</p>
              </div>
            </div>
          </div>

          {/* 4 */}
          <div className="why-card_doctor">
            <div className="card-inner_doctor">
              <div className="card-front_doctor front4_doctor">
                <div className="icon_doctor">🛡️</div>
                <h3>Comprehensive Services</h3>
              </div>
              <div className="card-back_doctor">
                <p>All medical services under one roof for convenience.</p>
              </div>
            </div>
          </div>

          {/* 5 */}
          <div className="why-card_doctor">
            <div className="card-inner_doctor">
              <div className="card-front_doctor front5_doctor">
                <div className="icon_doctor">⏱️</div>
                <h3>24/7 Emergency</h3>
              </div>
              <div className="card-back_doctor">
                <p>Emergency services available anytime, anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section_doctor">
        <h2>Three Easy Steps to Book a Doctor Appointment</h2>
        <div className="steps-grid_doctor">
          <div
            className="step-card_doctor"
            onClick={() => navigate("/doctors/specialty/Neurology")}
          >
            <div className="step-icon_doctor">👨‍⚕️</div>
            <h3>Choose Your Specialty</h3>
            <p>Select the medical specialty that fits your needs</p>
          </div>
          <div
            className="step-card_doctor"
            onClick={() => navigate("/doctors/specialty/Cardiology")}
          >
            <div className="step-icon_doctor">📅</div>
            <h3>Select a Doctor & Time Slot</h3>
            <p>Browse expert profiles and pick a convenient appointment time</p>
          </div>
          <div
            className="step-card_doctor"
            onClick={() => navigate("/my-appointments")}
          >
            <div className="step-icon_doctor">📄</div>
            <h3>Confirm & Visit</h3>
            <p>
              Receive instant confirmation and visit the hospital as scheduled
            </p>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section_doctor">
        <h2>Why Patients Trust Our Doctors</h2>

        <div className="info-grid_doctor">
          {/* 1 */}
          <div
            className="info-card_doctor clickable_doctor"
            onClick={() => navigate("/specialties")}
          >
            <h3 className="info-title_doctor">
              <span className="icon-big_doctor">👨‍⚕️</span>
              Expert Specialists
            </h3>
            <p>
              Highly experienced doctors with decades of clinical expertise.
            </p>
          </div>

          {/* 2 */}
          <div
            className="info-card_doctor clickable_doctor"
            onClick={() => navigate("/diagnostic-tests")}
          >
            <h3 className="info-title_doctor">
              <span className="icon-big_doctor">🏥</span>
              Advanced Technology
            </h3>
            <p>
              Modern medical equipment and world-class diagnostic facilities.
            </p>
          </div>

          {/* 3 */}
          <div
            className="info-card_doctor clickable_doctor"
            onClick={() => navigate("/aboutus")}
          >
            <h3 className="info-title_doctor">
              <span className="icon-big_doctor">❤️</span>
              Patient-Centered Care
            </h3>
            <p>Every treatment plan is personalized for each patient.</p>
          </div>

          {/* 4 */}
          <div
            className="info-card_doctor clickable_doctor"
            onClick={() => navigate("/book-appointment")}
          >
            <h3 className="info-title_doctor">
              <span className="icon-big_doctor">⏱</span>
              Quick Appointments
            </h3>
            <p>Book consultations easily and avoid long waiting times.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services_doctor">
        <h2>Our Other Medical Services</h2>

        <div className="service-container_doctor">
          <div
            className="card_doctor"
            style={{ backgroundImage: `url(${healthCard})` }}
            onClick={() => navigate("/health-card")}
          >
            <div className="overlay_doctor">
              Family Card – Get Discounts & Benefits
            </div>
          </div>

          <div
            className="card_doctor"
            style={{ backgroundImage: `url(${healthCheckup})` }}
            onClick={() => navigate("/health-checkup")}
          >
            <div className="overlay_doctor">Preventive Health Check-ups</div>
          </div>

          <div
            className="card_doctor"
            style={{ backgroundImage: `url(${diagnostics})` }}
            onClick={() => navigate("/diagnostic-tests")}
          >
            <div className="overlay_doctor">Diagnostics & Pathology Tests</div>
          </div>
        </div>
      </section>

      {/* Hospitals Section */}
      <section className="hospitals-section_doctor">
        <h2>Our Hospitals</h2>
        <div className="hospital-container_doctor">
          <Link to="/Location/Hyderabad" className="hospital-card_doctor">
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop"
              alt="Hyderabad"
            />
            <div className="hospital-overlay_doctor">
              <h3>Hyderabad</h3>
            </div>
          </Link>
          <Link to="/Location/Warangal" className="hospital-card_doctor">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop"
              alt="Bengaluru"
            />
            <div className="hospital-overlay_doctor">
              <h3>Warangal</h3>
            </div>
          </Link>
          <Link to="/Location/Karimnagar" className="hospital-card_doctor">
            <img
              src="https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?q=80&w=1200&auto=format&fit=crop"
              alt="Karimnagar"
            />
            <div className="hospital-overlay_doctor">
              <h3>Karimnagar</h3>
            </div>
          </Link>
          <Link to="/Location/Vijayawada" className="hospital-card_doctor">
            <img
              src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1200&auto=format&fit=crop"
              alt="Vijayawada"
            />
            <div className="hospital-overlay_doctor">
              <h3>Vijayawada</h3>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Doctor;
