import React, { useState } from "react";
import axios from "axios";
import Cropper from "react-easy-crop";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopHeader from "../components/TopHeader";
import { Bluetooth } from "lucide-react";

function PatientRegister() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    bloodType: "",
    address: "",
    dob: "",
    insurance: "no",
    insuranceCompany: "",
    emergencyContact: "",
    photo: null,
  });

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImg = async () => {
    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
        );

        canvas.toBlob((file) => {
          setFormData((prev) => ({ ...prev, photo: file }));
          resolve(URL.createObjectURL(file));
        }, "image/jpeg");
      };
    });
  };

  const handleCrop = async () => {
    const cropped = await getCroppedImg();
    setPreview(cropped);
    setImageSrc(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.fullName);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      data.append("dateOfBirth", formData.dob);
      data.append("gender", formData.gender);
      data.append("bloodType", formData.bloodType);
      data.append("emergencyContact", formData.emergencyContact);

      data.append("insurance", formData.insurance);

      if (formData.insurance === "yes") {
        data.append("insuranceCompany", formData.insuranceCompany);
      }

      data.append("photo", formData.photo);

      await axios.post("http://localhost:8080/api/patient/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      handleSuccess("Registration Successful");
      setTimeout(() => navigate("/patient-login"), 1000);
    } catch {
      handleError("Registration Failed");
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
      case 0:
      case 1:
        return { label: "Weak", color: "red", width: "25%" };
      case 2:
        return { label: "Medium", color: "orange", width: "50%" };
      case 3:
        return { label: "Strong", color: "blue", width: "75%" };
      case 4:
        return { label: "Very Strong", color: "green", width: "100%" };
      default:
        return {};
    }
  };

  const validatePassword = (password) => {
    const rules = {
      length: password.length >= 8 && password.length <= 20,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
    return rules;
  };

  const passwordRules = validatePassword(formData.password);
  const strength = getPasswordStrength(formData.password);

  return (
    <>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Patient Account</h2>
          <p style={styles.subtitle}>Fill in your details to get started</p>

          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  name="fullName"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email *</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Gender *</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  style={styles.input}
                  required
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Blood Type</label>
                <select
                  name="bloodType"
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Blood Type</option>
                  <option>A+</option>
                  <option>B+</option>
                  <option>O+</option>
                  <option>AB+</option>
                  <option>A-</option>
                  <option>B-</option>
                  <option>O-</option>
                  <option>AB-</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Emergency Contact *</label>
                <input
                  name="emergencyContact"
                  placeholder="Emergency contact number"
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Profile Photo</label>
                {!preview && (
                  <button type="button" style={styles.uploadBtn}>
                    📸 Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={styles.hiddenInput}
                    />
                  </button>
                )}
                {preview && (
                  <div style={styles.previewWrapper}>
                    <img
                      src={preview}
                      alt="Preview"
                      style={styles.previewImage}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        setFormData((prev) => ({ ...prev, photo: null }));
                      }}
                      style={styles.removeBtn}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Address *</label>
              <textarea
                name="address"
                placeholder="Enter your full address"
                onChange={handleChange}
                style={styles.textarea}
                rows="3"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Insurance Coverage *</label>
              <div style={styles.radioGroup}>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="insurance"
                    value="yes"
                    onChange={handleChange}
                    checked={formData.insurance === "yes"}
                  />
                  <span>Yes, I have insurance</span>
                </label>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="insurance"
                    value="no"
                    onChange={handleChange}
                    checked={formData.insurance === "no"}
                  />
                  <span>No, I don't have insurance</span>
                </label>
              </div>
            </div>

            {/* Insurance Company Field - Shows only when insurance is Yes */}
            {formData.insurance === "yes" && (
              <div style={styles.insuranceField}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Insurance Company Name *</label>
                  <input
                    name="insuranceCompany"
                    placeholder="Enter your insurance company name"
                    value={formData.insuranceCompany}
                    onChange={handleChange}
                    style={styles.input}
                    required={formData.insurance === "yes"}
                  />
                </div>
              </div>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password *</label>
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={styles.eye}
                >
                  {showPassword ? "👁️" : "🙈"}
                </span>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <>
                  <div style={styles.strengthWrapper}>
                    <div style={styles.strengthBarBg}>
                      <div
                        style={{
                          ...styles.strengthBar,
                          width: strength.width,
                          backgroundColor: strength.color,
                        }}
                      />
                    </div>
                    <p
                      style={{
                        color: strength.color,
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      Password Strength: {strength.label}
                    </p>
                  </div>

                  <div style={styles.rulesBox}>
                    <p style={styles.rule(passwordRules.length)}>
                      ✓ 8–20 characters
                    </p>
                    <p style={styles.rule(passwordRules.upper)}>
                      ✓ One uppercase letter
                    </p>
                    <p style={styles.rule(passwordRules.lower)}>
                      ✓ One lowercase letter
                    </p>
                    <p style={styles.rule(passwordRules.number)}>
                      ✓ One number
                    </p>
                    <p style={styles.rule(passwordRules.special)}>
                      ✓ One special character
                    </p>
                  </div>
                </>
              )}
            </div>

            <button type="submit" style={styles.button}>
              Register Account
            </button>
          </form>

          <p style={styles.loginText}>
            Already have an account?{" "}
            <span
              style={styles.link}
              onClick={() => navigate("/patient-login")}
            >
              Login here
            </span>
          </p>
        </div>

        {/* Image Cropper Modal */}
        {imageSrc && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3 style={styles.modalTitle}>Crop Your Photo</h3>
              <div style={styles.cropContainer}>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              <div style={styles.zoomControl}>
                <label>Zoom: </label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(e.target.value)}
                  style={styles.zoomSlider}
                />
              </div>

              <div style={styles.modalFooter}>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => setImageSrc(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  style={styles.saveBtn}
                  onClick={handleCrop}
                >
                  Save & Continue
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
  },
  card: {
    maxWidth: "1000px",
    width: "100%",
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "28px",
    color: "#333",
    fontWeight: "600",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "30px",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    transition: "all 0.3s",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    fontFamily: "inherit",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  eye: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "18px",
  },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  loginText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#666",
  },
  link: {
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "600",
  },
  uploadBtn: {
    padding: "10px",
    background: "#f0f0f0",
    color: "#333",
    border: "1px dashed #667eea",
    borderRadius: "8px",
    cursor: "pointer",
    position: "relative",
    textAlign: "center",
    fontSize: "14px",
  },
  hiddenInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  },
  previewWrapper: {
    position: "relative",
    width: "100px",
    height: "100px",
  },
  previewImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #667eea",
  },
  removeBtn: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#ff4444",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  radioGroup: {
    display: "flex",
    gap: "30px",
    padding: "10px 0",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  insuranceField: {
    marginTop: "10px",
    animation: "slideDown 0.3s ease-in-out",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    width: "500px",
    maxWidth: "90%",
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
  },
  modalTitle: {
    marginBottom: "15px",
    textAlign: "center",
    fontSize: "20px",
  },
  cropContainer: {
    position: "relative",
    width: "100%",
    height: "300px",
    background: "#000",
    borderRadius: "8px",
    overflow: "hidden",
  },
  zoomControl: {
    marginTop: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  zoomSlider: {
    flex: 1,
  },
  modalFooter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    gap: "10px",
  },
  cancelBtn: {
    flex: 1,
    padding: "10px",
    background: "#f0f0f0",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  saveBtn: {
    flex: 1,
    padding: "10px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  strengthWrapper: {
    marginTop: "10px",
  },
  strengthBarBg: {
    width: "100%",
    height: "6px",
    background: "#eee",
    borderRadius: "10px",
    overflow: "hidden",
  },
  strengthBar: {
    height: "6px",
    borderRadius: "10px",
    transition: "width 0.3s",
  },
  rulesBox: {
    marginTop: "10px",
    padding: "10px",
    background: "#f9f9f9",
    borderRadius: "8px",
    fontSize: "12px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "5px",
  },
  rule: (valid) => ({
    color: valid ? "#4caf50" : "#ff4444",
    margin: "3px 0",
    fontSize: "11px",
  }),
};

// Add this CSS animation to your global CSS file or in a style tag
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);

export default PatientRegister;
