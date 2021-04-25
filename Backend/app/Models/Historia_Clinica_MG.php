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
        'id_enfermedad','a_enfermedad','id_paciente','fecha','motivo_consulta','tipo_atencion','condicion_diagnostico','diagnostico','plan_terapeutico','lugar_atencion','certificado'
    ];

    public function paciente(){
        return $this->belongsTo('App\Models\Paciente','id_paciente');
    }
    public function enfermedad(){
        return $this->belongsTo('App\Models\Enfermedad','id_enfermedad');
    }


}
