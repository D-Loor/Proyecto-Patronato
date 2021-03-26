<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habito extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'habitos';
    protected $primaryKey = 'id_habito';
     protected $fillable = [
         'alcohol',  'tabaco',  'drogas',  'alimentacion', 'diuresis',  '  somnia',
    ];
}
