<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance_monitoring extends Model
{
    use HasFactory;

    protected $table = 'attendance_monitoring';

    protected $fillable = [
        'fullname',
        'section',
        'email',
        'subject',
        'birthdate',
    ];
}
