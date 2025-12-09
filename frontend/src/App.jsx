import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import EmailVerificationExpired from "./pages/EmailVerification";
import DashboardAdmin from "./pages/admin/Layout/DashboardAdmin";
import DashboardUser from "./pages/DashboardUser";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route langsung ke login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verification-expired" element={<EmailVerificationExpired />} />
        
        {/* Protected route untuk admin */}
        <Route 
          path="/dashboard-admin" 
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected route untuk user */}
        <Route 
          path="/dashboard-user" 
          element={
            <ProtectedRoute role="user">
              <DashboardUser />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;