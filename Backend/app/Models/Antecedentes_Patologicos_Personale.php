<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antecedentes_Patologicos_Personale extends Model
{
    //use HasFactory;
    public $timestamps=false;
    protected $table = 'antecedentes_patologicos_personales';
    protected $primaryKey = 'id_patologico';
    protected $fillable = [
        'id_gineco','infancia','adolecencia','adultez','DBT','HTA','TBC','GEMELAR','quirujircos','alergias','traumas'
    ];

    public function antecedentes_ginecos_obstreticos(){
        return $this->belongsTo('App\Models\Antecedentes_Ginecos_Obstretico','id_gineco','id_patologico');
    }

    public function pacientes(){
        return $this->hasMany('App\Models\Paciente','id_patologico');
    }
}
