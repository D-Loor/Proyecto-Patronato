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
Route::resource('Turnos','TurnoController');
Route::resource('Especialidades','EspecialidadController');
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
Route::put('actualizarCita/{cedula}','CitaController@ActualizarEstado');

//reportes
Route::get('ReportePacientesAnual/{year}','PDFController@ReportePacientesAnual');
Route::get('ReportePacientesMensual/{mes}/{year}','PDFController@ReportePacientesMensual');
Route::get('MorbilidadMedicinaGeneral/{mes}/{year}','PDFController@MorbilidadMedicinaGeneral');
Route::get('MorbilidadTerapia/{mes}/{year}','PDFController@MorbilidadTerapia');
Route::get('RegistroDiarioMedicina/{fecha}','PDFController@RegistroDiarioMedicina');
Route::get('RegistroDiarioFisica/{fecha}','PDFController@RegistroDiarioFisica');
Route::get('ConsolidadoMensualMedicinaGeneral/{mes}/{year}','PDFController@ConsolidadoMensualMedicinaGeneral');
Route::get('ConsolidadoMensualTerapia/{mes}/{year}','PDFController@ConsolidadoMensualTerapia');


//validar reportes
Route::get('ValidarReportePacientesAnual/{year}','PDFController@ValidarReportePacientesAnual');
Route::get('ValidarReportePacientesMensual/{mes}/{year}','PDFController@ValidarReportePacientesMensual');
Route::get('ValidarMorbilidadMedicinaGeneral/{mes}/{year}','PDFController@ValidarMorbilidadMedicinaGeneral');
Route::get('ValidarMorbilidadTerapia/{mes}/{year}','PDFController@ValidarMorbilidadTerapia');
Route::get('ValidarRegistroDiarioMedicina/{fecha}','PDFController@ValidarRegistroDiarioMedicina');
Route::get('ValidarRegistroDiarioFisica/{fecha}','PDFController@ValidarRegistroDiarioFisica');
Route::get('ValidarConsolidadoMensualMedicinaGeneral/{mes}/{year}','PDFController@ValidarConsolidadoMensualMedicinaGeneral');
Route::get('ValidarConsolidadoMensualTerapia/{mes}/{year}','PDFController@ValidarConsolidadoMensualTerapia');
