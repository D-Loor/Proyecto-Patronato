<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialEnfermedades extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'historial_enfermedades';
    protected $primaryKey = 'id_historial_enfermedades';
    protected $fillable = [
        'id_historia_clinica_mg','id_enfermedad','id_a_enfermedad'
    ];

    public function historia(){
        return $this->belongsTo('App\Models\Historia_Clinica_MG','id_historia_clinica_mg');
    }
    public function enfermedad(){
        return $this->belongsTo('App\Models\Enfermedad','id_enfermedad');
    }
    public function aenfermedad(){
        return $this->belongsTo('App\Models\Antecedente_Enfermedad','id_a_enfermedad');
    }
}
