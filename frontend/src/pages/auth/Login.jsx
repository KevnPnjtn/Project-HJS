import React, { useState, useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { login } from "../../services/auth";

const Login = memo(() => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    try {
      setLoading(true);
      const res = await login({ email, password });
      
      const { user, access_token } = res.data;
      
      // ✅ SIMPAN TOKEN & USER DATA
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("accessToken", access_token); // ✅ SIMPAN TOKEN
      storage.setItem("user", JSON.stringify(user));
      
      const isVerified = user.email_verified_at ? "true" : "false";
      storage.setItem("emailVerified", isVerified);

      if (!user.email_verified_at) {
        setError("Akun belum terverifikasi. Silakan cek email Anda.");
        storage.removeItem("accessToken");
        storage.removeItem("user");
        storage.removeItem("emailVerified");
        return;
      }

      setSuccess("Login berhasil! Mengalihkan...");
      
      const userRole = user.role || 'user';
      setTimeout(() => {
        if (userRole === 'admin') {
          navigate("/dashboard-admin", { replace: true });
        } else {
          navigate("/dashboard-user", { replace: true });
        }
      }, 1500);

    } catch (err) {
      console.error("❌ Login error:", err);
      let errorMessage = "Email atau password salah.";
      
      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.message === "Network Error") {
        errorMessage = "Gagal terhubung ke server.";
      } else if (err?.code === "ECONNABORTED") {
        errorMessage = "Koneksi timeout. Coba lagi.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [email, password, rememberMe, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        
        {/* Card Login */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Selamat Datang</h2>
            <p className="text-gray-500 text-sm mt-2">
              Masuk untuk mengelola inventaris Anda
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex gap-3 items-start animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-700 font-medium">{success}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all disabled:opacity-70"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all [&::-ms-reveal]:hidden [&::-ms-clear]:hidden disabled:opacity-70"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer disabled:opacity-50"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  disabled={loading}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors font-medium">Ingat saya</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Lupa password?
              </Link>
            </div>

            {/* ✅ SUBMIT BUTTON - FIXED SIZE & IMPROVED UX */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-base hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100 flex items-center justify-center gap-2 min-h-[52px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Masuk...</span>
                </>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} Inventory System.
        </p>
      </div>
    </div>
  );
});

Login.displayName = 'Login';

export default Login;