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
import Center from "./components/Chandan/Center";
import Prevent from "./components/Chandan/Prevent";
import Diagnostic from "./components/Chandan/Diagnostic";
import Offer from "./components/Chandan/Offer";
import Healthcare from "./components/Chandan/Healthcare";
import Doctor from "./components/Chandan/Doctor";
import Filtering from "./components/Chandan/Filtering";
import Location from "./components/Chandan/Location";
import Hospital from "./components/Chandan/Hospital";
import Blog from "./components/Chandan/Blog";
import Diseases from "./components/Chandan/Diseases";
import Surgery from "./components/Chandan/Surgery";
import Symptom from "./components/Chandan/Symptom";
import Medicine from "./components/Chandan/Medicine";
import AboutUs from "./components/Chandan/AboutUs";
import Privacy from "./components/Chandan/Privacy";
import Success from "./components/Chandan/Success";
import DisplayDoctor from "./components/DisplayDoctor";
import BlogSlider from "./components/BlogSlider";
import HealthCard from "./components/Chandan/healthCard";
import SecondOpinion from "./components/Chandan/SecondOpinion";
import HealthCheckup from "./components/Chandan/HealthCheckup";
import NabhCare from "./components/Chandan/NabhCare";
import FillerSection from "./components/FillerSection";
import StatsSection from "./components/StatsSection";
import HomeServicesSlider from "./components/HomeServicesSlider";
import HomeHospitals from "./components/HomeHospitals";
import HospitalTechnology from "./components/Chandan/newTechology";
import ContactPage from "./components/Chandan/ContactPage";

function Home() {
  return (
    <>
      <Hero />
      <FillerSection />
      <DisplayDoctor />
      <Excellence />

      <About />
      <HomeHospitals />
      <HomeServicesSlider />
      <BlogSlider />
      <StatsSection />
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
        <Route path="/" element={<Home />} />

        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/success" element={<Success />} />

        <Route path="/specialties" element={<Center />} />
        <Route path="/specialties/:category" element={<Specialties />} />

        <Route path="/preventive-health" element={<Prevent />} />
        <Route path="/diagnostic-tests" element={<Diagnostic />} />
        <Route path="/offers" element={<Offer />} />
        <Route path="/home-care" element={<Healthcare />} />

        <Route path="/health-checkup" element={<HealthCheckup />} />
        <Route path="/contactpage" element={<ContactPage />} />

        <Route path="/doctors" element={<Doctor />} />
        <Route
          path="/doctors/specialty/:specialization"
          element={<Filtering />}
        />
        <Route path="/doctors/:specialization" element={<Filtering />} />

        <Route path="/hospitalsLocation" element={<Hospital />} />
        <Route path="/location/:cityName" element={<Location />} />
        <Route path="/location" element={<Location />} />

        {/* ✅ FIXED BLOG ROUTE */}
        <Route path="/blog" element={<Blog />} />

        <Route path="/diseases" element={<Diseases />} />
        <Route path="/surgery" element={<Surgery />} />
        <Route path="/symptom" element={<Symptom />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/health-card" element={<HealthCard />} />
        <Route path="/second-opinion" element={<SecondOpinion />} />
        <Route path="/nabh-care" element={<NabhCare />} />
        <Route path="/technology" element={<HospitalTechnology />} />
        <Route
          path="/patient-login"
          element={
            <PublicRoute auth={auth}>
              <PatientLogin setAuth={setAuth} />
            </PublicRoute>
          }
        />

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

        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute auth={auth} allowedRole="admin">
              <AdminDashboard setAuth={setAuth} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor-dashboard/*"
          element={
            <ProtectedRoute auth={auth} allowedRole="doctor">
              <DoctorDashboard setAuth={setAuth} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminPage && !isDoctorPage && <Footer />}
    </>
  );
}

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
