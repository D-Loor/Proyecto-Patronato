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

        });

        DB::table("roles")
        ->insert([
            "rol" => "Médico General"
        ]);
        DB::table("roles")
        ->insert([
            "rol" => "Fisioterapista"
        ]);
        DB::table("roles")
        ->insert([
            "rol" => "Secretaria"
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
