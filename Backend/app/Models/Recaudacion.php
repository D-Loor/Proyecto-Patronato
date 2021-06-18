<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recaudacion extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'recaudaciones';
    protected $primaryKey = 'id_recaudacion';
    protected $fillable = [
        'id_rol','id_paciente','fecha','valor','exonera', 'observaciones'
    ];

    public function paciente(){
        return $this->belongsTo('App\Models\Paciente','id_paciente');
    }
    public function rol(){
        return $this->belongsTo('App\Models\Role','id_rol');
    }
}
