import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Filtering.css";
import specializationText from "./specializationText";
import specializationData from "./specializationData";

const Filtering = () => {
  const [specialization, setSpecialization] = useState("all");
  const [location, setLocation] = useState("all");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specializationContent, setSpecializationContent] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  const normalizeKey = (str) =>
    str?.toLowerCase().replace(/\s+/g, "").replace(/-/g, "");

  const { specialization: paramSpecialization } = useParams();
  const paramSpec = paramSpecialization
    ? paramSpecialization.toLowerCase().replace(/\s+/g, "").replace(/-/g, "")
    : "";

  const getSpecializationData = (key) => {
    const normalizedKey = normalizeKey(key);
    return Object.keys(specializationData).find(
      (k) => normalizeKey(k) === normalizedKey,
    );
  };

  const currentKey = getSpecializationData(paramSpecialization);
  const data = specializationData[currentKey];
  const navigate = useNavigate();
  const locationHook = useLocation();

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const getUserRole = () => {
    return localStorage.getItem("role");
  };

  const handleBookAppointment = (doctor) => {
    const loggedIn = isLoggedIn();
    const userRole = getUserRole();

    if (loggedIn && userRole === "patient") {
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
      alert("Please login as a patient to book appointments.");
      navigate("/patient-login", {
        state: {
          from: locationHook.pathname,
          message: "Please login as a patient to book appointments",
          doctor: doctor,
        },
      });
    } else {
      navigate("/patient-login", {
        state: {
          from: locationHook.pathname,
          doctor: doctor,
          message: "Please login to book an appointment",
        },
      });
    }
  };

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

  useEffect(() => {
    const getSpecializationContent = () => {
      if (specialization && specialization !== "all") {
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

  const filtered = doctors.filter((doc) => {
    const matchesSpecialization =
      !paramSpec ||
      normalizeKey(doc.specialization) === normalizeKey(paramSpec) ||
      normalizeKey(doc.specialization).includes(normalizeKey(paramSpec)) ||
      normalizeKey(paramSpec).includes(normalizeKey(doc.specialization));

    const matchesLocation =
      location === "all" ||
      (doc.hospital &&
        doc.hospital.location &&
        doc.hospital.location.toLowerCase().includes(location.toLowerCase()));

    return matchesSpecialization && matchesLocation;
  });

  const handleSearch = () => {
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
      <div className="loading-container_filters">
        <div className="loading-spinner_filters"></div>
        <h3>Loading doctors...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container_filters">
        <h3>Error loading doctors: {error}</h3>
        <button
          onClick={() => window.location.reload()}
          className="retry-btn_filters"
        >
          Retry
        </button>
      </div>
    );
  }

  const uniqueSpecializations = [
    ...new Set(doctors.map((doc) => doc.specialization)),
  ];

  const uniqueLocations = [
    ...new Set(
      doctors
        .filter((doc) => doc.hospital && doc.hospital.location)
        .map((doc) => doc.hospital.location.trim()),
    ),
  ];

  const formatSpecializationName = (spec) => {
    if (spec === "all") return "All Doctors";
    const found = specializationText.find(
      (item) => item.name.toLowerCase() === spec.toLowerCase(),
    );
    return found ? found.name : spec.charAt(0).toUpperCase() + spec.slice(1);
  };

  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const resetTilt = (e) => {
    e.currentTarget.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div className="filtering-container_filters">
      {/* Breadcrumb */}
      <div className="breadcrumb_filters">
        <span onClick={() => navigate("/")}>Home</span>
        <span className="separator_filters">/</span>
        <span
          onClick={() => navigate("/doctors")}
          className="breadcrumb-link_filters"
        >
          Doctors
        </span>
        {specialization !== "all" && (
          <>
            <span className="separator_filters">/</span>
            <span className="current_filters">
              {formatSpecializationName(specialization)}
            </span>
          </>
        )}
      </div>

      {/* Filters */}
      <div className="filter-section_filters">
        <div className="filter-container_filters">
          <select
            value={paramSpec || "all"}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "all") {
                navigate("/doctors");
              } else {
                navigate(`/doctors/specialty/${value}`);
              }
            }}
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
          >
            <option value="all">All Locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc.toLowerCase()}>
                {loc}
              </option>
            ))}
          </select>

          <button onClick={handleSearch} className="btn-search_filters">
            Search
          </button>
          <button onClick={handleReset} className="btn-reset_filters">
            Reset
          </button>
        </div>
      </div>

      {/* Doctors Section */}
      <h2 className="section-title_filters">
        {specialization === "all"
          ? "Available Doctors"
          : `Top ${formatSpecializationName(specialization)} Doctors`}
      </h2>

      <div className="main-container_filters">
        <div className="left-content_filters">
          <div className="doctor-grid_filters">
            {filtered.map((doc) => (
              <div className="doctor-card_filters" key={doc._id}>
                <div className="doctor-header_filters">
                  <img
                    src={doc.profileImage || "https://via.placeholder.com/90"}
                    alt={doc.name}
                  />
                </div>
                <div className="doctor-body_filters">
                  <h4>{doc.name}</h4>
                  <p className="specialization_filters">{doc.specialization}</p>
                  <p className="hospital_filters">
                    {doc.hospital?.name || doc.hospital}
                  </p>
                  <p className="location_filters">
                    📍 {doc.hospital?.location || "N/A"}
                  </p>
                  <p className="experience_filters">
                    🎓 {doc.experience} years experience
                  </p>
                  <p className="rating_filters">
                    ⭐ {doc.rating || 4.5} | {doc.patients || 500}+ patients
                  </p>
                  <button
                    className="book-btn_filters"
                    onClick={() => handleBookAppointment(doc)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar_filters">
          <h3>Quick Links</h3>
          <ul>
            <li onClick={() => navigate("/book-appointment")}>
              Book Appointment
            </li>
            <li onClick={() => navigate("/diagnostic-tests")}>
              Diagnostic Tests
            </li>
            <li onClick={() => navigate("/ambulance")}>Ambulance</li>
          </ul>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section_filters">
        {/* LEFT CONTENT */}
        <div className="hero-left_filters">
          <h1>{data?.title}</h1>
          <p>{data?.para}</p>
          <button onClick={() => navigate("/book-appointment")}>
            Book Appointment
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-right_filters">
          <img src={data?.image} alt="" />
        </div>
      </div>
      {/* Specialization Content */}
      {data && (
        <div className="specialization-main-content_filters">
          <div className="specialization-content_filters">
            <h2 className="section-title_filters">Overview</h2>
            <div className="details-grid_filters">
              {Object.entries(data?.description || {}).map(
                ([key, value], index) => (
                  <div
                    className={`detail-card_filters ${activeCard === index ? "active_filters" : ""}`}
                    key={index}
                    onClick={() => setActiveCard(index)}
                  >
                    <div className="icon_filters">{value.icon}</div>
                    <div className="card-content_filters">
                      <h3>{key}</h3>
                      <ul>
                        {(value?.points || []).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
              )}
            </div>

            <h2 className="section-title_filters">Conditions</h2>
            <div className="card-grid_filters">
              {data?.Conditions.map((item, index) => (
                <div
                  className="condition-card_filters"
                  key={index}
                  onMouseMove={handleTilt}
                  onMouseLeave={resetTilt}
                >
                  <div>{item.icon}</div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="cta-section_filters">
              <h2>Need Expert Consultation?</h2>
              <button onClick={() => navigate("/book-appointment")}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filtering;
