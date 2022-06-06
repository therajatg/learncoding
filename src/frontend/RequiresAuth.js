import { useAuth } from "./contexts/authContext";
import { Navigate, useLocation } from "react-router-dom";

export function RequiresAuth({ children }) {
  const location = useLocation();
  const { authState } = useAuth();
  const { token } = authState;

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
