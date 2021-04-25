<?php

namespace App\Http\Controllers;

use App\Models\Examen_Organo_Sistema;
use Illuminate\Http\Request;

class ExamenOrganoSistemaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Examen_Organo_Sistema::all();  
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
        $datos=new Examen_Organo_Sistema();
        $datos->sistema_digestivo=$request->sistema_digestivo;
        $datos->sistema_respiratorio=$request->sistema_respiratorio;
        $datos->sistema_cardiaco=$request->sistema_cardiaco;
        $datos->sistema_genitourinarion=$request->sistema_genitourinarion;
        $datos->sistema_osteomuscular=$request->sistema_osteomuscular;
        $datos->sistema_nervioso=$request->sistema_nervioso;
        $datos->save();
        $idRecienGuardado = $datos->id_e_organo_sistema;
        return response()->json(['result'=>"Datos guardados", 'code'=>'201', 'id' => $idRecienGuardado]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Examen_Organo_Sistema  $examen_Organo_Sistema
     * @return \Illuminate\Http\Response
     */
    public function show( $id )
    {
        $datos=Examen_Organo_Sistema::where('id_e_organo_sistema', $id)->get()->first(); 
        if($datos != null){
            return response()->json(['result'=>$datos]);
        }else
        return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Examen_Organo_Sistema  $examen_Organo_Sistema
     * @return \Illuminate\Http\Response
     */
    public function edit(Examen_Organo_Sistema $examen_Organo_Sistema)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Examen_Organo_Sistema  $examen_Organo_Sistema
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $datos=Examen_Organo_Sistema::find($id); 
        $datos->sistema_digestivo=$request->sistema_digestivo;
        $datos->sistema_respiratorio=$request->sistema_respiratorio;
        $datos->sistema_cardiaco=$request->sistema_cardiaco;
        $datos->sistema_genitourinarion=$request->sistema_genitourinarion;
        $datos->sistema_osteomuscular=$request->sistema_osteomuscular;
        $datos->sistema_nervioso=$request->sistema_nervioso;
        $datos->update();
        
        return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Examen_Organo_Sistema  $examen_Organo_Sistema
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id )
    {
        $datos=Examen_Organo_Sistema::where('id_e_organo_sistema', $id)->get()->first();  
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }
}
