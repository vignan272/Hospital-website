import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import PatientRegister from "./PatientRegister";

import bgImage from "../assets/wmremove-transformed.png";

function PatientLogin({ setAuth }) {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ========================
    // 🔥 ADMIN LOGIN
    // ========================
    try {
      const adminRes = await axios.post(
        "http://localhost:8080/api/admin/login",
        {
          username: email,
          password,
        },
      );

      if (adminRes?.data?.token) {
        localStorage.setItem("token", adminRes.data.token);
        localStorage.setItem("role", adminRes.data.role || "admin");

        setAuth({ isLoggedIn: true, role: "admin" });

        handleSuccess("Admin Login Successful");

        // ✅ HARD REDIRECT (NO BUG)
        window.location.href = "/admin-dashboard";
        return;
      }
    } catch (err) {
      console.log("Admin login failed");
    }

    // ========================
    // 🔥 DOCTOR LOGIN
    // ========================
    try {
      const docRes = await axios.post(
        "http://localhost:8080/api/doctor/login",
        { email, password },
      );

      if (docRes?.data?.token) {
        localStorage.setItem("token", docRes.data.token);
        localStorage.setItem("role", docRes.data.role || "doctor");

        setAuth({ isLoggedIn: true, role: "doctor" });

        handleSuccess("Doctor Login Successful");

        window.location.href = "/doctor-dashboard";
        return;
      }
    } catch (err) {
      console.log("Doctor login failed");
    }

    // ========================
    // 🔥 PATIENT LOGIN
    // ========================
    try {
      const patientRes = await axios.post(
        "http://localhost:8080/api/patient/login",
        { email, password },
      );

      if (patientRes?.data?.token) {
        localStorage.setItem("token", patientRes.data.token);
        localStorage.setItem("role", "patient");

        setAuth({ isLoggedIn: true, role: "patient" });

        handleSuccess("Login Successful");

        window.location.href = "/";
        return;
      }
    } catch (err) {
      handleError("Invalid Email or Password");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.rightContainer}>
          <div style={styles.card}>
            {!showRegister ? (
              <>
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

                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                  />

                  <button type="submit" style={styles.button}>
                    Login
                  </button>
                </form>

                <p style={{ marginTop: "10px" }}>
                  Don't have an account?{" "}
                  <span
                    style={styles.link}
                    onClick={() => setShowRegister(true)}
                  >
                    Register
                  </span>
                </p>
              </>
            ) : (
              <>
                <PatientRegister />

                <p style={{ marginTop: "10px" }}>
                  Already have an account?{" "}
                  <span
                    style={styles.link}
                    onClick={() => setShowRegister(false)}
                  >
                    Login
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  rightContainer: {
    width: "40%",
    display: "flex",
    justifyContent: "center",
  },

  card: {
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  link: {
    color: "blue",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default PatientLogin;
