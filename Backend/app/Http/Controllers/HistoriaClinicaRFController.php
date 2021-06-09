<?php

namespace App\Http\Controllers;

use App\Models\Historia_Clinica_RF;
use Illuminate\Http\Request;
use App\Models\Cita;
use App\Models\Role;

class HistoriaClinicaRFController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$datos=Historia_Clinica_RF::all();
        $datos=Historia_Clinica_RF::with('paciente', 'tratamiento')->get();
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
        $datos=new Historia_Clinica_RF();
        $datos->id_paciente=$request->id_paciente;
        $datos->id_tratamiento=$request->id_tratamiento;
        $datos->diagnostico=$request->diagnostico;
        $datos->lugar_atencion=$request->lugar_atencion;
        $datos->certificado=$request->certificado;
        $datos->motivo_consulta=$request->motivo_consulta;
        $datos->anamnesis=$request->anamnesis;
        $datos->receta=$request->receta;
        $datos->fecha=$request->fecha;
        $datos->save();
        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Historia_Clinica_RF  $historia_Clinica_RF
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=Historia_Clinica_RF::where('id_rf', $id)->get()->first();
        if($datos != null){
            return response()->json(['result'=>$datos]);
        }else
        return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Historia_Clinica_RF  $historia_Clinica_RF
     * @return \Illuminate\Http\Response
     */
    public function edit(Historia_Clinica_RF $historia_Clinica_RF)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Historia_Clinica_RF  $historia_Clinica_RF
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $datos=Historia_Clinica_RF::where('id_rf', $id)->get()->first();
        $datos->id_paciente=$request->id_paciente;
        $datos->id_tratamiento=$request->id_tratamiento;
        $datos->diagnostico=$request->diagnostico;
        $datos->lugar_atencion=$request->lugar_atencion;
        $datos->certificado=$request->certificado;
        $datos->fecha=$request->fecha;
        $datos->receta=$request->receta;
        $datos->update();

        return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Historia_Clinica_RF  $historia_Clinica_RF
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=Historia_Clinica_RF::where('id_rf', $id)->get()->first();
        if($datos != null){
            $datos->delete();
            return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }

     public function FiltradoFecha($fechaInicial, $fechaFinal)
    {
        if($fechaInicial > $fechaFinal){
            return response()->json(['result'=>"Error en fechas", 'code'=>'203']);
        }else if($fechaInicial == $fechaFinal){
            $datos=Historia_Clinica_RF::where('fecha',$fechaInicial)->with('paciente','tratamiento')->get();
            $num_rows = count($datos);
            if($num_rows != 0){
                return response()->json(['result'=>$datos, 'code'=>'201']);
            }else
                return response()->json(['result'=>"Datos vacios", 'code'=>'202']);
        }else{
            $datos=Historia_Clinica_RF::whereBetween('fecha', [$fechaInicial, $fechaFinal])->with('paciente','tratamiento')->get();
            $num_rows = count($datos);
            if($num_rows != 0){
                return response()->json(['result'=>$datos, 'code'=>'201']);
            }else
                return response()->json(['result'=>"Datos vacios", 'code'=>'202']);
        }

    }
    public function DatosEstadisticos($fechaInicial, $fechaFinal, $especialidad){
        $pacientes=Historia_Clinica_RF::whereBetween('fecha', [$fechaInicial, $fechaFinal])->with('paciente')->get();

        $patro=0;
        $domi=0;
        $TotalcitasPendientes=0;
        $cont = 0;
        $contH = 0;
        $contM =0;

        $citasPendientes = Cita::with('turno')->get();
        $rol = Role::all();

        foreach ($pacientes as $item){
            if($item['lugar_atencion']=='Patronato')
                $patro++;
            else
                $domi++;
        }

        foreach ($pacientes as $item){
            if($item->paciente['gad']=='1')
                $cont++;
        }

        foreach ($pacientes as $item){
            if($item->paciente['sexo']=='Hombre')
                $contH++;
        }

        foreach ($pacientes as $item){
            if($item->paciente['sexo']=='Mujer')
                $contM++;
        }
        foreach ($citasPendientes as $item){
            foreach($rol as $itemRol){
                if($item['turno']['id_rol'] == $itemRol['id_rol']){
                    $especialidadT= $itemRol['rol'];
                    if($especialidadT == $especialidad){
                        $TotalcitasPendientes++;
                    }
                }
                
            }
        }

        $TotalPacientes = count($pacientes);

        return response()->json(['totalP'=>$TotalPacientes, 'totalC'=>$TotalcitasPendientes, 'totalG'=>$cont, 'totalH'=>$contH, 'totalM'=>$contM, 'patronato'=>$patro,'domicilio'=> $domi]);

    }
}
