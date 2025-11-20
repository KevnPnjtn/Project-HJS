<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stock_transactions', function (Blueprint $table) {
            $table->id('transaction_id');

            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('user_id')->nullable();

            $table->enum('jenis_transaksi', ['IN', 'OUT', 'ADJUST']);
            $table->integer('jumlah');
            $table->text('catatan')->nullable();

            $table->timestamps();

            $table->foreign('product_id')
                  ->references('product_id')->on('products')
                  ->cascadeOnDelete();

            $table->foreign('user_id')
                  ->references('user_id')->on('users')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stock_transactions');
    }
};
