<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Egreso extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'egresos';
    protected $primaryKey = 'id_egreso';
     protected $fillable = [
         'fecha','valor','descripcion'
    ];
}
