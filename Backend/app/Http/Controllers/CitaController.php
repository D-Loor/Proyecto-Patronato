<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use Illuminate\Http\Request;
use App\Models\Paciente;
use App\Models\Turno;
use App\Models\Role;

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

        $datos=Cita::where('fecha',$fechaActual)->with('turno')->get();
        $roles=Role::where('rol', $especialidad)->first();
        $idrol=$roles['id_rol'];
        //$posicion=0;
        $data=[];
        

        $cont=count($datos);
        if( $cont > 0){
            foreach ($datos as $tur)
            {
                if($tur['turno']['id_rol']==$idrol){
                      array_push ( $data , $tur );
                }
            }
            $contD=count($data);
            if($contD > 0){
                foreach ($data as $key => $row) {
                $aux[$key] = $row['turno']['hora'];
                }

                array_multisort($aux, SORT_ASC, $data);
            }
            
            return response()->json(['result'=>$data, 'code'=>'201']);
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
        $edad = 0;
        $datos=new Cita();
        $datos->nombres=$request->nombres;
        $datos->cedula=$request->cedula;
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

            //Fecha Actual
            $hoy = $request->fecha_actual;
            $valoresH = explode('-', $hoy);
            $ahora_dia = $valoresH[2];
            $ahora_mes = $valoresH[1];
            $ahora_ano = $valoresH[0];

            //Fecha de nacimiento
            $cumpleanos = $datosP->fecha_nacimiento;
            $valoresC = explode('-', $cumpleanos);
            $ano = $valoresC[0];
            $mes = $valoresC[1];
            $dia = $valoresC[2];

            //Calcular edad en años
            $edad = ($ahora_ano + 1900) - $ano;
                 if ( $ahora_mes < $mes )
                 {
                     $edad--;
                 }
                 if (($mes == $ahora_mes) && ($ahora_dia < $dia))
                 {
                     $edad--;
                 }
                 if ($edad > 1900)
                 {
                     $edad -= 1900;
                 }
                 if($edad ==1899 || $edad ==1898 || $edad ==1900 ){
                   $edad = 0;
                 }

            //Calculamos la edad en meses
            $meses = 0;
                 if ($ahora_mes > $mes && $dia > $ahora_dia)
                     $meses = $ahora_mes - $mes - 1;
                 else if ($ahora_mes > $mes)
                     $meses = $ahora_mes - $mes;
                 if ($ahora_mes < $mes && $dia < $ahora_dia)
                     $meses = 12 - ($mes - $ahora_mes);
                 else if ($ahora_mes < $mes)
                     $meses = 12 - ($mes - $ahora_mes + 1);
                 if ($ahora_mes == $mes && $dia > $ahora_dia)
                     $meses = 11;

            // calculamos los dias
            $dias=0;
                 if($ahora_dia>$dia)
                     $dias=$ahora_dia-$dia;
                 if($ahora_dia<$dia)
                 {
                    $ultimodia = date("Y-m-t", strtotime($hoy));
                    $valoresUl = explode('-', $ultimodia);
                    $ultimoDiaMes= $valoresUl[2];;
                    $dias=$ultimoDiaMes-($dia-$ahora_dia);
                 }

            if($edad == 0 && $meses == 0){
                $edad = "0.0".$dias;
                $datosP->edad = $edad;
                $datosP->update();
            }
            if($edad !=0 ){
                $edad = $edad;
                $datosP->edad = $edad;
                $datosP->update();
            }
            if($edad == 0 && $meses != 0){
                $edad = "0.".$meses;
                $datosP->edad = $edad;
                $datosP->update();
            }

             

        }else{
            $datos->estado=0;
        }
        $datos->save();
        return response()->json(['result'=>"Datos guardados", 'code'=>'201', 'valor'=>$edad]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cita  $cita
     * @return \Illuminate\Http\Response
     */
    public function show( $id_cita)
    {
        $datos=Cita::where('id_cita', $id_cita)->with('turno','rroles')->get()->first();
        if($datos != null){
            return response()->json(['result'=>$datos, 'code'=>'201']);
        }else
        return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }

    public function validarHora($fecha, $tipo)
    {

        $datos=Cita::with('turno')->where('fecha', $fecha)->get();
        $turno=Turno::orderBy('hora')->with('rroles')->get();
        $roles=Role::where('rol', $tipo)->first();
        $posicion=0;
        $idrol=$roles['id_rol'];

        foreach ($turno as $tur)
        {

            $pase = 0;
            if($tipo=="Rehabilitación Física"){

                if($tur['id_rol'] != $idrol){
                    unset($turno[$posicion]);
                }else{
                    foreach ($datos as $cita)
                    {
                        if($tur['id_turno'] == $cita['id_turno']){
                            $pase++;
                        }
                        if($pase == 3){
                            unset($turno[$posicion]);
                            
                            break;
                        }
                    }
                }

            }else{
                if($tur['id_rol'] != $idrol){
                    unset($turno[$posicion]);
                }else{
                    foreach ($datos as $cita)
                    {
                        if($tur['id_turno'] == $cita['id_turno']){
                            unset($turno[$posicion]);
                            break;
                        }
                    }
                }
            }

            $posicion++;
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
        $datos=Cita::find($request->id_cita);
        if($datos != null){
            if($request->abono=="DOADBA"){
                $datos->abono=true;
            }else{
                $datos->abono=false;
            }
            $datos->id_cita = $datos->id_cita;
            $datos->nombres = $request->nombres;
            $datos->cedula = $request->cedula;
            $datos->fecha = $request->fecha;
            $datos->id_turno = $request->id_turno;
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

    public function ActualizarEstado($cedula){
        $datos=Cita::where('cedula', $cedula)->get();
        if($datos != null){
            foreach($datos as $item){
                $item->id_cita = $item->id_cita;
                $item->nombres = $item->nombres;
                $item->cedula = $item->cedula;
                $item->fecha = $item->fecha;
                $item->id_turno = $item->id_turno;
                $item->abono=$item->abono;
                $item->estado=1;
                $item->update();
            }
            return response()->json(['result'=>"Cita Actualizada",'code'=>'201']);
        }else
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
    }

}
