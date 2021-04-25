<?php

namespace App\Http\Controllers;

use App\Models\Habito;
use Illuminate\Http\Request;

class HabitoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Habito::all();  
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
        $datos=new Habito();
        $datos->alcohol=$request->alcohol;
        $datos->tabaco=$request->tabaco;
        $datos->drogas=$request->drogas;
        $datos->alimentacion=$request->alimentacion;
        $datos->diuresis=$request->diuresis;
        $datos->somnia=$request->somnia;
        $datos->save();
        $idRecienGuardado = $datos->id_habito;
        return response()->json(['result'=>"Datos guardados", 'code'=>'201', 'id' => $idRecienGuardado]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Habito  $habito
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=Habito::where('id_habito', $id)->get()->first(); 
        if($datos != null){
            return response()->json(['result'=>$datos]);
        }else
        return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Habito  $habito
     * @return \Illuminate\Http\Response
     */
    public function edit(Habito $habito)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Habito  $habito
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $datos=Habito::find($id); 
        $datos->alcohol=$request->alcohol;
        $datos->tabaco=$request->tabaco;
        $datos->drogas=$request->drogas;
        $datos->alimentacion=$request->alimentacion;
        $datos->diuresis=$request->diuresis;
        $datos->somnia=$request->somnia;
        $datos->update();
        
        return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Habito  $habito
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=Habito::where('id_habito', $id)->get()->first();  
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }
}
