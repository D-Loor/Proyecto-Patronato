<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoriaClinicaRFSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historias_clinicas_rf', function (Blueprint $table) {
            $table->bigIncrements('id_rf');
            $table->unsignedBigInteger('id_paciente');
            $table->unsignedBigInteger('id_tratamiento');
            $table->unsignedBigInteger('id_diagnostico');
            $table->string('lugar_atencion');
            $table->string('motivo_consulta');
            $table->string('anamnesis');
            $table->boolean('certificado');
            $table->date('fecha');
            $table->string('receta');
            $table->string('edad');

            $table->foreign('id_diagnostico')->references('id_diagnostico')->on('diagnosticos')->onDelete('cascade');
            $table->foreign('id_paciente')->references('id_paciente')->on('pacientes')->onDelete('cascade');
            $table->foreign('id_tratamiento')->references('id_tratamiento')->on('tratamientos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('historias_clinicas_rf');
    }
}
