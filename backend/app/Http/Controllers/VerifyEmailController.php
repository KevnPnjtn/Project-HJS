<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class VerifyEmailController extends Controller
{
    /**
     * Verify user's email address
     * 
     * Route: GET /api/email/verify/{id}/{hash}?expires=...&signature=...
     */
    public function verify(Request $request, $id, $hash)
    {
        Log::info('=== EMAIL VERIFICATION REQUEST ===', [
            'user_id' => $id,
            'hash' => $hash,
            'has_signature' => $request->hasValidSignature(),
        ]);

        try {
            // 1. Validate signature FIRST (before database query)
            if (!$request->hasValidSignature()) {
                Log::warning('✗ Invalid or expired signature', ['user_id' => $id]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Link verifikasi telah kadaluwarsa. Silakan kirim ulang email verifikasi.',
                    'expired' => true,
                ], 400);
            }

            // 2. Find user
            $user = User::where('user_id', $id)->first();

            if (!$user) {
                Log::warning('✗ User not found', ['user_id' => $id]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'User tidak ditemukan.',
                ], 404);
            }

            // 3. Check if already verified (sebelum validasi hash)
            if ($user->hasVerifiedEmail()) {
                Log::info('ℹ Email already verified', [
                    'user_id' => $id,
                    'verified_at' => $user->email_verified_at,
                ]);
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'Email sudah terverifikasi sebelumnya.',
                    'already_verified' => true,
                    'user' => [
                        'id' => $user->user_id,
                        'username' => $user->username,
                        'email' => $user->email,
                        'email_verified_at' => $user->email_verified_at,
                    ],
                ], 200);
            }

            // 4. Validate hash
            $expectedHash = sha1($user->getEmailForVerification());
            
            if (!hash_equals($expectedHash, (string) $hash)) {
                Log::warning('✗ Invalid verification hash', [
                    'user_id' => $id,
                    'expected' => $expectedHash,
                    'received' => $hash,
                ]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Link verifikasi tidak valid.',
                ], 400);
            }

            // 5. Prevent race condition dengan cache lock
            $lockKey = "email_verification_lock_{$user->user_id}";
            
            if (Cache::has($lockKey)) {
                Log::info('⚠ Verification already in progress', ['user_id' => $user->user_id]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Verifikasi sedang diproses. Mohon tunggu sebentar.',
                ], 429);
            }

            // Set lock for 10 seconds
            Cache::put($lockKey, true, 10);

            try {
                // 6. Mark email as verified
                if ($user->markEmailAsVerified()) {
                    event(new Verified($user));
                    
                    Log::info('✓ Email verification successful', [
                        'user_id' => $user->user_id,
                        'email' => $user->email,
                        'verified_at' => $user->email_verified_at,
                    ]);

                    return response()->json([
                        'status' => 'success',
                        'message' => 'Email berhasil diverifikasi! Anda sekarang dapat login.',
                        'user' => [
                            'id' => $user->user_id,
                            'username' => $user->username,
                            'email' => $user->email,
                            'email_verified_at' => $user->email_verified_at,
                        ],
                    ], 200);
                }

                // Jika markEmailAsVerified() return false
                return response()->json([
                    'status' => 'error',
                    'message' => 'Gagal memverifikasi email.',
                ], 500);

            } finally {
                // Always release lock
                Cache::forget($lockKey);
            }

        } catch (\Exception $e) {
            Log::error('✗ Email verification error', [
                'user_id' => $id,
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat verifikasi email. Silakan coba lagi.',
            ], 500);
        }
    }

    /**
     * Resend email verification notification
     * 
     * Route: POST /api/email/resend
     * Body: { "email": "user@example.com" }
     */
    public function resend(Request $request)
    {
        Log::info('=== RESEND VERIFICATION REQUEST ===', [
            'email' => $request->email,
        ]);

        try {
            $request->validate(['email' => 'required|email']);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email tidak ditemukan.',
                ], 404);
            }

            if ($user->hasVerifiedEmail()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email sudah diverifikasi.',
                ], 400);
            }

            // ✅ Rate limiting untuk prevent spam
            $cacheKey = "resend_verification_{$user->user_id}";
            
            if (Cache::has($cacheKey)) {
                $remainingTime = Cache::get($cacheKey);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Mohon tunggu 1 menit sebelum mengirim ulang.',
                    'retry_after' => 60,
                ], 429);
            }

            // Set lock untuk 1 menit
            Cache::put($cacheKey, true, 60);

            try {
                set_time_limit(15);
                $user->sendEmailVerificationNotification();
                
                Log::info('✓ Verification email resent', [
                    'user_id' => $user->user_id,
                    'email' => $user->email
                ]);
                
            } catch (\Exception $e) {
                Log::warning('✗ Resend email failed (non-critical)', [
                    'user_id' => $user->user_id,
                    'error' => $e->getMessage(),
                ]);
            } finally {
                set_time_limit(30);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Email verifikasi telah dikirim ulang. Silakan cek inbox Anda.',
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Format email tidak valid.',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            Log::error('✗ Resend verification error', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat mengirim email.',
            ], 500);
        }
    }
}