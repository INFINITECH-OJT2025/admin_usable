<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Input_longer extends Model
{
    use HasFactory;

    protected $table = 'input_longer';

    protected $fillable = [
        'asd',
        'sadsdda',
        'sasdad',
    ];
}
