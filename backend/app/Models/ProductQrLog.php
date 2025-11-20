<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductQrLog extends Model
{
    use HasFactory;

    protected $table = 'product_qr_logs';
    protected $primaryKey = 'log_id';

    protected $fillable = [
        'product_id',
        'scanned_by',
        'scanned_at',
    ];

    protected $casts = [
        'scanned_at' => 'datetime',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    public function scopeToday($query)
    {
        return $query->whereDate('scanned_at', today());
    }

    public function scopeByScanner($query, $scanner)
    {
        return $query->where('scanned_by', $scanner);
    }
}