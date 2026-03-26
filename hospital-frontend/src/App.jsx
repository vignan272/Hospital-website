import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import BookAppointment from "./pages/BookAppointment";
import TopHeader from "./components/TopHeader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Excellence from "./components/Excellence";
import About from "./components/About";
import Footer from "./components/Footer";

import PatientLogin from "./pages/PatientLogin";
import RefreshHandler from "./RefreshHandler";
import ProtectedRoute from "./ProtectedRoute";
import MyAppointments from "./pages/myAppointments";
import PublicRoute from "./PublicRoute";
import AdminDashboard from "./dashboard/adminDashboard/AdminDashboard";
import DoctorDashboard from "./dashboard/doctorDashboard/doctorDashboard";

import Specialties from "./components/Chandan/Specialties";
import Center from "./components/Chandan/Center"; // Import Center component
import Prevent from "./components/Chandan/Prevent";
import Diagnostic from "./components/Chandan/Diagnostic";
import Offer from "./components/Chandan/Offer";
import Healthcare from "./components/Chandan/Healthcare";
import Doctor from "./components/Chandan/Doctor";
import Filtering from "./components/Chandan/Filtering";
import Location from "./components/Chandan/Location";
import Hospital from "./components/Chandan/Hospital";
import AboutPage from "./components/About";
import Blog from "./components/Chandan/Blog";
import Diseases from "./components/Chandan/Diseases";
import Surgery from "./components/Chandan/Surgery";
import Symptom from "./components/Chandan/Symptom";
import Medicine from "./components/Chandan/Medicine";
import AboutUs from "./components/Chandan/AboutUs";
import Privacy from "./components/Chandan/Privacy";
import Success from "./components/Chandan/Success";
function Home() {
  return (
    <>
      <Hero />
      <Excellence />
      <About />
    </>
  );
}

function AppLayout({ auth, setAuth }) {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin-dashboard");
  const isDoctorPage = location.pathname.startsWith("/doctor-dashboard");

  return (
    <>
      <RefreshHandler setAuth={setAuth} />

      {!isAdminPage && !isDoctorPage && <TopHeader />}
      {!isAdminPage && !isDoctorPage && (
        <Navbar auth={auth} setAuth={setAuth} />
      )}

      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        {/* About Route */}
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Privacy" element={<Privacy />} />
        <Route path="/Success" element={<Success />} />
        {/* Specialties Routes */}
        <Route path="/specialties" element={<Center />} />{" "}
        {/* Show Center component */}
        <Route path="/specialties/:category" element={<Specialties />} />{" "}
        {/* Keep individual specialty pages */}
        {/* Services Routes */}
        <Route path="/preventive-health" element={<Prevent />} />
        <Route path="/diagnostic-tests" element={<Diagnostic />} />
        <Route path="/offers" element={<Offer />} />
        <Route path="/home-care" element={<Healthcare />} />
        {/* Doctors Routes */}
        <Route path="/doctors" element={<Doctor />} />
        <Route
          path="/doctors/specialty/:specialization"
          element={<Filtering />}
        />
        <Route path="/doctors/:specialization" element={<Filtering />} />
        {/* Location Routes */}
        <Route path="/hospitalsLocation" element={<Hospital />} />
        <Route path="/location/:cityName" element={<Location />} />
        <Route path="/location" element={<Location />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Diseases" element={<Diseases />} />
        <Route path="/Surgery" element={<Surgery />} />
        <Route path="/Symptom" element={<Symptom />} />
        <Route path="/Medicine" element={<Medicine />} />
        {/* Auth Routes */}
        <Route
          path="/patient-login"
          element={
            <PublicRoute auth={auth}>
              <PatientLogin setAuth={setAuth} />
            </PublicRoute>
          }
        />
        {/* Patient Routes */}
        <Route
          path="/book-appointment"
          element={
            <ProtectedRoute auth={auth} allowedRole="patient">
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-appointments"
          element={
            <ProtectedRoute auth={auth} allowedRole="patient">
              <MyAppointments />
            </ProtectedRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute auth={auth} allowedRole="admin">
              <AdminDashboard setAuth={setAuth} />
            </ProtectedRoute>
          }
        />
        {/* Doctor Routes */}
        <Route
          path="/doctor-dashboard/*"
          element={
            <ProtectedRoute auth={auth} allowedRole="doctor">
              <DoctorDashboard setAuth={setAuth} />
            </ProtectedRoute>
          }
        />
        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminPage && !isDoctorPage && <Footer />}
    </>
  );
}

// Simple 404 Component
function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Go back to home</a>
    </div>
  );
}

function App() {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    role: null,
  });

  return (
    <Router>
      <AppLayout auth={auth} setAuth={setAuth} />
    </Router>
  );
}

export default App;
