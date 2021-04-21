<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'pacientes';
    protected $primaryKey = 'id_paciente';

     protected $fillable = [
        'id_patologico',  'id_e_fisico',  'id_e_organo_sistema',  'id_e_complementario','cedula', 'nombres',  'apellidos',  'edad',  'sexo', 'gad', 'ocupacion',  'residencia', 'procedencia', 'estado_civil', 'raza', 'religion', 'fecha_nacimiento', 'nivel_instruccion',
    ];
    
    public function historias_clinicas_mg(){
       return $this->hasMany('App\Models\Historia_Clinica_MG','id_paciente');
    }
    public function historias_clinicas_rf(){
        return $this->hasMany('App\Models\Historia_Clinica_RF','id_paciente');
     }

     public function habitos(){
        return $this->belongsToMany('App\Models\Habito','habito_pacientes','id_paciente','id_habito');
     }
}
