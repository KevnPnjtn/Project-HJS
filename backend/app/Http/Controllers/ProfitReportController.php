<?php

namespace App\Http\Controllers;

use App\Models\ProfitReport;
use App\Models\StockTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ProfitReportController extends Controller
{
    public function index(Request $request)
    {
        $query = ProfitReport::query();

        if ($request->has('period_type')) {
            $query->where('period_type', $request->period_type);
        }

        if ($request->has('start_date') && $request->has('end_date')) {
            $query->byPeriod($request->start_date, $request->end_date);
        }

        $reports = $query->latest('period_start')->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $reports
        ]);
    }

    public function show($id)
    {
        $report = ProfitReport::find($id);

        if (!$report) {
            return response()->json([
                'success' => false,
                'message' => 'Report not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $report
        ]);
    }

    public function generate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'period_type' => 'required|in:DAILY,WEEKLY,MONTHLY',
            'period_start' => 'required|date',
            'period_end' => 'required|date|after_or_equal:period_start'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $transactions = StockTransaction::with('product')
            ->where('jenis_transaksi', 'OUT')
            ->whereBetween('created_at', [$request->period_start, $request->period_end])
            ->get();

        $totalModal = 0;
        $totalPenjualan = 0;

        foreach ($transactions as $transaction) {
            $product = $transaction->product;
            $jumlah = $transaction->jumlah;

            $totalModal += $product->harga_modal * $jumlah;
            $totalPenjualan += $product->harga_jual * $jumlah;
        }

        $totalProfit = $totalPenjualan - $totalModal;

        $report = ProfitReport::create([
            'period_type' => $request->period_type,
            'period_start' => $request->period_start,
            'period_end' => $request->period_end,
            'total_modal' => $totalModal,
            'total_penjualan' => $totalPenjualan,
            'total_profit' => $totalProfit
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Report generated successfully',
            'data' => $report
        ], 201);
    }

    public function generateDaily(Request $request)
    {
        $date = $request->date ?? Carbon::today()->toDateString();

        return $this->generate(new Request([
            'period_type' => 'DAILY',
            'period_start' => $date,
            'period_end' => $date
        ]));
    }

    public function generateWeekly(Request $request)
    {
        $startOfWeek = Carbon::parse($request->date ?? Carbon::today())->startOfWeek();
        $endOfWeek = Carbon::parse($request->date ?? Carbon::today())->endOfWeek();

        return $this->generate(new Request([
            'period_type' => 'WEEKLY',
            'period_start' => $startOfWeek->toDateString(),
            'period_end' => $endOfWeek->toDateString()
        ]));
    }

    public function generateMonthly(Request $request)
    {
        $startOfMonth = Carbon::parse($request->date ?? Carbon::today())->startOfMonth();
        $endOfMonth = Carbon::parse($request->date ?? Carbon::today())->endOfMonth();

        return $this->generate(new Request([
            'period_type' => 'MONTHLY',
            'period_start' => $startOfMonth->toDateString(),
            'period_end' => $endOfMonth->toDateString()
        ]));
    }

    public function summary(Request $request)
    {
        $query = ProfitReport::query();

        if ($request->has('start_date') && $request->has('end_date')) {
            $query->byPeriod($request->start_date, $request->end_date);
        }

        $summary = [
            'total_modal' => $query->clone()->sum('total_modal'),
            'total_penjualan' => $query->clone()->sum('total_penjualan'),
            'total_profit' => $query->clone()->sum('total_profit'),
            'total_reports' => $query->count()
        ];

        return response()->json([
            'success' => true,
            'data' => $summary
        ]);
    }

    public function destroy($id)
    {
        $report = ProfitReport::find($id);

        if (!$report) {
            return response()->json([
                'success' => false,
                'message' => 'Report not found'
            ], 404);
        }

        $report->delete();

        return response()->json([
            'success' => true,
            'message' => 'Report deleted successfully'
        ]);
    }
}