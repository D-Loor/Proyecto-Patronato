<?php

namespace App\Http\Controllers;

use App\Models\Historia_Clinica_MG;

use Illuminate\Http\Request;

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
        $datos=Historia_Clinica_MG::with('paciente')->Paginate(1000);
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
        $datos->cedula=$request->cedula;
        $datos->id_enfermedad=$request->id_enfermedad;
        $datos->id_a_enfermedad=$request->id_a_enfermedad;
        $datos->fecha=$request->fecha;
        $datos->motivo_consulta=$request->motivo_consulta;
        $datos->tipo_atencion=$request->tipo_atencion;
        $datos->condicion_diagnostico=$request->condicion_diagnostico;
        $datos->diagnostico_presuntivo=$request->diagnostico_presuntivo;
        $datos->id_enfermedad=$request->id_enfermedad;
        $datos->id_a_enfermedad=$request->id_a_enfermedad;
        $datos->diagnostico_diferencial=$request->diagnostico_diferencial;
        $datos->plan_terapeutico=$request->plan_terapeutico;
        $datos->lugar_atencion=$request->lugar_atencion;
        $datos->raza=$request->raza;
        $datos->certificado=$request->certificado;



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
        $datos->id_a_enfermedad=$request->id_a_enfermedad;
        $datos->fecha=$request->fecha;
        $datos->motivo_consulta=$request->motivo_consulta;
        $datos->tipo_atencion=$request->tipo_atencion;
        $datos->condicion_diagnostico=$request->condicion_diagnostico;
        $datos->diagnostico_presuntivo=$request->diagnostico_presuntivo;
        $datos->diagnostico_diferencial=$request->diagnostico_diferencial;
        $datos->plan_terapeutico=$request->plan_terapeutico;
        $datos->lugar_atencion=$request->lugar_atencion;
        $datos->raza=$request->raza;
        $datos->certificado=$request->certificado;

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
}
