<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password as PasswordRule;
use Illuminate\Support\Facades\Password as PasswordFacade;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        Log::info('=== REGISTER REQUEST RECEIVED ===');

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
                    PasswordRule::min(8)->letters()->mixedCase()->numbers()
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
            try {
                set_time_limit(15);
                event(new Registered($user));
                Log::info('✓ Verification email sent', ['user_id' => $user->user_id]);
            } catch (\Exception $e) {
                Log::warning('✗ Email send failed (non-critical):', [
                    'user_id' => $user->user_id,
                    'error' => $e->getMessage()
                ]);
            } finally {
                set_time_limit(30); 
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Registrasi berhasil! Silakan cek email Anda untuk verifikasi.',
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
                'input' => $request->except('password', 'password_confirmation')
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
                'line' => $e->getLine()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Registrasi gagal. Silakan coba lagi.'
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

            Log::info('✓ Login successful for user: ' . $user->user_id);

            return response()->json([
                'status' => 'success',
                'message' => 'Login berhasil',
                'access_token' => $token,
                'user' => [
                    'id' => $user->user_id, 
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

        try {
            $request->merge([
                'email' => trim($request->email ?? ''),
            ]);

            $request->validate(['email' => 'required|email']);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email tidak ditemukan.'
                ], 404);
            }

            if ($user->hasVerifiedEmail()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email sudah diverifikasi.'
                ], 400);
            }

            try {
                set_time_limit(15);
                $user->sendEmailVerificationNotification();
                Log::info('✓ Verification email sent', ['user_id' => $user->user_id]);
            } catch (\Exception $e) {
                Log::warning('✗ Resend email failed (non-critical):', [
                    'user_id' => $user->user_id,
                    'error' => $e->getMessage()
                ]);
            } finally {
                set_time_limit(30);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Email verifikasi telah dikirim. Silakan cek inbox Anda.'
            ], 200);

        } catch (\Exception $e) {
            Log::error('✗ Resend error:', ['message' => $e->getMessage()]);
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

        try {
            $request->merge([
                'email' => strtolower(trim($request->email ?? '')),
            ]);

            $request->validate([
                'email' => 'required|email',
            ]);

            $user = User::whereRaw('LOWER(email) = ?', [strtolower($request->email)])->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validasi gagal',
                    'errors' => [
                        'email' => ['Email tidak terdaftar dalam sistem.']
                    ]
                ], 422);
            }

            if (!$user->hasVerifiedEmail()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Silakan verifikasi email Anda terlebih dahulu sebelum reset password.',
                ], 403);
            }

            try {
                $status = PasswordFacade::sendResetLink(['email' => $user->email]);
                Log::info('✓ Password reset link dispatched', ['email' => $user->email]);
            } catch (\Exception $mailError) {
                Log::error('✗ Password reset email failed:', [
                    'email' => $user->email,
                    'error' => $mailError->getMessage()
                ]);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Link reset password telah dikirim ke email Anda.',
            ], 200);

        } catch (\Exception $e) {
            Log::error('✗ Forgot password error:', ['message' => $e->getMessage()]);
            
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan.'
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

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email tidak ditemukan.',
                ], 404);
            }

            if (Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Password baru tidak boleh sama dengan password lama.',
                    'errors' => [
                        'password' => ['Password baru tidak boleh sama dengan password lama.']
                    ]
                ], 422);
            }

            $tokenData = DB::table('password_reset_tokens')
                ->where('email', $request->email)
                ->first();

            if (!$tokenData) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token reset password tidak valid.',
                ], 400);
            }

            if (now()->diffInMinutes($tokenData->created_at) > 60) {
                DB::table('password_reset_tokens')->where('email', $request->email)->delete();
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token reset password sudah kedaluwarsa.',
                ], 400);
            }

            if (!Hash::check($request->token, $tokenData->token)) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Token reset password tidak valid.',
                ], 400);
            }

            $user->password = Hash::make($request->password);
            $user->setRememberToken(Str::random(60));
            $user->save();

            DB::table('password_reset_tokens')->where('email', $request->email)->delete();

            Log::info('✓ Password reset successful', [
                'user_id' => $user->user_id,
                'email' => $user->email
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Password berhasil direset. Silakan login dengan password baru Anda.',
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
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
                'message' => 'Terjadi kesalahan.'
            ], 500);
        }
    }
}