<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password as PasswordRule;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        Log::info('=== REGISTER REQUEST RECEIVED ===');
        Log::info('Request Data:', $request->all());

        try {
            $request->merge([
                'username' => trim($request->username ?? ''),
                'email' => trim($request->email ?? ''),
            ]);

            $validated = $request->validate([
                'username' => 'required|string|max:255|unique:users',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => [
                    'required',
                    'confirmed',  
                    Password::min(8)->letters()->mixedCase()->numbers()
                ],
            ]);

            Log::info('✓ Validation passed');

            DB::beginTransaction();
            
            $user = User::create([
                'username' => $validated['username'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => 'user',
            ]);

            Log::info('✓ User created successfully:', [
                'user_id' => $user->user_id,
                'username' => $user->username,
                'email' => $user->email
            ]);

            DB::commit();

            $emailMessage = 'Registrasi berhasil! Silakan cek email Anda untuk verifikasi.';
            
            try {
                set_time_limit(15); 
                
                event(new Registered($user));
                Log::info('✓ Verification email sent', [
                    'user_id' => $user->user_id
                ]);
                
            } catch (\Exception $emailError) {
                Log::error('✗ Email sending failed:', [
                    'user_id' => $user->user_id,
                    'error' => $emailError->getMessage()
                ]);

                $emailMessage = 'Registrasi berhasil! Namun email verifikasi gagal dikirim. Anda dapat meminta kirim ulang.';
            } finally {
                set_time_limit(30);
            }

            return response()->json([
                'status' => 'success',
                'message' => $emailMessage,
                'user' => [
                    'id' => $user->user_id, 
                    'username' => $user->username,
                    'email' => $user->email,
                    'role' => $user->role,
                    'email_verified' => false,
                ],
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('✗ Validation failed:', [
                'errors' => $e->errors(),
                'input' => $request->all()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('✗ Registration failed:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Registrasi gagal: ' . $e->getMessage()
            ], 500);
        }
    }
 
    public function login(Request $request)
    {
        Log::info('=== LOGIN REQUEST RECEIVED ===');

        $request->merge([
            'email' => trim($request->email ?? ''),
        ]);

        try {
            $credentials = $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            if (!Auth::attempt($credentials)) {
                Log::warning('✗ Login failed: Invalid credentials');
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email atau password salah.',
                ], 401);
            }

            $user = Auth::user();
            
            if (!$user->hasVerifiedEmail()) {
                Auth::logout(); 
                
                Log::warning('✗ Login blocked: Email not verified', [
                    'user_id' => $user->user_id,
                    'email' => $user->email
                ]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Silakan verifikasi email Anda terlebih dahulu.',
                    'email_verified' => false,
                    'email' => $user->email, 
                ], 403);
            }

            $token = $user->createToken('auth_token')->plainTextToken;
            $cookie = cookie(
            'access_token',      
            $token,              
            180,             
            '/',                 
            null,                
            app()->environment('production'),                
            true,                
            false,               
            'Lax'                
        );

            Log::info('✓ Login successful, cookie set for user: ' . $user->id);

            return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil',
            'user' => [
                'id' => $user->id, 
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'email_verified_at' => $user->email_verified_at,
            ]
        ], 200)->withCookie($cookie);
        }
        
        catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('✗ Login validation failed:', $e->errors());
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('✗ Login error:', [
                'message' => $e->getMessage()
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Login gagal'
            ], 500);
        }
    }

    public function resendVerification(Request $request)
    {
        Log::info('=== RESEND VERIFICATION REQUEST ===');
        Log::info('Email:', $request->email);

        try {
            $request->merge([
                'email' => trim($request->email ?? ''),
            ]);

            $request->validate(['email' => 'required|email']);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                Log::warning('✗ User not found for email:', $request->email);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email tidak ditemukan.'
                ], 404);
            }

            if ($user->hasVerifiedEmail()) {
                Log::info('Email already verified', [
                    'user_id' => $user->user_id
                ]);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email sudah diverifikasi.'
                ], 400);
            }

            try {
                set_time_limit(15);
                
                $user->sendEmailVerificationNotification();
                
                Log::info('✓ Verification email resent', [
                    'user_id' => $user->user_id,
                    'email' => $user->email
                ]);
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'Email verifikasi telah dikirim ulang. Silakan cek inbox Anda.'
                ], 200);

            } catch (\Exception $mailError) {
                Log::error('✗ Resend email failed:', [
                    'user_id' => $user->user_id,
                    'error' => $mailError->getMessage()
                ]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Gagal mengirim email verifikasi. Silakan coba lagi.'
                ], 500);
            } finally {
                set_time_limit(30);
            }

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('✗ Resend validation failed:', $e->errors());
            return response()->json([
                'status' => 'error',
                'message' => 'Format email tidak valid',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('✗ Resend error:', [
                'message' => $e->getMessage()
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan'
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            if ($request->user()) {
                $request->user()->currentAccessToken()->delete();
            }

            $cookie = Cookie::forget('access_token');

            return response()->json([
                'status' => 'success',
                'message' => 'Logout berhasil.',
            ], 200)->withCookie($cookie);

        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => 'Logout error'], 500);
        }
    }
    
    public function forgotPassword(Request $request)
    {
        Log::info('=== FORGOT PASSWORD REQUEST ===');
        Log::info('Request Email:', ['email' => $request->email]);

        try {
            $request->merge([
                'email' => strtolower(trim($request->email ?? '')),
            ]);

            Log::info('After processing:', ['email' => $request->email]);

            $request->validate([
                'email' => 'required|email',
            ]);

            // Manual check dengan case-insensitive
            $user = User::whereRaw('LOWER(email) = ?', [strtolower($request->email)])->first();

            if (!$user) {
                Log::warning('✗ User not found with email:', ['email' => $request->email]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validasi gagal',
                    'errors' => [
                        'email' => ['Email tidak terdaftar dalam sistem.']
                    ]
                ], 422);
            }

            Log::info('✓ User found:', [
                'user_id' => $user->user_id,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at
            ]);

            // Cek apakah email sudah diverifikasi
            if (!$user->hasVerifiedEmail()) {
                Log::warning('✗ Password reset blocked: Email not verified', [
                    'email' => $user->email
                ]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Silakan verifikasi email Anda terlebih dahulu sebelum reset password.',
                ], 403);
            }

            Log::info('✓ Email is verified, attempting to send reset link');

            try {
                set_time_limit(15);
                
                // ✅ Kirim link reset password - gunakan Password facade
                $status = Password::sendResetLink(
                    ['email' => $user->email]
                );

                Log::info('Password::sendResetLink status:', ['status' => $status]);

                if ($status === Password::RESET_LINK_SENT) {
                    Log::info('✓ Password reset link sent successfully', [
                        'email' => $user->email
                    ]);

                    return response()->json([
                        'status' => 'success',
                        'message' => 'Link reset password telah dikirim ke email Anda. Silakan cek inbox atau folder spam.',
                    ], 200);
                }

                Log::error('✗ Password reset link not sent', [
                    'status' => $status,
                    'email' => $user->email
                ]);

                return response()->json([
                    'status' => 'error',
                    'message' => 'Gagal mengirim email reset password. Silakan coba lagi.',
                ], 500);

            } catch (\Exception $mailError) {
                Log::error('✗ Password reset email failed:', [
                    'email' => $user->email,
                    'error' => $mailError->getMessage(),
                    'trace' => $mailError->getTraceAsString()
                ]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Gagal mengirim email reset password: ' . $mailError->getMessage(),
                ], 500);
            } finally {
                set_time_limit(30);
            }

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('✗ Forgot password validation failed:', [
                'errors' => $e->errors(),
                'input' => $request->all()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
            
        } catch (\Exception $e) {
            Log::error('✗ Forgot password error:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        Log::info('=== RESET PASSWORD REQUEST ===');
        
        try {
            $request->validate([
                'token' => 'required',
                'email' => 'required|email',
                'password' => [
                    'required',
                    'confirmed',
                    PasswordRule::min(8)->letters()->mixedCase()->numbers()  
                ],
            ]);

            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function (User $user, string $password) {
                    $user->forceFill([
                        'password' => Hash::make($password)
                    ])->setRememberToken(Str::random(60));

                    $user->save();

                    event(new PasswordReset($user));

                    Log::info('✓ Password reset successful', [
                        'user_id' => $user->user_id,
                        'email' => $user->email
                    ]);
                }
            );

            if ($status === Password::PASSWORD_RESET) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Password berhasil direset. Silakan login dengan password baru Anda.',
                ], 200);
            }

            $message = match($status) {
                Password::INVALID_TOKEN => 'Token reset password tidak valid atau sudah kedaluwarsa.',
                Password::INVALID_USER => 'Email tidak ditemukan.',
                default => 'Gagal mereset password. Silakan coba lagi.',
            };

            Log::warning('✗ Password reset failed:', [
                'status' => $status,
                'email' => $request->email
            ]);

            return response()->json([
                'status' => 'error',
                'message' => $message,
            ], 400);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('✗ Reset password validation failed:', $e->errors());
            
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
            
        } catch (\Exception $e) {
            Log::error('✗ Reset password error:', [
                'message' => $e->getMessage()
            ]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan. Silakan coba lagi.'
            ], 500);
    }
}
}