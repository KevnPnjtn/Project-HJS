import React, { useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, ShieldCheck, Loader2 } from "lucide-react";
import { register } from "../../services/auth";

// Komponen Input Password Reusable
const PasswordInput = React.memo(({ id, label, value, onChange, disabled, show, toggleShow, isValid, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
      </div>
      <input
        id={id}
        name={id}
        type={show ? "text" : "password"}
        required
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`block w-full pl-12 ${isValid ? "pr-12" : "pr-12"} py-3.5 border rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all [&::-ms-reveal]:hidden [&::-ms-clear]:hidden ${
          isValid
            ? "border-green-500 focus:ring-green-500/20 focus:border-green-500"
            : value.length > 0 && !isValid
            ? "border-red-300 focus:ring-red-500/20 focus:border-red-500 bg-red-50/30"
            : "border-gray-200 focus:ring-blue-100 focus:border-blue-600"
        }`}
        placeholder={placeholder}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        {isValid && (
          <div className="mr-2 flex items-center pointer-events-none animate-fade-in">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        )}
        <button
          type="button"
          onClick={toggleShow}
          disabled={disabled}
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer disabled:opacity-50"
          aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  </div>
));

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successCountdown, setSuccessCountdown] = useState(0);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  }, [error]);

  const isUsernameValid = useMemo(() => formData.username.trim().length >= 3, [formData.username]);
  const isEmailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()), [formData.email]);
  const isPasswordValid = useMemo(() => {
    const pwd = formData.password;
    return pwd.length >= 8 && /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd);
  }, [formData.password]);
  
  const isConfirmPasswordValid = useMemo(() => 
    formData.password.length >= 8 && formData.password === formData.confirmPassword,
    [formData.password, formData.confirmPassword]
  );

  const validateForm = () => {
    if (!isUsernameValid) { setError("Username minimal 3 karakter."); return false; }
    if (!isEmailValid) { setError("Format email tidak valid."); return false; }
    if (!isPasswordValid) { setError("Password kurang kuat (Wajib: 8+ karakter, Huruf Besar, Kecil, & Angka)."); return false; }
    if (!isConfirmPasswordValid) { setError("Konfirmasi password tidak cocok."); return false; }
    if (!formData.terms) { setError("Anda harus menyetujui Syarat & Ketentuan."); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const registerData = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      };

      await register(registerData);
      
      setSuccess(true);
      setSuccessCountdown(3);
      setFormData({ username: "", email: "", password: "", confirmPassword: "", terms: false });

      const interval = setInterval(() => {
        setSuccessCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate('/login');
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      console.error("Error registrasi:", err);
      let apiErrorMessage = "Registrasi gagal.";
      
      if (err.response?.data?.errors) {
        apiErrorMessage = Object.values(err.response.data.errors).flat().join("; ");
      } else if (err.response?.data?.message) {
        apiErrorMessage = err.response.data.message;
      } else if (err.request) {
        apiErrorMessage = "Tidak dapat terhubung ke server.";
      }
      
      setError(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      
      {/* Modal Sukses */}
      {success && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all scale-100">
            <div className="flex justify-center mb-6">
              <div className="bg-green-50 p-4 rounded-full">
                <div className="bg-green-100 p-3 rounded-full">
                  <ShieldCheck className="w-12 h-12 text-green-600" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Akun Dibuat!</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Registrasi berhasil. Silakan cek email Anda untuk verifikasi akun sebelum login.
            </p>
            <div className="mb-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-500">
              <span>Mengalihkan otomatis dalam</span>
              <span className="bg-blue-100 text-blue-700 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">
                {successCountdown}
              </span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
            >
              Login Sekarang
            </button>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="max-w-md w-full">
        
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          
          {/* Navigasi Back di DALAM card */}
          <div className="mb-6">
            <Link to="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group">
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" /> 
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Buat Akun Baru</h2>
            <p className="text-gray-500 text-sm mt-2">
              Lengkapi data berikut untuk mendaftar
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3 animate-fade-in-up">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Minimal 3 karakter"
                  className={`block w-full pl-12 pr-12 py-3 border rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    isUsernameValid
                      ? "border-green-500 focus:ring-green-500/20 focus:border-green-500"
                      : formData.username.length > 0
                      ? "border-red-300 focus:ring-red-500/20 focus:border-red-500 bg-red-50/30"
                      : "border-gray-200 focus:ring-blue-100 focus:border-blue-600"
                  }`}
                />
                {isUsernameValid && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none animate-fade-in">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="nama@email.com"
                  className={`block w-full pl-12 pr-12 py-3 border rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    isEmailValid
                      ? "border-green-500 focus:ring-green-500/20 focus:border-green-500"
                      : formData.email.length > 0
                      ? "border-red-300 focus:ring-red-500/20 focus:border-red-500 bg-red-50/30"
                      : "border-gray-200 focus:ring-blue-100 focus:border-blue-600"
                  }`}
                />
                {isEmailValid && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none animate-fade-in">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Password */}
            <PasswordInput
              id="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              show={showPassword}
              toggleShow={() => setShowPassword(!showPassword)}
              isValid={isPasswordValid}
              placeholder="Min. 8 karakter dengan huruf besar, kecil & angka"
            />

            {/* Confirm Password */}
            <PasswordInput
              id="confirmPassword"
              label="Konfirmasi Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              show={showConfirmPassword}
              toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
              isValid={isConfirmPasswordValid}
              placeholder="Ulangi password"
            />

            {/* Terms */}
            <div className="flex items-start pt-2">
              <div className="flex h-5 items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600 cursor-pointer select-none">
                  Saya menyetujui <span className="font-semibold text-blue-600 hover:underline">Syarat & Ketentuan</span> serta <span className="font-semibold text-blue-600 hover:underline">Kebijakan Privasi</span>
                </label>
              </div>
            </div>

            {/* ✅ TOMBOL SUBMIT - FIXED SIZE & IMPROVED UX */}
            <button
              type="submit"
              disabled={loading || !formData.terms}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-base hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100 mt-6 flex items-center justify-center gap-2 min-h-[52px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                "Buat Akun Baru"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
              >
                Masuk di sini
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
}

export default Register;