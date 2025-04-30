<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Radio_try extends Model
{
    use HasFactory;

    protected $table = 'radio_try';

    protected $fillable = [
        'radio',
    ];
}
