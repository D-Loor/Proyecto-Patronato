<?php

namespace App\Http\Controllers;

use App\Models\Examen_Fisico;
use Illuminate\Http\Request;

class ExamenFisicoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Examen_Fisico::all();  
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
        $datos=new Examen_Fisico();
        $datos->cabeza=$request->cabeza;
        $datos->cuello=$request->cuello;
        $datos->torax=$request->torax;
        $datos->abdomen=$request->abdomen;
        $datos->miembros_superiores=$request->miembros_superiores;
        $datos->miembros_inferiores=$request->miembros_inferiores;
        $datos->region_genital=$request->region_genital;
        $datos->region_anal=$request->region_anal;
        $datos->save();
        $idRecienGuardado = $datos->id_e_fisico;
        return response()->json(['result'=>"Datos guardados", 'code'=>'201', 'id' => $idRecienGuardado]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Examen_Fisico  $examen_Fisico
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=Examen_Fisico::where('id_e_fisico', $id)->get()->first(); 
        if($datos != null){
            return response()->json(['result'=>$datos]);
        }else
        return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Examen_Fisico  $examen_Fisico
     * @return \Illuminate\Http\Response
     */
    public function edit(Examen_Fisico $examen_Fisico)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Examen_Fisico  $examen_Fisico
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $datos=Examen_Fisico::find($id); 
        $datos->cabeza=$request->cabeza;
        $datos->cuello=$request->cuello;
        $datos->torax=$request->torax;
        $datos->abdomen=$request->abdomen;
        $datos->miembros_superiores=$request->miembros_superiores;
        $datos->miembros_inferiores=$request->miembros_inferiores;
        $datos->region_genital=$request->region_genital;
        $datos->region_anal=$request->region_anal;
        $datos->update();
        
        return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Examen_Fisico  $examen_Fisico
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id)
    {
        $datos=Examen_Fisico::where('id_e_fisico', $id)->get()->first();  
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }
}
