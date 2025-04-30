<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table_longer extends Model
{
    use HasFactory;

    protected $table = 'table_longer';

    protected $fillable = [
        'text',
        'email',
        'birth_date',
        'file',
        'text_area',
        'gender',
    ];
}
