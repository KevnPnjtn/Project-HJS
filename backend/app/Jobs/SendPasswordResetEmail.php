<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Models\User;

class SendPasswordResetEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $email;
    public $token;
    public $tries = 3;
    public $timeout = 60;
    public $backoff = [10, 30, 60];  

    public function __construct($email, $token)
    {
        $this->email = $email;
        $this->token = $token;
    }

    public function handle(): void
    {
        Log::info('🔄 Processing password reset email', [
            'email' => $this->email,
            'attempt' => $this->attempts()
        ]);

        try {
            $user = User::where('email', $this->email)->first();
            
            if (!$user) {
                Log::error('❌ User not found', ['email' => $this->email]);
                return;
            }

            $resetUrl = config('app.frontend_url', 'http://localhost:5173') 
                . '/reset-password?token=' . $this->token 
                . '&email=' . urlencode($this->email);

            Mail::send('emails.reset-password', [
                'resetUrl' => $resetUrl,
                'userName' => $user->username,
                'email' => $user->email
            ], function ($message) use ($user) {
                $message->to($user->email)
                    ->subject('Reset Password - ' . config('app.name'));
            });

            Log::info('✅ Password reset email sent successfully', [
                'email' => $this->email
            ]);

        } catch (\Exception $e) {
            Log::error('❌ Failed to send password reset email', [
                'email' => $this->email,
                'error' => $e->getMessage(),
                'attempt' => $this->attempts()
            ]);
            
            throw $e;  
        }
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('❌ Password reset email job failed permanently', [
            'email' => $this->email,
            'error' => $exception->getMessage()
        ]);
    }
}