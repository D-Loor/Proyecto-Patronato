<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamenFisicosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examen_fisicos', function (Blueprint $table) {
            $table->bigIncrements('id_e_fisico');
            $table->string('cabeza');
            $table->string('cuello');
            $table->string('torax');
            $table->string('abdomen');
            $table->string('miembros_superiores');
            $table->string('miembros_inferiores');
            $table->string('region_genital');
            $table->string('region_anal');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('examen_fisicos');
    }
}
