<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAntecedentePatologicoFamiliarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('antecedente_patologico_familiares', function (Blueprint $table) {
            $table->bigIncrements('id_a_p_familiar');
            $table->unsignedBigInteger('id_familiar');
            $table->string('cedula');

            $table->foreign('id_familiar')->references('id_familiar')->on('familiares')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('antecedente_patologico_familiares');
    }
}
