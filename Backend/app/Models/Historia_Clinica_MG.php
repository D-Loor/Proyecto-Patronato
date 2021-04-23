<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historia_Clinica_MG extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'historias_clinicas_mg';
    protected $primaryKey = 'id_historia_clinica_mg';
    protected $fillable = [
        'id_paciente','fecha','motivo_consulta','tipo_atencion','condicion_diagnostico','diagnostico_presuntivo','diagnostico_diferencial','plan_terapeutico','lugar_atencion','raza','certificado'
    ];

    public function paciente(){
        return $this->belongsTo('App\Models\Paciente','id_paciente');
    }
    //public function habitos(){
      //  return $this->hasOne('App\Models\Habito','id_habito');
     //}
}
