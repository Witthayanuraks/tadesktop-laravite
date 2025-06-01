<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Tamu extends Model
{
    use HasApiTokens;

    protected $table = "tamu";
    protected $guarded = [];
}
