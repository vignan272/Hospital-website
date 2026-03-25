import React, { useState, useEffect } from "react";
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

  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    time: "",
    description: "",
  });

  const [popup, setPopup] = useState(false);
  const [appointmentStatus, setAppointmentStatus] = useState("");

  /* DATA for location/hospital info */
  const data = {
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
  };

  // 🔥 FETCH HOSPITALS + DOCTORS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resHospitals = await axios.get(
          "http://localhost:8080/api/public/hospitals",
        );
        const resDoctors = await axios.get(
          "http://localhost:8080/api/public/doctors",
        );

        setHospitals(resHospitals.data);
        setDoctors(resDoctors.data);
      } catch (err) {
        handleError("Failed to load data");
      }
    };

    fetchData();
  }, []);

  // 🔥 FILTER DOCTORS BY HOSPITAL
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

  /* SYNC CITY WITH URL PARAMETER */
  useEffect(() => {
    if (cityName && data[cityName]) {
      // Optionally auto-select hospital based on city
      const cityHospital = hospitals.find((h) => h.city === cityName);
      if (cityHospital) {
        setSelectedHospital(cityHospital._id);
      }
    }
  }, [cityName, hospitals]);

  /* GET USER LOCATION */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => {
        setUserLocation({ lat: 17.385, lon: 78.4867 });
      },
    );
  }, []);

  /* DISTANCE FUNCTION */
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  /* UPDATE UI */
  useEffect(() => {
    if (!cityName || !data[cityName] || !userLocation.lat) return;

    const h = data[cityName];

    const dist = getDistance(userLocation.lat, userLocation.lon, h.lat, h.lon);

    const displayDist =
      dist < 1 ? (dist * 1000).toFixed(0) + " meters" : dist.toFixed(2) + " KM";

    setSelectedData({ ...h, distance: displayDist });
  }, [cityName, userLocation]);

  /* FORM HANDLER */
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* CHECK IF USER IS LOGGED IN */
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return token && role === "patient";
  };

  /* BOOK APPOINTMENT WITH API */
  const bookAppointment = async () => {
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
  };

  /* HANDLE BOOKING SUBMIT */
  const handleSubmit = (e) => {
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

    // Check if patient is logged in
    if (isLoggedIn()) {
      // If logged in, book appointment directly
      bookAppointment();
    } else {
      // If not logged in, redirect to login page
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
  };

  return (
    <div className="container2">
      {/* DROPDOWN */}
      <div className="dropdown">
        <select
          value={cityName || ""}
          onChange={(e) => navigate(`/location/${e.target.value}`)}
        >
          <option value="">Select Location</option>

          <optgroup label="Telangana">
            <option value="Hyderabad">Hyderabad</option>
            <option value="Warangal">Warangal</option>
            <option value="Karimnagar">Karimnagar</option>
            <option value="Nizamabad">Nizamabad</option>
          </optgroup>

          <optgroup label="Andhra Pradesh">
            <option value="Visakhapatnam">Visakhapatnam</option>
            <option value="Vijayawada">Vijayawada</option>
            <option value="Guntur">Guntur</option>
            <option value="Nellore">Nellore</option>
            <option value="Tirupati">Tirupati</option>
          </optgroup>
        </select>
      </div>

      {/* HERO */}
      <div className="heroL">
        <div className="heroL-left">
          <h1>{selectedData ? selectedData.title : "Select City"}</h1>

          <p>
            {selectedData ? selectedData.desc : "Choose city to see hospital"}
          </p>

          <div className="address">
            {selectedData
              ? `${selectedData.addr} - ${selectedData.distance}`
              : "Address here"}
          </div>

          <a
            className="btn"
            target="_blank"
            rel="noreferrer"
            href={
              selectedData
                ? `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lon}/${selectedData.lat},${selectedData.lon}`
                : "#"
            }
          >
            Directions
          </a>
        </div>

        {/* APPOINTMENT FORM */}
        <div className="form-box1">
          <div className="form-header">Book Appointment</div>

          <form onSubmit={handleSubmit}>
            {/* HOSPITAL SELECTION */}
            <select
              name="hospital"
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

            {/* DOCTOR SELECTION (FILTERED BY HOSPITAL) */}
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
        <div className="popup">
          <div className="popup-content">
            <h3>✅ Appointment Confirmed!</h3>
            <p>
              <strong>Hospital:</strong>{" "}
              {hospitals.find((h) => h._id === selectedHospital)?.name}
              <br />
              <strong>Doctor:</strong>{" "}
              {doctors.find((d) => d._id === form.doctorId)?.name}
              <br />
              <strong>Specialization:</strong>{" "}
              {doctors.find((d) => d._id === form.doctorId)?.specialization}
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
      <div className="cards">
        <div className="card">
          <i className="fa-solid fa-user-doctor"></i>
          <p>Explore Doctors</p>
        </div>
        <div className="card">
          <i className="fa-solid fa-id-card"></i>
          <p>Family Health Card</p>
        </div>
        <div className="card">
          <i className="fa-solid fa-comments"></i>
          <p>Second Opinion</p>
        </div>
        <div className="card">
          <i className="fa-solid fa-house-medical"></i>
          <p>Home Health Care</p>
        </div>
        <div className="card">
          <i className="fa-solid fa-stethoscope"></i>
          <p>Health Checkup</p>
        </div>
        <div className="card">
          <i className="fa-solid fa-shield-heart"></i>
          <p>NABH Care</p>
        </div>
      </div>

      {/* CENTRES OF EXCELLENCE */}
      <div className="blue">
        <h2>Centres of Excellence</h2>

        <div className="specialties">
          <a href="#" className="special">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
              className="icon"
              alt="cardiology"
            />
            <h4>Cardiology</h4>
          </a>
          <a href="#" className="special">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4149/4149670.png"
              className="icon"
              alt="neurology"
            />
            <h4>Neurology</h4>
          </a>
          <a href="#" className="special">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966480.png"
              className="icon"
              alt="orthopedics"
            />
            <h4>Orthopedics</h4>
          </a>
          <a href="#" className="special">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
              className="icon"
              alt="dermatology"
            />
            <h4>Dermatology</h4>
          </a>
          <a href="#" className="special">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
              className="icon"
              alt="gynecology"
            />
            <h4>Gynecology</h4>
          </a>
          <a href="#" className="special">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
              className="icon"
              alt="urology"
            />
            <h4>Urology</h4>
          </a>
        </div>

        <div className="orange-btn">Explore All Our Hospital Specialties</div>
      </div>

      {/* DOCTOR SECTION */}
      <div className="doctor">
        <div>
          <h2>Our Doctors</h2>
          <p>
            Highly experienced doctors across all specialties ensuring best
            care.
          </p>
          <a href="#" className="btn">
            Consult Our Specialists
          </a>
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
