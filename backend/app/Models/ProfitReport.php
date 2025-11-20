<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfitReport extends Model
{
    use HasFactory;

    protected $table = 'profit_reports';
    protected $primaryKey = 'report_id';

    protected $fillable = [
        'period_type',
        'period_start',
        'period_end',
        'total_modal',
        'total_penjualan',
        'total_profit',
    ];

    protected $casts = [
        'period_start' => 'date',
        'period_end' => 'date',
        'total_modal' => 'decimal:2',
        'total_penjualan' => 'decimal:2',
        'total_profit' => 'decimal:2',
    ];

    public function scopeDaily($query)
    {
        return $query->where('period_type', 'DAILY');
    }

    public function scopeWeekly($query)
    {
        return $query->where('period_type', 'WEEKLY');
    }

    public function scopeMonthly($query)
    {
        return $query->where('period_type', 'MONTHLY');
    }

    public function scopeByPeriod($query, $start, $end)
    {
        return $query->whereBetween('period_start', [$start, $end]);
    }
}