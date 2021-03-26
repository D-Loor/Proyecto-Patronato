<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen_Fisico extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'examen_fisicos';
    protected $primaryKey = 'id_e_fisico';
     protected $fillable = [
         'cabeza','cuello','torax','abdomen','miembros_superiores','miembros_inferiores','region_genital','region_anal',
    ];
}
