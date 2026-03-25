import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ Not logged in → go to login
  if (!token) {
    return <Navigate to="/patient-login" replace state={{ from: location }} />;
  }

  // ❌ Wrong role → block access
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return children;
}

export default ProtectedRoute;
