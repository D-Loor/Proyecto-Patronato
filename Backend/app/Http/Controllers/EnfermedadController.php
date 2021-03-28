<?php

namespace App\Http\Controllers;

use App\Models\Enfermedad;
use Illuminate\Http\Request;

class EnfermedadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Enfermedad::all();
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
        $datos=new Enfermedad();
        $datos->enfermedad=$request->enfermedad;
        $datos->save();

        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Enfermedad  $enfermedad
     * @return \Illuminate\Http\Response
     */
    public function show( $id_enfermedad)
    {
        $datos=Enfermedad::where('id_enfermedad', $id_enfermedad)->get()->first();
        if($datos != null){
            return response()->json(['result'=>$datos, 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);


    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Enfermedad  $enfermedad
     * @return \Illuminate\Http\Response
     */
    public function edit(Enfermedad $enfermedad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Enfermedad  $enfermedad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $datos=Enfermedad::find($request->id_enfermedad);
        $datos->enfermedad=$request->enfermedad;
        $datos->update();
        return response()->json(['result'=>"Datos actualizados", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Enfermedad  $enfermedad
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id_enfermedad)
    {
        $datos=Enfermedad::where('id_enfermedad', $id_enfermedad)->get()->first();
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);

    }
}
