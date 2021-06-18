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
            $table->boolean('atencion');

        });

        DB::table("roles")
        ->insert([
            "rol" => "Administrador",
            "estado" => 1,
            "atencion" => 0,


        ]);
        DB::table("roles")
        ->insert([
            "rol" => "Medicina General",
            "estado" => 1,
            "atencion" => 1,

        ]);
        DB::table("roles")
        ->insert([
            "rol" => "Rehabilitación Física",
            "estado" => 1,
            "atencion" => 1,
        ]);
        DB::table("roles")
        ->insert([
            "rol" => "Secretaría",
            "estado" => 1,
            "atencion" => 0,
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
