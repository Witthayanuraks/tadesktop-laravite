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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'no_hp' => 'required|string|regex:/^[0-9]+$/|min:10',
            'tanggal' => 'required|date|after:now',
            'keterangan' => 'required|string',
            'guru' => 'required_if:role,!=,Guru|exists:users,id'
        ]);

        $user = $request->user();
        $tamu = Tamu::where('telepon', $validated['no_hp'])->first();

        $kodeVerifikasi = null;
        if (!$tamu) {
            $kodeVerifikasi = Str::random(10);
            $tamu = Tamu::create([
                'name'    => $validated['name'],
                'telepon' => $validated['no_hp'],
                'password' => Hash::make($kodeVerifikasi),
            ]);
        }

        $userId = $user->role === 'Guru' ? $user->id : $validated['guru'];

        $createJanji = JadwalTemu::create([
            'user_id'   => $userId,
            'tamu_id'   => $tamu->id,
            'tanggal'   => $validated['tanggal'],
            'keterangan' => $validated['keterangan'],
            "created_at" => now()
        ]);

        $pngData = QrCode::format('png')
            ->size(300)
            ->generate($createJanji->id);

        $base64 = 'data:image/png;base64,' . base64_encode($pngData);
        $toNumber = preg_replace('/^0/', '62', $validated['no_hp']);
        $expressUrl = config('services.wa_service.base_url') . '/send-media';

        $nameGuru = User::find($validated['guru'] ?? $user->id);
        $guru = $user->role == "Guru" ? $user->name : $nameGuru->name;
        $caption = 'Kode QR untuk Janji Temu Dengan ' . $guru;
        if ($kodeVerifikasi) {
            $caption .= ". Dan Jika anda ingin melihat Jadwalnya silahkan masukan Nomor Hp dengan Password berikut " . $kodeVerifikasi;
        }

        $response = Http::post($expressUrl, [
            'to'          => $toNumber,
            'mediaBase64' => $base64,
            'filename'    => "qr-janji-{$createJanji->id}.png",
            'caption'     => $caption,
        ]);

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
        $validated = $request->validate([
            'tanggal' => 'nullable|string|in:asc,desc',
            'status' => 'nullable|string',
            'name' => 'nullable|string'
        ]);

        $user = $request->user();
        $tanggal = $validated['tanggal'] ?? "asc";
        $status = $validated['status'] ?? "semua";
        
        if ($user->role == "Guru") {
            $janji = JadwalTemu::where('user_id', $user->id)
                ->whereDate('tanggal', Carbon::today())
                ->with('tamu')
                ->orderByRaw("CASE WHEN status = 'Menunggu' THEN 0 ELSE 1 END")
                ->orderBy('tanggal', 'desc')
                ->get();

            $query = JadwalTemu::orderBy("tanggal", $tanggal)
                ->where("user_id", $user->id)
                ->with("tamu");

            if ($status !== "Semua") {
                $query->where("status", $status);
            }
            if ($status == "Terlambat") {
                $query->where(["status" => $status, "reschedule" => "Tunggu"]);
            }
            if ($status == "Batalkan") {
                $query->where("reschedule", $status);
            }

            $riwayat = $query->get();
            $jadwalTemu = JadwalTemu::orderBy("tanggal", "asc")
                ->where("user_id", $user->id)
                ->with("tamu")
                ->get();

            return response()->json([
                "janji" => $janji, 
                "riwayat" => $riwayat, 
                "jadwal_temu" => $jadwalTemu
            ], 200);
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
        $validated = $request->validate([
            'id' => 'required|string'
        ]);

        $janji = JadwalTemu::where("id", $id)->with("tamu")->first();
        Log::info($id);
        Log::info($janji);

        if (!$janji) {
            return response()->json([
                "message" => "Janji Temu tidak terdaftar"
            ], 400);
        }

        if ($janji->status !== "Menunggu") {
            $toNumber = preg_replace('/^0/', '62', $janji->tamu->telepon);
            Log::info($toNumber);

            $feedbackMessage = "Terima kasih telah berkunjung ke SMKN 2 Singosari! 🙏\n\n";
            $feedbackMessage .= "Kami sangat menghargai masukan Anda untuk meningkatkan layanan kami.\n";
            $feedbackMessage .= "Mohon luangkan waktu sejenak untuk memberikan penilaian dan ulasan melalui link berikut:\n";
            $feedbackMessage .= "📝 https://g.co/kgs/8jkAYv2\n\n";
            $feedbackMessage .= "Terima kasih atas kunjungan Anda! 🌟";

            $response = Http::post("http://localhost:3001/api/wa/send-link", [
                'to' => $toNumber,
                'caption' => $feedbackMessage,
            ]);

            if ($response->failed()) {
                return response()->json([
                    'message' => 'Wa service Error',
                    'error' => $response->body(),
                ], 500);
            }

            return response()->json([
                "message" => "Terima Kasih telah Berkunjung",
                "feedback_url" => "https://g.co/kgs/8jkAYv2",
                "feedback_message" => "Kami sangat menghargai masukan Anda. Silakan berikan penilaian dan ulasan untuk SMKN 2 Singosari"
            ], 200);
        }

        $status = $janji->tanggal < Carbon::now()->subMinutes(45) ? "Terlambat" : "Selesai";
        
        $janji->update([
            "status" => $status,
            "updated_at" => now()
        ]);

        return response()->json([
            "message" => "Kode QR Sukses di scan, Selamat Datang " . $janji->tamu->name . " di SMKN 2 Singosari"
        ], 200);
    }

    public function laporanJanji(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|string',
            'guru' => 'nullable|string'
        ]);

        $date = $validated['date'];
        $guruId = $validated['guru'] ?? "semua";

        $query = JadwalTemu::with(["tamu", "guru"])
            ->orderBy("tanggal", "asc");

        if ($date === "bulan-ini") {
            $query->whereMonth("tanggal", Carbon::now()->month);
        } elseif ($date === "bulan-kemarin") {
            $query->whereMonth("tanggal", Carbon::now()->subMonth()->month);
        } else {
            list($tahun, $bulan) = explode('-', $date);
            $query->whereYear('tanggal', $tahun)
                ->whereMonth('tanggal', $bulan);
        }

        if ($guruId !== "semua") {
            $query->where("user_id", $guruId);
        }

        return response()->json($query->get(), 200);
    }

    public function notification(Request $request)
    {
        $user = $request->user();
        
        if ($user->role == "Penerima Tamu") {
            return response()->json(
                Jadwaltemu::where("reschedule", "!=", null)
                    ->with(["guru", "tamu"])
                    ->get(),
                200
            );
        }

        return response()->json(
            JadwalTemu::orderBy("updated_at", "desc")
                ->where("user_id", $user->id)
                ->where("status", "!=", "Menunggu")
                ->with(["tamu"])
                ->get(),
            200
        );
    }

    public function putNotification(Request $request, string $id)
    {
        $validated = $request->validate([
            'status' => 'required|string'
        ]);

        JadwalTemu::findOrFail($id)->update([
            "reschedule" => $validated['status']
        ]);

        return response()->json([
            "message" => "Janji Berhasil di Konfirmasi"
        ], 200);
    }

    public function getJanjiByPenerimaTamu(Request $request)
    {
        $user = $request->user();
        return response()->json(
            JadwalTemu::orderby("tanggal", "asc")
                ->where(["tamu_id" => $user->id])
                ->with(["tamu", "guru"])
                ->get(),
            200
        );
    }
}
