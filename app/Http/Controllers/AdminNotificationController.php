<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Broadcasting\BroadcastException;
use Carbon\Carbon;

class AdminNotificationController extends Controller
{
    public function getNotification()
    {
        // Get all notifications for the admin
        $notifications = Notification::orderBy('created_at', 'desc')->get();

        return response()->json($notifications);
    }

    public function getActivity()
    {
        // Get all notifications for the admin
        $notifications = Notification::orderBy('created_at', 'desc')->get();

        // Format the created_at field for each notification
        $notifications = $notifications->map(function ($notification) {
            // Format the created_at field (you can adjust the format as needed)
            $notification->created_at = Carbon::parse($notification->created_at)->toIso8601String();
            return $notification;
        });

        return response()->json($notifications);
    }

    public function markAsRead($id)
    {
        $notification = Notification::find($id);
        
        if ($notification) {
            $notification->status = 'read';
            $notification->updated_at = now();
            $notification->save();
            return response()->json(['message' => 'Notification marked as read'], 200);
        }
        
        return response()->json(['message' => 'Notification not found'], 404);
    }

    // Mark all notifications as read
    public function markAllAsRead()
    {
        Notification::where('status', 'unread')->update(['status' => 'read', 'updated_at' => now()]);
        
        return response()->json(['message' => 'All notifications marked as read'], 200);
    }

    public function updateStatusToRead(Request $request)
    {
        $validated = $request->validate([
            'path' => 'required|string',
        ]);
    
        // Update notifications status to 'read' for the given path
        $updatedCount = Notification::where('path', $validated['path'])
            ->where('status', 'unread')
            ->update(['status' => 'read']);
    
        // Log for debugging
        \Log::info('Notifications updated for path: ' . $validated['path'], ['updatedCount' => $updatedCount]);
    
        // Return response
        return response()->json([
            'message' => 'Notification status updated successfully.',
            'updated_count' => $updatedCount,
        ], 200);
    }
    
    
}
