<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamenOrganoSistemasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examen_organo_sistemas', function (Blueprint $table) {
            $table->bigIncrements('id_examen_organo_sistema');
            $table->string('sistema_digestivo');
            $table->string('sistema_respiratorio');
            $table->string('sistema_cardiaco');
            $table->string('sistema_genitourinarion');
            $table->string('sistema_osteomuscular');
            $table->string('sistema_nervioso');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('examen__organo__sistemas');
    }
}
