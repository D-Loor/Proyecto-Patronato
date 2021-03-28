<?php

namespace App\Http\Controllers;

use App\Models\Antecedente_Patologico_Familiar;
use Illuminate\Http\Request;

class AntecedentePatologicoFamiliarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $datos=new Antecedente_Patologico_Familiar();
        $datos->id_familiar=$request->id_familiar;
        $datos->id_paciente=$request->id_paciente;
        $datos->save();

        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Antecedente_Patologico_Familiar  $antecedente_Patologico_Familiar
     * @return \Illuminate\Http\Response
     */
    public function show( $id_a_p_familiar)
    {
        $datos=Antecedente_Patologico_Familiar::where('id_a_p_familiar', $id_a_p_familiar)->get()->first();
        if($datos != null){
            return response()->json(['result'=>$datos, 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Antecedente_Patologico_Familiar  $antecedente_Patologico_Familiar
     * @return \Illuminate\Http\Response
     */
    public function edit(Antecedente_Patologico_Familiar $antecedente_Patologico_Familiar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Antecedente_Patologico_Familiar  $antecedente_Patologico_Familiar
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Antecedente_Patologico_Familiar  $antecedente_Patologico_Familiar
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id_a_p_familiar)
    {
        $datos=Antecedente_Patologico_Familiar::where('id_a_p_familiar', $id_a_p_familiar)->get()->first();
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);

    }
}
