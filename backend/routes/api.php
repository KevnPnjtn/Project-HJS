<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockTransactionController;
use App\Http\Controllers\StockOpnameController;
use App\Http\Controllers\ProfitReportController;
use App\Http\Controllers\ProductQrLogController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    Log::info('=== EMAIL VERIFICATION ATTEMPT ===', [
        'user_id' => $id,
        'hash' => $hash,
        'expires' => $request->query('expires'),
        'signature' => $request->query('signature'),
        'url' => $request->fullUrl(),
        'method' => $request->method(),
        'headers' => $request->headers->all()
    ]);

    try {
        // Validate signature first
        if (!URL::hasValidSignature($request)) {
            Log::error('❌ Invalid signature or expired');
            return response()->json([
                'status' => 'error',
                'message' => 'Link verifikasi tidak valid atau sudah kedaluwarsa.',
                'expired' => true
            ], 403);
        }

        // Find user
        $user = User::where('user_id', $id)->first();
        
        if (!$user) {
            Log::error('❌ User not found', ['user_id' => $id]);
            return response()->json([
                'status' => 'error',
                'message' => 'User tidak ditemukan.'
            ], 404);
        }

        Log::info('✓ User found', [
            'user_id' => $user->user_id,
            'email' => $user->email,
            'already_verified' => $user->hasVerifiedEmail()
        ]);

        // Verify hash
        $expectedHash = sha1($user->getEmailForVerification());
        if (!hash_equals($expectedHash, (string) $hash)) {
            Log::error('❌ Hash mismatch', [
                'expected' => $expectedHash,
                'received' => $hash
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Link verifikasi tidak valid.'
            ], 403);
        }

        // Check if already verified
        if ($user->hasVerifiedEmail()) {
            Log::info('ℹ️ Email already verified');
            return response()->json([
                'status' => 'success',
                'message' => 'Email sudah diverifikasi sebelumnya.',
                'already_verified' => true
            ], 200);
        }

        // Mark as verified
        $user->markEmailAsVerified();
        event(new \Illuminate\Auth\Events\Verified($user));
        
        // Force refresh from database
        $user = $user->fresh();
        
        Log::info('✅ Email verified successfully', [
            'user_id' => $user->user_id,
            'email' => $user->email,
            'verified_at' => $user->email_verified_at,
            'verified_at_timestamp' => $user->email_verified_at ? $user->email_verified_at->timestamp : null
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Email berhasil diverifikasi!',
            'already_verified' => false,
            'verified_at' => $user->email_verified_at
        ], 200);

    } catch (\Exception $e) {
        Log::error('❌ Email verification error', [
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'trace' => $e->getTraceAsString()
        ]);

        return response()->json([
            'status' => 'error',
            'message' => 'Terjadi kesalahan saat verifikasi: ' . $e->getMessage()
        ], 500);
    }
})->name('verification.verify');

