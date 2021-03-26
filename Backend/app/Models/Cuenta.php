<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuenta extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'cuentas';
    protected $primaryKey = 'id_cuenta';
     protected $fillable = [
        'id_rol', 'nombres', 'correo', 'password', 'imagen',
    ];
}
