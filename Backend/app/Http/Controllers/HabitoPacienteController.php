<?php

namespace App\Http\Controllers;

use App\Models\Habito_Paciente;
use Illuminate\Http\Request;

class HabitoPacienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Habito_Paciente::all();  
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
        $datos=new Habito_Paciente();
        $datos->id_habito=$request->id_habito;
        $datos->id_paciente=$request->id_paciente;
        $datos->save();
        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    } 

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Habito_Paciente  $habito_Paciente
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=Habito_Paciente::where('id_habito_paciente', $id)->get()->first(); 
        if($datos != null){
            return response()->json(['result'=>$datos]);
        }else
        return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Habito_Paciente  $habito_Paciente
     * @return \Illuminate\Http\Response
     */
    public function edit(Habito_Paciente $habito_Paciente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Habito_Paciente  $habito_Paciente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $datos=Habito_Paciente::where('id_habito_paciente', $id)->get()->first(); 
        $datos->id_habito=$request->id_habito;
        $datos->id_paciente=$request->id_paciente;
        $datos->update();
        
        return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Habito_Paciente  $habito_Paciente
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=Habito_Paciente::where('id_habito_paciente', $id)->get()->first();  
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }
}
