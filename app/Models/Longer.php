<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Longer extends Model
{
    use HasFactory;

    protected $table = 'longer';

    protected $fillable = [
        'text',
        'email',
        'age',
        'datetime',
        'file',
        'text_area',
    ];
}
