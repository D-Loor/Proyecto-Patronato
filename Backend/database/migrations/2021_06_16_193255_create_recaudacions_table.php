<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecaudacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recaudaciones', function (Blueprint $table) {
            $table->bigIncrements('id_recaudacion');
            $table->unsignedBigInteger('id_paciente');
            $table->unsignedBigInteger('id_rol');
            $table->date('fecha');
            $table->Integer('valor');
            $table->boolean('exonera');

            $table->foreign('id_rol')->references('id_rol')->on('roles')->onDelete('cascade');
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
        Schema::dropIfExists('recaudacions');
    }
}
