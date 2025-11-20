<?php

namespace App\Http\Controllers;

use App\Models\ProductQrLog;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductQrLogController extends Controller
{
    public function index(Request $request)
    {
        $query = ProductQrLog::with('product');

        if ($request->has('product_id')) {
            $query->where('product_id', $request->product_id);
        }

        if ($request->has('scanned_by')) {
            $query->byScanner($request->scanned_by);
        }

        if ($request->has('today') && $request->today == true) {
            $query->today();
        }

        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('scanned_at', [$request->start_date, $request->end_date]);
        }

        $logs = $query->latest('scanned_at')->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $logs
        ]);
    }

    public function show($id)
    {
        $log = ProductQrLog::with('product')->find($id);

        if (!$log) {
            return response()->json([
                'success' => false,
                'message' => 'Log not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $log
        ]);
    }

    public function getByProduct($productId)
    {
        $product = Product::find($productId);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        $logs = ProductQrLog::where('product_id', $productId)
            ->latest('scanned_at')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'product' => $product,
                'logs' => $logs,
                'total_scans' => $logs->count()
            ]
        ]);
    }

    public function statistics(Request $request)
    {
        $query = ProductQrLog::query();

        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('scanned_at', [$request->start_date, $request->end_date]);
        }

        $mostScanned = ProductQrLog::with('product')
            ->selectRaw('product_id, COUNT(*) as scan_count')
            ->groupBy('product_id')
            ->orderBy('scan_count', 'desc')
            ->limit(10)
            ->get();

        $topScanners = ProductQrLog::selectRaw('scanned_by, COUNT(*) as scan_count')
            ->whereNotNull('scanned_by')
            ->groupBy('scanned_by')
            ->orderBy('scan_count', 'desc')
            ->limit(10)
            ->get();

        $statistics = [
            'total_scans' => $query->count(),
            'unique_products' => $query->distinct('product_id')->count('product_id'),
            'scans_today' => ProductQrLog::today()->count(),
            'most_scanned_products' => $mostScanned,
            'top_scanners' => $topScanners
        ];

        return response()->json([
            'success' => true,
            'data' => $statistics
        ]);
    }

    public function destroy($id)
    {
        $log = ProductQrLog::find($id);

        if (!$log) {
            return response()->json([
                'success' => false,
                'message' => 'Log not found'
            ], 404);
        }

        $log->delete();

        return response()->json([
            'success' => true,
            'message' => 'Log deleted successfully'
        ]);
    }
}