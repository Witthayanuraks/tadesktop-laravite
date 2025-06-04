<?php

use App\Models\JadwalTemu;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::middleware(["auth:sanctum"])->get('/notifications', function () {
//     return response()->stream(function () {
//         while (true) {
//             $user = Auth::user();
//             Log::info($user);
//             $data = JadwalTemu::where("user_id", $user->id)
//                 ->where("status", "!=", "Menunggu")
//                 ->get();

//             echo "data: " . json_encode($data) . "\n\n";
//             ob_flush();
//             flush();
//             sleep(3); // Kirim data setiap 3 detik
//         }
//     }, 200, ['Content-Type' => 'text/event-stream']);
// });
