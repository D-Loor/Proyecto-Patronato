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
Route::resource('Habitos','HabitoController');
Route::resource('Roles','RoleController');
Route::resource('Cuentas','CuentaController');
Route::resource('HistorialEnfermedades','HistorialEnfermedadesController');

Route::get('login/{correo}/{pass}', 'CuentaController@validar');
Route::get('citasMGandRF/{especialidad}/{fechaActual}', 'CitaController@validarMGandRF');
Route::post('agendarCita','CitaController@store');
Route::get('validarturno/{fecha}/{tipo}', 'CitaController@validarHora');
Route::get('filtroFecha/{fecha}', 'PacienteController@filtro');
Route::get('atender/{cedula}','PacienteController@Atender');
Route::get('validarcita/{cedula}/{fechaActual}', 'CitaController@ValidarCita');
Route::get('FechasRangosMG/{fechaInicial}/{fechaFinal}', 'HistoriaClinicaMGController@FiltradoFecha');
Route::get('pacientesConcultas/{id}', 'HistoriaClinicaMGController@ConsultasPacientes');
Route::get('FechasRangosRF/{fechaInicial}/{fechaFinal}', 'HistoriaClinicaRFController@FiltradoFecha');
Route::delete('eliminarATPF/{id_familiar}/{id_paciente}','AntecedentePatologicoFamiliarController@eliminar');
Route::get('estadisticas/{fechaInicial}/{fechaFinal}', 'HistoriaClinicaMGController@DatosEstadisticos');
Route::get('estadisticasRF/{fechaInicial}/{fechaFinal}',  'HistoriaClinicaRFController@DatosEstadisticos');

Route::get('ReportePacientesAnual','PDFController@ReportePacientesAnual');
Route::get('ReportePacientesMensual','PDFController@ReportePacientesMensual');
Route::get('MorbilidadMedicinaGeneral','PDFController@MorbilidadMedicinaGeneral');
Route::get('MorbilidadTerapia','PDFController@MorbilidadTerapia');
Route::get('RegistroDiarioMedicina','PDFController@RegistroDiarioMedicina');
Route::get('RegistroDiarioFisica','PDFController@RegistroDiarioFisica');
Route::get('ConsolidadoMensualMedicinaGeneral','PDFController@ConsolidadoMensualMedicinaGeneral');

Route::get('ConsolidadoMensualTerapia','PDFController@ConsolidadoMensualTerapia');
