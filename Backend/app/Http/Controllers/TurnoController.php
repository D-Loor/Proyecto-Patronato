<?php

namespace App\Http\Controllers;

use App\Models\Turno;
use App\Models\Cita;
use Illuminate\Http\Request;

class TurnoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Turno::all();  
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
        $datos=new Turno();
        $datos->hora=$request->hora;
        $datos->tipo=$request->tipo;
        $datos->save();
        $idRecienGuardado = $datos->id_turno;
        return response()->json(['result'=>"Datos guardados", 'code'=>'201', 'id'=>$idRecienGuardado]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Turno  $turno
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=Turno::where('id_turno', $id)->get()->first(); 
        if($datos != null){
            return response()->json(['result'=>$datos]);
        }else
            return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Turno  $turno
     * @return \Illuminate\Http\Response
     */
    public function edit(Turno $turno)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Turno  $turno
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $datos=Turno::find($id);
        if($datos != null){
            $datos->hora=$request->hora;
            $datos->tipo=$request->tipo;
            $datos->update();
            return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
        }else
            return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Turno  $turno
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=Turno::find($id); 
        $datosCuenta=Cita::where('id_turno', $id)->get()->first();
        if($datosCuenta != null ){
            return response()->json(['result'=>"Turno Relacionado", 'code'=>'203']);
        }else{
            if($datos != null){
                $datos->delete();
                return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
            }else{
                return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
            }
        }
        
    }
}
