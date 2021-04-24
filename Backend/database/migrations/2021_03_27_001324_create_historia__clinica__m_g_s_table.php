<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoriaClinicaMGSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historias_clinicas_mg', function (Blueprint $table) {
            $table->bigIncrements('id_historia_clinica_mg');
            $table->unsignedBigInteger('id_paciente');
            $table->unsignedBigInteger('id_enfermedad');
            $table->date('fecha');
            $table->string('motivo_consulta');
            $table->string('tipo_atencion');
            $table->string('condicion_diagnostico');
            $table->string('diagnostico');
            $table->string('plan_terapeutico');
            $table->string('lugar_atencion');
            $table->boolean('certificado');

            $table->foreign('id_paciente')->references('id_paciente')->on('pacientes')->onDelete('cascade');
            $table->foreign('id_enfermedad')->references('id_enfermedad')->on('enfermedades')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('historias_clinicas_mg');
    }
}
