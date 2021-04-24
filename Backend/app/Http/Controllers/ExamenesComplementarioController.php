<?php

namespace App\Http\Controllers;

use App\Models\Examenes_Complementario;
use Illuminate\Http\Request;

class ExamenesComplementarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Examenes_Complementario::all();  
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
        $datos=new Examenes_Complementario();
        $datos->laboratorio=$request->laboratorio;
        $datos->electrocardiograma=$request->electrocardiograma;
        $datos->radiografia_torax=$request->radiografia_torax;
        $datos->otros=$request->otros;
        $datos->save();
        $idRecienGuardado = $datos->id_e_complementario;
        return response()->json(['result'=>"Datos guardados", 'code'=>'201', 'id' => $idRecienGuardado]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Examenes_Complementario  $examenes_Complementario
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=Examenes_Complementario::where('id_e_complementario', $id)->get()->first(); 
        if($datos != null){
            return response()->json(['result'=>$datos]);
        }else
        return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Examenes_Complementario  $examenes_Complementario
     * @return \Illuminate\Http\Response
     */
    public function edit(Examenes_Complementario $examenes_Complementario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Examenes_Complementario  $examenes_Complementario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $datos=Examenes_Complementario::where('id_e_complementario', $id)->get()->first(); 
        $datos->laboratorio=$request->laboratorio;
        $datos->electrocardiograma=$request->electrocardiograma;
        $datos->radiografia_torax=$request->radiografia_torax;
        $datos->otros=$request->otros;
        $datos->update();
        
        return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Examenes_Complementario  $examenes_Complementario
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=Examenes_Complementario::where('id_e_complementario', $id)->get()->first();  
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }
}
