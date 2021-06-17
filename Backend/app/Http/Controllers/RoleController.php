<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Cuenta;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datos=Role::all();
        $num_rows = count($datos);
        if($num_rows!=0){
           return response()->json(['result'=>$datos]);
       }else
           return response()->json(['mensaje'=>"No existen datos registrados", 'code'=>'202']);
    }

    public function mostrar(){
        $datos=Role::where('rol','!=','Administrador')->where('rol','!=','Secretaría')->where('estado',1)->get();
        $num_rows = count($datos);
        if($num_rows!=0){
           return response()->json(['result'=>$datos, 'code'=>'201']);
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
        $datos=new Role();
        $datos->rol=$request->rol;
        $datos->estado=$request->estado;
        $datos->save();
        $idRecienGuardado = $datos->id_rol;
        return response()->json(['result'=>"Datos guardados", 'code'=>'201', 'id'=>$idRecienGuardado]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=Role::where('id_rol', $id)->get()->first();
        if($datos != null){
            return response()->json(['result'=>$datos]);
        }else
            return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $datos=Role::where('id_rol', $id)->get()->first();
        if($datos != null){
            $datos->rol=$request->rol;
            $datos->estado=$request->estado;
            $datos->update();
            return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
        }else
            return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role  $role
     * @param  \App\Models\Cuenta  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $datos=Role::where('id_rol', $id)->get()->first();
        $datosCuenta=Cuenta::where('id_rol', $id)->get()->first();
        if($datosCuenta != null ){
            return response()->json(['result'=>"Rol Relacionado", 'code'=>'203']);
        }else{
            if($datos != null){
                $datos->delete();
                return response()->json(['result'=>"Dato Eliminado", 'code'=>'201']);
            }else{
                return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
            }
        }

    }

    public function idRol($especialidad){
        $datos=Role::where('rol', $especialidad)->get()->first();
        return response()->json(['result'=>$datos, 'code'=>'201']);
    }
}
