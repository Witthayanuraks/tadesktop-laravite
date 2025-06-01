<?php

namespace App\Http\Controllers;

use App\Models\Tamu;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = $request->username ? User::where("username", $request->username)->first() : Tamu::where("telepon", $request->telepon)->first();
        if (!$user) {
            return response()->json([
                "message" => "Username Atau password Salah"
            ], 400);
        }
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                "message" => "Username Atau password Salah"
            ], 400);
        }

        $token = $user->createToken("token")->plainTextToken;

        $user["token"] = $token;
        if ($request->telepon) {
            $user["role"] = "Tamu";
        }
        return response()->json($user, 200);
    }

    public function logout(Request $request)
    {
        $user = $request->user()->tokens()->delete();
        return response()->json([
            "message" => "Logout Berhasil"
        ], 200);
    }
}
