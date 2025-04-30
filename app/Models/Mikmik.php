<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mikmik extends Model
{
    use HasFactory;

    protected $table = 'mikmik';

    protected $fillable = [
        'full_name',
        'your_age',
    ];
}
