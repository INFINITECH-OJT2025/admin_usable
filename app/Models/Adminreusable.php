<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adminreusable extends Model
{
    use HasFactory;

    protected $table = 'adminreusable';

    protected $fillable = [
        'full_name',
    ];
}
