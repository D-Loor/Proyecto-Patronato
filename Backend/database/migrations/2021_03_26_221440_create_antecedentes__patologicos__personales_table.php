<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAntecedentesPatologicosPersonalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('antecedentes_patologicos_personales', function (Blueprint $table) {
            $table->bigIncrements('id_patologico');
            $table->unsignedBigInteger('id_gineco');
            $table->string('infancia');
            $table->string('adolecencia');
            $table->string('adultez');
            $table->string('DBID');
            $table->string('HTA');
            $table->string('TbP');
            $table->string('DBI');
            $table->string('quirujircos');
            $table->string('alergias');
            $table->string('traumas');
            $table->foreign('id_gineco')->references('id_gineco')->on('antecedentes_ginecos_obstreticos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('antecedentes_patologicos_personales');
    }
}
