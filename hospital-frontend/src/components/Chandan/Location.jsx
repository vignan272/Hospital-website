import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils";
import "./Location.css";

const Location = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();

  // State for hospitals and doctors
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [flippedCard, setFlippedCard] = useState(null);

  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    time: "",
    description: "",
  });

  // Memoized data objects
  const data = useMemo(
    () => ({
      Hyderabad: {
        title: "Best Hospital in Hitec City, Hyderabad",
        desc: "Advanced multispeciality hospital in Hyderabad.",
        addr: "HITEC City, Hyderabad",
        lat: 17.4435,
        lon: 78.3772,
      },
      Warangal: {
        title: "Best Hospital in Warangal",
        desc: "Trusted healthcare services in Warangal.",
        addr: "Hanamkonda, Warangal",
        lat: 17.9689,
        lon: 79.5941,
      },
      Karimnagar: {
        title: "Best Hospital in Karimnagar",
        desc: "Quality medical care in Karimnagar.",
        addr: "Civil Hospital Road, Karimnagar",
        lat: 18.4386,
        lon: 79.1288,
      },
      Nizamabad: {
        title: "Best Hospital in Nizamabad",
        desc: "Affordable healthcare in Nizamabad.",
        addr: "Vinayak Nagar, Nizamabad",
        lat: 18.6725,
        lon: 78.0941,
      },
      Visakhapatnam: {
        title: "Best Hospital in Vizag",
        desc: "Top hospital in Visakhapatnam.",
        addr: "Beach Road, Vizag",
        lat: 17.6868,
        lon: 83.2185,
      },
      Vijayawada: {
        title: "Best Hospital in Vijayawada",
        desc: "Leading hospital in Vijayawada.",
        addr: "Benz Circle, Vijayawada",
        lat: 16.5062,
        lon: 80.648,
      },
      Guntur: {
        title: "Best Hospital in Guntur",
        desc: "Healthcare services in Guntur.",
        addr: "Arundelpet, Guntur",
        lat: 16.3067,
        lon: 80.4365,
      },
      Nellore: {
        title: "Best Hospital in Nellore",
        desc: "Advanced care in Nellore.",
        addr: "Balaji Nagar, Nellore",
        lat: 14.4426,
        lon: 79.9865,
      },
      Tirupati: {
        title: "Best Hospital in Tirupati",
        desc: "Top healthcare in Tirupati.",
        addr: "Renigunta Road, Tirupati",
        lat: 13.6288,
        lon: 79.4192,
      },
    }),
    [],
  );

  const specialties = useMemo(
    () => [
      {
        name: "Cardiology",
        icon: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
        desc: "Heart treatments, angioplasty, bypass surgery",
        color: "#e74c3c",
      },
      {
        name: "Cardiothoracic",
        icon: "https://cdn-icons-png.flaticon.com/512/2966/2966486.png",
        desc: "Chest and lung surgeries",
        color: "#c0392b",
      },
      {
        name: "Neuro Sciences",
        icon: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
        desc: "Brain and nervous system care",
        color: "#8e44ad",
      },
      {
        name: "Gastroenterology",
        icon: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
        desc: "Digestive system treatments",
        color: "#d35400",
      },
      {
        name: "Nephrology",
        icon: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
        desc: "Kidney care and dialysis",
        color: "#2980b9",
      },
      {
        name: "Oncology",
        icon: "https://cdn-icons-png.flaticon.com/512/387/387569.png",
        desc: "Cancer diagnosis and treatment",
        color: "#27ae60",
      },
      {
        name: "Emergency & Critical Care",
        icon: "https://cdn-icons-png.flaticon.com/512/2966/2966480.png",
        desc: "24/7 emergency and ICU care",
        color: "#e67e22",
      },
      {
        name: "Urology",
        icon: "https://cdn-icons-png.flaticon.com/512/2966/2966486.png",
        desc: "Urinary system treatments",
        color: "#16a085",
      },
      {
        name: "Organ Transplantation",
        icon: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
        desc: "Liver and kidney transplant",
        color: "#2c3e50",
      },
      {
        name: "Orthopedics",
        icon: "https://cdn-icons-png.flaticon.com/512/387/387569.png",
        desc: "Bone and joint care",
        color: "#34495e",
      },
      {
        name: "Robotic Surgery",
        icon: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
        desc: "Advanced robotic procedures",
        color: "#9b59b6",
      },
      {
        name: "Obstetric & Gynecology",
        icon: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
        desc: "Women and pregnancy care",
        color: "#ff6b81",
      },
    ],
    [],
  );

  const visibleCards = useMemo(
    () => (showMore ? specialties : specialties.slice(0, 8)),
    [showMore, specialties],
  );

  // Fetch hospitals and doctors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hospitalsRes, doctorsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/public/hospitals"),
          axios.get("http://localhost:8080/api/public/doctors"),
        ]);

        setHospitals(hospitalsRes.data);
        setDoctors(doctorsRes.data);
      } catch (err) {
        handleError("Failed to load data");
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  // Filter doctors by hospital
  useEffect(() => {
    if (selectedHospital) {
      const filtered = doctors.filter(
        (doc) => doc.hospital?._id === selectedHospital,
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [selectedHospital, doctors]);

  // Sync city with URL parameter
  useEffect(() => {
    if (cityName && data[cityName]) {
      const cityHospital = hospitals.find((h) => h.city === cityName);
      if (cityHospital) {
        setSelectedHospital(cityHospital._id);
      }
    }
  }, [cityName, hospitals, data]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Default to Hyderabad
          setUserLocation({ lat: 17.385, lon: 78.4867 });
        },
      );
    } else {
      setUserLocation({ lat: 17.385, lon: 78.4867 });
    }
  }, []);

  // Calculate distance
  const getDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }, []);

  // Update location data
  useEffect(() => {
    if (!cityName || !data[cityName] || !userLocation.lat) return;

    const h = data[cityName];
    const userLat = userLocation.lat || 17.385;
    const userLon = userLocation.lon || 78.4867;

    const dist = getDistance(userLat, userLon, h.lat, h.lon);
    const displayDist =
      dist < 1 ? (dist * 1000).toFixed(0) + " meters" : dist.toFixed(2) + " KM";

    setSelectedData({ ...h, distance: displayDist });
  }, [cityName, userLocation, data, getDistance]);

  const isLoggedIn = useCallback(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return token && role === "patient";
  }, []);

  const bookAppointment = useCallback(async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/patient/book-slot",
        {
          doctorId: form.doctorId,
          date: form.date,
          time: form.time,
          description: form.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        handleSuccess("✅ Appointment Booked Successfully!");
        setAppointmentStatus(
          response.data.appointment?.adminStatus || "Pending",
        );
        setPopup(true);

        // Reset form after successful booking
        setForm({
          doctorId: "",
          date: "",
          time: "",
          description: "",
        });
        setSelectedHospital("");
      }
    } catch (err) {
      console.error("Booking error:", err);
      handleError(
        err.response?.data?.message || "Booking Failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [form.doctorId, form.date, form.time, form.description]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Validate form fields
      if (
        !selectedHospital ||
        !form.doctorId ||
        !form.date ||
        !form.time ||
        !form.description
      ) {
        handleError("Please fill all required fields");
        return;
      }

      if (isLoggedIn()) {
        bookAppointment();
      } else {
        handleError("Please login to book an appointment");
        navigate("/patient-login", {
          state: {
            from: `/location/${cityName}`,
            appointmentData: {
              selectedHospital,
              doctorId: form.doctorId,
              date: form.date,
              time: form.time,
              description: form.description,
            },
          },
        });
      }
    },
    [selectedHospital, form, isLoggedIn, bookAppointment, navigate, cityName],
  );

  const handleFormChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // Helper function to get hospital name
  const getHospitalName = useCallback(
    (hospitalId) => {
      return hospitals.find((h) => h._id === hospitalId)?.name || "N/A";
    },
    [hospitals],
  );

  // Helper function to get doctor details
  const getDoctorDetails = useCallback(
    (doctorId) => {
      const doctor = doctors.find((d) => d._id === doctorId);
      return {
        name: doctor?.name || "N/A",
        specialization: doctor?.specialization || "N/A",
      };
    },
    [doctors],
  );

  return (
    <div className="container2_location">
      {/* DROPDOWN */}
      <div className="dropdown_location">
        <select
          value={cityName || ""}
          onChange={(e) => navigate(`/location/${e.target.value}`)}
        >
          <option value="">Select Location</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Warangal">Warangal</option>
          <option value="Karimnagar">Karimnagar</option>
          <option value="Nizamabad">Nizamabad</option>
          <option value="Visakhapatnam">Visakhapatnam</option>
          <option value="Vijayawada">Vijayawada</option>
          <option value="Guntur">Guntur</option>
          <option value="Nellore">Nellore</option>
          <option value="Tirupati">Tirupati</option>
        </select>
      </div>

      {/* HERO */}
      <div className="heroL_location">
        {/* LEFT SIDE - MAP */}
        <div className="heroL-left_location">
          {selectedData && (
            <div className="map-container_location">
              <iframe
                title="location-map"
                src={`https://maps.google.com/maps?q=${selectedData.lat},${selectedData.lon}&z=15&output=embed`}
                width="100%"
                height="350"
                style={{ border: 0, borderRadius: "15px" }}
                allowFullScreen=""
                loading="lazy"
              />

              <div className="map-card_location">
                <h3>{selectedData.title}</h3>
                <p>{selectedData.addr}</p>
                <p>📍 {selectedData.distance}</p>
                <a
                  href={`https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lon}/${selectedData.lat},${selectedData.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direction-btn_location"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                    alt="map"
                    style={{ width: "16px", marginRight: "6px" }}
                  />
                  Get Directions
                </a>
              </div>
            </div>
          )}
        </div>

        {/* APPOINTMENT FORM */}
        <div className="form-box1">
          <div className="form-header">Book Appointment</div>

          <form onSubmit={handleSubmit}>
            {/* HOSPITAL SELECTION */}
            <select
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              required
            >
              <option value="">Select Hospital</option>
              {hospitals.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.name}
                </option>
              ))}
            </select>

            {/* DOCTOR SELECTION */}
            <select
              name="doctorId"
              value={form.doctorId}
              onChange={handleFormChange}
              required
              disabled={!selectedHospital}
            >
              <option value="">Select Doctor</option>
              {filteredDoctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name} ({doc.specialization})
                </option>
              ))}
            </select>

            {/* DATE */}
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleFormChange}
              required
              min={new Date().toISOString().split("T")[0]}
            />

            {/* TIME */}
            <select
              name="time"
              value={form.time}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Time</option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>
              <option>05:00 PM</option>
            </select>

            {/* DESCRIPTION */}
            <textarea
              className="location_DESCRIPTION"
              name="description"
              placeholder="Describe your problem..."
              value={form.description}
              onChange={handleFormChange}
              rows="4"
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </div>
      </div>

      {/* POPUP - Appointment Confirmation */}
      {popup && (
        <div className="popup_location">
          <div className="popup-content_location">
            <h3>✅ Appointment Confirmed!</h3>
            <p>
              <strong>Hospital:</strong> {getHospitalName(selectedHospital)}
              <br />
              <strong>Doctor:</strong> {getDoctorDetails(form.doctorId).name}
              <br />
              <strong>Specialization:</strong>{" "}
              {getDoctorDetails(form.doctorId).specialization}
              <br />
              <strong>Date:</strong> {form.date}
              <br />
              <strong>Time:</strong> {form.time}
              <br />
              <strong>Description:</strong> {form.description}
            </p>
            {appointmentStatus && (
              <p>
                <strong>Status:</strong> {appointmentStatus}
              </p>
            )}
            <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
              You will receive a confirmation SMS/email shortly.
            </p>
            <button onClick={() => setPopup(false)}>OK</button>
          </div>
        </div>
      )}

      {/* CARDS SECTION */}
      <h2 className="section-title_location">What Do You Need Today?</h2>
      <p className="section-subtitle_location">
        Choose from a range of healthcare services designed for you.
      </p>
      <div className="cards_location">
        <div
          className="card_location"
          onClick={() => navigate("/doctors")}
          style={{ cursor: "pointer" }}
        >
          <div className="img-wrapper_location">
            <img
              src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
              alt="Explore Doctors"
            />
          </div>
          <p>Explore Doctors</p>
        </div>

        <div className="card_location" onClick={() => navigate("/health-card")}>
          <div className="img-wrapper_location">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png"
              alt="Family Health Card"
            />
          </div>
          <p>Family Health Card</p>
        </div>

        <div
          className="card_location"
          onClick={() => navigate("/second-opinion")}
        >
          <div className="img-wrapper_location">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
              alt="Second Opinion"
            />
          </div>
          <p>Second Opinion</p>
        </div>

        <div className="card_location" onClick={() => navigate("/home-care")}>
          <div className="img-wrapper_location">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
              alt="Home Health Care"
            />
          </div>
          <p>Home Health Care</p>
        </div>

        <div
          className="card_location"
          onClick={() => navigate("/health-checkup")}
        >
          <div className="img-wrapper_location">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966480.png"
              alt="Health Checkup"
            />
          </div>
          <p>Health Checkup</p>
        </div>

        <div className="card_location" onClick={() => navigate("/nabh-care")}>
          <div className="img-wrapper_location">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3468/3468379.png"
              alt="NABH Care"
            />
          </div>
          <p>NABH Care</p>
        </div>
      </div>

      {/* CENTRES OF EXCELLENCE */}
      <section className="excellence_location">
        <h2 className="section-title_location">Center of Excellence</h2>

        <div className="specialties_location">
          {visibleCards.map((item, index) => (
            <div
              key={index}
              className={`ex-card_location ${flippedCard === index ? "flipped_location" : ""}`}
              onClick={() =>
                setFlippedCard(flippedCard === index ? null : index)
              }
            >
              <div className="card-inner_location">
                {/* FRONT */}
                <div className="card-front_location">
                  <img src={item.icon} alt={item.name} />
                  <span>{item.name}</span>
                </div>

                {/* BACK */}
                <div className="card-back_location">
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="button-wrapper_location">
          <button
            className="view-more_location"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "View More"}
          </button>
        </div>
      </section>

      {/* DOCTOR SECTION */}
      <div className="doctor_location">
        <div>
          <h2>Our Doctors</h2>
          <p>
            Highly experienced doctors across all specialties ensuring best
            care.
          </p>
          <button
            className="btn_location"
            onClick={() => navigate("/specialties")}
          >
            Consult Our Specialists
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
          alt="doctor"
        />
      </div>

      <div id="footer"></div>
    </div>
  );
};

export default Location;
