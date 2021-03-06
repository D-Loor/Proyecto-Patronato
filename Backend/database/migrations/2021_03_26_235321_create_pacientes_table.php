<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePacientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pacientes', function (Blueprint $table) {
            $table->bigIncrements('id_paciente');
            $table->unsignedBigInteger('id_patologico');
            $table->unsignedBigInteger('id_e_fisico');
            $table->unsignedBigInteger('id_e_organo_sistema');
            $table->unsignedBigInteger('id_e_complementario');
            $table->unsignedBigInteger('id_habito');
            $table->string('cedula');
            $table->string('nombres');
            $table->string('apellidos');
            $table->string('edad');
            $table->string('sexo');
            $table->boolean('gad');
            $table->string('ocupacion');
            $table->string('residencia');
            $table->string('procedencia');
            $table->string('estado_civil');
            $table->string('raza');
            $table->string('religion');
            $table->date('fecha_nacimiento');
            $table->string('nivel_instruccion');

            $table->foreign('id_patologico')->references('id_patologico')->on('antecedentes_patologicos_personales')->onDelete('cascade');
            $table->foreign('id_e_fisico')->references('id_e_fisico')->on('examen_fisicos')->onDelete('cascade');
            $table->foreign('id_e_organo_sistema')->references('id_e_organo_sistema')->on('examen_organo_sistemas')->onDelete('cascade');
            $table->foreign('id_e_complementario')->references('id_e_complementario')->on('examenes_complementarios')->onDelete('cascade');
            $table->foreign('id_habito')->references('id_habito')->on('habitos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pacientes');
    }
}
