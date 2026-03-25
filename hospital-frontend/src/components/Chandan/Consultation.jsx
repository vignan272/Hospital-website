import React, { useState } from "react";
import "./Consultation.css";

const Consultation = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!/^[A-Za-z ]{3,}$/.test(formData.name)) {
      newErrors.name = "Enter valid name (letters only)";
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

  // Submit Form
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

        // Reset form
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
      <div className="hero1">
        {/* LEFT SIDE */}
        <div className="left">
          <h1>{data.title1} Hospital in India</h1>

          <p>{data.para1}</p>

          <div className="buttons">
            <button className="btn-orange">Book Instant Consultation</button>

            <button className="btn-gray">
              <i className="fa-solid fa-phone"></i>
              Call 040 68334455
            </button>
          </div>

          <div className="stats">
            <div className="card">
              <h2>{data.surgeries}</h2>
              <p>Successful Surgeries</p>
            </div>

            <div className="card">
              <h2>95%</h2>
              <p>Patient Satisfaction</p>
            </div>

            <div className="card">
              <h2>24/7</h2>
              <p>Emergency Care</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="form-box">
          <h2>Contact Us</h2>

          <form onSubmit={handleSubmit}>
            {/* NAME */}
            <input
              id="name"
              type="text"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
            />
            <span className="error">{errors.name}</span>

            {/* EMAIL */}
            <input
              id="email"
              type="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="error">{errors.email}</span>

            {/* DESCRIPTION - Changed to textarea */}
            <textarea
              id="description"
              placeholder="Description*"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
            <span className="error">{errors.description}</span>

            {/* CHECKBOX - Added a wrapper div for better alignment */}
            <div className="agree-container">
              <input
                id="agree"
                type="checkbox"
                checked={formData.agree}
                onChange={handleChange}
              />
              <label htmlFor="agree">
                I agree to the <span>Privacy Policy</span>
              </label>
            </div>
            <span className="error">{errors.agree}</span>

            {/* BUTTON */}
            <button className="schedule" type="submit" disabled={loading}>
              {loading ? "Sending..." : "send message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
