<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use Illuminate\Http\Request;
use App\Models\Paciente;
use App\Models\Turno;

class CitaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Cita::with('turno')->get();
        $num_rows = count($datos);

        if($num_rows!=0){
            return response()->json(['result'=>$datos]);
        }else
            return response()->json(['mensaje'=>"No hay registros", 'code'=>'202']);


    }

    public function validarMGandRF($especialidad,$fechaActual){
        $datos=Cita::where('especialidad', $especialidad)->where('fecha',$fechaActual)->with('turno')->get()->all();
        if($datos != null){
            return response()->json(['result'=>$datos, 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
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

        $datos=new Cita();
        $datos->nombres=$request->nombres;
        $datos->cedula=$request->cedula;
        $datos->especialidad=$request->especialidad;
        $datos->fecha=$request->fecha;
        $datos->id_turno=$request->id_turno;
        if($request->abono=="DOADBA"){
            $datos->abono=true;
        }else{
            $datos->abono=false;
        }
        $datosP=Paciente::where('cedula', $request->cedula)->get()->first();
        if($datosP != null){
            $datos->estado=1;
        }else{
            $datos->estado=0;
        }
        $datos->save();
        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cita  $cita
     * @return \Illuminate\Http\Response
     */
    public function show( $id_cita)
    {
        $datos=Cita::where('id_cita', $id_cita)->get()->first();
        if($datos != null){
            return response()->json(['result'=>$datos, 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }

    public function validarHora($fecha)
    {
        $datos=Cita::all()->where('fecha', $fecha)->sortByDesc('id_turno');;
        $turno=Turno::all();
        $NCitas = count($datos);


        foreach ($datos as $cita)
        {

            $cont=-1;
            foreach ($turno as $tur)
            {

                $cont++;
                if($tur['id_turno'] == $cita['id_turno'] ){
                    unset($turno[$cont]);
                    break;
                }

            }
        }

        $NTurnos = count($turno);

        if($NTurnos != 0){
            return response()->json(['result'=>$turno, 'code'=>'201']);
        }else
        return response()->json(['result'=>"Sin Turnos ", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cita  $cita
     * @return \Illuminate\Http\Response
     */
    public function edit(Cita $cita)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cita  $cita
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $cedula)
    {
        $datos=Cita::where("cedula", '=', $cedula)->first();
        //$rol = role::where("cedula", '=', $id_cita)->first();
        if($datos != null){
            $datos->id_cita = $datos->id_cita;
            $datos->nombres = $request->nombres;
            $datos->cedula = $datos->cedula;
            $datos->especialidad = $datos->especialidad;
            $datos->fecha = $datos->fecha;
            $datos->abono = $request->abono;
            $datos->id_turno = $datos->id_turno;
            $datosP=Paciente::where('cedula', $cedula)->get()->first();
            if($datosP != null){
                $datos->estado=1;
            }else{
                $datos->estado=0;
            }
            $datos->update();
            return response()->json(['result'=>"Datos actualizados", 'code'=>'201']);
        } else{
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cita  $cita
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_cita)
    {
        $datos=Cita::where('id_cita', $id_cita)->get()->first();
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }


    public function ValidarCita($cedula,$fechaActual){
        $datos=Cita::where('cedula', $cedula)->where('fecha',$fechaActual)->get();
        $num_rows = count($datos);
        if($num_rows != 0){
            return response()->json(['code'=>'201']);
        }else
            return response()->json(['result'=>"Proceda con el registro", 'code'=>'202']);
    }

}
