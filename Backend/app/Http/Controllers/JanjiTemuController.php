<?php

namespace App\Http\Controllers;

use App\Models\JadwalTemu;
use App\Models\Tamu;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Str;

class JanjiTemuController extends Controller
{
    public function createJanji(Request $request)
    {
        $user = $request->user();
        $tamu = Tamu::where('telepon', $request->no_hp)->first();

        // Buat / ambil tamu
        $kodeVerifikasi = null;
        if (!$tamu) {
            $kodeVerifikasi = Str::random(10);
            $tamu = Tamu::create([
                'nama'    => $request->nama_tamu,
                'telepon' => $request->no_hp,
                'password' => Hash::make($kodeVerifikasi),
            ]);
        }
        // else {
        //     $tamu->update([
        //         "password" => Hash::make($kodeVerifikasi)
        //     ]);
        // }

        // Tentukan user_id (role Guru vs lainnya)
        $userId = $user->role === 'Guru'
            ? $user->id
            : $request->guru;

        // Buat Janji temu
        $createJanji = JadwalTemu::create([
            'user_id'   => $userId,
            'tamu_id'   => $tamu->id,
            'tanggal'   => $request->tanggal,
            'keterangan' => $request->keterangan,
            "created_at" => now()
        ]);

        // —————— GENERATE QR CODE ——————
        // Isi QR: id janji temu (ubah kalau perlu)
        $pngData = QrCode::format('png')
            ->size(300)
            ->generate($createJanji->id);

        // Base64 data URL
        $base64 = 'data:image/png;base64,' . base64_encode($pngData);

        // Ubah nomor lokal (0xxxx) → internasional (62xxxx)
        $toNumber = preg_replace('/^0/', '62', $request->no_hp);

        // —————— KIRIM KE EXPRESS (wweb.js) --------
        // Endpoint ini sesuai yang kamu expose di server.js
        $expressUrl = config('services.wa_service.base_url') . '/send-media';

        $nameGuru = User::where("id", $request->guru ?? 1)->first();
        $guru = $user->role == "Guru" ? $user->name : $nameGuru->name;
        $caption = 'Kode QR untuk Janji Temu Dengan ' . $guru;
        if ($kodeVerifikasi) {
            $caption = 'Kode QR untuk Janji Temu Dengan ' . $guru . ". Dan Jika anda ingin melihat Jadwalnya silahkan masukan Nomor Hp dengan Password berikut " . $kodeVerifikasi;
        }

        // Kirim ke Express
        $response = Http::post($expressUrl, [
            'to'          => $toNumber,
            'mediaBase64' => $base64,
            'filename'    => "qr-janji-{$createJanji->id}.png",
            'caption'     => $caption,
        ]);

        // Cek apakah kirim sukses
        if ($response->failed()) {
            return response()->json([
                'message' => 'Janji Temu dibuat, tapi gagal mengirim QR ke WhatsApp',
                'error'   => $response->body(),
            ], 500);
        }

        return response()->json([
            'message' => 'Janji Temu Berhasil Dibuat dan QR terkirim ke WhatsApp',
            'janji_id' => $createJanji->id,
        ], 200);
    }
    public function getJanji(Request $request)
    {
        $user = $request->user();
        $tanggal = $request->query("tanggal") ?? "asc";
        $status = $request->query("status") ?? "semua";
        $nama = $request->query("nama");

        if ($user->role == "Guru") {
            $janji = JadwalTemu::where('user_id', $user->id)
                ->whereDate('tanggal', Carbon::today())
                ->with('tamu')
                ->orderByRaw("CASE WHEN status = 'Menunggu' THEN 0 ELSE 1 END")
                ->orderBy('tanggal', 'desc')
                ->get();

            $riwayat = JadwalTemu::orderBy("tanggal", $tanggal)->where([
                "user_id" => $user->id,
            ])
                ->with("tamu")
                ->get();

            // mengambil data semua tamu
            if ($status !== "Semua") {
                $riwayat = JadwalTemu::orderBy("tanggal", $tanggal)->where([
                    "user_id" => $user->id,
                ])
                    ->where("status", $status)
                    ->with("tamu")
                    ->get();
            }
            // mengambil data yang terlambat
            if ($status == "Telat") {
                $riwayat = JadwalTemu::orderBy("tanggal", $tanggal)->where([
                    "user_id" => $user->id,
                ])
                    ->where(["status" => $status, "reschedule" => "Tunggu"])
                    ->with("tamu")
                    ->get();
            }
            // mengambil data yang Dijadwalkan Ulang
            if ($status == "Batalkan") {
                $riwayat = JadwalTemu::orderBy("tanggal", $tanggal)->where([
                    "user_id" => $user->id,
                ])
                    ->where("reschedule", $status)
                    ->with("tamu")
                    ->get();
            }
            $jadwalTemu = JadwalTemu::orderBy("tanggal", "asc")->where([
                "user_id" => $user->id,
            ])
                ->with("tamu")
                ->get();

            return response()->json(["janji" => $janji, "riwayat" => $riwayat, "jadwal_temu" => $jadwalTemu], 200);
        }
        if ($user->role == "Admin" || $user->role == "Penerima Tamu") {
            $janji = JadwalTemu::with(["tamu", "guru"])->get();
            return response()->json($janji, 200);
        }
    }
    public function getDetailJanji(Request $request, string $id)
    {
        $janji = JadwalTemu::where(["user_id" => $id])->with(["tamu"])->get();
        return response()->json($janji, 200);
    }
    public function updateJanji(Request $request, string $id)
    {
        $janji = JadwalTemu::where("id", $id)->with("tamu")->first();
        if (!$janji || $janji->status !== "Menunggu") {
            $toNumber = preg_replace('/^0/', '62', $janji->tamu->telepon);
            Log::info($toNumber);
            // Kirim ke Express
            $response = Http::post("http://localhost:3001/api/wa/send-link", [
                'to'          => $toNumber,
                'caption'     => "Terima kasih Telah Berkunjung, silahkan mengisi link berikut : https://g.co/kgs/8jkAYv2",
            ]);

            Log::info($response);

            // Cek apakah kirim sukses
            if ($response->failed()) {
                return response()->json([
                    'message' => 'Wa service Error',
                    'error'   => $response->body(),
                ], 500);
            }
            return response()->json([
                "message" => "Terima Kasih telah Berkunjung"
            ], 200);
        }
        if ($janji->tanggal < Carbon::now()->subMinutes(45)) {
            $janji->update([
                "status" => "Telat",
                "updated_at" => now()
            ]);
        } else {
            $janji->update([
                "status" => "Selesai",
                "updated_at" => now()
            ]);
        }
        return response()->json([
            "message" => "Kode QR Sukses"
        ], 200);
    }
    public function laporanJanji(Request $request)
    {
        $date = $request->query("date");
        $guruId = $request->query("guru") ?? "semua";

        $query = JadwalTemu::with(["tamu", "guru"])
            ->orderBy("tanggal", "asc");

        // Filter berdasarkan tanggal
        if ($date === "bulan-ini") {
            $query->whereMonth("tanggal", Carbon::now()->month);
        } elseif ($date === "bulan-kemarin") {
            $query->whereMonth("tanggal", Carbon::now()->subMonth()->month);
        } else {
            list($tahun, $bulan) = explode('-', $date);
            $query->whereYear('tanggal', $tahun)
                ->whereMonth('tanggal', $bulan);
        }

        // Filter berdasarkan guru jika tidak "semua"
        if ($guruId !== "semua") {
            $query->where("user_id", $guruId);
        }

        $janji = $query->get();

        return response()->json($janji, 200);
    }

    public function notification(Request $request)
    {
        $user = $request->user();
        $notif = JadwalTemu::orderBy("updated_at", "desc")->where("user_id", $user->id)
            ->where("status", "!=", "Menunggu")->with(["tamu"])
            ->get();
        if ($user->role == "Penerima Tamu") {
            $notif = Jadwaltemu::where("reschedule", "!=", null)->with(["guru", "tamu"])->get();
        }
        return response()->json($notif, 200);
    }
    public function putNotification(Request $request, string $id)
    {
        $user = $request->user();
        $status = $request->query("status");
        $notif = JadwalTemu::where("id", $id)
            ->first()
            ->update([
                "reschedule" => $status
            ]);
        return response()->json([
            "message" => "Janji Berhasil di Konfirmasi"
        ], 200);
    }
    public function getJanjiByPenerimaTamu(Request $request)
    {
        $user = $request->user();
        $janji = JadwalTemu::orderby("tanggal", "asc")->where(["tamu_id" => $user->id])->with(["tamu", "guru"])->get();
        return response()->json($janji, 200);
    }
}
