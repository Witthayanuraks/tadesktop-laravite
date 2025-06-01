<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JanjiTemuController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
});
Route::middleware("auth:sanctum")->controller(AuthController::class)->group(function () {
    Route::post('/logout', 'logout');
});
Route::middleware("auth:sanctum")->controller(JanjiTemuController::class)->group(function () {
    Route::post('/janji', 'createJanji');
    Route::get('/janji/tamu', 'getJanjiByPenerimaTamu');
    Route::get('/janji', 'getJanji');
    Route::get('/janji/{id}', 'getDetailJanji');
    Route::put('/janji/{id}', 'updateJanji');
    Route::get('/laporan', 'laporanJanji');
    Route::get('/notifications', 'notification');
    Route::put('/notifications/{id}', 'putNotification');
});
Route::middleware("auth:sanctum")->controller(UserController::class)->group(function () {
    Route::post('/users', 'store');
    Route::get('/users', 'index');
    Route::get('/users/{id}', 'show');
    Route::put('/users/{id}', 'update');
    Route::delete('/users/{id}', 'destroy');
});
