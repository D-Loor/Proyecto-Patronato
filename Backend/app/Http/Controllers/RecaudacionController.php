<?php

namespace App\Http\Controllers;

use App\Models\Recaudacion;
use Illuminate\Http\Request;

class RecaudacionController extends Controller
{
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Recaudacion::with('paciente','rol')->get();
        $num_rows = count($datos);

        if($num_rows!=0){
            return response()->json(['result'=>$datos, 'code'=>'201','total'=>$num_rows]);
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
        $datos=new Recaudacion();
        $datos->id_paciente=$request->id_paciente;
        $datos->id_rol=$request->id_rol;
        $datos->fecha=$request->fecha;
        $datos->valor=$request->valor;
        $datos->exonera=$request->exonera;
        $datos->observaciones=$request->observaciones;
        $datos->save();
        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Recaudacion  $paciente
     * @return \Illuminate\Http\Response
     */
    public function show($id_recaudacion)
    {
        $datos=Recaudacion::with('paciente','rol')->find($id_recaudacion)->get();

        if($datos != null){
            return response()->json(['result'=>$datos,'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Recaudacion  $paciente
     * @return \Illuminate\Http\Response
     */
    public function edit(Recaudacion $paciente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Recaudacion  $paciente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Recaudacion  $paciente
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id_recaudacion)
    {
        $datos=Recaudacion::where('id_recaudacion', $id_recaudacion)->get()->first();
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }

}
