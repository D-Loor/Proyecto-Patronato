<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->bigIncrements('id_rol');
            $table->string('rol');
            $table->boolean('estado');

        });

        DB::table("roles")
        ->insert([
            "rol" => "Administrador",
            "estado" => 1


        ]);
        DB::table("roles")
        ->insert([
            "rol" => "Médico General",
            "estado" => 1

        ]);
        DB::table("roles")
        ->insert([
            "rol" => "Fisioterapista",
            "estado" => 1
        ]);
        DB::table("roles")
        ->insert([
            "rol" => "Secretaria",
            "estado" => 0
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
    }
}
