<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $frontendUrl = config('app.frontend_url', 'http://localhost:5173');
        $resetUrl = "{$frontendUrl}/reset-password?token={$this->token}&email={$notifiable->email}";
        
        $html = $this->getEmailHtml($notifiable->username, $resetUrl);

        $message = new MailMessage();
        $message->subject('🔐 Reset Password - Inventory System');
        $message->view = ['html' => new HtmlString($html)];
        
        return $message;
    }

    protected function getEmailHtml($username, $resetUrl)
    {
        $year = date('Y');
        
        return <<<HTML
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
    <div style="background: white; max-width: 600px; margin: 0 auto; border-radius: 16px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white;">
            <div style="background: rgba(255, 255, 255, 0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; line-height: 80px; font-size: 40px; border: 3px solid rgba(255, 255, 255, 0.3);">
                🔐
            </div>
            <h1 style="font-size: 28px; margin: 0 0 10px 0; font-weight: 700;">Reset Password</h1>
            <p style="font-size: 16px; margin: 0; opacity: 0.95;">Inventory Management System</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <p style="font-size: 18px; color: #1a202c; margin: 0 0 20px 0; font-weight: 600;">
                Halo, {$username}! 👋
            </p>
            
            <p style="font-size: 16px; color: #4a5568; line-height: 1.6; margin: 0 0 30px 0;">
                Kami menerima permintaan untuk mereset password akun Anda di <strong>Inventory System</strong>. 
                Ikuti langkah-langkah berikut untuk membuat password baru:
            </p>

            <!-- Steps Guide -->
            <div style="background: #f0f4ff; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <p style="font-size: 15px; color: #4c51bf; font-weight: 600; margin: 0 0 15px 0;">
                    📋 Cara Reset Password:
                </p>
                <ol style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.8;">
                    <li style="margin-bottom: 8px;">Klik tombol <strong>"Reset Password Saya"</strong> di bawah</li>
                    <li style="margin-bottom: 8px;">Anda akan diarahkan ke halaman reset password</li>
                    <li style="margin-bottom: 8px;">Masukkan password baru Anda (min. 8 karakter)</li>
                    <li style="margin-bottom: 8px;">Konfirmasi password baru</li>
                    <li>Klik "Reset Password" dan selesai!</li>
                </ol>
            </div>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 35px 0;">
                <a href="{$resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 18px 60px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 17px; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);">
                    🔓 Reset Password Saya
                </a>
                <p style="font-size: 13px; color: #718096; margin: 15px 0 0 0;">
                    Klik tombol di atas untuk melanjutkan
                </p>
            </div>

            <!-- Password Requirements -->
            <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="font-size: 14px; color: #065f46; margin: 0 0 10px 0;">
                    <strong>✅ Persyaratan Password Baru:</strong>
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #065f46; line-height: 1.6;">
                    <li>Minimal 8 karakter</li>
                    <li>Mengandung huruf besar (A-Z)</li>
                    <li>Mengandung huruf kecil (a-z)</li>
                    <li>Mengandung angka (0-9)</li>
                    <li>Password baru harus berbeda dengan password lama</li>
                </ul>
            </div>
            
            <!-- Important Warning -->
            <div style="background: #fff5f5; border-left: 4px solid #f56565; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="font-size: 14px; color: #742a2a; margin: 0;">
                    <strong>⚠️ Penting:</strong> Link reset password ini akan kadaluwarsa dalam <strong>60 menit</strong>. 
                    Jika Anda tidak meminta reset password, abaikan email ini dan password Anda akan tetap aman.
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
                    {$resetUrl}
                </div>
            </div>

            <!-- Security Tips -->
            <div style="background: #fffbeb; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                <p style="font-size: 14px; color: #92400e; margin: 0 0 10px 0; font-weight: 600;">
                    🔒 Tips Keamanan:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #92400e; font-size: 13px; line-height: 1.6;">
                    <li>Gunakan kombinasi huruf, angka, dan karakter khusus</li>
                    <li>Jangan gunakan password yang sama dengan akun lain</li>
                    <li>Hindari informasi pribadi seperti tanggal lahir</li>
                    <li>Simpan password di tempat yang aman</li>
                </ul>
            </div>

            <!-- Troubleshooting -->
            <div style="background: #fef2f2; border-radius: 8px; padding: 15px;">
                <p style="font-size: 14px; color: #991b1b; margin: 0 0 10px 0; font-weight: 600;">
                    ❌ Tidak Merasa Meminta Reset?
                </p>
                <p style="margin: 0; color: #991b1b; font-size: 13px; line-height: 1.6;">
                    Jika Anda tidak meminta reset password, <strong>abaikan email ini</strong>. 
                    Password Anda tetap aman dan tidak akan berubah. Kami sarankan untuk mengganti password Anda secara berkala untuk keamanan.
                </p>
            </div>
            
            <p style="font-size: 14px; color: #718096; line-height: 1.5; margin: 20px 0 0 0; text-align: center;">
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
        </div>
    </div>
</body>
</html>
HTML;
    }
}