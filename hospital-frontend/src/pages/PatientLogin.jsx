import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bgImage from "../assets/wmremove-transformed.png";
import TopHeader from "../components/TopHeader";

function PatientLogin({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const adminRes = await axios.post(
        "http://localhost:8080/api/admin/login",
        { username: email, password },
      );

      if (adminRes?.data?.token) {
        localStorage.setItem("token", adminRes.data.token);
        localStorage.setItem("role", adminRes.data.role || "admin");

        setAuth({ isLoggedIn: true, role: "admin" });
        handleSuccess("Admin Login Successful");
        window.location.href = "/admin-dashboard";
        return;
      }
    } catch {}

    try {
      const docRes = await axios.post(
        "http://localhost:8080/api/doctor/login",
        { email, password },
      );

      if (docRes?.data?.token) {
        localStorage.setItem("token", docRes.data.token);
        localStorage.setItem("role", docRes.data.role || "doctor");
        localStorage.setItem("doctor", JSON.stringify(docRes.data.doctor));

        setAuth({ isLoggedIn: true, role: "doctor" });
        handleSuccess("Doctor Login Successful");
        window.location.href = "/doctor-dashboard";
        return;
      }
    } catch {}

    try {
      const patientRes = await axios.post(
        "http://localhost:8080/api/patient/login",
        { email, password },
      );

      if (patientRes?.data?.token) {
        localStorage.setItem("token", patientRes.data.token);
        localStorage.setItem("role", "patient");
        localStorage.setItem(
          "patient",
          JSON.stringify(patientRes.data.patient),
        );

        setAuth({ isLoggedIn: true, role: "patient" });
        handleSuccess("Login Successful");
        window.location.href = "/";
        return;
      }
    } catch {
      handleError("Invalid Email or Password");
    }
  };

  return (
    <>
      <div style={styles.container}>
        {/* LEFT SIDE */}
        <div style={styles.left}>
          <h1 style={styles.brand}>Ecstasy HMS</h1>
          <p>Your Health, Our Priority</p>
        </div>

        {/* RIGHT SIDE */}

        <div style={styles.right}>
          {/* 🔥 EMOJI BACKGROUND */}
          <div style={styles.emojiContainer}>
            <span style={styles.emoji1}>💊</span>
            <span style={styles.emoji2}>🩺</span>
            <span style={styles.emoji3}>🏥</span>
            <span style={styles.emoji4}>💉</span>
            <span style={styles.emoji5}>🧑‍⚕️</span>
          </div>

          <div style={styles.card}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />

              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.passwordInput}
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

              <button type="submit" style={styles.button}>
                Login
              </button>
            </form>

            <p style={{ marginTop: "10px" }}>
              Don't have an account?{" "}
              <span
                style={styles.link}
                onClick={() => navigate("/patient-register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>

        <ToastContainer />
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
    fontFamily: "Poppins, sans-serif",
  },

  left: {
    flex: 1,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },

  brand: {
    fontSize: "36px",
    fontWeight: "bold",
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#a9b8e6",
    position: "relative", // 🔥 IMPORTANT
  },

  card: {
    width: "400px",
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
    zIndex: 2, // 🔥 above emojis
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  passwordContainer: {
    position: "relative",
  },

  passwordInput: {
    width: "100%",
    padding: "12px",
    paddingRight: "40px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  showPasswordBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "none",
    cursor: "pointer",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    marginTop: "10px",
    cursor: "pointer",
  },

  link: {
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "600",
  },

  emojiContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    overflow: "hidden",
    zIndex: 0,
  },

  emoji1: {
    position: "absolute",
    top: "10%",
    left: "20%",
    fontSize: "40px",
    opacity: 0.2,
    animation: "float 6s infinite ease-in-out",
  },

  emoji2: {
    position: "absolute",
    top: "30%",
    right: "15%",
    fontSize: "50px",
    opacity: 0.2,
    animation: "float 8s infinite ease-in-out",
  },

  emoji3: {
    position: "absolute",
    bottom: "20%",
    left: "25%",
    fontSize: "45px",
    opacity: 0.2,
    animation: "float 7s infinite ease-in-out",
  },

  emoji4: {
    position: "absolute",
    bottom: "10%",
    right: "20%",
    fontSize: "35px",
    opacity: 0.2,
    animation: "float 9s infinite ease-in-out",
  },

  emoji5: {
    position: "absolute",
    top: "50%",
    left: "50%",
    fontSize: "60px",
    opacity: 0.15,
    transform: "translate(-50%, -50%)",
  },
};

export default PatientLogin;
