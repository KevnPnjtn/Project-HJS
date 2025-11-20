<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_qr_logs', function (Blueprint $table) {
            $table->id('log_id');

            $table->unsignedBigInteger('product_id');
            $table->string('scanned_by')->nullable();
            $table->timestamp('scanned_at')->useCurrent();

            $table->timestamps();

            $table->foreign('product_id')
                  ->references('product_id')->on('products')
                  ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_qr_logs');
    }
};
