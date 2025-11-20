<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profit_reports', function (Blueprint $table) {
            $table->id('report_id');

            $table->enum('period_type', ['DAILY', 'WEEKLY', 'MONTHLY']);
            $table->date('period_start');
            $table->date('period_end');

            $table->decimal('total_modal', 20, 2);
            $table->decimal('total_penjualan', 20, 2);
            $table->decimal('total_profit', 20, 2);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profit_reports');
    }
};
