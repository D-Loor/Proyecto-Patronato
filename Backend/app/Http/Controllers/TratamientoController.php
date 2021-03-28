<?php

namespace App\Http\Controllers;

use App\Models\Tratamiento;
use Illuminate\Http\Request;

class TratamientoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Tratamiento::all();  
        $num_rows = count($datos);
        if($num_rows!=0){
           return response()->json(['result'=>$datos]); 
       }else
           return response()->json(['mensaje'=>"No existen datos registrados", 'code'=>'202']); 
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
        $datos=new Tratamiento();
        $datos->estimulacion_temprana=$request->estimulacion_temprana;
        $datos->magnetoterapia=$request->magnetoterapia;
        $datos->electroestimulacion=$request->electroestimulacion;
        $datos->ultrasonido=$request->ultrasonido;
        $datos->C_Q_C_O_H=$request->C_Q_C_O_H;
        $datos->masaje=$request->masaje;
        $datos->ejercicios_pasivos_resistidos=$request->ejercicios_pasivos_resistidos;
        $datos->laser=$request->laser;
        $datos->otros=$request->otros;
        $datos->save();
        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tratamiento  $tratamiento
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=Tratamiento::where('id_tratamiento', $id)->get()->first(); 
        if($datos != null){
            return response()->json(['result'=>$datos]);
        }else
        return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tratamiento  $tratamiento
     * @return \Illuminate\Http\Response
     */
    public function edit(Tratamiento $tratamiento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tratamiento  $tratamiento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $datos=Tratamiento::where('id_tratamiento', $id)->get()->first(); 
        $datos->estimulacion_temprana=$request->estimulacion_temprana;
        $datos->magnetoterapia=$request->magnetoterapia;
        $datos->electroestimulacion=$request->electroestimulacion;
        $datos->ultrasonido=$request->ultrasonido;
        $datos->C_Q_C_O_H=$request->C_Q_C_O_H;
        $datos->masaje=$request->masaje;
        $datos->ejercicios_pasivos_resistidos=$request->ejercicios_pasivos_resistidos;
        $datos->laser=$request->laser;
        $datos->otros=$request->otros;
        $datos->update();
        
        return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tratamiento  $tratamiento
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=Tratamiento::where('id_tratamiento', $id)->get()->first();  
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }
}
