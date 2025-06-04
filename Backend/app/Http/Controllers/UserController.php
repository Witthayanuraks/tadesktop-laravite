<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string|max:255'
        ]);

        $name = $request->query("name");
        $user = User::orderBy("name", "asc")
            ->where('name', 'like', "%$name%")
            ->where(["role" => "Guru"])
            ->get();

        return response()->json($user, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $createUser = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'Guru'
        ]);

        return response()->json([
            "message" => "Data Guru berhasil dibuat"
        ], 201);
    }

    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json($user, 200);
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($id)],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($id)],
        ]);

        $user->update($validated);

        return response()->json([
            "message" => "Data berhasil di perbarui",
            "user" => $user
        ], 200);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'Guru') {
            return response()->json([
                'message' => 'Unauthorized. Only teachers can update their profile.'
            ], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($user->id)],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
        ]);

        $user->update($validated);

        return response()->json([
            "message" => "Profile berhasil diperbarui",
            "user" => $user
        ], 200);
    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        \App\Models\JadwalTemu::where('user_id', $user->id)
            ->where('tanggal', '>', now())
            ->update(['status' => 'Batalkan']);

        $user->delete();

        return response()->json([
            "message" => "Data Guru Berhasil Dihapus"
        ], 200);
    }

    public function deleteProfile(Request $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'Guru') {
            return response()->json([
                'message' => 'Unauthorized. Only teachers can delete their profile.'
            ], 403);
        }

        \App\Models\JadwalTemu::where('user_id', $user->id)
            ->where('tanggal', '>', now())
            ->update(['status' => 'Batalkan']);

        $user->delete();

        return response()->json([
            "message" => "Profile berhasil dihapus"
        ], 200);
    }
}
