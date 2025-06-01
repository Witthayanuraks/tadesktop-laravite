<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $nama = $request->query("nama");
        $user = User::orderBy("name", "asc")
            ->where('name', 'like', "%$nama%")
            ->where(["role" => "Guru"])
            ->get();

        return response()->json($user, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::where("username", $request->username)->first();
        if ($user) {
            return response()->json([
                "message" => "Nama Pengguna Sudah Ada Yang Memakai"
            ], 400);
        }
        $createUser = User::create([
            "name" => $request->name,
            "username" => $request->username,
            "email" => $request->email,
            "password" => $request->password,
        ]);

        return response()->json([
            "message" => "Data Guru berhasil dibuat"
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::where(["id" => $id])->first();

        return response()->json($user, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::where(["id" => $id])->first();
        $user->update([
            "name" => $request->name,
            "username" => $request->username,
            "email" => $request->email,
        ]);

        return response()->json([
            "message" => "Data berhasil di perbarui"
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::where(["id" => $id])->first();
        $user->delete();

        return response()->json([
            "message" => "Data Guru Berhasil Dihapus"
        ], 200);
    }
}
