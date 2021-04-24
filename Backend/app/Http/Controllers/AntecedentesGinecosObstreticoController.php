<?php

namespace App\Http\Controllers;

use App\Models\Antecedentes_Ginecos_Obstretico;
use Illuminate\Http\Request;

class AntecedentesGinecosObstreticoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $datos=Antecedentes_Ginecos_Obstretico::with('antecedentes_patologicos_personales')->get();  
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
        $datos=new Antecedentes_Ginecos_Obstretico();
        $datos->FUM=$request->FUM;
        $datos->FPP=$request->FPP;
        $datos->edad_gestional=$request->edad_gestional;
        $datos->menarquia=$request->menarquia;
        $datos->flujo_genital=$request->flujo_genital;
        $datos->gestas=$request->gestas;
        $datos->partos=$request->partos;
        $datos->cesareas=$request->cesareas;
        $datos->abortos=$request->abortos;
        $datos->save();
        $idRecienGuardado = $datos->id_gineco;
    return response()->json(['result'=>"Datos guardados", 'code'=>'201', 'id' => $idRecienGuardado]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Antecedentes_Ginecos_Obstretico  $antecedentes_Ginecos_Obstretico
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=Antecedentes_Ginecos_Obstretico::where('id_gineco', $id)->get()->first(); 
        if($datos != null){
            return response()->json(['result'=>$datos]);
        }else
        return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Antecedentes_Ginecos_Obstretico  $antecedentes_Ginecos_Obstretico
     * @return \Illuminate\Http\Response
     */
    public function edit(Antecedentes_Ginecos_Obstretico $antecedentes_Ginecos_Obstretico)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Antecedentes_Ginecos_Obstretico  $antecedentes_Ginecos_Obstretico
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $datos=Antecedentes_Ginecos_Obstretico::where('id_gineco', $id)->get()->first(); 
        $datos->FUM=$request->FUM;
        $datos->FPP=$request->FPP;
        $datos->edad_gestional=$request->edad_gestional;
        $datos->menarquia=$request->menarquia;
        $datos->flujo_genital=$request->flujo_genital;
        $datos->gestas=$request->gestas;
        $datos->partos=$request->partos;
        $datos->cesareas=$request->cesareas;
        $datos->update();
        
        return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Antecedentes_Ginecos_Obstretico  $antecedentes_Ginecos_Obstretico
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=Antecedentes_Ginecos_Obstretico::where('id_gineco', $id)->get()->first();  
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }
}
