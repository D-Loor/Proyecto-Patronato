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
        'id_patologico', 'id_habito',  'id_e_fisico',  'id_e_organo_sistema',  'id_e_complementario','cedula', 'nombres',  'apellidos',  'edad',  'sexo', 'gad', 'ocupacion',  'residencia', 'procedencia', 'estado_civil', 'raza', 'religion', 'fecha_nacimiento', 'nivel_instruccion',
    ];
    
    public function historias_clinicas_mg(){
       return $this->hasMany('App\Models\Historia_Clinica_MG','id_paciente');
    }
    public function historias_clinicas_rf(){
        return $this->hasMany('App\Models\Historia_Clinica_RF','id_paciente');
     }

   public function habitos(){
        return $this->belongsTo('App\Models\Habito','id_habito');
     }

   public function familiares(){
      return $this->belongsToMany('App\Models\Familia','antecedente_patologico_familiares','id_paciente','id_familiar');
   }

   public function examen_organo_sistemas(){
      return $this->belongsTo('App\Models\Examen_Organo_Sistema','id_e_organo_sistema');
  }

   public function examen_fisicos(){
      return $this->belongsTo('App\Models\Examen_Fisico','id_e_fisico');
   }

   public function examene_complementarios(){
      return $this->belongsTo('App\Models\Examenes_Complementario','id_e_complementario');
   }

   public function antecedentes_patologicos_personales(){
      return $this->belongsTo('App\Models\Antecedentes_Patologicos_Personale','id_patologico');
   }

   public function antecedentes_ginecos_obstreticos(){
      return $this->belongsTo('App\Models\Antecedentes_Ginecos_Obstretico','id_gineco','id_patologico');
  }


}
