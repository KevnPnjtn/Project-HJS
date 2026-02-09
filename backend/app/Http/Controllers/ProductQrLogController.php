<?php

namespace App\Http\Controllers;

use App\Models\ProductQrLog;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductQrLogController extends Controller
{

    public function index(Request $request)
    {
        try {
            $perPage = $request->get('per_page', 15);
            $productId = $request->get('product_id');
            $scannedBy = $request->get('scanned_by');

            $query = ProductQrLog::with('product');

            if ($productId) {
                $query->where('product_id', $productId);
            }

            if ($scannedBy) {
                $query->byScanner($scannedBy);
            }

            $logs = $query->orderBy('scanned_at', 'desc')->paginate($perPage);

            return response()->json([
                'status' => 'success',
                'data' => $logs
            ], 200);

        } catch (\Exception $e) {
            Log::error('Failed to fetch QR logs', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch QR logs'
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $log = ProductQrLog::with('product')->findOrFail($id);

            return response()->json([
                'status' => 'success',
                'data' => $log
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'QR log not found'
            ], 404);
        }
    }


    public function getByProduct($productId)
    {
        try {
            $logs = ProductQrLog::where('product_id', $productId)
                ->orderBy('scanned_at', 'desc')
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $logs
            ], 200);

        } catch (\Exception $e) {
            Log::error('Failed to fetch product QR logs', [
                'product_id' => $productId,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch product QR logs'
            ], 500);
        }
    }

    public function statistics(Request $request)
    {
        try {
            $startDate = $request->get('start_date');
            $endDate = $request->get('end_date');

            $query = ProductQrLog::query();

            if ($startDate && $endDate) {
                $query->scannedBetween($startDate, $endDate);
            }

            $totalScans = $query->count();
            $uniqueProducts = $query->distinct('product_id')->count('product_id');
            $scansToday = ProductQrLog::today()->count();

            $topScannedProducts = ProductQrLog::select('product_id', DB::raw('COUNT(*) as scan_count'))
                ->with('product')
                ->groupBy('product_id')
                ->orderBy('scan_count', 'desc')
                ->limit(10)
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => [
                    'total_scans' => $totalScans,
                    'unique_products' => $uniqueProducts,
                    'scans_today' => $scansToday,
                    'top_scanned_products' => $topScannedProducts
                ]
            ], 200);

        } catch (\Exception $e) {
            Log::error('Failed to fetch QR statistics', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch statistics'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $log = ProductQrLog::findOrFail($id);
            $log->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'QR log deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete QR log'
            ], 500);
        }
    }
}