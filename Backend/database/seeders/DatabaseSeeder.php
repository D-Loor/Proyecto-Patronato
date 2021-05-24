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
            'FUM' => '-----',
            'FPP' => '-----',
            'edad_gestional' => '10',
            'menarquia' => '-----',
            'flujo_genital' => '-----',
            'gestas' => '5',
            'partos' => '4',
            'cesareas' => '2',
            'abortos' => '1',
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('tratamientos')->insert([
            'estimulacion_temprana' => 'estimulacion_temprana',
            'magnetoterapia' => 'magnetoterapia',
            'electroestimulacion' => '0',
            'ultrasonido' => '0',
            'C_Q_C_O_H' => '0',
            'masaje' => 'masaje',
            'ejercicios_pasivos_resistidos' => '0',
            'laser' => 'laser',
            'otros' => Str::random(10),
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('examenes_complementarios')->insert([
            'laboratorio' => '----------',
            'electrocardiograma' => '----------',
            'radiografia_torax' => '----------',
            'otros' => '----------',
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('examen_fisicos')->insert([
            'cabeza' => 'Cabeza',
            'cuello' => 'Cuello',
            'torax' => 'Torax',
            'abdomen' => 'Abdomen',
            'miembros_superiores' => 'Miembros Superiores',
            'miembros_inferiores' => 'Miembros Inferiores',
            'region_genital' => 'Region Genital',
            'region_anal' => 'Region Anal',
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('examen_organo_sistemas')->insert([
            'sistema_digestivo' => 'Sistema Digestivo',
            'sistema_respiratorio' => 'Sistema Respiratorio',
            'sistema_cardiaco' => 'Sistema Cardiaco',
            'sistema_genitourinarion' => 'Sistema Genitourinarion',
            'sistema_osteomuscular' => '-----------',
            'sistema_nervioso' => 'Nervioso',
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('habitos')->insert([
            'alcohol' => '1',
            'tabaco' => '0',
            'drogas' => '0',
            'alimentacion' =>'1',
            'diuresis' => '1',
            'somnia' => '0',
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('familiares')->insert([
            'nombres' => 'Diego',
            'union' => 'Soltero',
            'vida' => true,
            'causas' => '-----',
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);



        DB::table('enfermedades')->insert([
            'enfermedad' => 'Gripe',
        ]);
        DB::table('enfermedades')->insert([
            'enfermedad' => 'Fiebre',
        ]);
        DB::table('enfermedades')->insert([
            'enfermedad' => 'Tos',
        ]);
        DB::table('enfermedades')->insert([
            'enfermedad' => 'Alergia',
        ]);
        DB::table('enfermedades')->insert([
            'enfermedad' => 'Migraña',
        ]);

        DB::table('turnos')->insert(
            ['hora' => "08:00 AM",],
         );
         DB::table('turnos')->insert(
            ['hora' => "08:20 AM",],
         );
         DB::table('turnos')->insert(
            ['hora' => "08:40 AM",],
         );

        DB::table('citas')->insert([
            'nombres' => 'Alex Dario Zambrano Falconez',
            'cedula' => '1314567908',
            'especialidad' => 'Medicina General',
            'fecha' => Carbon::parse('2021-05-24'),
            'estado' => true,
            'abono' => true,
            'id_turno' => 1,
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]); DB::table('citas')->insert([
            'nombres' => 'Bryan Aldair Mendoza Loor',
            'cedula' => '1314567903',
            'especialidad' => 'Medicina General',
            'fecha' => Carbon::parse('2021-05-24'),
            'estado' => false,
            'abono' => false,
            'id_turno' => 2,
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]); DB::table('citas')->insert([
            'nombres' => 'Diego Oswaldo Loor Moran',
            'cedula' => '1316870706',
            'especialidad' => 'Rehabilitacion Fisica',
            'fecha' => Carbon::parse('2021-05-24'),
            'estado' => true,
            'abono' => true,
            'id_turno' => 3,
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
            "nombres" => "Dario Aldair Zambrano Mendoza",
            "correo" => "q",
            "password" => "q",
            "imagen" => "https://cdn.icon-icons.com/icons2/39/PNG/128/user_person_people_6100.png",
        ]);

        DB::table('antecedentes_patologicos_personales')->insert([
            'id_gineco' => 1,
            'infancia' => '-------',
            'adolecencia' => '------',
            'adultez' => '--------',
            'DBID' => 1,
            'HTA' => 1,
            'TbP' => 1,
            'DBI' => 1,
            'quirujircos' => '---',
            'alergias' => '-----',
            'traumas' => '----',
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('pacientes')->insert([
            'id_e_fisico' => 1,
            'id_patologico' => 1,
            'id_e_organo_sistema' => 1,
            'id_e_complementario' => 1,
            'id_habito' => 1,
            'cedula' => '1314567908',
            'nombres' => 'Bryan Aldair',
            'apellidos' => 'Medoza Loor',
            'edad' => 25,
            'sexo' => 'Hombre',
            'gad' => false,
            'ocupacion' => 'Estudiante',
            'residencia' => 'Flavio Alfaro',
            'procedencia' => 'Chone',
            'estado_civil' => 'Viudo',
            'raza' => 'Mulato',
            'religion' => 'Cristiana',
            'fecha_nacimiento' => Carbon::parse('1998-05-28'),
            'nivel_instruccion' => 'Universidad',
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);
        DB::table('pacientes')->insert([
            'id_e_fisico' => 1,
            'id_patologico' => 1,
            'id_e_organo_sistema' => 1,
            'id_e_complementario' => 1,
            'id_habito' => 1,
            'cedula' => '1316870706',
            'nombres' => 'Diego Oswaldo',
            'apellidos' => 'Loor Moran',
            'edad' => 21,
            'sexo' => 'Hombre',
            'gad' => true,
            'ocupacion' => 'Obrero',
            'residencia' => 'Junin',
            'procedencia' => 'Chone',
            'estado_civil' => 'Soltero',
            'raza' => 'Mestizo',
            'religion' => 'Cristiana',
            'fecha_nacimiento' => Carbon::parse('1999-11-18'),
            'nivel_instruccion' => 'Universidad',
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);

        DB::table('historias_clinicas_mg')->insert([
            'id_paciente' => 2,
            'id_enfermedad' => 1,
            'a_enfermedad'=>'mucho dolor hace semanas',
            'fecha' => Carbon::parse('2021-04-20'),
            'motivo_consulta' => 'Dolor de cabeza',
            'tipo_atencion' => 'Presuntivo',
            'condicion_diagnostico' => 'Presuntivo',
            'diagnostico' => '',
            'plan_terapeutico' => 'Pastillas paracetamol',
            'lugar_atencion' => 'Patronato',
            'receta'=> 'Descanso por tres dias y tomar paracetamol cada 8 horas',
            'certificado' => true,
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);
        DB::table('historias_clinicas_mg')->insert([
            'id_paciente' => 1,
            'id_enfermedad' => 4,
            'a_enfermedad'=>'fatiga y mucho dolor hace semanas',
            'fecha' => Carbon::parse('2021-03-24'),
            'motivo_consulta' => 'Cansancio y dolor a los musculos',
            'tipo_atencion' => 'Presuntivo',
            'condicion_diagnostico' => 'Presuntivo',
            'diagnostico' => '',
            'plan_terapeutico' => 'Pastillas paracetamol y descanso',
            'receta'=> 'Descanso por tres dias y tomar paracetamol cada 8 horas',
            'lugar_atencion' => 'Patronato',
            'certificado' => false,
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);


        DB::table('historias_clinicas_rf')->insert([
            'id_paciente' => 1,
            'id_tratamiento' => 1,
            'fecha' => Carbon::parse('2021-05-16'),
            'diagnostico' => Str::random(10),
            'lugar_atencion' => Str::random(10),
            'certificado' => true,
            'receta'=> 'Descanso por tres dias y tomar paracetamol cada 8 horas',
            'motivo_consulta' => Str::random(10),
            'anamnesis'=> Str::random(10),
            //'email' => Str::random(10).'@gmail.com',
            //'password' => Hash::make('password'),
        ]);




        DB::table('antecedente_patologico_familiares')->insert([
            "id_familiar" => 1,
            "id_paciente" => 1,
        ]);










    }


}
