<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHabitoPacientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('habito_pacientes', function (Blueprint $table) {
            $table->bigIncrements('id_habito_paciente');
            $table->unsignedBigInteger('id_habito');
            $table->unsignedBigInteger('cedula');

            $table->foreign('cedula')->references('cedula')->on('pacientes')->onDelete('cascade');
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
        Schema::dropIfExists('habito_pacientes');
    }
}
