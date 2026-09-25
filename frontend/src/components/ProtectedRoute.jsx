import { Navigate, Outlet, useLocation } from "react-router-dom";
import { hasValidStoredAuth } from "../api";

function ProtectedRoute() {
  const location = useLocation();
  if (!hasValidStoredAuth()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
