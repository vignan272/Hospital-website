import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setAuth }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setAuth({
        isLoggedIn: true,
        role: role,
      });

      if (location.pathname === "/patient-login") {
        navigate("/", { replace: true });
      }
    }
  }, []);

  return null;
}

export default RefreshHandler;
