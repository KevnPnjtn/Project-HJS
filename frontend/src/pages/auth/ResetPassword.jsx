import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, KeyRound } from 'lucide-react';
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

  // Get token and email from URL
  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    
    if (!token || !email) {
      setError('Link reset password tidak valid. Silakan request reset password kembali.');
    } else {
      setFormData(prev => ({ ...prev, token, email }));
    }
  }, [searchParams]);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('minimal 8 karakter');
    if (!/[a-z]/.test(password)) errors.push('huruf kecil');
    if (!/[A-Z]/.test(password)) errors.push('huruf besar');
    if (!/[0-9]/.test(password)) errors.push('angka');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    // Validasi password
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      setValidationErrors({
        password: `Password harus mengandung ${passwordErrors.join(', ')}`
      });
      return;
    }

    // Validasi konfirmasi password
    if (formData.password !== formData.password_confirmation) {
      setValidationErrors({
        password_confirmation: 'Password dan konfirmasi password tidak cocok'
      });
      return;
    }

    try {
      setLoading(true);
      const response = await resetPassword(formData);
      
      if (response.data.status === 'success') {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      console.error('Reset password error:', err);
      
      if (err.response?.status === 422) {
        setValidationErrors(err.response.data.errors || {});
        setError(err.response.data.message || 'Validasi gagal. Periksa input Anda.');
      } else if (err.response?.status === 400) {
        setError(err.response.data.message || 'Token reset password tidak valid atau sudah kedaluwarsa.');
      } else {
        setError(err.response?.data?.message || 'Gagal mereset password. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength: 25, label: 'Lemah', color: 'bg-red-500' };
    if (strength === 3) return { strength: 50, label: 'Sedang', color: 'bg-yellow-500' };
    if (strength === 4) return { strength: 75, label: 'Kuat', color: 'bg-blue-500' };
    return { strength: 100, label: 'Sangat Kuat', color: 'bg-green-500' };
  };

  const strength = passwordStrength(formData.password);

  // Redirect jika sukses
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Password Berhasil Direset!</h1>
          <p className="text-gray-600 mb-6">
            Password Anda telah berhasil diubah. Anda akan diarahkan ke halaman login...
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Login Sekarang
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <KeyRound className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600">
              Masukkan password baru untuk akun Anda
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-700 text-sm">{error}</p>
                {error.includes('tidak valid') && (
                  <Link
                    to="/forgot-password"
                    className="text-red-600 hover:text-red-700 font-semibold text-sm mt-2 inline-block"
                  >
                    Request reset password baru →
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email (readonly) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password Baru
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimal 8 karakter"
                  className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Kekuatan Password:</span>
                    <span className={`text-xs font-semibold ${
                      strength.label === 'Lemah' ? 'text-red-600' :
                      strength.label === 'Sedang' ? 'text-yellow-600' :
                      strength.label === 'Kuat' ? 'text-blue-600' :
                      'text-green-600'
                    }`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${strength.color}`}
                      style={{ width: `${strength.strength}%` }}
                    />
                  </div>
                </div>
              )}

              {validationErrors.password && (
                <p className="text-red-600 text-sm mt-1">{validationErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Konfirmasi Password Baru
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.password_confirmation}
                  onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                  placeholder="Konfirmasi password baru"
                  className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {validationErrors.password_confirmation && (
                <p className="text-red-600 text-sm mt-1">{validationErrors.password_confirmation}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.token}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Reset Password</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              Kembali ke Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;