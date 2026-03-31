import React, { useState } from "react";
import "./Healthcare.css";
import { Link } from "react-router-dom";

const Healthcare = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!/^[A-Za-z ]{3,}$/.test(formData.name)) {
      newErrors.name = "Enter valid name";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (formData.description.trim() === "") {
      newErrors.description = "Description is required";
    }

    if (!formData.agree) {
      newErrors.agree = "You must agree to the privacy policy";
    }

    return newErrors;
  };

  // SUBMIT (API)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          description: formData.description,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Message sent successfully ✅");

        setFormData({
          name: "",
          email: "",
          description: "",
          agree: false,
        });

        setErrors({});
      } else {
        alert(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <div className="Zero">
        <div className="overlay"></div>

        <div className="content">
          <div className="left">
            <h1>Healthcare at your Doorstep !</h1>
          </div>

          {/* CONTACT FORM */}
          <div className="form-box">
            <h2>Contact Us</h2>

            <form onSubmit={handleSubmit}>
              {/* NAME */}
              <input
                type="text"
                name="name"
                placeholder="Name*"
                value={formData.name}
                onChange={handleChange}
              />
              <span className="error">{errors.name}</span>

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="error">{errors.email}</span>

              {/* DESCRIPTION */}
              <textarea
                name="description"
                placeholder="Description*"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              />
              <span className="error">{errors.description}</span>

              {/* CHECKBOX */}
              <div className="agree-container">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                />
                <label>
                  I agree to the <span>Privacy Policy</span>
                </label>
              </div>
              <span className="error">{errors.agree}</span>

              {/* BUTTON */}
              <button type="submit" className="schedule" disabled={loading}>
                {loading ? "Sending..." : "send message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="healthcare">
        <div className="left">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5d98129f25863e4eb91b5bcd/8793d999-08e8-446b-99d7-b7e67c09eb9c/Expanded+Home+Based+Services.jpg"
            alt=""
          />
        </div>

        <div className="middle">
          <h1>Medicover Home Healthcare</h1>

          <p>
            Medicover Hospitals has launched its new service called Home
            Healthcare Services. Many treatments that were once offered only in
            hospitals can now be available at home.
          </p>

          <p>
            Home healthcare is less expensive, more convenient, and effective.
          </p>

          <p>Our services are driven by a passionate team of experts.</p>
        </div>

        <div className="right">
          <div className="card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966481.png"
              alt=""
            />
            <h3>Health Checkup</h3>
          </div>
        </div>
      </div>

      {/* CITIES */}
      <div className="cities-section">
        <h1>Services Available In</h1>

        <div className="cities-container">
          <Link to="/Location/Hyderabad" className="city">
            Hyderabad
          </Link>
          <Link to="/Location/Karimnagar" className="city">
            Karimnagar
          </Link>
          <Link to="/Location/Vijayawada" className="city">
            Vijayawada
          </Link>
          <Link to="/Location/Warangal" className="city">
            Warangal
          </Link>
          <Link to="/Location/Sangareddy" className="city">
            Sangareddy
          </Link>
          <Link to="/Location/Visakhapatnam" className="city">
            Visakhapatnam
          </Link>
          <Link to="/Location/Vizianagaram" className="city">
            Vizianagaram
          </Link>
          <Link to="/Location/Srikakulam" className="city">
            Srikakulam
          </Link>
          <Link to="/Location/Kakinada" className="city">
            Kakinada
          </Link>
          <Link to="/Location/Kurnool" className="city">
            Kurnool
          </Link>
          <Link to="/Location/Nellore" className="city">
            Nellore
          </Link>
          <Link to="/Location/Nashik" className="city">
            Nashik
          </Link>
          <Link to="/Location/Aurangabad" className="city">
            Aurangabad
          </Link>
          <Link to="/Location/Navi Mumbai" className="city">
            Navi Mumbai
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Healthcare;
