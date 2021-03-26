<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHabitosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('habitos', function (Blueprint $table) {
            $table->bigIncrements('id_habito');
            $table->string('alcohol');
            $table->string('tabaco');
            $table->string('drogas');
            $table->string('alimentacion');
            $table->string('diuresis');
            $table->string('somnia');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('habitos');
    }
}
