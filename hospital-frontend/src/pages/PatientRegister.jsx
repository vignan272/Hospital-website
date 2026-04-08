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

      data.append("name", formData.fullName); // ✅ FIX
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      data.append("dateOfBirth", formData.dob); // ✅ FIX
      data.append("gender", formData.gender);
      data.append("bloodType", formData.bloodType);
      data.append("emergencyContact", formData.emergencyContact);

      // ✅ insurance boolean
      data.append("insurance", formData.insurance);

      // ✅ only if true
      if (formData.insurance) {
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

          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>
              <input
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                style={styles.input}
              />
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                style={styles.input}
              />
              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                style={styles.input}
              />

              <select
                name="gender"
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <select
                name="bloodType"
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Blood Type</option>
                <option>A+</option>
                <option>B+</option>
                <option>O+</option>
                <option>AB+</option>
                <option>A-</option>
                <option>B-</option>
                <option>O-</option>
                <option>AB-</option>
              </select>

              <input
                name="emergencyContact"
                placeholder="Emergency Contact"
                onChange={handleChange}
                style={styles.input}
              />

              {/* IMAGE UPLOAD */}
              <div style={{ gridColumn: "span 2" }}>
                {!preview && (
                  <button type="button" style={styles.uploadBtn}>
                    Upload Photo
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
                    <img src={preview} style={styles.previewImage} />
                    <button
                      onClick={() => setPreview(null)}
                      style={styles.removeBtn}
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>
            </div>

            <textarea
              name="address"
              placeholder="Address"
              onChange={handleChange}
              style={styles.textarea}
            />

            <div style={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                style={styles.eye}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* STRENGTH BAR */}
            {formData.password && (
              <div style={styles.strengthWrapper}>
                <div style={styles.strengthBarBg}>
                  <div
                    style={{
                      ...styles.strengthBar,
                      width: strength.width,
                      background: strength.color,
                    }}
                  />
                </div>

                <p style={{ color: strength.color, fontSize: "13px" }}>
                  {strength.label}
                </p>
              </div>
            )}
            {formData.password && (
              <div style={styles.rulesBox}>
                <p style={styles.rule(passwordRules.length)}>
                  • 8–20 characters
                </p>
                <p style={styles.rule(passwordRules.upper)}>
                  • One uppercase letter
                </p>
                <p style={styles.rule(passwordRules.lower)}>
                  • One lowercase letter
                </p>
                <p style={styles.rule(passwordRules.number)}>• One number</p>
                <p style={styles.rule(passwordRules.special)}>
                  • One special character
                </p>
              </div>
            )}
            <button style={styles.button}>Register</button>
          </form>

          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Already have an account?{" "}
            <span
              style={styles.link}
              onClick={() => navigate("/patient-login")}
            >
              Login
            </span>
          </p>
        </div>

        {/* MODAL */}
        {imageSrc && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
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

              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
              />

              <div style={styles.modalFooter}>
                <button
                  style={styles.cancelBtn}
                  onClick={() => setImageSrc(null)}
                >
                  Cancel
                </button>

                <button style={styles.saveBtn} onClick={handleCrop}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#667eea",
  },
  card: {
    width: "900px",
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
  },
  title: { textAlign: "center", marginBottom: "15px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  input: { padding: "12px", borderRadius: "10px", border: "1px solid #ccc" },
  textarea: { width: "100%", marginTop: "10px", padding: "12px" },
  passwordContainer: { position: "relative" },
  eye: { position: "absolute", right: "10px", top: "10px", cursor: "pointer" },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  link: { color: "#667eea", cursor: "pointer" },

  uploadBtn: {
    padding: "10px",
    background: "#667eea",
    color: "#fff",
    position: "relative",
    cursor: "pointer",
  },
  hiddenInput: { position: "absolute", inset: 0, opacity: 0 },

  previewWrapper: { position: "relative", width: "120px", height: "120px" },
  previewImage: { width: "120px", height: "120px", borderRadius: "50%" },
  removeBtn: { position: "absolute", top: 0, right: 0, background: "#e8eaf6" },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "400px",
    maxHeight: "90vh", // ✅ prevents overflow
    overflow: "hidden",
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
  },
  cropContainer: {
    position: "relative",
    width: "100%",
    height: "250px", // 🔥 reduce from 300
    background: "#000",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  modalFooter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },

  cancelBtn: {
    padding: "10px 20px",
    background: "#ccc",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  saveBtn: {
    padding: "10px 20px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  strengthWrapper: {
    marginTop: "8px",
  },

  strengthBarBg: {
    width: "100%",
    height: "6px",
    background: "#eee",
    borderRadius: "10px",
  },

  strengthBar: {
    height: "6px",
    borderRadius: "10px",
    transition: "0.3s",
  },
  rulesBox: {
    marginTop: "8px",
    fontSize: "13px",
  },

  rule: (valid) => ({
    color: valid ? "green" : "red",
  }),
};

export default PatientRegister;
