<?php

namespace App\Http\Controllers;

use App\Models\Cuenta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class CuentaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$datos=Cuenta::with('role')->paginate(5);
        $datos=Cuenta::with('role')->get();
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
        /*$file = $request->file('imagen');
        $filename = $file->getClientOriginalName();
        $filename = pathinfo($filename, PATHINFO_FILENAME);
        $name_File = str_replace(" ", "_", $filename);
        $extension = $file->getClientOriginalExtension();
        $picture = date('His').'-'.$name_File.'.'.$extension;
        $file->move(public_path('/imagenes'),$picture);
        $picture = '/imagenes/'.$picture;*/

        $file=$request->file('imagen');
        $nombre=$file->getClientMimeType();
        $tipoImagen=str_replace('image/', '.',$nombre);
        $fileName=uniqid() . $tipoImagen;
        $path=public_path().'/imagenes';
        $file->move($path,$fileName);
        $picture = '/imagenes/'.$fileName;

        $datos=new Cuenta();
        $datos->id_rol=$request->id_rol;
        $datos->nombres=$request->nombres;
        $datos->correo=$request->correo;
        $datos->password=$request->password;
        $datos->imagen=$picture;
        $datos->save();
        return response()->json(['result'=>"Datos guardados", 'code'=>'201']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cuenta  $cuenta
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datos=Cuenta::with('role')->where('id_cuenta', $id)->get()->first();
        if($datos != null){
            return response()->json(['result'=>$datos]);
        }else
        return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cuenta  $cuenta
     * @return \Illuminate\Http\Response
     */
    public function edit(Cuenta $cuenta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cuenta  $cuenta
     * @return \Illuminate\Http\Response
     */
    public function update($id_cuenta)
    {
        $datos=Cuenta::find($id_cuenta);

        if($datos != null){
            $datos->id_rol= request('id_rol');
            $datos->nombres= request('nombres');
            $datos->correo= request('correo');
            $datos->password= request('password');
            $datos->imagen=1;
            $datos->update();
            return response()->json(['mensaje'=>'Datos Actualizados', 'code'=>'201']);
        }else{
            return response()->json(['mensaje'=>'Dato no encontrado', 'code'=>'202']);
        }

    }

    public function actualizar(Request $request)
    {
        $datos=Cuenta::where('id_cuenta', $request->id_cuenta)->get()->first();

        if($datos != null){
        $archivo=substr($datos->imagen,1);
        File::delete($archivo);
        
        /*$file = $request->file('imagen');
        $filename = $file->getClientOriginalName();
        $filename = pathinfo($filename, PATHINFO_FILENAME);
        $name_File = str_replace(" ", "_", $filename);
        $extension = $file->getClientOriginalExtension();
        $picture = date('His').'-'.$name_File.'.'.$extension;
        $file->move(public_path('/imagenes'),$picture);
        $picture = '/imagenes/'.$picture;*/
        
        $file=$request->file('imagen');
        $nombre=$file->getClientMimeType();
        $tipoImagen=str_replace('image/', '.',$nombre);
        $fileName=uniqid() . $tipoImagen;
        $path=public_path().'/imagenes';
        $file->move($path,$fileName);
        $picture = '/imagenes/'.$fileName;

        $datos->id_rol=$request->id_rol;
        $datos->nombres=$request->nombres;
        $datos->correo=$request->correo;
        $datos->password=$request->password;
        $datos->imagen=$picture;
            $datos->update();
            return response()->json(['mensaje'=>"Dato Actualizado.", 'code'=>'201']);
        }else{
            return response()->json(['mensaje'=>"Registro no encontrado", 'code'=>'202']);
        }
            

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cuenta  $cuenta
     * @return \Illuminate\Http\Response
     */
    public function eliminar($id)
    {
        $datos=Cuenta::where('id_cuenta', $id)->get()->first();
        if($datos != null){
            $archivo=substr($datos->imagen,1);
            File::delete($archivo);
            $datos->delete();
            return response()->json(['result'=>'Registro Eliminado', 'code'=>'201']);
        }else{
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }
        
    }

    public function validar ($correo, $pass){

        $datos=Cuenta::where('correo', $correo)->where('password', $pass)->with('role')->get();

        $num_rows = count($datos);
        if($num_rows != 0){

            if($datos[0]['role']['estado'] == 1){
                return response()->json(['result'=>$datos]);
            }else{
                return response()->json(['mensaje'=>"Usuario desabilitado", 'code'=>'203']);
            }

        }else
           return response()->json(['mensaje'=>"Usuario no encontrado", 'code'=>'202']);
    }

}
