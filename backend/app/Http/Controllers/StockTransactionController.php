<?php

namespace App\Http\Controllers;

use App\Models\StockTransaction;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StockTransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = StockTransaction::with(['product', 'user']);

        if ($request->has('jenis_transaksi')) {
            $query->where('jenis_transaksi', $request->jenis_transaksi);
        }

        if ($request->has('product_id')) {
            $query->where('product_id', $request->product_id);
        }

        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('created_at', [$request->start_date, $request->end_date]);
        }

        $transactions = $query->latest()->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $transactions
        ]);
    }

    public function show($id)
    {
        $transaction = StockTransaction::with(['product', 'user'])->find($id);

        if (!$transaction) {
            return response()->json([
                'success' => false,
                'message' => 'Transaction not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $transaction
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,product_id',
            'user_id' => 'nullable|exists:users,user_id',
            'jenis_transaksi' => 'required|in:IN,OUT,ADJUST',
            'jumlah' => 'required|integer|min:1',
            'catatan' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->jenis_transaksi === 'OUT') {
            $product = Product::find($request->product_id);
            if ($product->stok < $request->jumlah) {
                return response()->json([
                    'success' => false,
                    'message' => 'Stok tidak mencukupi. Stok tersedia: ' . $product->stok
                ], 422);
            }
        }

        $transaction = StockTransaction::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Transaction created successfully',
            'data' => $transaction->load(['product', 'user'])
        ], 201);
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

        $transactions = StockTransaction::with('user')
            ->where('product_id', $productId)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'product' => $product,
                'transactions' => $transactions
            ]
        ]);
    }

    public function summary(Request $request)
    {
        $query = StockTransaction::query();

        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('created_at', [$request->start_date, $request->end_date]);
        }

        $summary = [
            'total_in' => $query->clone()->where('jenis_transaksi', 'IN')->sum('jumlah'),
            'total_out' => $query->clone()->where('jenis_transaksi', 'OUT')->sum('jumlah'),
            'total_adjust' => $query->clone()->where('jenis_transaksi', 'ADJUST')->count(),
            'total_transactions' => $query->count()
        ];

        return response()->json([
            'success' => true,
            'data' => $summary
        ]);
    }
}