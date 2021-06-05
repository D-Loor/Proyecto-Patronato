<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Especialidad extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'especialidades';
    protected $primaryKey = 'id_especialidad';
     protected $fillable = [
       'especialidad',
     ];
}
