<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examenes_Complementario extends Model
{
    //use HasFactory;
    public $timestamps=false;
    protected $table = 'examenes_complementarios';
    protected $primaryKey = 'id_e_complementario';
    protected $fillable = [
         'laboratorio',  'electrocardiograma',  'radiografia_torax',  'otros',
    ];
}

