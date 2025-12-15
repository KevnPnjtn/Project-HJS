import api from "./api"; 

export const register = (data) => api.post("/register", data);

export const login = async (data) => {
  const response = await api.post("/login", data);
  return response;
};

export const verifyEmail = (token) => api.get(`/verify-email/${token}`);
export const resendVerification = (email) => api.post("/email/resend", { email });
export const forgotPassword = (email) => api.post("/forgot-password", { email });
export const resetPassword = (data) => api.post("/reset-password", data);

export const logout = async () => {
  try {
    await api.post("/logout");
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("emailVerified");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("emailVerified");
  }
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
  return null;
};

export const isAuthenticated = () => {
  console.log("🔍 [auth.js] isAuthenticated() called");
  
  const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  const user = getCurrentUser();
  const emailVerified = localStorage.getItem("emailVerified") || sessionStorage.getItem("emailVerified");
  
  console.log("🔑 [auth.js] Token:", token ? 'Exists' : 'Missing');
  console.log("👤 [auth.js] User:", user ? user.username : 'Missing');
  console.log("📧 [auth.js] Email verified:", emailVerified);
  
  if (!token || !user) {
    console.warn("❌ [auth.js] Missing token or user data");
    return false;
  }

  if (emailVerified !== "true") {
    console.warn("❌ [auth.js] Email not verified");
    return false;
  }

  console.log("✅ [auth.js] User authenticated");
  return true;
};

export const hasRole = (requiredRole) => {
  const user = getCurrentUser();
  return user && user.role === requiredRole;
};