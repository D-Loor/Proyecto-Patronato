<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Paciente::with('historias_clinicas_mg','historias_clinicas_rf','habitos','familiares','examen_organo_sistemas',
                            'examen_fisicos','examene_complementarios','antecedentes_patologicos_personales','antecedentes_ginecos_obstreticos')->get(); 
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
        $datos=new Paciente();
        $datos->id_patologico=$request->id_patologico;
        $datos->id_e_fisico=$request->id_e_fisico;
        $datos->id_e_organo_sistema=$request->id_e_organo_sistema;
        $datos->id_e_complementario=$request->id_e_complementario;
        $datos->id_habito=$request->id_habito;
        $datos->nombres=$request->nombres;
        $datos->cedula=$request->cedula;
        $datos->apellidos=$request->apellidos;
        $datos->edad=$request->edad;
        $datos->sexo=$request->sexo;
        $datos->gad=$request->gad;
        $datos->ocupacion=$request->ocupacion;
        $datos->residencia=$request->residencia;
        $datos->procedencia=$request->procedencia;
        $datos->estado_civil=$request->estado_civil;
        $datos->raza=$request->raza;
        $datos->religion=$request->religion;
        $datos->fecha_nacimiento=$request->fecha_nacimiento;
        $datos->nivel_instruccion=$request->nivel_instruccion;
        $datos->save();
        $idRecienGuardado = $datos->id_paciente;
        return response()->json(['result'=>"Datos guardados", 'code'=>'201', 'id' => $idRecienGuardado]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Paciente  $paciente
     * @return \Illuminate\Http\Response
     */
    public function show($id_paciente)
    {
        $datos=Paciente::with('habitos','antecedentes_patologicos_personales','familiares','examen_fisicos','examen_organo_sistemas','examene_complementarios')->where('id_paciente', $id_paciente)->get()->first();
        if($datos != null){
            return response()->json(['result'=>$datos, 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Paciente  $paciente
     * @return \Illuminate\Http\Response
     */
    public function edit(Paciente $paciente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Paciente  $paciente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $datos=Paciente::find($id);
        $datos->cedula=$request->cedula;
        $datos->nombres=$request->nombres;
        $datos->apellidos=$request->apellidos;
        $datos->edad=$request->edad;
        $datos->sexo=$request->sexo;
        $datos->gad=$request->gad;
        $datos->ocupacion=$request->ocupacion;
        $datos->residencia=$request->residencia;
        $datos->procedencia=$request->procedencia;
        $datos->estado_civil=$request->estado_civil;
        $datos->raza=$request->raza;
        $datos->religion=$request->religion;
        $datos->fecha_nacimiento=$request->fecha_nacimiento;
        $datos->nivel_instruccion=$request->nivel_instruccion;
        $datos->id_patologico=$request->id_patologico;
        $datos->id_e_fisico=$request->id_e_fisico;
        $datos->id_e_organo_sistema=$request->id_e_organo_sistema;
        $datos->id_e_complementario=$request->id_e_complementario;
        $datos->id_habito=$request->id_habito;
        $datos->update();
        return response()->json(['result'=>"Datos actualizados", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Paciente  $paciente
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id_paciente)
    {
        $datos=Paciente::where('id_cita', $id_paciente)->get()->first();
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }

    public function Atender( $cedula)
    {
        $datos=Paciente::with('habitos','antecedentes_patologicos_personales','familiares','examen_fisicos','examen_organo_sistemas','examene_complementarios')->where('cedula', $cedula)->get()->first();
        if($datos != null){
            return response()->json(['result'=>$datos, 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }
}
