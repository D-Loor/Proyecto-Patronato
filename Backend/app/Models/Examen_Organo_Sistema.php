<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examen_Organo_Sistema extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'examen_organo_sistemas';
    protected $primaryKey = 'id_e_organo_sistema';
     protected $fillable = [
         'sistema_digestivo','sistema_respiratorio','sistema_cardiaco','abdosistema_genitourinarionmen','sistema_osteomuscular','sistema_nervioso',
    ];
}
