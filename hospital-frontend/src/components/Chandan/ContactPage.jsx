import React, { useState } from "react";
import "./ContactPage.css";
import contact_us from "../../images/contact_us.png";

const ContactPage = () => {
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

  // SUBMIT
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
        body: JSON.stringify(formData),
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
      <h1 className="title_contact">Get in Touch with Our Hospital</h1>

      <div className="contact-section_contact">
        {/* LEFT */}
        <div className="left-box_contact">
          <img src={contact_us} alt="hospital" />
          <h3>A New Era in Healthcare</h3>
          <p>
            We provide advanced hospital services across India with modern
            technology.
          </p>
        </div>

        {/* RIGHT */}
        <div className="right-box_contact">
          <h2>Contact Form</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group_contact">
              <input
                type="text"
                name="name"
                placeholder="Enter Name*"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group_contact">
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group_contact">
              <textarea
                name="description"
                placeholder="Write your message"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>

            <div className="checkbox_contact">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <label>I agree to Privacy Policy</label>
              {errors.agree && <span className="error">{errors.agree}</span>}
            </div>

            <button type="submit" className="submit-btn_contact">
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* CONTACT INFO */}
      <div className="contact-cards_contact">
        <div className="card_contact">
          <div className="icon-box_contact">📞</div>
          <p>040-68334455</p>
        </div>

        <div className="card_contact">
          <div className="icon-box_contact">📧</div>
          <p>info@hospital.com</p>
        </div>

        <div className="card_contact">
          <div className="icon-box_contact">💬</div>
          <p>+91-7075493806</p>
        </div>

        <div className="card_contact">
          <div className="icon-box_contact">👨‍⚕️</div>
          <p>Book Consultation</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