Route::post('/email/resend', [AuthController::class, 'resendVerification']);
Route::prefix('dev')->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/dropdown/list', [ProductController::class, 'getForDropdown']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::post('/products/scan-qr', [ProductController::class, 'scanQrCode']);

    Route::get('/stock-transactions', [StockTransactionController::class, 'index']);
    Route::get('/stock-transactions/{id}', [StockTransactionController::class, 'show']);
    Route::post('/stock-transactions', [StockTransactionController::class, 'store']);
    Route::get('/stock-transactions/product/{productId}', [StockTransactionController::class, 'getByProduct']);
    Route::get('/stock-transactions/summary/all', [StockTransactionController::class, 'summary']);
    Route::put('/stock-transactions/{id}', [StockTransactionController::class, 'update']);
    Route::delete('/stock-transactions/{id}', [StockTransactionController::class, 'destroy']);
    Route::get('/stock-transactions/kartu-stok/{productId}', [StockTransactionController::class, 'getKartuStok']);
    
    Route::get('/stock-opnames', [StockOpnameController::class, 'index']);
    Route::get('/stock-opnames/{id}', [StockOpnameController::class, 'show']);
    Route::post('/stock-opnames', [StockOpnameController::class, 'store']);
    Route::post('/stock-opnames/{id}/adjust', [StockOpnameController::class, 'adjustStock']);
    Route::delete('/stock-opnames/{id}', [StockOpnameController::class, 'destroy']);
    Route::get('/stock-opnames/summary/all', [StockOpnameController::class, 'summary']);
    
    Route::get('/profit-reports', [ProfitReportController::class, 'index']);
    Route::get('/profit-reports/{id}', [ProfitReportController::class, 'show']);
    Route::post('/profit-reports/generate', [ProfitReportController::class, 'generate']);
    Route::post('/profit-reports/generate/daily', [ProfitReportController::class, 'generateDaily']);
    Route::post('/profit-reports/generate/weekly', [ProfitReportController::class, 'generateWeekly']);
    Route::post('/profit-reports/generate/monthly', [ProfitReportController::class, 'generateMonthly']);
    Route::get('/profit-reports/summary/all', [ProfitReportController::class, 'summary']);

    Route::get('/qr-logs', [ProductQrLogController::class, 'index']);
    Route::get('/qr-logs/{id}', [ProductQrLogController::class, 'show']);
    Route::get('/qr-logs/product/{productId}', [ProductQrLogController::class, 'getByProduct']);
    Route::get('/qr-logs/statistics/all', [ProductQrLogController::class, 'statistics']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', fn(Request $request) => $request->user());

    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index']);
        Route::get('/dropdown/list', [ProductController::class, 'getForDropdown']);
        Route::get('/{id}', [ProductController::class, 'show']);
        Route::post('/', [ProductController::class, 'store']);
        Route::put('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
        Route::post('/scan-qr', [ProductController::class, 'scanQrCode']);
    });

    Route::prefix('stock-transactions')->group(function () {
        Route::get('/', [StockTransactionController::class, 'index']);
        Route::get('/{id}', [StockTransactionController::class, 'show']);
        Route::post('/', [StockTransactionController::class, 'store']);
        Route::get('/product/{productId}', [StockTransactionController::class, 'getByProduct']);
        Route::get('/summary/all', [StockTransactionController::class, 'summary']);
    });

    Route::prefix('stock-opnames')->group(function () {
        Route::get('/', [StockOpnameController::class, 'index']);
        Route::get('/{id}', [StockOpnameController::class, 'show']);
        Route::post('/', [StockOpnameController::class, 'store']);
        Route::post('/{id}/adjust', [StockOpnameController::class, 'adjustStock']);
        Route::delete('/{id}', [StockOpnameController::class, 'destroy']);
        Route::get('/summary/all', [StockOpnameController::class, 'summary']);
    });

    Route::prefix('profit-reports')->group(function () {
        Route::get('/', [ProfitReportController::class, 'index']);
        Route::get('/{id}', [ProfitReportController::class, 'show']);
        Route::delete('/{id}', [ProfitReportController::class, 'destroy']);
        Route::post('/generate', [ProfitReportController::class, 'generate']);
        Route::post('/generate/daily', [ProfitReportController::class, 'generateDaily']);
        Route::post('/generate/weekly', [ProfitReportController::class, 'generateWeekly']);
        Route::post('/generate/monthly', [ProfitReportController::class, 'generateMonthly']);
        Route::get('/summary/all', [ProfitReportController::class, 'summary']);
    });

    Route::prefix('qr-logs')->group(function () {
        Route::get('/', [ProductQrLogController::class, 'index']);
        Route::get('/statistics', [ProductQrLogController::class, 'statistics']);
        Route::get('/product/{productId}', [ProductQrLogController::class, 'getByProduct']);
        Route::get('/{id}', [ProductQrLogController::class, 'show']);
        Route::delete('/{id}', [ProductQrLogController::class, 'destroy']);
    });

    Route::middleware('admin')->group(function () {
        Route::get('/admin', fn() => response()->json(['message' => 'Admin access granted']));
    });
});