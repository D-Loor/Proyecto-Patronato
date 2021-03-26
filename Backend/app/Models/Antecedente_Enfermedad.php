<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antecedente_Enfermedad extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'antecedentes_enfermedades';
    protected $primaryKey = 'id_a_enfermedad';
     protected $fillable = [
         'descripcion',
    ];
}
