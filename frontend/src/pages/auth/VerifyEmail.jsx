import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, ArrowRight, Mail, Clock, AlertTriangle, RefreshCw } from 'lucide-react';
import api from '../../services/api';

const VerifyEmailPage = () => {
  const { id, hash } = useParams();
  const location = useLocation(); 
  const navigate = useNavigate();
  const hasVerified = useRef(false);
  
  const [status, setStatus] = useState('verifying'); 
  const [message, setMessage] = useState('Memverifikasi email Anda...');
  const [countdown, setCountdown] = useState(5);
  const [showResend, setShowResend] = useState(false);
  const [resendEmail, setResendEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const verifyEmail = async () => {
      try {
        if (!id || !hash || !location.search) {
          console.error('❌ Missing params:', { id, hash, search: location.search });
          setStatus('error');
          setMessage('Link verifikasi tidak valid atau tidak lengkap.');
          return;
        }
        const verifyUrl = `/email/verify/${id}/${hash}${location.search}`;
        
        console.log('📡 Sending request to:', verifyUrl);

        const response = await api.get(verifyUrl);

        console.log('✅ Verification response:', response.data);

        if (response.data.status === 'success') {
          if (response.data.already_verified) {
            setStatus('already_verified');
            setMessage('Email Anda sudah diverifikasi sebelumnya.');
          } else {
            setStatus('success');
            setMessage(response.data.message || 'Email berhasil diverifikasi!');
          }
          
          const interval = setInterval(() => {
            setCountdown(prev => {
              if (prev <= 1) {
                clearInterval(interval);
                navigate('/login');
              }
              return prev - 1;
            });
          }, 1000);

          return () => clearInterval(interval);
        }

      } catch (error) {
        console.error('❌ Verification error:', error);
        setStatus('error');
        
        if (error.response?.status === 403 || error.response?.data?.message?.includes('Invalid signature')) {
            setMessage('Link verifikasi tidak valid atau tanda tangan digital rusak.');
        } else if (error.response?.data?.expired || error.response?.data?.message?.includes('kedaluwarsa')) {
          setMessage('Link verifikasi telah kadaluwarsa (lebih dari 60 menit).');
          setShowResend(true);
        } else if (error.response?.data?.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage('Terjadi kesalahan saat verifikasi email.');
        }
      }
    };

    verifyEmail();
  }, [id, hash, location.search, navigate]);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendLoading(true);
    setResendMessage('');

    try {
      const response = await api.post('/email/resend', { email: resendEmail });
      
      if (response.data.status === 'success') {
        setResendMessage('✅ Link verifikasi baru telah dikirim! Silakan cek email Anda.');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setResendMessage('❌ ' + error.response.data.message);
      } else {
        setResendMessage('❌ Gagal mengirim ulang link verifikasi.');
      }
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        
        {/* LOADING STATE */}
        {status === 'verifying' && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border-2 border-white/30">
                  <Loader2 className="w-16 h-16 text-white animate-spin" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Memverifikasi Email...
              </h2>
              <p className="text-white/90">
                Mohon tunggu sebentar
              </p>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === 'success' && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white p-4 rounded-full shadow-lg animate-bounce">
                  <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                🎉 Verifikasi Berhasil!
              </h2>
              <p className="text-white/90 text-lg">
                Email Anda telah terverifikasi
              </p>
            </div>

            <div className="p-8 text-center">
              <p className="mb-6 text-gray-600">Anda akan diarahkan ke halaman login dalam <strong>{countdown}</strong> detik.</p>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all"
              >
                Login Sekarang
              </button>
            </div>
          </div>
        )}

        {/* ALREADY VERIFIED STATE */}
        {status === 'already_verified' && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-center">
              <div className="flex justify-center mb-4">
                 <Mail className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Email Sudah Terverifikasi</h2>
            </div>
            <div className="p-8 text-center">
                <p className="text-gray-600 mb-6">Akun ini sudah aktif sebelumnya.</p>
                <button
                onClick={() => navigate('/login')}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                Login Sekarang
              </button>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {status === 'error' && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white p-4 rounded-full shadow-lg">
                  <XCircle className="w-16 h-16 text-red-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Verifikasi Gagal
              </h2>
              <p className="text-white/90">
                {message}
              </p>
            </div>

            <div className="p-8">
              {/* Form Kirim Ulang hanya muncul jika errornya expired/invalid */}
              {showResend ? (
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                   <h3 className="font-bold text-orange-900 mb-4 flex items-center">
                    <RefreshCw className="w-5 h-5 mr-2" /> Kirim Ulang Link
                  </h3>
                  <form onSubmit={handleResend} className="space-y-4">
                    <input
                        type="email"
                        value={resendEmail}
                        onChange={(e) => setResendEmail(e.target.value)}
                        placeholder="Masukkan email Anda"
                        className="w-full px-4 py-3 border rounded-lg"
                        required
                      />
                      <button
                      type="submit"
                      disabled={resendLoading}
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 disabled:opacity-50"
                    >
                      {resendLoading ? 'Mengirim...' : 'Kirim Link Baru'}
                    </button>
                  </form>
                  {resendMessage && <p className="mt-3 text-sm font-semibold">{resendMessage}</p>}
                </div>
              ) : (
                 <button
                onClick={() => navigate('/login')}
                className="w-full bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-gray-900 transition-all"
              >
                Kembali ke Login
              </button>
              )}
            </div>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Inventory System.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;