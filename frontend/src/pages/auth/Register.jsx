import React, { useState, useMemo, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, ShieldCheck, Loader2 } from "lucide-react";
import { register } from "../../services/auth";
 
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
  
  const emailSentRef = useRef(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

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
    
    if (loading || emailSentRef.current) {
      console.log('⚠️ Prevented double submission');
      return;
    }
    
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
      
      emailSentRef.current = true;
      
      setRegisteredEmail(formData.email.trim());
      
      setSuccess(true);
      setFormData({ username: "", email: "", password: "", confirmPassword: "", terms: false });

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

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      
      {/**/}
      {success && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100">
            
            {/* Green Header */}
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white rounded-full p-4 shadow-lg animate-bounce">
                  <ShieldCheck className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                🎉 Registrasi Berhasil!
              </h3>
              <p className="text-green-50 text-sm">
                Tinggal satu langkah lagi
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              
              {/* Email Info Box */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-blue-900 font-semibold mb-1">
                      📧 Email verifikasi telah dikirim ke:
                    </p>
                    <p className="text-sm text-blue-800 font-mono bg-blue-100 px-3 py-1.5 rounded mt-2 break-all">
                      {registeredEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Steps Box */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-900 font-semibold mb-3 flex items-center">
                  <span className="text-lg mr-2">📋</span>
                  Langkah Selanjutnya:
                </p>
                <ol className="text-sm text-yellow-800 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-yellow-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">1</span>
                    <span>Buka inbox email Anda</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">2</span>
                    <span>Cari email dari <strong>"Inventory System"</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">3</span>
                    <span>Klik tombol <strong>"Verifikasi Email Saya"</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2 flex-shrink-0">4</span>
                    <span>Kembali ke halaman login</span>
                  </li>
                </ol>
              </div>

              {/* Tips Box */}
              <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <p className="text-xs text-purple-800 text-center">
                  💡 <strong>Tidak menerima email?</strong> Cek folder <strong>Spam/Junk</strong> Anda
                </p>
              </div>

              {/* Button */}
              <button
                onClick={handleGoToLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Mengerti, ke Halaman Login
              </button>

              {/* Footer Info */}
              <p className="text-center text-xs text-gray-500 mt-4">
                Link verifikasi berlaku selama 60 menit
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className={`max-w-md w-full ${success ? 'opacity-50 pointer-events-none' : ''}`}>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          
          {/* Navigasi Back */}
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

            {/* Submit Button */}
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