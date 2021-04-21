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
            'FUM' => Str::random(10),
            'FPP' => Str::random(10),
            'edad_gestional' => Str::random(10),
            'menarquia' => Str::random(10),
            'flujo_genital' => Str::random(10),
            'gestas' => Str::random(10),
            'partos' => Str::random(10),
            'cesareas' => Str::random(10),
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('tratamientos')->insert([
            'estimulacion_temprana' => Str::random(10),
            'magnetoterapia' => Str::random(10),
            'electroestimulacion' => Str::random(10),
            'ultrasonido' => Str::random(10),
            'C_Q_C_O_H' => Str::random(10),
            'masaje' => Str::random(10),
            'ejercicios_pasivos_resistidos' => Str::random(10),
            'laser' => Str::random(10),
            'otros' => Str::random(10),
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('examenes_complementarios')->insert([
            'laboratorio' => Str::random(10),
            'electrocardiograma' => Str::random(10),
            'radiografia_torax' => Str::random(10),
            'otros' => Str::random(10),
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('examen_fisicos')->insert([
            'cabeza' => Str::random(10),
            'cuello' => Str::random(10),
            'torax' => Str::random(10),
            'abdomen' => Str::random(10),
            'miembros_superiores' => Str::random(10),
            'miembros_inferiores' => Str::random(10),
            'region_genital' => Str::random(10),
            'region_anal' => Str::random(10),
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('examen_organo_sistemas')->insert([
            'sistema_digestivo' => Str::random(10),
            'sistema_respiratorio' => Str::random(10),
            'sistema_cardiaco' => Str::random(10),
            'sistema_genitourinarion' => Str::random(10),
            'sistema_osteomuscular' => Str::random(10),
            'sistema_nervioso' => Str::random(10),
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('habitos')->insert([
            'alcohol' => Str::random(10),
            'tabaco' => Str::random(10),
            'drogas' => Str::random(10),
            'alimentacion' => Str::random(10),
            'diuresis' => Str::random(10),
            'somnia' => Str::random(10),
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('familiares')->insert([
            'nombres' => Str::random(10),
            'union' => Str::random(10),
            'vida' => true,
            'causas' => Str::random(10),
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('antecedentes_enfermedades')->insert([
            'descripcion' => Str::random(10),
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('enfermedades')->insert([
            'enfermedad' => Str::random(10),
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);
        
        DB::table('turnos')->insert(
            ['hora' => "08:00 AM",], ['hora' => "08:20 AM",], ['hora' => "08:40 AM",], ['hora' => "09:00 AM",], ['hora' => "09:20 AM",],
            ['hora' => "09:40 AM",], ['hora' => "10:00 AM",], ['hora' => "10:20 AM",], ['hora' => "10:40 AM",], ['hora' => "11:00 AM",],
            ['hora' => "11:20 AM",], ['hora' => "11:40 AM",], ['hora' => "12:00 PM",], ['hora' => "12:20 PM",], ['hora' => "02:00 PM",],
            ['hora' => "02:20 PM",], ['hora' => "02:40 PM",], ['hora' => "03:00 PM",],['hora' => "03:20 PM",], ['hora' => "03:40 PM",],

        );

        DB::table('citas')->insert([
            'nombres' => Str::random(10),
            'cedula' => Str::random(10),
            'especialidad' => 'Medicina General',
            'fecha' => Carbon::parse('2021-04-21'),
            'estado' => Str::random(10),
            'id_turno' => 1,
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('roles')->insert([
            "rol" => "Médico General",
            "rol" => "Fisioterapista",
            "rol" => "Secretaria",
        ]);

        DB::table('cuentas')->insert([
            "id_rol" => 1,
            "nombres" => "Fisioterapista",
            "correo" => "q",
            "password" => "q",
            "imagen" => Str::random(10),
        ]);

        DB::table('antecedentes_patologicos_personales')->insert([
            'id_gineco' => 1,
            'infancia' => Str::random(10),
            'adolecencia' => Str::random(10),
            'adultez' => Str::random(10),
            'DBT' => Str::random(10),
            'HTA' => Str::random(10),
            'TBC' => Str::random(10),
            'GEMELAR' => Str::random(10),
            'quirujircos' => Str::random(10),
            'alergias' => Str::random(10),
            'traumas' => Str::random(10),
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('pacientes')->insert([
            'id_e_fisico' => 1,
            'id_patologico' => 1,
            'id_e_organo_sistema' => 1,
            'id_e_complementario' => 1,
            'cedula' => '1314567908',
            'nombres' => Str::random(10),
            'apellidos' => Str::random(10),
            'edad' => 25,
            'sexo' => Str::random(10),
            'gad' => false,
            'ocupacion' => Str::random(10),
            'residencia' => Str::random(10),
            'procedencia' => Str::random(10),
            'estado_civil' => Str::random(10),
            'raza' => Str::random(10),
            'religion' => Str::random(10),
            'fecha_nacimiento' => Carbon::parse('2001-03-09'),
            'nivel_instruccion' => Str::random(10),
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('historias_clinicas_mg')->insert([
            'id_paciente' => 1,
            'id_enfermedad' => 1,
            'id_a_enfermedad' => 1,
            'fecha' => Carbon::parse('2001-03-09'),
            'motivo_consulta' => Str::random(10),
            'tipo_atencion' => Str::random(10),
            'condicion_diagnostico' => Str::random(10),
            'diagnostico_presuntivo' => Str::random(10),
            'diagnostico_diferencial' => Str::random(10),
            'plan_terapeutico' => Str::random(10),
            'lugar_atencion' => Str::random(10),
            'raza' => Str::random(10),
            'certificado' => true,
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('historias_clinicas_rf')->insert([
            'id_paciente' => 1,
            'id_tratamiento' => 1,
            'fecha' => Carbon::parse('2001-03-09'),
            'diagnostico' => Str::random(10),
            'lugar_atencion' => Str::random(10),
            'certificado' => true,
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);


        DB::table('habito_pacientes')->insert([
            "id_habito" => 1,
            "id_paciente" => 1,
        ]);

        DB::table('antecedente_patologico_familiares')->insert([
            "id_familiar" => 1,
            "id_paciente" => 1,
        ]);










    }


}
