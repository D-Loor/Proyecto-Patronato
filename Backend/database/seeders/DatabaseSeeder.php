<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('antecedentes_ginecos_obstreticos')->insert([
            'id_gineco' => '1',
            'FUM' => '1',
            'FPP' => '1',
            'edad_gestional' => '1',
            'menarquia' => '1',
            'flujo_genital' => '1',
            'gestas' => '1',
            'partos' => '1',
            'cesareas' => '1',
            'abortos' => '1',
        ]);

        DB::table('cuentas')->insert([
            "id_rol" => 1,
            "nombres" => "Dario Aldair Zambrano Mendoza",
            "correo" => "q",
            "password" => "q",
            "imagen" => "https://cdn.icon-icons.com/icons2/39/PNG/128/user_person_people_6100.png",
        ]);

    }


}
