<?php

namespace App\Http\Controllers;

use App\Models\Especialidad;
use Illuminate\Http\Request;

class EspecialidadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Especialidad::all();  
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
        $datos=new Especialidad();
        $datos->especialidad=$request->especialidad;
        $datos->save();
        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Especialidad  $especialidad
     * @return \Illuminate\Http\Response
     */
    public function show( $id)
    {
        $datos=Especialidad::where('id_especialidad', $id)->get()->first(); 
        if($datos != null){
            return response()->json(['result'=>$datos]);
        }else
            return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Especialidad  $especialidad
     * @return \Illuminate\Http\Response
     */
    public function edit(Especialidad $especialidad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Especialidad  $especialidad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
        $datos=Especialidad::where('id_especialidad', $id)->get()->first();
        if($datos != null){
            $datos->especialidad=$request->especialidad;
            $datos->update();
            return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
        }else
            return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Especialidad  $especialidad
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id)
    {
        $datos=Especialidad::where('id_especialidad', $id)->get()->first();  
            if($datos != null){
                $datos->delete();
                return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
            }else{
                return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
            }   
    }
}
