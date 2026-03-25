import { Navigate } from "react-router-dom";

function PublicRoute({ auth, children }) {
  // 🔥 If user already logged in → block login page
  if (auth.isLoggedIn) {
    // Role-based redirect
    if (auth.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    if (auth.role === "doctor") {
      return <Navigate to="/doctor-dashboard" replace />;
    }

    return <Navigate to="/" replace />; // patient
  }

  return children;
}

export default PublicRoute;
