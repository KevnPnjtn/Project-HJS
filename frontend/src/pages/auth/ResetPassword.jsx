import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { resetPassword } from '../../services/auth';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    token: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // ✅ Debug: Log URL parameters
  useEffect(() => {
    console.log('=== Reset Password Component Mounted ===');
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    
    console.log('Token:', token);
    console.log('Email:', email);
    
    if (!token || !email) {
      console.error('Missing token or email in URL');
      setError('Link tidak valid atau kadaluarsa. Silakan request ulang.');
    } else {
      setFormData(prev => ({ ...prev, token, email }));
      console.log('Form data updated successfully');
    }
  }, [searchParams]);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('min 8 karakter');
    if (!/[a-z]/.test(password)) errors.push('huruf kecil');
    if (!/[A-Z]/.test(password)) errors.push('huruf besar');
    if (!/[0-9]/.test(password)) errors.push('angka');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=== Form Submit ===');
    setError('');
    setValidationErrors({});

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setValidationErrors({
        password: `Kurang: ${passwordErrors.join(', ')}`
      });
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setValidationErrors({
        password_confirmation: 'Password tidak cocok'
      });
      return;
    }

    try {
      setLoading(true);
      console.log('Sending reset password request...');
      const response = await resetPassword(formData);
      
      console.log('Response:', response.data);
      
      if (response.data.status === 'success') {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      console.error('Reset password error:', err);
      console.error('Error response:', err.response);
      
      if (err.response?.status === 422) {
        const errors = err.response.data.errors || {};
        setValidationErrors(errors);
        
        if (errors.password && errors.password[0].includes('tidak boleh sama')) {
          setError('Password baru tidak boleh sama dengan password lama Anda.');
        } else {
          setError(err.response.data.message || 'Validasi gagal.');
        }
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.message || 'Token tidak valid atau sudah kadaluarsa.');
      } else {
        setError(err.response?.data?.message || 'Gagal mereset password.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: 'bg-gray-200' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0: return { score: 1, label: 'Sangat Lemah', color: 'bg-red-500' };
      case 1: return { score: 2, label: 'Lemah', color: 'bg-orange-500' };
      case 2: return { score: 3, label: 'Sedang', color: 'bg-yellow-500' };
      case 3: return { score: 4, label: 'Kuat', color: 'bg-blue-500' };
      case 4: return { score: 4, label: 'Sangat Kuat', color: 'bg-green-500' };
      default: return { score: 0, label: '', color: 'bg-gray-200' };
    }
  };

  const strength = getPasswordStrength(formData.password);

  // ✅ Tampilan Sukses
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-50 p-4 rounded-full">
              <div className="bg-green-100 p-3 rounded-full">
                <ShieldCheck className="w-12 h-12 text-green-600" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Berhasil Diubah!</h2>
          <p className="text-gray-600 mb-8">
            Akun Anda telah diamankan dengan password baru. Mengalihkan ke halaman login...
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-black transition-all"
          >
            Login Sekarang
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Tampilan Form Utama
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            to="/login"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Kembali ke Login</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-50 p-4 rounded-full">
              <div className="bg-blue-100 p-3 rounded-full">
                <Lock className="w-10 h-10 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-500 text-sm">
              Buat password baru yang kuat untuk akun
            </p>
            {formData.email && (
              <p className="font-medium text-blue-600 text-sm mt-1">{formData.email}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-700 font-medium">{error}</p>
                {error.includes('Link tidak valid') && (
                  <Link 
                    to="/forgot-password" 
                    className="text-xs text-red-600 underline hover:text-red-700 mt-2 inline-block"
                  >
                    Request link baru
                  </Link>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password Baru
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimal 8 karakter"
                  disabled={loading}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    validationErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Strength Indicator */}
              {formData.password && (
                <div className="mt-3 px-1">
                  <div className="flex gap-1 h-1.5 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-300 ${
                          i < strength.score ? strength.color : 'bg-gray-100'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Kekuatan:</span>
                    <span className={`font-medium ${strength.color.replace('bg-', 'text-')}`}>
                      {strength.label}
                    </span>
                  </div>
                </div>
              )}
              
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.password_confirmation}
                  onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                  placeholder="Ulangi password baru"
                  disabled={loading}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    validationErrors.password_confirmation ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {validationErrors.password_confirmation && (
                <p className="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.password_confirmation}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.token || !formData.email}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none mt-6"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Ubah Password</span>
                </>
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Tips:</strong> Gunakan kombinasi huruf besar, huruf kecil, dan angka untuk password yang lebih aman.
            </p>
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} Inventory System. Aman & Terpercaya.
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;