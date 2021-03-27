<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habito_Paciente extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'habito_pacientes';
    protected $primaryKey = 'id_habito_paciente';
    protected $fillable = [
        'cedula',
    ];
}
