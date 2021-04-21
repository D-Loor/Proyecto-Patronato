<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
 

Route::resource('Enfermedad','EnfermedadController');
Route::resource('Cita','CitaController');
Route::resource('AntecedenteEnfermedad','AntecedenteEnfermedadController');
Route::resource('Familiar','FamiliaController');
Route::resource('AntecedentePatologicoFamiliar','AntecedentePatologicoFamiliarController');
Route::resource('Paciente','PacienteController');
Route::resource('HistorialClinicoMedicinaGeneral','HistoriaClinicaMGController');
Route::resource('AGO','AntecedentesGinecosObstreticoController');
Route::resource('APP','AntecedentesPatologicosPersonaleController');
Route::resource('Tratamiento','TratamientoController');
Route::resource('Complementarios','ExamenesComplementarioController');
Route::resource('HistoriasClinicasRF','HistoriaClinicaRFController');
Route::resource('ExamenesFisicos','ExamenFisicoController');
Route::resource('ExamenesOrganosSistemas','ExamenOrganoSistemaController');
Route::resource('HabitosPaciente','HabitoPacienteController');
Route::resource('Habitos','HabitoController'); 
Route::resource('Roles','RoleController'); 
Route::resource('Cuentas','CuentaController'); 


Route::get('login/{correo}/{pass}', 'CuentaController@validar');
Route::get('citasMGandRF/{especialidad}/{fechaActual}', 'CitaController@validarMGandRF');
Route::post('agendarCita','CitaController@store'); 
Route::get('validarHora/{fecha}', 'CitaController@validarHora');
Route::get('filtroFecha/{fecha}', 'PacienteController@filtro');