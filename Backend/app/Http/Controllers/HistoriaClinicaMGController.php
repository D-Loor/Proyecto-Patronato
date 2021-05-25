<?php

namespace App\Http\Controllers;

use App\Models\Historia_Clinica_MG;
use Illuminate\Http\Request;
use App\Models\Paciente;
use App\Models\Cita;

class HistoriaClinicaMGController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$datos=Historia_Clinica_MG::all();
        $datos=Historia_Clinica_MG::with('paciente','enfermedad')->get();
        $num_rows = count($datos);

        if($num_rows!=0){
            return response()->json(['result'=>$datos]);
        }else
            return response()->json(['mensaje'=>"No hay registros", 'code'=>'202']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $datos=new Historia_Clinica_MG();
        $datos->id_enfermedad=$request->id_enfermedad;
        $datos->id_paciente=$request->id_paciente;
        $datos->a_enfermedad=$request->a_enfermedad;
        $datos->fecha=$request->fecha;
        $datos->motivo_consulta=$request->motivo_consulta;
        $datos->tipo_atencion=$request->tipo_atencion;
        $datos->condicion_diagnostico=$request->condicion_diagnostico;
        $datos->diagnostico=$request->diagnostico;
        $datos->plan_terapeutico=$request->plan_terapeutico;
        $datos->lugar_atencion=$request->lugar_atencion;
        $datos->certificado=$request->certificado;
        $datos->receta=$request->receta;

        $datos->save();
        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Historia_Clinica_MG  $historia_Clinica_MG
     * @return \Illuminate\Http\Response
     */
    public function show($id_paciente)
    {
        $datos=Historia_Clinica_MG::where('id_paciente', $id_paciente)->get()->first();
        if($datos != null){
            return response()->json(['result'=>$datos, 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Historia_Clinica_MG  $historia_Clinica_MG
     * @return \Illuminate\Http\Response
     */
    public function edit(Historia_Clinica_MG $historia_Clinica_MG)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Historia_Clinica_MG  $historia_Clinica_MG
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id_historia_clinica_mg)
    {
        $datos=Historia_Clinica_MG::find($id_historia_clinica_mg);

        $datos->id_enfermedad=$request->id_enfermedad;
        $datos->id_paciente=$request->id_paciente;
        $datos->a_enfermedad=$request->a_enfermedad;
        $datos->fecha=$request->fecha;
        $datos->motivo_consulta=$request->motivo_consulta;
        $datos->tipo_atencion=$request->tipo_atencion;
        $datos->condicion_diagnostico=$request->condicion_diagnostico;
        $datos->diagnostico=$request->diagnostico;
        $datos->plan_terapeutico=$request->plan_terapeutico;
        $datos->lugar_atencion=$request->lugar_atencion;
        $datos->certificado=$request->certificado;
        $datos->receta=$request->receta;

        $datos->update();
        return response()->json(['result'=>"Datos actualizados", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Historia_Clinica_MG  $historia_Clinica_MG
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id_historia_Clinica_MG)
    {
        $datos=Historia_Clinica_MG::where('id_historia_clinica_mg', $id_historia_clinica_mg)->get()->first();
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }


    public function FiltradoFecha($fechaInicial, $fechaFinal)
    {
        if($fechaInicial > $fechaFinal){
            return response()->json(['result'=>"Error en fechas", 'code'=>'203']);
        }else if($fechaInicial == $fechaFinal){
            $datos=Historia_Clinica_MG::where('fecha',$fechaInicial)->with('paciente','enfermedad')->get();
            $num_rows = count($datos);
            if($num_rows != 0){
                return response()->json(['result'=>$datos, 'code'=>'201']);
            }else
                return response()->json(['result'=>"Datos vacios", 'code'=>'202']);
        }else{
            $datos=Historia_Clinica_MG::whereBetween('fecha', [$fechaInicial, $fechaFinal])->with('paciente','enfermedad')->get();
            $num_rows = count($datos);
            if($num_rows != 0){
                return response()->json(['result'=>$datos, 'code'=>'201']);
            }else
                return response()->json(['result'=>"Datos vacios", 'code'=>'202']);
        }

    }

    public function ConsultasPacientes($id){
        $datos = Historia_Clinica_MG::where('id_paciente', $id)->with('paciente','enfermedad')->get();
        $num_rows = count($datos);
        if($num_rows != 0){
            return response()->json(['result'=>$datos, 'code'=>'201']);
        }else
            return response()->json(['result'=>"Datos vacios", 'code'=>'202']);

    }

    public function DatosEstadisticos($fechaInicial, $fechaFinal){
        $pacientes=Historia_Clinica_MG::whereBetween('fecha', [$fechaInicial, $fechaFinal])->with('paciente','enfermedad')->get();

        $presunt=0;
        $defini=0;
        $citasPendientes = Cita::all();

        $cont = 0;
        $contH = 0;
        $contM =0;
        foreach ($pacientes as $item){
            if($item['condicion_diagnostico']=='Presuntivo')
                $presunt++;
            else
                $defini++;
        }

        foreach ($pacientes as $item){
            if($item->paciente['gad']=='1')
                $cont++;
        }

        foreach ($pacientes as $item){
            if($item->paciente['sexo']=='Hombre')
                $contH++;
        }

        foreach ($pacientes as $item){
            if($item->paciente['sexo']=='Mujer')
                $contM++;
        }

        $TotalPacientes = count($pacientes);
        $TotalcitasPendientes = count($citasPendientes);

        return response()->json(['totalP'=>$TotalPacientes, 'totalC'=>$TotalcitasPendientes, 'totalG'=>$cont, 'totalH'=>$contH, 'totalM'=>$contM, 'presuntivo'=>$presunt,'definitivo'=> $defini]);

    }

}
