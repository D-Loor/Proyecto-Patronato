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
            $table->unsignedBigInteger('cedula');
            $table->unsignedBigInteger('id_enfermedad');
            $table->unsignedBigInteger('id_a_enfermedad');
            $table->date('fecha');
            $table->string('motivo_consulta');
            $table->string('tipo_atencion');
            $table->string('condicion_diagnostico');
            $table->string('diagnostico_presuntivo');
            $table->string('diagnostico_diferencial');
            $table->string('plan_terapeutico');
            $table->string('lugar_atencion');
            $table->string('raza');
            $table->boolean('certificado');

            $table->foreign('cedula')->references('cedula')->on('pacientes')->onDelete('cascade');
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
        Schema::dropIfExists('historias_clinicas_mg');
    }
}