<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
use App\Models\Historia_Clinica_MG;
use App\Models\Historia_Clinica_RF;
use App\Models\Paciente;
use DateTime;

class PDFController extends Controller
{
    public function ReportePacientesAnual( $year){

        $datosMG=Historia_Clinica_MG::whereYear('fecha',$year)->with('paciente')->get();
        $datosRF=Historia_Clinica_RF::whereYear('fecha',$year)->with('paciente')->get();

        $MGM=[0,0,0,0,0,0,0,0,0,0,0,0,0];
        $MGH=[0,0,0,0,0,0,0,0,0,0,0,0,0];
        $RFM=[0,0,0,0,0,0,0,0,0,0,0,0,0];
        $RFH=[0,0,0,0,0,0,0,0,0,0,0,0,0];
        $STH=[0,0,0,0,0,0,0,0,0,0,0,0,0];
        $STM=[0,0,0,0,0,0,0,0,0,0,0,0,0];
        $Total=[0,0,0,0,0,0,0,0,0,0,0,0,0];
        $valores;

        foreach ($datosMG as $item) {
            $valores = explode('-', $item['fecha']);
            if(count($valores) == 3){
                for($i=0; $i<12; $i++){

                    if($valores[1]== ($i+1)){
                        if($item->paciente['sexo']="Hombre"){
                            $MGH[$i]++;
                        }else{
                            $MGM[$i]++;
                        }
                        break;
                    }
                }
            }
        }
        foreach ($datosRF as $item) {
            $valores = explode('-', $item['fecha']);
            if(count($valores) == 3){
                for($i=0; $i<12; $i++){

                    if($valores[1]== ($i+1)){
                        if($item->paciente['sexo']="Hombre"){
                            $RFH[$i]++;
                        }else{
                            $RFM[$i]++;
                        }
                        break;
                    }
                }
            }
        }

        for($i=0; $i<12; $i++){
            $STH[$i]+=$MGH[$i]+$RFH[$i];
            $STM[$i]+=$MGM[$i]+$RFM[$i];
            $Total[$i]+=$STH[$i]+$STM[$i];

            $MGH[12]+=$MGH[$i];
            $RFH[12]+=$RFH[$i];
            $MGM[12]+=$MGM[$i];
            $RFM[12]+=$RFM[$i];

            $STH[12]+=$STH[$i];
            $STM[12]+=$STM[$i];
            $Total[12]+=$Total[$i];


        }

        //return response()->json(['MGH'=>$MGH, 'RFH'=>$RFH,'MGM'=>$MGM, 'RFM'=>$RFM,'STH'=>$STH,'STM'=>$STM,'Total'=>$Total]);

        return \PDF::loadView('ReportePacientesAnual',compact('MGH','MGM','RFH','RFM','STH','STM','Total','year'))->setPaper('a4', 'landscape')->stream('ReportePacientesAnual.pdf');
    }

    public function ReportePacientesMensual($Mes, $Year){

            $mes;
            switch ($Mes) {
                case 1:
                    $mes="Enero";
                    break;
                case 2:
                    $mes="Febrero";
                    break;
                case 3:
                    $mes="Marzo";
                    break;
                case 4:
                    $mes="Abril";
                    break;
                case 5:
                    $mes="Mayo";
                    break;
                case 6:
                    $mes="Junio";
                    break;
                case 7:
                    $mes="Julio";
                    break;
                case 8:
                    $mes="Agosto";
                    break;
                case 9:
                    $mes="Septiembre";
                    break;
                case 10:
                    $mes="Octubre";
                    break;
                case 11:
                    $mes="Noviembre";
                    break;
                case 12:
                    $mes="Diciembre";
                    break;
            }
            $mes = strtoupper($mes);

        //Medicina General
        $MGcontH=0;$MGcontM=0;
        $MG=Historia_Clinica_MG::whereMonth('fecha',$Mes)->whereYear('fecha',$Year)->with('paciente')->get();
        $datosMG = count($MG);
            foreach ($MG as $item){
                if($item->paciente['sexo']=='Hombre'){
                    $MGcontH++;
                }else{
                    $MGcontM++;
                }
            }

        //Rehabilitacion Fisica
        $RFcontH=0;$RFcontM=0;
        $RF=Historia_Clinica_RF::whereMonth('fecha',$Mes)->whereYear('fecha',$Year)->with('paciente')->get();
        $datosRF = count($RF);
            foreach ($RF as $item){
                if($item->paciente['sexo']=='Hombre'){
                    $RFcontH++;
                }else{
                    $RFcontM++;
                }
            }

        $TotalH=$MGcontH+$RFcontH;
        $TotalM=$MGcontM+$RFcontM;
        $Total=$datosMG+$datosRF;




        //return response()->json(['HombresMG'=>$MGcontH, 'MujeresMG'=>$MGcontM, 'TotalMG'=>$datosMG, 'HombresRF'=>$RFcontH, 'MujeresRF'=>$RFcontM, 'TotalRF'=>$datosRF, 'TotalH'=>$TotalH, 'TotalM'=>$TotalM, 'Total'=>$Total]);

        return \PDF::loadView('ReportePacientesMensual', compact('MGcontH','MGcontM','datosMG','RFcontH','RFcontM','datosRF','TotalH','TotalM','Total', 'mes','Year'))->setPaper('a4', 'landscape')->stream('ReportePacientesMensual.pdf');

    }



