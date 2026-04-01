import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Filtering.css";
import specializationText from "./specializationText"; // Import the static content

const Filtering = () => {
  const [specialization, setSpecialization] = useState("all");
  const [location, setLocation] = useState("all");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specializationContent, setSpecializationContent] = useState(null);

  const { specialization: paramSpec } = useParams();
  const navigate = useNavigate();
  const locationHook = useLocation();

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
            rating: doctor.rating,
            patients: doctor.patients,
          },
        },
      });
    } else if (loggedIn && userRole !== "patient") {
      // If logged in but not a patient (admin or doctor)
      alert("Please login as a patient to book appointments.");
      navigate("/patient-login", {
        state: {
          from: locationHook.pathname,
          message: "Please login as a patient to book appointments",
          doctor: doctor,
        },
      });
    } else {
      // Not logged in - redirect to login page
      navigate("/patient-login", {
        state: {
          from: locationHook.pathname,
          doctor: doctor,
          message: "Please login to book an appointment",
        },
      });
    }
  };

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8080/api/public/doctors",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();
        setDoctors(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Handle URL path parameters
  useEffect(() => {
    if (paramSpec) {
      setSpecialization(paramSpec.toLowerCase());
    }
  }, [paramSpec]);

  // Handle URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(locationHook.search);
    const specParam = queryParams.get("specialization");
    const locationParam = queryParams.get("location");

    if (specParam) {
      setSpecialization(specParam.toLowerCase());
    }

    if (locationParam) {
      setLocation(locationParam.toLowerCase());
    }
  }, [locationHook.search]);

  // Get specialization content from static file
  useEffect(() => {
    const getSpecializationContent = () => {
      if (specialization && specialization !== "all") {
        // Find the content from the static specializationText array
        const content = specializationText.find(
          (item) => item.name.toLowerCase() === specialization.toLowerCase(),
        );
        setSpecializationContent(content || null);
      } else {
        setSpecializationContent(null);
      }
    };

    getSpecializationContent();
  }, [specialization]);

  // Filter doctors based on specialization and location
  const filtered = doctors.filter((doc) => {
    const matchesSpecialization =
      specialization === "all" ||
      doc.specialization.toLowerCase().includes(specialization.toLowerCase());

    const matchesLocation =
      location === "all" ||
      (doc.hospital &&
        doc.hospital.location &&
        doc.hospital.location.toLowerCase().includes(location.toLowerCase()));

    return matchesSpecialization && matchesLocation;
  });

  const handleSearch = () => {
    // Update URL with filters
    const params = new URLSearchParams();
    if (specialization !== "all") params.set("specialization", specialization);
    if (location !== "all") params.set("location", location);

    navigate(`/doctors${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleReset = () => {
    setSpecialization("all");
    setLocation("all");
    navigate("/doctors");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h3>Loading doctors...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error loading doctors: {error}</h3>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  // Get unique specializations for filter options
  const uniqueSpecializations = [
    ...new Set(doctors.map((doc) => doc.specialization)),
  ];

  // Get unique locations for filter options
  const uniqueLocations = [
    ...new Set(
      doctors
        .filter((doc) => doc.hospital && doc.hospital.location)
        .map((doc) => doc.hospital.location.trim()),
    ),
  ];

  // Format specialization name for display
  const formatSpecializationName = (spec) => {
    if (spec === "all") return "All Doctors";
    const found = specializationText.find(
      (item) => item.name.toLowerCase() === spec.toLowerCase(),
    );
    return found ? found.name : spec.charAt(0).toUpperCase() + spec.slice(1);
  };

  return (
    <div className="filtering-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span onClick={() => navigate("/")}>Home</span>
        <span className="separator">/</span>
        <span onClick={() => navigate("/doctors")} className="breadcrumb-link">
          Doctors
        </span>
        {specialization !== "all" && (
          <>
            <span className="separator">/</span>
            <span className="current">
              {formatSpecializationName(specialization)}
            </span>
          </>
        )}
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-container">
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Specializations</option>
            {uniqueSpecializations.map((spec) => (
              <option key={spec} value={spec.toLowerCase()}>
                {spec}
              </option>
            ))}
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc.toLowerCase()}>
                {loc}
              </option>
            ))}
          </select>

          <button type="button" onClick={handleSearch} className="btn-search">
            🔍 Search
          </button>

          {(specialization !== "all" || location !== "all") && (
            <button type="button" onClick={handleReset} className="btn-reset">
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="title-container">
        <h1>
          {specialization === "all"
            ? "All Doctors"
            : `Best ${formatSpecializationName(specialization)} Doctors`}
        </h1>
        <p className="result-count">{filtered.length} doctors found</p>
      </div>

      {/* Main Content */}
      <div className="main-container">
        <div className="left-content">
          <div className="doctor-grid">
            {filtered.length > 0 ? (
              filtered.map((doc) => (
                <div key={doc._id} className="doctor-card1">
                  <div className="doctor-image">
                    <img
                      className="ranu"
                      src={doc.profileImage || "/default-doctor-image.jpg"}
                      alt={doc.name}
                      onError={(e) => {
                        e.target.src = "/default-doctor-image.jpg";
                      }}
                    />
                  </div>
                  <div className="doctor-info">
                    <h4>{doc.name}</h4>
                    <p className="specialization">{doc.specialization}</p>
                    <p className="hospital">
                      {doc.hospital?.name || "Hospital not specified"}
                    </p>
                    <p className="location">
                      📍 {doc.hospital?.location || "Location not specified"}
                    </p>
                    <span className="experience">
                      🎓 {doc.experience} years experience
                    </span>
                    <div className="rating">
                      <span>⭐ {doc.rating || "4.5"}</span>
                      <span> | </span>
                      <span>{doc.patients || "500+"} patients</span>
                    </div>
                    <button
                      className="book-btn"
                      onClick={() => handleBookAppointment(doc)}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-doctors">
                <h3>No doctors found</h3>
                <p>
                  No doctors match your current filters. Try adjusting your
                  search criteria.
                </p>
                <button onClick={handleReset} className="reset-btn">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="sidebar1">
          <h3>Popular Searches</h3>
          <ul>
            <li
              onClick={() => {
                setSpecialization("cardiology");
                setLocation("hyderabad");
                navigate(
                  "/doctors?specialization=cardiology&location=hyderabad",
                );
              }}
            >
              Best Cardiologists in Hyderabad
            </li>
            <li
              onClick={() => {
                setSpecialization("cardiology");
                setLocation("hyderabad");
                navigate(
                  "/doctors?specialization=cardiology&location=hyderabad",
                );
              }}
            >
              Best Cardiologists in Financial District
            </li>
            <li
              onClick={() => {
                setSpecialization("cardiology");
                setLocation("hyderabad");
                navigate(
                  "/doctors?specialization=cardiology&location=hyderabad",
                );
              }}
            >
              Best Cardiologists in Secunderabad
            </li>
            <li
              onClick={() => {
                setSpecialization("cardiology");
                setLocation("kakinada");
                navigate(
                  "/doctors?specialization=cardiology&location=kakinada",
                );
              }}
            >
              Best Cardiologists in Kakinada
            </li>
            <li
              onClick={() => {
                setSpecialization("orthopedics");
                setLocation("hyderabad");
                navigate(
                  "/doctors?specialization=orthopedics&location=hyderabad",
                );
              }}
            >
              Best Orthopedic Doctors in Hyderabad
            </li>
            <li
              onClick={() => {
                setSpecialization("neurology");
                setLocation("hyderabad");
                navigate(
                  "/doctors?specialization=neurology&location=hyderabad",
                );
              }}
            >
              Best Neurologists in Hyderabad
            </li>
          </ul>

          <h3>Quick Links</h3>
          <ul>
            <li onClick={() => navigate("/book-appointment")}>
              Book Appointment
            </li>
            <li onClick={() => navigate("/diagnostic-tests")}>
              Diagnostic Tests
            </li>
            <li onClick={() => navigate("/ambulance")}>
              24/7 Ambulance Service
            </li>
          </ul>
        </div>
      </div>

      {/* Specialization Content - Using static data */}
      {specialization !== "all" && specializationContent && (
        <div className="specialization-content">
          <div className="specialization-header">
            <h2>{specializationContent.name} at Medicover Hospitals</h2>
          </div>

          {specializationContent.image && (
            <img
              src={specializationContent.image}
              alt={specializationContent.name}
              className="specialization-img"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}

          {specializationContent.content && (
            <div
              className="specialization-description"
              dangerouslySetInnerHTML={{
                __html: specializationContent.content,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Filtering;
