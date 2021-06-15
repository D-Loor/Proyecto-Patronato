<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diagnostico extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'diagnosticos';
    protected $primaryKey = 'id_diagnostico';
     protected $fillable = [
         'diagnostico',
    ];
}
