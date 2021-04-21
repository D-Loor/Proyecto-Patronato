<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turno extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'trunos';
    protected $primaryKey = 'id_turno';
    protected $fillable = [
         'hora',
    ];
    public function rcita(){
        return $this->hasMany('App\Models\Cita','id_turno');
     }
}
