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
    public function ReportePacientesAnual(){

        $year="2021";
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

    public function RegistroDiarioMedicina(){
        //$datos=Historia_Clinica_MG::with('paciente','enfermedad')->get();
        return \PDF::loadView('RegistroDiarioMedicina')->setPaper('a3', 'landscape')->stream('RegistroDiarioMedicina.pdf');
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
