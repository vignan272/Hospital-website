import React, { useState, useEffect } from "react";
import { getDoctors } from "../components/Chandan/DoctorData"; // adjust path if needed
import { useNavigate } from "react-router-dom";
import "./Hero.css";

// ✅ Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

// ✅ Images
import img1 from "../images/medicover.png";
import img2 from "../images/h11.jpeg";
import img3 from "../images/h12.jpeg";
import img4 from "../images/h13.jpeg";

function Hero() {
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [lineLayout, setLineLayout] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!lineLayout && !isAnimating) {
      setIsAnimating(true);

      const circleItems = document.querySelectorAll(".circle-item");
      const newParticles = [];

      circleItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        newParticles.push({
          id: index,
          x: rect.left,
          y: rect.top,
          angle: index * 72 * (Math.PI / 180),
          distance: 100 + Math.random() * 50,
        });
      });

      setParticles(newParticles);

      setTimeout(() => {
        setLineLayout(true);
        setParticles([]);
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }, 600);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDoctors();
      setDoctors(data);
    };
    fetchData();
  }, []);

  const handleBookAppointment = (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "patient") {
      navigate("/book");
    } else {
      navigate("/patient-login");
    }
  };

  const handleSearchDoctor = () => {
    if (!location || !specialty) {
      alert("Please select both location and specialty");
      return;
    }

    navigate(`/doctors?location=${location}&specialty=${specialty}`);
  };
  const handleFindDoctors = () => navigate("/doctors");
  const handleSpecialties = () => navigate("/specialties");
  const handleOurHospitals = () => navigate("/hospitalsLocation");
  const handleAboutUs = () => navigate("/AboutUs");

  return (
    <section className={`hero ${lineLayout ? "shrink" : ""}`}>
      <h1>Your Health Is Our Priority</h1>
      <p>Find the best doctors and hospitals near you</p>

      <div className="hero-search">
        <select onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select Location</option>
          {[
            ...new Set(
              doctors.map((doc) => doc.hospital?.location).filter(Boolean),
            ),
          ].map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSpecialty(e.target.value)}>
          <option value="">Select Specialty</option>
          {[
            ...new Set(
              doctors.map((doc) => doc.specialization).filter(Boolean),
            ),
          ].map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>

        <button onClick={handleSearchDoctor}>Search Doctor</button>
      </div>

      <div className="hero-body">
        {/* ✅ IMAGE SLIDER */}
        <div className="hero-hospital">
          <Swiper
            modules={[Autoplay, Pagination]} // ✅ add Pagination
            autoplay={{ delay: 3000 }}
            loop={true}
            slidesPerView={1}
            spaceBetween={0}
            pagination={{ clickable: true }} // ✅ enable dots
          >
            <SwiperSlide>
              <img src={img1} alt="hospital1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img2} alt="hospital2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img3} alt="hospital3" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img4} alt="hospital4" />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* ✅ CIRCLE SECTION */}
        <div className="circle-container">
          <div
            className={`circle-wrapper ${lineLayout ? "line-layout" : ""} ${isAnimating ? "explode-animation" : ""}`}
            onClick={handleClick}
          >
            <div className="circle-item" onClick={handleFindDoctors}>
              <div className="circle-content">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                  alt=""
                />
                <p>Find Doctors</p>
              </div>
            </div>

            <div className="circle-item" onClick={handleBookAppointment}>
              <div className="circle-content">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                  alt=""
                />
                <p>Book Appointment</p>
              </div>
            </div>

            <div className="circle-item" onClick={handleSpecialties}>
              <div className="circle-content">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
                  alt=""
                />
                <p>Specialties</p>
              </div>
            </div>

            <div className="circle-item" onClick={handleOurHospitals}>
              <div className="circle-content">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
                  alt=""
                />
                <p>Our Hospitals</p>
              </div>
            </div>

            <div className="circle-item" onClick={handleAboutUs}>
              <div className="circle-content">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
                  alt=""
                />
                <p>About Us</p>
              </div>
            </div>
          </div>

          {/* ✅ PARTICLES */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: particle.x,
                top: particle.y,
                "--angle": particle.angle,
                "--distance": `${particle.distance}px`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
