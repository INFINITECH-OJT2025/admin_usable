<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id(); // Auto-increment primary key
            $table->text('message'); // The notification message
            $table->enum('status', ['unread', 'read'])->default('unread'); // Status of the notification
            $table->timestamps(); // To store created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications');
    }
}
