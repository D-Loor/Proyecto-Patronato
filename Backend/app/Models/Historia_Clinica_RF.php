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
        'id_paciente','id_diagnostico','id_tratamiento','receta','lugar_atencion','certificado','fecha','motivo_consulta', 'anamnesis'
    ];

    public function paciente(){
       return $this->belongsTo('App\Models\Paciente','id_paciente');
    }
    public function tratamiento(){
       return $this->belongsTo('App\Models\Tratamiento','id_tratamiento');
    }
    public function diagnostico(){
        return $this->belongsTo('App\Models\Diagnostico','id_diagnostico');
    }

}
