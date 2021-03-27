<?php

namespace App\Http\Controllers;

use App\Models\Antecedente_Enfermedad;
use Illuminate\Http\Request;

class AntecedenteEnfermedadController extends Controller
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
        $datos=new Antecedente_Enfermedad();
        $datos->descripcion=$request->descripcion;
        $datos->save();

        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Antecedente_Enfermedad  $antecedente_Enfermedad
     * @return \Illuminate\Http\Response
     */
    public function show($id_a_enfermedad)
    {
        $datos=Antecedente_Enfermedad::where('id_a_enfermedad', $id_a_enfermedad)->get()->first();
        if($datos != null){
            return response()->json(['result'=>$datos, 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Antecedente_Enfermedad  $antecedente_Enfermedad
     * @return \Illuminate\Http\Response
     */
    public function edit(Antecedente_Enfermedad $antecedente_Enfermedad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Antecedente_Enfermedad  $antecedente_Enfermedad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $datos=Antecedente_Enfermedad::find($request->id_a_enfermedad);
        $datos->id_a_enfermedad=$request->id_a_enfermedad;
        $datos->descripcion=$request->descripcion;
        $datos->update();
        return response()->json(['result'=>"Datos actualizados", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Antecedente_Enfermedad  $antecedente_Enfermedad
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_a_enfermedad)
    {
        $datos=Antecedente_Enfermedad::where('id_a_enfermedad', $id_a_enfermedad)->get()->first();
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }
}
