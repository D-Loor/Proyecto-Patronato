<?php

namespace App\Http\Controllers;

use App\Models\HistorialEnfermedades;
use Illuminate\Http\Request;

class HistorialEnfermedadesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=HistorialEnfermedades::with('historia','enfermedad','aenfermedad')->get();
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
        $datos=new HistorialEnfermedades();
        $datos->id_historia_clinica_mg=$request->id_historia_clinica_mg;
        $datos->id_enfermedad=$request->id_enfermedad;
        $datos->id_a_enfermedad=$request->id_a_enfermedad;

        $datos->save();

        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HistorialEnfermedades  $historialEnfermedades
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=HistorialEnfermedades::where('id_historia_clinica_mg', $id)->get()::with('historia','enfermedad','aenfermedad')->get();
        if($datos != null){
            return response()->json(['result'=>$datos, 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HistorialEnfermedades  $historialEnfermedades
     * @return \Illuminate\Http\Response
     */
    public function edit(HistorialEnfermedades $historialEnfermedades)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\HistorialEnfermedades  $historialEnfermedades
     * @return \Illuminate\Http\Response
     */
    public function update( $id)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HistorialEnfermedades  $historialEnfermedades
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=HistorialEnfermedades::where('id_historia_clinica_mg', $id)->get()->first();
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }
}
