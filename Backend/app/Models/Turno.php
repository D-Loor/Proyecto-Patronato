<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turno extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'turnos';
    protected $primaryKey = 'id_turno';
    protected $fillable = [
         'id_rol','hora','cantidad','estado',
    ];

     public function rcita(){
        return $this->hasMany('App\Models\Cita','id_turno');
     }
     public function rroles(){
    	return $this->belongsTo('App\Models\Role','id_rol');
    }

}
