<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAntecedentesGinecosObstreticosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('antecedentes_ginecos_obstreticos', function (Blueprint $table) {
            $table->bigIncrements('id_gineco');
            $table->string('FUM');
            $table->string('FPP');
            $table->string('edad_gestional');
            $table->string('menarquia');
            $table->string('flujo_genital');
            $table->string('gestas');
            $table->string('partos');
            $table->string('cesareas');
            $table->string('abortos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('antecedentes_ginecos_obstreticos');
    }
}
