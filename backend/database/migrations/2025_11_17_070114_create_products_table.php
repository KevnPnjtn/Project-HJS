<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');

            $table->unsignedBigInteger('user_id')->nullable();

            $table->string('kode_barang', 50)->unique();
            $table->string('uuid', 36)->unique()->nullable();
            $table->string('nama_barang', 255);
            $table->string('jenis_barang', 255)->nullable();
            $table->string('satuan', 50);
            $table->integer('stok_minimal')->nullable()->default(null);
            $table->integer('stok')->nullable()->default(null);
            $table->decimal('harga_modal', 15, 2);
            $table->decimal('harga_jual', 15, 2);
            $table->decimal('profit', 15, 2)->storedAs('harga_jual - harga_modal');
            $table->text('qr_code')->nullable();
            $table->enum('status', ['Tersedia', 'Habis'])
                  ->storedAs("CASE WHEN stok > 0 THEN 'Tersedia' ELSE 'Habis' END");

            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

