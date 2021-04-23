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

            $table->foreign('id_paciente')->references('id_paciente')->on('pacientes')->onDelete('cascade');

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
