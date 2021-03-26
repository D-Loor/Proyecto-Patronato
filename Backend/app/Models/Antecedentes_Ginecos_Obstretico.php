<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antecedentes_Ginecos_Obstretico extends Model
{
    //use HasFactory;
    public $timestamps=false;
    protected $table = 'antecedentes_ginecos_obstreticos';
    protected $primaryKey = 'id_gineco';
    protected $fillable = [
        'FUM','FPP','edad_gestional','menarquia','flujo_genital','gestas','partos','cesareas'
    ];
}
