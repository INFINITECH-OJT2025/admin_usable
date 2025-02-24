<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['web'])->group(function () {
    Route::get('/csrf-cookie', function () {
        return response()->json(['csrf_token' => csrf_token()]);
    });
});


//AuthController
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::get('/show', [AuthController::class, 'show']);

Route::get('/users', [AuthController::class, 'index']);




// UserController
Route::get('/countUsers', [UserController::class, 'countUsers']);
Route::get('/admins', [UserController::class, 'getAdmins']);
Route::post('/registerAdmin', [UserController::class, 'registerAdmin']);
Route::put('/update/{id}', [UserController::class, 'update']);
Route::put('/updateAdmin/{id}', [UserController::class, 'updateAdmin']);
Route::post('/updateUser/{id}', [UserController::class, 'updateUser']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::put('/users/{id}/status', [UserController::class, 'updateStatus']);