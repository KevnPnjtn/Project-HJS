import { Navigate } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from "../services/auth";
import { memo } from "react";

const ProtectedRoute = memo(({ children, role }) => {
  console.log("🔒 [ProtectedRoute] Checking access for role:", role);
  
  const authenticated = isAuthenticated();
  console.log("🔐 [ProtectedRoute] Authentication result:", authenticated);
  
  if (!authenticated) {
    console.warn("❌ [ProtectedRoute] Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (role) {
    const user = getCurrentUser();
    console.log("👤 [ProtectedRoute] User:", user);
    console.log("🎭 [ProtectedRoute] Required role:", role, "| User role:", user?.role);
    
    if (!user || user.role !== role) {
      console.warn("❌ [ProtectedRoute] Role mismatch");
      return <Navigate to="/login" replace />;
    }
    
    console.log("✅ [ProtectedRoute] Role check passed");
  }

  console.log("✅ [ProtectedRoute] Access granted");
  return children;
});

ProtectedRoute.displayName = 'ProtectedRoute';

export default ProtectedRoute;