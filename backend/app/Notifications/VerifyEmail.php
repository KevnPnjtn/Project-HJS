<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;
use Illuminate\Support\HtmlString;

class VerifyEmail extends VerifyEmailBase
{
    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);
        
        $html = $this->getEmailHtml($notifiable->username, $notifiable->email, $verificationUrl);

        $message = new MailMessage();
        $message->subject('✅ Verifikasi Email Anda - Inventory System');
        $message->view = ['html' => new HtmlString($html)];
        
        return $message;
    }

    protected function verificationUrl($notifiable)
    {
        $frontendUrl = config('app.frontend_url', 'http://localhost:5173');
        
        $backendUrl = URL::temporarySignedRoute(
            'verification.verify',
            Carbon::now()->addMinutes(60),
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification()),
            ]
        );

        $parsed = parse_url($backendUrl);
        $queryString = isset($parsed['query']) ? $parsed['query'] : '';
        
        $frontendVerifyUrl = $frontendUrl . '/verify-email/' 
            . $notifiable->getKey() . '/' 
            . sha1($notifiable->getEmailForVerification());
        
        if ($queryString) {
            $frontendVerifyUrl .= '?' . $queryString;
        }
        
        return $frontendVerifyUrl;
    }

    protected function getEmailHtml($username, $email, $verificationUrl)
    {
        $year = date('Y');
        
        return <<<HTML
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
    <div style="background: white; max-width: 600px; margin: 0 auto; border-radius: 16px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white;">
            <div style="background: rgba(255, 255, 255, 0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; line-height: 80px; font-size: 40px; border: 3px solid rgba(255, 255, 255, 0.3);">
                📦
            </div>
            <h1 style="font-size: 28px; margin: 0 0 10px 0; font-weight: 700;">Verifikasi Email Anda</h1>
            <p style="font-size: 16px; margin: 0; opacity: 0.95;">Inventory Management System</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <p style="font-size: 18px; color: #1a202c; margin: 0 0 20px 0; font-weight: 600;">
                Halo, {$username}! 👋
            </p>
            
            <p style="font-size: 16px; color: #4a5568; line-height: 1.6; margin: 0 0 30px 0;">
                Terima kasih telah mendaftar di <strong>Inventory System</strong>. 
                Anda hanya <strong>satu langkah lagi</strong> untuk mulai menggunakan aplikasi!
            </p>

            <!-- Steps Guide -->
            <div style="background: #f0f4ff; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <p style="font-size: 15px; color: #4c51bf; font-weight: 600; margin: 0 0 15px 0;">
                    📋 Cara Verifikasi Email:
                </p>
                <ol style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.8;">
                    <li style="margin-bottom: 8px;">Klik tombol <strong>"Verifikasi Email Saya"</strong> di bawah</li>
                    <li style="margin-bottom: 8px;">Anda akan diarahkan ke halaman sukses</li>
                    <li style="margin-bottom: 8px;">Tunggu beberapa detik, lalu otomatis masuk ke halaman login</li>
                    <li>Masukkan email dan password Anda untuk login</li>
                </ol>
            </div>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 35px 0;">
                <a href="{$verificationUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 18px 60px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 17px; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);">
                    ✓ Verifikasi Email Saya
                </a>
                <p style="font-size: 13px; color: #718096; margin: 15px 0 0 0;">
                    Klik tombol di atas untuk melanjutkan
                </p>
            </div>

            <!-- What Happens Next -->
            <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="font-size: 14px; color: #065f46; margin: 0 0 10px 0;">
                    <strong>✨ Setelah Klik Tombol:</strong>
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #065f46; line-height: 1.6;">
                    <li>Halaman akan menampilkan pesan sukses ✅</li>
                    <li>Countdown timer 5 detik akan muncul ⏱️</li>
                    <li>Otomatis diarahkan ke halaman login 🔐</li>
                    <li>Atau klik tombol "Login Sekarang" untuk langsung login</li>
                </ul>
            </div>
            
            <!-- Important Warning -->
            <div style="background: #fff5f5; border-left: 4px solid #f56565; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="font-size: 14px; color: #742a2a; margin: 0;">
                    <strong>⚠️ Penting:</strong> Link verifikasi ini akan kadaluwarsa dalam <strong>60 menit</strong>. 
                    Jika Anda tidak melakukan pendaftaran, abaikan email ini.
                </p>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; margin: 30px 0;"></div>
            
            <!-- Manual Link Section -->
            <div style="background: #fafafa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <p style="font-size: 14px; color: #718096; margin: 0 0 10px 0; font-weight: 600;">
                    🔗 Tombol tidak bekerja?
                </p>
                <p style="font-size: 13px; color: #718096; margin: 0 0 10px 0;">
                    Salin dan tempel URL berikut ke browser Anda:
                </p>
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; word-break: break-all; font-size: 12px; color: #4a5568; font-family: 'Courier New', monospace;">
                    {$verificationUrl}
                </div>
            </div>

            <!-- Troubleshooting -->
            <div style="background: #fffbeb; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <p style="font-size: 14px; color: #92400e; margin: 0 0 10px 0; font-weight: 600;">
                    💡 Mengalami Masalah?
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #92400e; font-size: 13px; line-height: 1.6;">
                    <li><strong>Link kedaluwarsa?</strong> Klik "Kirim Ulang" di halaman login</li>
                    <li><strong>Tidak menerima email?</strong> Cek folder Spam/Junk</li>
                    <li><strong>Masih bermasalah?</strong> Hubungi tim support kami</li>
                </ul>
            </div>
            
            <p style="font-size: 14px; color: #718096; line-height: 1.5; margin: 0; text-align: center;">
                <strong>Butuh bantuan?</strong><br>
                Tim support kami siap membantu Anda 24/7
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="font-size: 13px; color: #a0aec0; margin: 0 0 10px 0;">
                &copy; {$year} Inventory System. All rights reserved.
            </p>
            <p style="font-size: 13px; color: #a0aec0; margin: 0;">
                Email ini dikirim otomatis, mohon tidak membalas email ini.
            </p>
            <p style="font-size: 12px; color: #cbd5e0; margin: 10px 0 0 0;">
                📧 Email terkirim ke: <strong>{$email}</strong>
            </p>
        </div>
    </div>
</body>
</html>
HTML;
    }
}