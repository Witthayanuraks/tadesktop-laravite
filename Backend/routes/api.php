<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JanjiTemuController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);

    // Janji Temu routes
    Route::prefix('janji')->group(function () {
        Route::post('/', [JanjiTemuController::class, 'createJanji']);
        Route::get('/tamu', [JanjiTemuController::class, 'getJanjiByPenerimaTamu']);
        Route::get('/', [JanjiTemuController::class, 'getJanji']);
        Route::get('/{id}', [JanjiTemuController::class, 'getDetailJanji']);
        Route::put('/{id}', [JanjiTemuController::class, 'updateJanji']);
    });

    // Report and notification routes
    Route::get('/laporan', [JanjiTemuController::class, 'laporanJanji']);
    Route::prefix('notifications')->group(function () {
        Route::get('/', [JanjiTemuController::class, 'notification']);
        Route::put('/{id}', [JanjiTemuController::class, 'putNotification']);
    });

    // User management routes
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::get('/{id}', [UserController::class, 'show']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
    });

    // Profile routes
    Route::prefix('profile')->group(function () {
        Route::put('/', [UserController::class, 'updateProfile']);
        Route::delete('/', [UserController::class, 'deleteProfile']);
    });
});
