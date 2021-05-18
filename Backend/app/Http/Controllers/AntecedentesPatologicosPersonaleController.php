<?php

namespace App\Http\Controllers;

use App\Models\Antecedentes_Patologicos_Personale;
use Illuminate\Http\Request;

class AntecedentesPatologicosPersonaleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $datos=Antecedentes_Patologicos_Personale::with('pacientes','antecedentes_ginecos_obstreticos')->get();  
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
        $datos=new Antecedentes_Patologicos_Personale();
        $datos->id_gineco=$request->id_gineco;
        $datos->infancia=$request->infancia;
        $datos->adolecencia=$request->adolecencia;
        $datos->adultez=$request->adultez;
        $datos->DBID=$request->DBID;
        $datos->HTA=$request->HTA;
        $datos->TbP=$request->TbP;
        $datos->DBI=$request->DBI;
        $datos->quirujircos=$request->quirujircos;
        $datos->alergias=$request->alergias;
        $datos->traumas=$request->traumas;
        $datos->save();
        $idRecienGuardado = $datos->id_patologico;
        return response()->json(['result'=>"Datos guardados", 'code'=>'201', 'id' => $idRecienGuardado]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Antecedentes_Patologicos_Personale  $antecedentes_Patologicos_Personale
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=Antecedentes_Patologicos_Personale::where('id_patologico', $id)->get()->first(); 
        if($datos != null){
            return response()->json(['result'=>$datos]);
        }else
        return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Antecedentes_Patologicos_Personale  $antecedentes_Patologicos_Personale
     * @return \Illuminate\Http\Response
     */
    public function edit(Antecedentes_Patologicos_Personale $antecedentes_Patologicos_Personale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Antecedentes_Patologicos_Personale  $antecedentes_Patologicos_Personale
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $datos=Antecedentes_Patologicos_Personale::find($id); 
        $datos->id_gineco=$request->id_gineco;
        $datos->infancia=$request->infancia;
        $datos->adolecencia=$request->adolecencia;
        $datos->adultez=$request->adultez;
        $datos->DBID=$request->DBID;
        $datos->HTA=$request->HTA;
        $datos->TbP=$request->TbP;
        $datos->DBI=$request->DBI;
        $datos->quirujircos=$request->quirujircos;
        $datos->alergias=$request->alergias;
        $datos->traumas=$request->traumas;
        $datos->update();
        
        return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Antecedentes_Patologicos_Personale  $antecedentes_Patologicos_Personale
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=Antecedentes_Patologicos_Personale::where('id_patologico', $id)->get()->first();  
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }
}
