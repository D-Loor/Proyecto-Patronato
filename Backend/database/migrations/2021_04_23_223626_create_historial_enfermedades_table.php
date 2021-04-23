<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistorialEnfermedadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historial_enfermedades', function (Blueprint $table) {

            $table->bigIncrements('id_historial_enfermedades');
            $table->unsignedBigInteger('id_historia_clinica_mg');
            $table->unsignedBigInteger('id_enfermedad');
            $table->unsignedBigInteger('id_a_enfermedad');

            $table->foreign('id_historia_clinica_mg')->references('id_historia_clinica_mg')->on('historias_clinicas_mg')->onDelete('cascade');
            $table->foreign('id_enfermedad')->references('id_enfermedad')->on('enfermedades')->onDelete('cascade');
            $table->foreign('id_a_enfermedad')->references('id_a_enfermedad')->on('antecedentes_enfermedades')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('historial_enfermedades');
    }
}
