import { Navigate } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from "../services/auth";
import { memo } from "react";

const ProtectedRoute = memo(({ children, role }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (role) {
    const user = getCurrentUser();
    
    if (!user || user.role !== role) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
});

ProtectedRoute.displayName = 'ProtectedRoute';

export default ProtectedRoute;