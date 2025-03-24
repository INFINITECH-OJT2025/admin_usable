<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AuditLogEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $notification;

    public function __construct($notification)
    {
        $this->notification = $notification;
    }

    public function broadcastOn()
    {
        return new Channel('logs'); // Ensure it matches the frontend
    }

    public function broadcastAs()
    {
        return 'AuditLogEvent'; // Ensure it matches the frontend
    }
    
    public function broadcastWith()
    {
        return [
            'id' => $this->notification->id,
            'message' => $this->notification->message,
            'status' => $this->notification->status ?? 'unread', // Ensure status is never null
            'path' => $this->notification->path,
            'created_at' => $this->notification->created_at->toIso8601String(),
        ];
    }
    
}
