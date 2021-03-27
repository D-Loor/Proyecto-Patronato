<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antecedente_Patologico_Familiar extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'antecedente_patologico_familiares';
    protected $primaryKey = 'id_a_p_familiar';
    protected $fillable = [
        'cedula',
    ];
}
