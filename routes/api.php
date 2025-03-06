<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminNotificationController;
use App\Http\Controllers\FileManagerController;
use App\Http\Controllers\FormController;

use Illuminate\Support\Facades\Broadcast;
use Pusher\Pusher;


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
Route::get('/allUsers', [UserController::class, 'index']);
Route::get('/countUsers', [UserController::class, 'countUsers']);
Route::get('/admins', [UserController::class, 'getAdmins']);
Route::post('/registerAdmin', [UserController::class, 'registerAdmin']);
Route::put('/update/{id}', [UserController::class, 'update']);
Route::post('/updateAdmin/{id}', [UserController::class, 'updateAdmin']);
Route::post('/updateUser/{id}', [UserController::class, 'updateUser']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::put('/users/{id}/status', [UserController::class, 'updateStatus']);
Route::get('/user-registrations', [UserController::class, 'getUserRegistrations']); // GRAPH PURPOSES
Route::get('/users/{id}/permissions', [UserController::class, 'getPermissions']);
Route::put('/users/{id}/updatePermissions', [UserController::class, 'updatePermissions']);
Route::get('/users/{id}/getUserPermissions', [UserController::class, 'getUserPermissions']);
Route::get('/filteredUsers', [UserController::class, 'filterUsers']); // FILTERATION
Route::get('/export-users', [UserController::class, 'exportUsers']);



//AdminNotificationController
Route::get('/notifications', [AdminNotificationController::class, 'getNotification']); // GRAPH PURPOSES
Route::get('/activities', [AdminNotificationController::class, 'getActivity']); // GRAPH PURPOSES
Route::put('/notifications/{id}/read', [AdminNotificationController::class, 'markAsRead']);
Route::put('/notifications/read-all', [AdminNotificationController::class, 'markAllAsRead']);
// Route::get('/notifications/stream', [NotificationController::class, 'streamNotifications']);
Route::put('/notifications/read', [AdminNotificationController::class, 'updateStatusToRead']);

Route::get('/pusher-test', function () {
    try {
        $pusher = new Pusher(
            config('broadcasting.connections.pusher.key'),
            config('broadcasting.connections.pusher.secret'),
            config('broadcasting.connections.pusher.app_id'),
            ['cluster' => config('broadcasting.connections.pusher.options.cluster'), 'useTLS' => true]
        );

        $pusher->trigger('notifications', 'test-event', ['message' => 'Pusher is working!']);

        return response()->json(['status' => 'success', 'message' => 'Pusher is connected!']);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
    }
});



Route::get('/files', [FileManagerController::class, 'listFiles']);
Route::post('/upload', [FileManagerController::class, 'uploadFile']);
Route::post('/rename', [FileManagerController::class, 'renameFile']);
Route::delete('/delete', [FileManagerController::class, 'deleteFile']);
Route::get('/file-properties', [FileManagerController::class, 'fileProperties']);

Route::post('/create-folder', [FileManagerController::class, 'createFolder']);
Route::post('/rename-folder', [FileManagerController::class, 'renameFolder']);
Route::delete('/delete-folder', [FileManagerController::class, 'deleteFolder']);




Route::post('/forms', [FormController::class, 'store']);
Route::post('/tables', [FormController::class, 'createTable']);
Route::get('/forms', [FormController::class, 'show']);