<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class All_tools_all_in extends Model
{
    use HasFactory;

    protected $table = 'all_tools_all_in';

    protected $fillable = [
        'text',
        'email',
        'age',
        'selection',
        'datetime',
        'checkbox',
        'radio',
        'file',
        'text_area',
    ];
}
