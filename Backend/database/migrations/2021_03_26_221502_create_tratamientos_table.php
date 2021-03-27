<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTratamientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tratamientos', function (Blueprint $table) {
            $table->bigIncrements('id_tratamiento');
            $table->string('estimulacion_temprana');
            $table->string('magnetoterapia');
            $table->string('electroestimulacion');
            $table->string('ultrasonido');
            $table->string('C_Q_C_O_H');
            $table->string('masaje');
            $table->string('ejercicios_pasivos_resistidos');
            $table->string('laser');
            $table->string('otros');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tratamientos');
    }
}
