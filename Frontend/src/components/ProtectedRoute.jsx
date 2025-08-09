import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loadingUser } = useUser();

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  if (!user || !user.roles) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.roles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
