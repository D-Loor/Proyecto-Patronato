<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamenesComplementariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examenes_complementarios', function (Blueprint $table) {
            $table->bigIncrements('id_e_complementario');
            $table->string('laboratorio');
            $table->string('electrocardiograma');
            $table->string('radiografia_torax');
            $table->string('otros');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('examenes_complementarios');
    }
}
