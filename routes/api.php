<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;
use Pusher\Pusher;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\GmailController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminNotificationController;
use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\FileManagerController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\GalleryController;


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
Route::post('/validate-password', [AuthController::class, 'validatePassword']);

Route::get('/show', [AuthController::class, 'show']);

Route::get('/users', [AuthController::class, 'index']);
Route::get('/check-username/{username}', [AuthController::class, 'checkUsername']);
Route::get('/check-email/{email}', [AuthController::class, 'checkEmail']);
Route::get('/verify-email', [AuthController::class, 'verifyEmail']);


//MailController
Route::post('/send-email', [MailController::class, 'sendEmail']);
Route::get('/sent-emails', [MailController::class, 'getSentEmails']);

//GmailController
Route::get('/gmail/auth', [GmailController::class, 'redirectToGoogle']);
Route::get('/gmail/callback', [GmailController::class, 'handleGoogleCallback']);
Route::get('/gmail/fetch-emails', [GmailController::class, 'fetchEmails']);

Route::get('/gmail/user-info', [GmailController::class, 'getUserInfo']);
Route::post('/refresh-token', [GmailController::class, 'refreshToken']);

//AgendaController
Route::get('/agendas', [AgendaController::class, 'index']);
Route::post('/agendas', [AgendaController::class, 'store']);
Route::post('/agendas/{id}/update', [AgendaController::class, 'update']);
Route::delete('/agendas/{id}/delete', [AgendaController::class, 'destroy']);

//TestimonialController
Route::get('testimonials', [TestimonialController::class, 'index']);
Route::post('testimonials', [TestimonialController::class, 'store']);
Route::put('testimonials/{id}', [TestimonialController::class, 'update']);
Route::delete('testimonials/{id}', [TestimonialController::class, 'destroy']);
Route::post('testimonials/{id}/toggle-visibility', [TestimonialController::class, 'toggleVisibility']);

//GalleryController
Route::get('/galleries', [GalleryController::class, 'index']);
Route::post('/galleries', [GalleryController::class, 'store']);
Route::post('/galleries/{id}', [GalleryController::class, 'update']);
Route::delete('/galleries/{id}', [GalleryController::class, 'destroy']);
Route::post('/galleries/{id}/enable', [GalleryController::class, 'enable']);
Route::get('/galleries/enabled', [GalleryController::class, 'enabled']);


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
// Route::get('/activities', [AdminNotificationController::class, 'getActivity']); // GRAPH PURPOSES
Route::put('/notifications/{id}/read', [AdminNotificationController::class, 'markAsRead']);
Route::put('/notifications/read-all', [AdminNotificationController::class, 'markAllAsRead']);
// Route::get('/notifications/stream', [NotificationController::class, 'streamNotifications']);
Route::put('/notifications/read', [AdminNotificationController::class, 'updateStatusToRead']);

//AuditLogs
Route::get('/activities', [AuditLogController::class, 'getAuditLogs']); // GRAPH PURPOSES

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
Route::get('/getTables', [FormController::class, 'getTables']);
Route::delete('/forms/{id}/{tableName}', [FormController::class, 'delTable']);
Route::post('/createModelAndController', [FormController::class, 'createModelAndController']);
Route::put('/forms/{id}', [FormController::class, 'toggleFormStatus']);
Route::get('/forms', [FormController::class, 'getFormStatus']);
Route::get('/form-usage', [FormController::class, 'getFormUsage']); // GRAPH PURPOSES


Route::get('/colors', [ColorController::class, 'getColors']);
Route::post('/colors', [ColorController::class, 'addColor']);
Route::put('/colors/{id}', [ColorController::class, 'updateColor']);
Route::delete('/colors/{id}', [ColorController::class, 'deleteColor']);
Route::get('/colors/active', [ColorController::class, 'getActiveColor']);


// GENERATED CRUD will generate routes here

Route::put('check_radio_table/{id}', [Check_radio_tableController::class, 'update']);

Route::put('select_radio_check/{id}', [Select_radio_checkController::class, 'update']);

Route::put('text_email_age/{id}', [Text_email_ageController::class, 'update']);

Route::put('datetime_textarea/{id}', [Datetime_textareaController::class, 'update']);

Route::put('all_tools_table/{id}', [All_tools_tableController::class, 'update']);

use App\Http\Controllers\All_tools_all_inController;
Route::get('all_tools_all_in', [All_tools_all_inController::class, 'index']);
Route::post('all_tools_all_in', [All_tools_all_inController::class, 'store']);
Route::get('all_tools_all_in/{id}', [All_tools_all_inController::class, 'show']);
Route::post('all_tools_all_in/{id}', [All_tools_all_inController::class, 'update']);
Route::delete('all_tools_all_in/{id}', [All_tools_all_inController::class, 'destroy']);

