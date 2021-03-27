<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'citas';
    protected $primaryKey = 'id_cita';
    protected $fillable = [
         'nombres',  'cedula',  'especialidad',  'fecha', 'hora',
    ];
}