import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Doctor.css";

// Custom debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const Doctor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState(null);

  // Filter states
  const [search, setSearch] = useState("");
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [specSearch, setSpecSearch] = useState("");

  const doctorsPerPage = 6;

  // Memoized unique values
  const uniqueSpecializations = useMemo(() => {
    return [
      ...new Set(doctors.map((doc) => doc.specialization).filter(Boolean)),
    ];
  }, [doctors]);

  const uniqueCities = useMemo(() => {
    return [
      ...new Set(doctors.map((doc) => doc.hospital?.location).filter(Boolean)),
    ];
  }, [doctors]);

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / doctorsPerPage);
  const currentDoctors = filtered.slice(
    (currentPage - 1) * doctorsPerPage,
    currentPage * doctorsPerPage,
  );

  // Debounced search to prevent excessive URL updates
  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value) {
        navigate(`/doctors?search=${encodeURIComponent(value)}`, {
          replace: true,
        });
      } else {
        navigate("/doctors", { replace: true });
      }
    }, 300),
    [navigate],
  );

  // Handle search change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  // Read URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const searchQuery = params.get("search");
    const locationQuery = params.get("location");
    const specialtyQuery = params.get("specialty");

    if (searchQuery) setSearch(searchQuery);
    if (locationQuery) setSelectedCities([locationQuery]);
    if (specialtyQuery) setSelectedSpecs([specialtyQuery]);
  }, [location]);

  // Fetch doctors
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

  // Apply filters
  useEffect(() => {
    let result = [...doctors];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (doc) =>
          doc.name?.toLowerCase().includes(searchLower) ||
          doc.specialization?.toLowerCase().includes(searchLower) ||
          doc.hospital?.location?.toLowerCase().includes(searchLower),
      );
    }

    if (specSearch) {
      const specSearchLower = specSearch.toLowerCase();
      result = result.filter((doc) =>
        doc.specialization?.toLowerCase().includes(specSearchLower),
      );
    }

    if (selectedSpecs.length > 0) {
      result = result.filter((doc) =>
        selectedSpecs.includes(doc.specialization),
      );
    }

    if (selectedCities.length > 0) {
      result = result.filter((doc) =>
        selectedCities.includes(doc.hospital?.location),
      );
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [search, specSearch, selectedSpecs, selectedCities, doctors]);

  const handleSpecChange = (e) => {
    const value = e.target.value;
    setSelectedSpecs((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setSelectedCities((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const resetAllFilters = () => {
    setSearch("");
    setSpecSearch("");
    setSelectedSpecs([]);
    setSelectedCities([]);
    navigate("/doctors", { replace: true });

    // Reset checkboxes
    setTimeout(() => {
      document
        .querySelectorAll('.sidebar input[type="checkbox"]')
        .forEach((input) => {
          input.checked = false;
        });
    }, 0);
  };

  const isLoggedIn = () => !!localStorage.getItem("token");
  const getUserRole = () => localStorage.getItem("role");

  const handleBookAppointment = (doctor) => {
    const loggedIn = isLoggedIn();
    const userRole = getUserRole();

    if (loggedIn && userRole === "patient") {
      navigate("/book-appointment", {
        state: { doctor: { id: doctor._id, ...doctor } },
      });
    } else if (loggedIn && userRole !== "patient") {
      setToast("Please login as a patient to book appointments.");
      setTimeout(() => setToast(null), 3000);
      navigate("/patient-login", {
        state: {
          from: "/doctors",
          message: "Please login as a patient to book appointments",
        },
      });
    } else {
      navigate("/patient-login", {
        state: {
          from: "/doctors",
          doctor,
          message: "Please login to book an appointment",
        },
      });
    }
  };

  const getSelectedCount = (type) => {
    if (type === "specialities") return selectedSpecs.length;
    if (type === "cities") return selectedCities.length;
    return 0;
  };

  if (loading)
    return <div className="loading-container">Loading doctors...</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="doctors-page">
      {toast && <div className="appointment-toast">{toast}</div>}

      {/* Header */}
      <div className="header1">
        <h1>Doctor Specialities | Centers of Excellence</h1>
        <p>
          At Ecstacy Hospitals, we have a team of highly skilled specialists.
          Our expert doctors are dedicated to providing the best and top quality
          medical care. From heart health to bone care, women's health to child
          care, our doctors make sure you receive the right treatment at the
          right time.
        </p>

        <h2 className="doctor-title">Our Specialist Doctors</h2>

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
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="doctor-page">
        {/* Sidebar */}
        <div className="sidebar">
          {/* Specialities Section */}
          <div className="sidebar-section specialities-section">
            <h3>
              Specialities
              {getSelectedCount("specialities") > 0 && (
                <span className="filter-count">
                  {getSelectedCount("specialities")} selected
                </span>
              )}
            </h3>
            <div className="sidebar-search">
              <span className="sidebar-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search Specialities.."
                value={specSearch}
                onChange={(e) => setSpecSearch(e.target.value)}
              />
            </div>

            <div className="checkbox-list">
              {uniqueSpecializations.length > 0 ? (
                uniqueSpecializations.map((spec) => (
                  <label
                    key={spec}
                    className={
                      selectedSpecs.includes(spec) ? "active-filter" : ""
                    }
                  >
                    <input
                      type="checkbox"
                      value={spec}
                      checked={selectedSpecs.includes(spec)}
                      onChange={handleSpecChange}
                    />
                    <span>{spec}</span>
                  </label>
                ))
              ) : (
                <p className="no-data">No specializations available</p>
              )}
            </div>
          </div>

          {/* Select City Section */}
          <div className="sidebar-section city-section">
            <h3>
              Select City
              {getSelectedCount("cities") > 0 && (
                <span className="filter-count">
                  {getSelectedCount("cities")} selected
                </span>
              )}
            </h3>
            <div className="checkbox-list">
              {uniqueCities.length > 0 ? (
                uniqueCities.map((city) => (
                  <label
                    key={city}
                    className={
                      selectedCities.includes(city) ? "active-filter" : ""
                    }
                  >
                    <input
                      type="checkbox"
                      value={city}
                      checked={selectedCities.includes(city)}
                      onChange={handleCityChange}
                    />
                    <span>{city}</span>
                  </label>
                ))
              ) : (
                <p className="no-data">No cities available</p>
              )}
            </div>
          </div>

          {/* Reset Button */}
          <button onClick={resetAllFilters} className="reset-filters-btn">
            🔄 Reset All Filters
          </button>
        </div>

        {/* Doctor Grid */}
        <div className="doctor-content">
          <div className="doctor-grid">
            {currentDoctors.length > 0 ? (
              currentDoctors.map((doc) => (
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="pagination-nav"
              >
                ← Previous
              </button>
              <div className="pagination-numbers">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={currentPage === index + 1 ? "active-page" : ""}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="pagination-nav"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <section className="info-section">
        <h2>Why Patients Trust Our Doctors</h2>
        <div className="info-grid">
          <Link to="/specialties" className="info-card">
            <h3>👨‍⚕️ Expert Specialists</h3>
            <p>
              Highly experienced doctors with decades of clinical expertise.
            </p>
          </Link>
          <Link to="/technology" className="info-card">
            <h3>🏥 Advanced Technology</h3>
            <p>
              Modern medical equipment and world-class diagnostic facilities.
            </p>
          </Link>
          <Link to="/home-care" className="info-card">
            <h3>❤️ Patient-Centered Care</h3>
            <p>Every treatment plan is personalized for each patient.</p>
          </Link>
          <Link to="/book-appointment" className="info-card">
            <h3>⏱ Quick Appointments</h3>
            <p>Book consultations easily and avoid long waiting times.</p>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="services_doctor-section">
        <h2>Our Other Medical Services</h2>
        <div className="service-container">
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
              alt="Family Card"
            />
            <div className="overlay_doctor">
              Family Card – Get Discounts & Benefits
            </div>
          </div>
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1200&q=80"
              alt="Preventive Health"
            />
            <div className="overlay_doctor">Preventive Health Check-ups</div>
          </div>
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80"
              alt="Diagnostics"
            />
            <div className="overlay_doctor">Diagnostics & Pathology Tests</div>
          </div>
        </div>
      </section>

      {/* Hospitals Section */}
      <section className="hospitals-section">
        <h2>Our Hospitals</h2>
        <div className="hospital-container">
          <Link to="/Location/Hyderabad" className="hospital-card">
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop"
              alt="Hyderabad"
            />
            <div className="hospital-overlay">
              <h3>Hyderabad</h3>
            </div>
          </Link>
          <Link to="/Location/Warangal" className="hospital-card">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop"
              alt="Warangal"
            />
            <div className="hospital-overlay">
              <h3>Warangal</h3>
            </div>
          </Link>
          <Link to="/Location/Karimnagar" className="hospital-card">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop"
              alt="Karimnagar"
            />
            <div className="hospital-overlay">
              <h3>Karimnagar</h3>
            </div>
          </Link>
          <Link to="/Location/Vijayawada" className="hospital-card">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
              alt="Vijayawada"
            />
            <div className="hospital-overlay">
              <h3>Vijayawada</h3>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Doctor;
