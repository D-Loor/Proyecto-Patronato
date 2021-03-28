<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historia_Clinica_RF extends Model
{
    //use HasFactory;
    public $timestamps=false;
    protected $table = 'historias_clinicas_rf';
    protected $primaryKey = 'id_rf';
    protected $fillable = [
        'id_paciente','id_tratamiento','diagnostico','lugar_atencion','fecha'
    ];
}
