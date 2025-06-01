<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jadwal_temu', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained()->onDelete("cascade");
            $table->foreignId("tamu_id")->constrained("tamu")->onDelete("cascade");
            $table->dateTime("tanggal");
            $table->string("keterangan");
            $table->enum("status", ["Menunggu", "Telat", "Selesai"])->default("Menunggu");
            $table->enum("reschedule", ["Tunggu", "Batalkan"])->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal_temu');
    }
};
