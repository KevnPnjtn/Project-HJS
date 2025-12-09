import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { forgotPassword } from '../../services/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess(false);

  console.log('🔄 Submitting forgot password for:', email);

  if (!email.trim()) {
    setError('Email harus diisi!');
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    setError('Format email tidak valid!');
    return;
  }

  try {
    setLoading(true);
    console.log('📤 Sending request...');
    
    const response = await forgotPassword(email);
    
    console.log('✅ Response received:', response);
    console.log('✅ Response data:', response.data);
    
    if (response.data.status === 'success') {
      setSuccess(true);
      setEmail('');
      console.log('✅ Success! Email sent');
    }
  } catch (err) {
    console.error('❌ Forgot password error:', err);
    console.error('❌ Error response:', err.response);
    console.error('❌ Error data:', err.response?.data);
    
    if (err.response?.status === 422) {
      const errors = err.response.data.errors;
      if (errors?.email) {
        setError(errors.email[0]);
      } else {
        setError(err.response.data.message || 'Email tidak terdaftar.');
      }
    } else if (err.response?.status === 403) {
      setError(err.response.data.message || 'Silakan verifikasi email Anda terlebih dahulu.');
    } else if (err.response?.status === 500) {
      setError(err.response.data.message || 'Gagal mengirim email. Cek konfigurasi email server.');
    } else {
      setError(err.response?.data?.message || 'Gagal mengirim email reset password. Silakan coba lagi.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link 
          to="/login"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Kembali ke Login</span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Mail className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Lupa Password?
            </h1>
            <p className="text-gray-600">
              Masukkan email Anda dan kami akan mengirimkan link untuk reset password
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-green-800 font-semibold mb-1">
                  Email Berhasil Dikirim!
                </p>
                <p className="text-green-700 text-sm">
                  Silakan cek inbox email Anda dan klik link reset password. 
                  Jika tidak menerima email, cek folder spam/junk.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm flex-1">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  disabled={loading || success}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Kirim Link Reset Password</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
            </p>
            <p className="text-sm text-gray-600">
              Belum punya akun?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Daftar
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Link reset password akan kedaluwarsa dalam 60 menit</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;