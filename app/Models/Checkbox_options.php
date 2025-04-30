<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkbox_options extends Model
{
    use HasFactory;

    protected $table = 'checkbox_options';

    protected $fillable = [
        'checkbox_options',
    ];
}
