<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testalltools extends Model
{
    use HasFactory;

    protected $table = 'testalltools';

    protected $fillable = [
        'full_name',
        'email',
        'age',
        'favorite_food',
        'birth_date',
        'gender',
        'favorite_color',
        'file',
        'describe_yourself',
    ];
}
