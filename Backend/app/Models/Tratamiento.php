<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tratamiento extends Model
{
    //use HasFactory;
    public $timestamps=false;
    protected $table = 'tratamientos';
    protected $primaryKey = 'id_tratamiento';
    protected $fillable = [
        'estimulacion_temprana','magnetoterapia','electroestimulacion','ultrasonido','CQCOH','masaje','ejercicios_pasivos_resistidos','laser','otros'
    ];
}
