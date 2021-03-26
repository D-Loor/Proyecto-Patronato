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
}
