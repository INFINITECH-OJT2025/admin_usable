<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Broadcasting\BroadcastException;
use Carbon\Carbon;

class AuditLogController extends Controller
{
    public function index()
    {
        // Get all notifications for the admin
        $logs = AuditLog::orderBy('created_at', 'desc')->get();

        return response()->json($logs);
    }

    public function getAuditLogs()
    {
        // Get all notifications for the admin
        $logs = AuditLog::orderBy('created_at', 'desc')->get();

        // Format the created_at field for each notification
        $logs = $logs->map(function ($notification) {
            // Format the created_at field (you can adjust the format as needed)
            $notification->created_at = Carbon::parse($notification->created_at)->toIso8601String();
            return $notification;
        });

        return response()->json($logs);
    }
}
