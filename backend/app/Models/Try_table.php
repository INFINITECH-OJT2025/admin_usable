<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Try_table extends Model
{
    use HasFactory;

    protected $table = 'try_table';

    protected $fillable = [
        'fullname',
        'email',
        'birthdate',
    ];
}
