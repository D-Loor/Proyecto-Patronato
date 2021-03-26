<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enfermedad extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'enfermedades';
    protected $primaryKey = 'id_enfermedad';
     protected $fillable = [
         'enfermedad',
    ];
}