    public function MorbilidadMedicinaGeneral(){

        $datos=Historia_Clinica_MG::with('paciente','enfermedad')->get();

        return \PDF::loadView('MorbilidadMedicinaGeneral', $datos)->setPaper('a4', 'landscape')->stream('MorbilidadMedicinaGeneral.pdf');

    }
    public function MorbilidadTerapia(){

        $datos=Historia_Clinica_MG::with('paciente','enfermedad')->get();

        return \PDF::loadView('MorbilidadTerapia', $datos)->setPaper('a4', 'landscape')->stream('MorbilidadTerapia.pdf');

    }

    public function RegistroDiarioMedicina($fecha){

        $datosMG=Historia_Clinica_MG::where('fecha',$fecha)->with('paciente')->get();

        $Result=[];
        $num=1;
        $valores = explode('-', $fecha);
        $dia = $valores[2];
        $mes = $valores[1];
        $anio = $valores[0];

        switch ($mes) {
            case 1:
                $mes="Enero";
                break;
            case 2:
                $mes="Febrero";
                break;
            case 3:
                $mes="Marzo";
                break;
            case 4:
                $mes="Abril";
                break;
            case 5:
                $mes="Mayo";
                break;
            case 6:
                $mes="Junio";
                break;
            case 7:
                $mes="Julio";
                break;
            case 8:
                $mes="Agosto";
                break;
            case 9:
                $mes="Septiembre";
                break;
            case 10:
                $mes="Octubre";
                break;
            case 11:
                $mes="Noviembre";
                break;
            case 12:
                $mes="Diciembre";
                break;
        }
        $mes = strtoupper($mes);

        foreach ($datosMG as $item){

            $nombres=$item->paciente['apellidos']." ".$item->paciente['nombres'];
            $lugar[0]=" ";
            $lugar[1]=" ";
            $lugar[2]=" ";

            if($item['lugar_atencion']=='Patronato'){
                $lugar[0]="X";
            }
            else if($item['lugar_atencion']=='Comunidad'){
                $lugar[1]="X";
            }
            else{
                $lugar[2]="X";
            }

            $sexo[0]=" ";
            $sexo[1]=" ";

            if($item->paciente['sexo']=='Hombre'){
                $sexo[0]="X";
            }else{
                $sexo[1]="X";
            }

            $mujer[0]=" ";
            $mujer[1]=" ";
            $mujer[2]=" ";
            $mujer[3]=" ";

            if($item->paciente['sexo']=='Hombre'){
                $mujer[0]=" ";
                $mujer[1]=" ";
                $mujer[2]=" ";
                $mujer[3]=" ";
            }else{
                if($item['tipo_atencion'] == "Primera"){
                    $mujer[2]="X";
                }else{
                    $mujer[3]="X";
                }

                $mujer[0]=" ";
                $mujer[1]=" ";
                $mujer[2]=" ";
                $mujer[3]=" ";
            }

            $ninos[0]=" ";
            $ninos[1]=" ";
            $ninos[2]=" ";
            $ninos[3]=" ";
            $ninos[4]=" ";

            if($item->paciente['edad'] < 1){
                if($item['tipo_atencion'] == "Primera"){
                    $ninos[0]="X";
                }else{
                    $ninos[1]="X";
                }
            }else if($item->paciente['edad'] >= 1 && $item->paciente['edad'] <= 4){
                if($item['tipo_atencion'] == "Primera"){
                    $ninos[2]="X";
                }else{
                    $ninos[3]="X";
                }
            }else if($item->paciente['edad'] >= 5 && $item->paciente['edad'] <= 9){
                $ninos[4]="X";
            }

            $edadesm[0]=" ";
            $edadesm[1]=" ";
            $edadesm[2]=" ";

            if($item->paciente['edad'] >= 10 && $item->paciente['edad'] <= 14){
                $edadesm[0]="X";
            }else if($item->paciente['edad'] >= 15 && $item->paciente['edad'] <= 19){
                $edadesm[1]="X";
            }else{
                $edadesm[2]="X";
            }

            $morbilidad[0]="";
            $morbilidad[1]="";
            $morbilidad[2]="";
            $morbilidad[3]="";
            $morbilidad[4]="";
            $morbilidad[5]="";
            $morbilidad[6]="";
            $morbilidad[7]="";
            $morbilidad[8]="";
            $morbilidad[9]="";

            if($item->paciente['edad'] < 0.1){
                $morbilidad[0]="X";
            }else if($item->paciente['edad'] >= 0.1 && $item->paciente['edad'] <= 0.11){
                $morbilidad[1]="X";
            }else if($item->paciente['edad'] >= 1 && $item->paciente['edad'] <= 4){
                $morbilidad[2]="X";
            }else if($item->paciente['edad'] >= 5 && $item->paciente['edad'] <= 9){
                $morbilidad[3]="X";
            }else if($item->paciente['edad'] >= 10 && $item->paciente['edad'] <= 14){
                $morbilidad[4]="X";
            }else if($item->paciente['edad'] >= 15 && $item->paciente['edad'] <= 19){
                $morbilidad[5]="X";
            }else if($item->paciente['edad'] >= 20 && $item->paciente['edad'] <= 35){
                $morbilidad[6]="X";
            }else if($item->paciente['edad'] >= 36 && $item->paciente['edad'] <= 49){
                $morbilidad[7]="X";
            }else if($item->paciente['edad'] >= 50 && $item->paciente['edad'] <= 64){
                $morbilidad[8]="X";
            }else{
                $morbilidad[9]="X";
            }

            $diagnostico=$item['diagnostico'];

            $tipo[0]=" ";
            $tipo[1]=" ";
            $tipo[2]=" ";

            if($item['tipo_atencion'] == "Prevención"){
                $tipo[0]="X";
            }else if($item['tipo_atencion'] == "Primera"){
                $tipo[1]="X";
            }else{
                $tipo[2]="X";
            }

            $diagno[0]=" ";
            $diagno[1]=" ";

            if($item['condicion_diagnostico'] == "Presuntivo"){
                $diagno[0]="X";
            }else{
                $diagno[1]="X";
            }

            $certificado=" ";

            if($item['certificado'] == 1){
                $certificado="X";
            }

            $Result[]=[$num,$nombres,$lugar[0],$lugar[1],$lugar[2],'1',$sexo[0],$sexo[1],$mujer[0],$mujer[1],$mujer[2],$mujer[3],$ninos[0],$ninos[1],$ninos[2],$ninos[3],$ninos[4],
            $edadesm[0],$edadesm[1],$edadesm[2],$morbilidad[0],$morbilidad[1],$morbilidad[2],$morbilidad[3],$morbilidad[4],$morbilidad[5],$morbilidad[6],$morbilidad[7],
            $morbilidad[8],$morbilidad[9],$diagnostico,$tipo[0],$tipo[1],$tipo[2],$diagno[0],$diagno[1],$certificado];

            $num++;
        }

        // return response()->json(['result'=>$Result]);
        return \PDF::loadView('RegistroDiarioMedicina', compact('Result','dia','mes','anio'))->setPaper('a3', 'landscape')->stream('RegistroDiarioMedicina.pdf');
    }

    public function RegistroDiarioFisica(){
        //$datos=Historia_Clinica_MG::with('paciente','enfermedad')->get();
        return \PDF::loadView('RegistroDiarioFisica')->setPaper('a3', 'landscape')->stream('RegistroDiarioMedicina.pdf');
    }

    public function ConsolidadoMensualMedicinaGeneral(){
        //$datos=Historia_Clinica_MG::with('paciente','enfermedad')->get();
        return \PDF::loadView('ConsolidadoMensualMedicinaGeneral')->setPaper('a3', 'landscape')->stream('ConsolidadoMensualMedicinaGeneral.pdf');
    }

    public function ConsolidadoMensualTerapia(){
        $datos=Historia_Clinica_MG::with('paciente','enfermedad')->get();
        return \PDF::loadView('ConsolidadoMensualTerapia')->setPaper('a4', 'landscape')->stream('ConsolidadoMensualTerapia.pdf');
    }
}
