<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Familia extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'familiares';
    protected $primaryKey = 'id_familiar';
     protected $fillable = [
         'nombres',  'union',  'vida',  'causas',
    ];
}
