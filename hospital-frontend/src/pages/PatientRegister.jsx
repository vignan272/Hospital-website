import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

function PatientRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    phone: false,
  });

  const navigate = useNavigate();

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    let message = "";
    let color = "";

    if (!password) {
      return { score: 0, message: "", color: "" };
    }

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Contains lowercase
    if (/[a-z]/.test(password)) score += 1;

    // Contains uppercase
    if (/[A-Z]/.test(password)) score += 1;

    // Contains numbers
    if (/\d/.test(password)) score += 1;

    // Contains special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    // Determine strength based on score
    if (score <= 2) {
      message = "Weak password";
      color = "#ff4444";
    } else if (score <= 4) {
      message = "Medium password";
      color = "#ffaa44";
    } else if (score <= 6) {
      message = "Strong password";
      color = "#44ff44";
    } else {
      message = "Very Strong password";
      color = "#00cc00";
    }

    return { score, message, color };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true,
    });
  };

  // Validation functions
  const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters";
    if (!/^[a-zA-Z\s]+$/.test(name))
      return "Name can only contain letters and spaces";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/\d/.test(password))
      return "Password must contain at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)';
    }
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone) return "Phone number is required";
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone))
      return "Phone number must be exactly 10 digits";
    return "";
  };

  const getFieldError = (field) => {
    if (!touched[field]) return "";
    switch (field) {
      case "name":
        return validateName(formData.name);
      case "email":
        return validateEmail(formData.email);
      case "password":
        return validatePassword(formData.password);
      case "phone":
        return validatePhone(formData.phone);
      default:
        return "";
    }
  };

  const isFormValid = () => {
    return (
      !validateName(formData.name) &&
      !validateEmail(formData.email) &&
      !validatePassword(formData.password) &&
      !validatePhone(formData.phone) &&
      formData.name &&
      formData.email &&
      formData.password &&
      formData.phone
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      phone: true,
    });

    if (!isFormValid()) {
      handleError("Please fix all validation errors");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/patient/register",
        formData,
      );

      if (response?.data?.message) {
        handleSuccess("Registration Successful");

        // Redirect to login after success
        setTimeout(() => {
          navigate("/patient-login");
        }, 1000);
      }
    } catch (error) {
      handleError(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <>
      <h2>Patient Register</h2>

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div style={styles.fieldContainer}>
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            style={{
              ...styles.input,
              borderColor: getFieldError("name") ? "#ff4444" : "#ccc",
            }}
            required
          />
          {getFieldError("name") && (
            <span style={styles.errorText}>{getFieldError("name")}</span>
          )}
        </div>

        {/* Email Field */}
        <div style={styles.fieldContainer}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            style={{
              ...styles.input,
              borderColor: getFieldError("email") ? "#ff4444" : "#ccc",
            }}
            required
          />
          {getFieldError("email") && (
            <span style={styles.errorText}>{getFieldError("email")}</span>
          )}
        </div>

        {/* Password Field with Eye Button */}
        <div style={styles.fieldContainer}>
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur("password")}
              style={{
                ...styles.passwordInput,
                borderColor: getFieldError("password") ? "#ff4444" : "#ccc",
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.showPasswordBtn}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <div style={styles.strengthContainer}>
              <div
                style={{
                  ...styles.strengthBar,
                  width: `${(passwordStrength.score / 6) * 100}%`,
                  backgroundColor: passwordStrength.color,
                }}
              />
              <span
                style={{
                  ...styles.strengthText,
                  color: passwordStrength.color,
                }}
              >
                {passwordStrength.message}
              </span>
            </div>
          )}

          {getFieldError("password") && (
            <span style={styles.errorText}>{getFieldError("password")}</span>
          )}
        </div>

        {/* Phone Field */}
        <div style={styles.fieldContainer}>
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number (10 digits)"
            value={formData.phone}
            onChange={handleChange}
            onBlur={() => handleBlur("phone")}
            style={{
              ...styles.input,
              borderColor: getFieldError("phone") ? "#ff4444" : "#ccc",
            }}
            required
          />
          {getFieldError("phone") && (
            <span style={styles.errorText}>{getFieldError("phone")}</span>
          )}
        </div>

        <button
          type="submit"
          style={{
            ...styles.button,
            opacity: isFormValid() ? 1 : 0.6,
            cursor: isFormValid() ? "pointer" : "not-allowed",
          }}
          disabled={!isFormValid()}
        >
          Register
        </button>
      </form>

      <ToastContainer />
    </>
  );
}

const styles = {
  fieldContainer: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    width: "100%",
    padding: "10px",
    paddingRight: "40px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  showPasswordBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  strengthContainer: {
    marginTop: "8px",
    marginBottom: "8px",
  },
  strengthBar: {
    height: "4px",
    borderRadius: "2px",
    transition: "width 0.3s ease",
    marginBottom: "4px",
  },
  strengthText: {
    fontSize: "12px",
    fontWeight: "500",
  },
  requirements: {
    marginTop: "8px",
    marginBottom: "8px",
    padding: "8px",
    backgroundColor: "#f5f5f5",
    borderRadius: "4px",
  },
  requirementsList: {
    margin: "4px 0 0 0",
    padding: "0",
    fontSize: "11px",
  },
  errorText: {
    color: "#ff4444",
    fontSize: "12px",
    marginTop: "4px",
    display: "block",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "purple",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default PatientRegister;