use App\Http\Controllers\ProfileController;
Route::get('profile', [ProfileController::class, 'index']);
Route::post('profile', [ProfileController::class, 'store']);
Route::get('profile/{id}', [ProfileController::class, 'show']);
Route::post('profile/{id}', [ProfileController::class, 'update']);
Route::delete('profile/{id}', [ProfileController::class, 'destroy']);

use App\Http\Controllers\MikmikController;
Route::get('mikmik', [MikmikController::class, 'index']);
Route::post('mikmik', [MikmikController::class, 'store']);
Route::get('mikmik/{id}', [MikmikController::class, 'show']);
Route::post('mikmik/{id}', [MikmikController::class, 'update']);
Route::delete('mikmik/{id}', [MikmikController::class, 'destroy']);

use App\Http\Controllers\AdminreusableController;
Route::get('adminreusable', [AdminreusableController::class, 'index']);
Route::post('adminreusable', [AdminreusableController::class, 'store']);
Route::get('adminreusable/{id}', [AdminreusableController::class, 'show']);
Route::post('adminreusable/{id}', [AdminreusableController::class, 'update']);
Route::delete('adminreusable/{id}', [AdminreusableController::class, 'destroy']);

use App\Http\Controllers\TestalltoolsController;
Route::get('testalltools', [TestalltoolsController::class, 'index']);
Route::post('testalltools', [TestalltoolsController::class, 'store']);
Route::get('testalltools/{id}', [TestalltoolsController::class, 'show']);
Route::post('testalltools/{id}', [TestalltoolsController::class, 'update']);
Route::delete('testalltools/{id}', [TestalltoolsController::class, 'destroy']);

use App\Http\Controllers\Input_longerController;
Route::get('input_longer', [Input_longerController::class, 'index']);
Route::post('input_longer', [Input_longerController::class, 'store']);
Route::get('input_longer/{id}', [Input_longerController::class, 'show']);
Route::post('input_longer/{id}', [Input_longerController::class, 'update']);
Route::delete('input_longer/{id}', [Input_longerController::class, 'destroy']);

use App\Http\Controllers\LongerController;
Route::get('longer', [LongerController::class, 'index']);
Route::post('longer', [LongerController::class, 'store']);
Route::get('longer/{id}', [LongerController::class, 'show']);
Route::post('longer/{id}', [LongerController::class, 'update']);
Route::delete('longer/{id}', [LongerController::class, 'destroy']);

use App\Http\Controllers\Table_longerController;
Route::get('table_longer', [Table_longerController::class, 'index']);
Route::post('table_longer', [Table_longerController::class, 'store']);
Route::get('table_longer/{id}', [Table_longerController::class, 'show']);
Route::post('table_longer/{id}', [Table_longerController::class, 'update']);
Route::delete('table_longer/{id}', [Table_longerController::class, 'destroy']);

use App\Http\Controllers\Radio_tryController;
Route::get('radio_try', [Radio_tryController::class, 'index']);
Route::post('radio_try', [Radio_tryController::class, 'store']);
Route::get('radio_try/{id}', [Radio_tryController::class, 'show']);
Route::post('radio_try/{id}', [Radio_tryController::class, 'update']);
Route::delete('radio_try/{id}', [Radio_tryController::class, 'destroy']);

use App\Http\Controllers\Check_tableController;
Route::get('check_table', [Check_tableController::class, 'index']);
Route::post('check_table', [Check_tableController::class, 'store']);
Route::get('check_table/{id}', [Check_tableController::class, 'show']);
Route::post('check_table/{id}', [Check_tableController::class, 'update']);
Route::delete('check_table/{id}', [Check_tableController::class, 'destroy']);

use App\Http\Controllers\Checks_tableController;
Route::get('checks_table', [Checks_tableController::class, 'index']);
Route::post('checks_table', [Checks_tableController::class, 'store']);
Route::get('checks_table/{id}', [Checks_tableController::class, 'show']);
Route::post('checks_table/{id}', [Checks_tableController::class, 'update']);
Route::delete('checks_table/{id}', [Checks_tableController::class, 'destroy']);

use App\Http\Controllers\Checkbox_optionsController;
Route::get('checkbox_options', [Checkbox_optionsController::class, 'index']);
Route::post('checkbox_options', [Checkbox_optionsController::class, 'store']);
Route::get('checkbox_options/{id}', [Checkbox_optionsController::class, 'show']);
Route::post('checkbox_options/{id}', [Checkbox_optionsController::class, 'update']);
Route::delete('checkbox_options/{id}', [Checkbox_optionsController::class, 'destroy']);
