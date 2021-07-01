<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
use App\Models\Historia_Clinica_MG;
use App\Models\Historia_Clinica_RF;
use App\Models\Paciente;
use App\Models\Recaudacion;
use App\Models\Egreso;
use DateTime;

class PDFController extends Controller
{
    public function ValidarReportePacientesAnual( $year){
        $datosMG=Historia_Clinica_MG::whereYear('fecha',$year)->with('paciente')->get();
        $datosRF=Historia_Clinica_RF::whereYear('fecha',$year)->with('paciente')->get();

        $ndatos=count($datosMG)+count($datosRF);
        if($ndatos > 0){
            return response()->json(['result'=>"Registro encontrado", 'code'=>'201']);
        }else{
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }
    }
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

            return \PDF::loadView('ReportePacientesAnual',compact('MGH','MGM','RFH','RFM','STH','STM','Total','year'))->setPaper('a4', 'landscape')->stream('ReportePacientesAnual-'.$year.'.pdf');


    }

    public function ValidarReportePacientesMensual($Mes, $Year){

        $datosMG=Historia_Clinica_MG::whereMonth('fecha',$Mes)->whereYear('fecha',$Year)->with('paciente')->get();
        $datosRF=Historia_Clinica_RF::whereMonth('fecha',$Mes)->whereYear('fecha',$Year)->with('paciente')->get();

        $ndatos=count( $datosMG)+count( $datosRF);
        if($ndatos > 0){
            return response()->json(['result'=>"Registro encontrado", 'code'=>'201']);
        }else{
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }
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

        return \PDF::loadView('ReportePacientesMensual', compact('MGcontH','MGcontM','datosMG','RFcontH','RFcontM','datosRF','TotalH','TotalM','Total', 'mes','Year'))->setPaper('a4', 'landscape')->stream('ReportePacientesMensual-'.$Mes.'-'.$Year.'.pdf');

    }

    public function ValidarMorbilidadMedicinaGeneral($Mes, $Year){

        $MMG=Historia_Clinica_MG::whereMonth('fecha',$Mes)->whereYear('fecha',$Year)->with('enfermedad','paciente')->select('id_enfermedad')
            ->groupBy('id_enfermedad')
            ->orderByRaw('COUNT(*) DESC')
            ->take(20)
            ->get();

        $ndatos=count($MMG);
        if($ndatos > 0){
            return response()->json(['result'=>"Registro encontrado", 'code'=>'201']);
        }else{
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }
    }

    public function MorbilidadMedicinaGeneral($Mes,$Year){

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
            };

            $mes = strtoupper($mes);
            $MMG=Historia_Clinica_MG::whereMonth('fecha',$Mes)->whereYear('fecha',$Year)->with('enfermedad','paciente')->select('id_enfermedad')
            ->groupBy('id_enfermedad')
            ->orderByRaw('COUNT(*) DESC')
            ->take(20)
            ->get();

            $Result=[];
            $aggTotales=[];
            $porcentajes=[];
            $ContgruposEdadCont=[];
            $n=1;
            $cont=0;
                $total[0]=0;
                $total[1]=0;
                $total[2]=0;
                $total[3]=0;
                $total[4]=0;
                $total[5]=0;
                $total[6]=0;
                $total[7]=0;
                $total[8]=0;
                $total[9]=0;
                $total[10]=0;
                $total[11]=0;
                $total[12]=0;
                $total[13]=0;
                $total[14]=0;
                $total[15]=0;
                $total[16]=0;
            foreach ($MMG as $item){
                $Paciente=Historia_Clinica_MG::where('id_enfermedad',$item->id_enfermedad)->with('paciente')->select('id_paciente')->get();
                $top20=$item->enfermedad['enfermedad'];
                $ContgruposEdad[0]=0;
                $ContgruposEdad[1]=0;
                $ContgruposEdad[2]=0;
                $ContgruposEdad[3]=0;
                $ContgruposEdad[4]=0;
                $ContgruposEdad[5]=0;
                $ContgruposEdad[6]=0;
                $ContgruposEdad[7]=0;
                $ContgruposEdad[8]=0;
                $ContgruposEdad[9]=0;
                $ContgruposEdad[10]=0;
                $ContgruposEdad[11]=0;
                $ContgruposEdad[12]=0;
                $ContgruposEdad[13]=0;
                $ContgruposEdad[14]=0;
                $ContgruposEdad[15]=0;
                $ContgruposEdad[16]=0;
                $ContgruposEdad[17]=0;

                foreach($Paciente as $item2){
                    if($item2->paciente['edad']<='0.028'){
                        if ($item2->paciente['sexo']=='Hombre'){
                            $ContgruposEdad[0]++;
                        }else{
                            $ContgruposEdad[1]++;
                        }
                    }else if($item2->paciente['edad']>='0.029' && $item2->paciente['edad'] < '1'){
                        if ($item2->paciente['sexo']=='Hombre'){
                            $ContgruposEdad[2]++;
                        }else{
                            $ContgruposEdad[3]++;
                        }
                    }else if($item2->paciente['edad']>='1' && $item2->paciente['edad'] <= '4'){
                        if ($item2->paciente['sexo']=='Hombre'){
                            $ContgruposEdad[4]++;
                        }else{
                            $ContgruposEdad[5]++;
                        }
                    }else if($item2->paciente['edad']>='5' && $item2->paciente['edad'] <= '14'){
                        if ($item2->paciente['sexo']=='Hombre'){
                            $ContgruposEdad[6]++;
                        }else{
                            $ContgruposEdad[7]++;
                        }
                    }else if($item2->paciente['edad']>='15' && $item2->paciente['edad'] <= '49'){
                        if ($item2->paciente['sexo']=='Hombre'){
                            $ContgruposEdad[8]++;
                        }else{
                            $ContgruposEdad[9]++;
                        }
                    }else if($item2->paciente['edad']>='50' && $item2->paciente['edad'] <= '64'){
                        if ($item2->paciente['sexo']=='Hombre'){
                            $ContgruposEdad[10]++;
                        }else{
                            $ContgruposEdad[11]++;
                        }
                    }else if($item2->paciente['edad']>='65'){
                        if ($item2->paciente['sexo']=='Hombre'){
                            $ContgruposEdad[12]++;
                        }else{
                            $ContgruposEdad[13]++;
                        }
                    }
                    $ContgruposEdad[14]=$ContgruposEdad[0]+$ContgruposEdad[2]+$ContgruposEdad[4]+$ContgruposEdad[6]+$ContgruposEdad[8]+$ContgruposEdad[10]+$ContgruposEdad[12];
                    $ContgruposEdad[15]=$ContgruposEdad[1]+$ContgruposEdad[3]+$ContgruposEdad[5]+$ContgruposEdad[7]+$ContgruposEdad[9]+$ContgruposEdad[11]+$ContgruposEdad[13];
                    $ContgruposEdad[16]=$ContgruposEdad[14]+$ContgruposEdad[15];
                }

                for($i=0;$i<=16;$i++){
                    $total[$i]=$total[$i]+$ContgruposEdad[$i];
                }

                $ContgruposEdadCont[$cont]=$ContgruposEdad[16];
                

                for($i=0; $i<=15; $i++){
                    if($ContgruposEdad[$i]==0){ 
                        $ContgruposEdad[$i]="";
                    }
                }

                $Result[]=[$n,$top20,$ContgruposEdad];
                $cont++;
                $n++;
            }

            for($i=0; $i<=$cont-1; $i++){
                $porcentajes[$i]=$ContgruposEdadCont[$i]/$total[16];
                $redondear= round($porcentajes[$i]*100, 2); 
                $porcentajes[$i]=$redondear;
            }

            

            //return response()->json(['result'=>$Result]);
        return \PDF::loadView('MorbilidadMedicinaGeneral', compact('Result','mes','Year','total','porcentajes'))->setPaper('a3', 'landscape')->stream('MorbilidadMedicinaGeneral-'.$Mes.'-'.$Year.'.pdf');

    }


    public function ValidarMorbilidadTerapia($Mes, $Year){

        $datosCausas = Historia_Clinica_RF::whereMonth('fecha', $Mes)->whereYear('fecha', $Year)->select('motivo_consulta')
            ->groupBy('motivo_consulta')
            ->orderByRaw('COUNT(*) DESC')
            ->take(20)
            ->get();

        $ndatos=count( $datosCausas);
        if($ndatos > 0){
            return response()->json(['result'=>"Registro encontrado", 'code'=>'201']);
        }else{
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }
    }

    public function MorbilidadTerapia($Mes, $Year)
    {
        $Resultados=[];
        $mes;
        $cont=1;

        switch ($Mes) {
            case 1:
                $mes = "Enero";
                break;
            case 2:
                $mes = "Febrero";
                break;
            case 3:
                $mes = "Marzo";
                break;
            case 4:
                $mes = "Abril";
                break;
            case 5:
                $mes = "Mayo";
                break;
            case 6:
                $mes = "Junio";
                break;
            case 7:
                $mes = "Julio";
                break;
            case 8:
                $mes = "Agosto";
                break;
            case 9:
                $mes = "Septiembre";
                break;
            case 10:
                $mes = "Octubre";
                break;
            case 11:
                $mes = "Noviembre";
                break;
            case 12:
                $mes = "Diciembre";
                break;
        }
        $mes = strtoupper($mes);
        $datosCausas = Historia_Clinica_RF::whereMonth('fecha', $Mes)->whereYear('fecha', $Year)->select('motivo_consulta')
            ->groupBy('motivo_consulta')
            ->orderByRaw('COUNT(*) DESC')
            ->take(20)
            ->get();

        $datos = Historia_Clinica_RF::whereMonth('fecha', $Mes)->whereYear('fecha', $Year)->with('paciente')->get();
        $aggTotales=[];
        $porcentajes=[];
        $ContgruposEdadCont=[];
        $n=0;
        $TotalF[0]=0;
        $TotalF[1]=0;
        $TotalF[2]=0;
        $TotalF[3]=0;
        $TotalF[4]=0;
        $TotalF[5]=0;
        $TotalF[6]=0;
        $TotalF[7]=0;
        $TotalF[8]=0;
        $TotalF[9]=0;
        $TotalF[10]=0;
        $TotalF[11]=0;
        $TotalF[12]=0;
        foreach($datosCausas as $itemC)
        {
            $Edad[0] = 0;
            $Edad[1] = 0;
            $Edad[2] = 0;
            $Edad[3] = 0;
            $Edad[4] = 0;
            $Edad[5] = 0;
            $Edad[6] = 0;
            $Edad[7] = 0;
            $Edad[8] = 0;
            $Edad[9] = 0;
            $Edad[10] = 0;
            $Edad[11] = 0;
            $Edad[12] = 0;
            foreach($datos as $item)
            {
                if($item['motivo_consulta'] === $itemC['motivo_consulta'])
                {
                    $Edad[12] +=1;
                    if($item->paciente['edad']>'0' && $item->paciente['edad']<='3')
                    {
                        if($item->paciente['sexo']=='Hombre')
                        {
                            $Edad[0] += 1;
                        }else{
                            $Edad[1] += 1;
                        }
                    }
                    if($item->paciente['edad']>='4' && $item->paciente['edad']<='12')
                    {
                        if($item->paciente['sexo']=='Hombre')
                        {
                            $Edad[2] += 1;
                        }else{
                            $Edad[3] += 1;
                        }
                    }
                    if($item->paciente['edad']>='13' && $item->paciente['edad']<='19')
                    {
                        if($item->paciente['sexo']=='Hombre')
                        {
                            $Edad[4] += 1;
                        }else{
                            $Edad[5] += 1;
                        }
                    }
                    if($item->paciente['edad']>='20' && $item->paciente['edad']<='49')
                    {
                        if($item->paciente['sexo']=='Hombre')
                        {
                            $Edad[6] += 1;
                        }else{
                            $Edad[7] += 1;
                        }
                    }
                    if($item->paciente['edad']>='50')
                    {
                        if($item->paciente['sexo']=='Hombre')
                        {
                            $Edad[8] += 1;
                        }else{
                            $Edad[9] += 1;
                        }
                    }

                    if($item->paciente['sexo']=='Hombre')
                    {
                        $Edad[10] += 1;
                    }
                    if($item->paciente['sexo']=='Mujer')
                    {
                        $Edad[11] += 1;
                    }


                }

            }

        for($i=0;$i<=12;$i++){
            $TotalF[$i]=$TotalF[$i]+$Edad[$i];
        }

        $ContgruposEdadCont[$n]=$Edad[12];

                $Resultados [] = [$cont, $itemC['motivo_consulta'], $Edad[0], $Edad[1], $Edad[2], $Edad[3],$Edad[4], $Edad[5], $Edad[6],
                                  $Edad[7], $Edad[8], $Edad[9], $Edad[10], $Edad[11], $Edad[12]
                             ];
            $n++;
            $cont ++;
        }

        for($i=0; $i<=$n-1; $i++){
            $porcentajes[$i]=$ContgruposEdadCont[$i]/$TotalF[12];
            $redondear= round($porcentajes[$i]*100, 2); 
            $porcentajes[$i]=$redondear;
        }

        //return response()->json(['result'=>$TotalF]);
        return \PDF::loadView('MorbilidadTerapia', compact('Resultados', 'mes', 'Year','TotalF','porcentajes'))->setPaper('a3', 'landscape')->stream('MorbilidadTerapia-'.$Mes.'-'.$Year.'.pdf');
    }

    public function ValidarRegistroDiarioMedicina($fecha){

        $datosMG=Historia_Clinica_MG::where('fecha',$fecha)->with('paciente')->get();


        $ndatos=count( $datosMG);
        if($ndatos > 0){
            return response()->json(['result'=>"Registro encontrado", 'code'=>'201']);
        }else{
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }
    }

    public function RegistroDiarioMedicina($fecha){

        $datosMG=Historia_Clinica_MG::where('fecha',$fecha)->with('paciente','enfermedad')->get();

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
        $contador = 0;
        $TOTAL=[];
        $totalAtenciones=1;
        for ($i=0; $i<34; $i++){
            $TOTAL[$i]=0;
        };
        foreach ($datosMG as $item){

            $nombres=$item->paciente['apellidos']." ".$item->paciente['nombres'];
            $lugar[0]=" ";
            $lugar[1]=" ";
            $lugar[2]=" ";

            if($item['lugar_atencion']=='Patronato'){
                $lugar[0]="X";
                $TOTAL[0]=$TOTAL[0]+1;
            }
            else if($item['lugar_atencion']=='Comunidad'){
                $lugar[1]="X";
                $TOTAL[1]=$TOTAL[1]+1;
            }
            else{
                $lugar[2]="X";
                $TOTAL[2]=$TOTAL[2]+1;
            }
            $TOTAL[3]=$totalAtenciones;
            $sexo[0]=" ";
            $sexo[1]=" ";

            if($item->paciente['sexo']=='Hombre'){
                $sexo[0]="X";
                $TOTAL[4]=$TOTAL[4]+1;
            }else{
                $sexo[1]="X";
                $TOTAL[5]=$TOTAL[5]+1;
            }

            $mujer[0]=" ";
            $mujer[1]=" ";
            $mujer[2]=" ";
            $mujer[3]=" ";

            if($item->paciente['sexo'] == 'Mujer'){
                if($item->enfermedad['enfermedad']== 'Control de Embarazo'){
                    
                    if($item['tipo_atencion'] == "Primera"){
                        $mujer[0]="X";
                        $TOTAL[6]=$TOTAL[6]+1;
                    }else{
                        $mujer[1]="X";
                        $TOTAL[7]=$TOTAL[7]+1;
                    }

                   
                }
                else if($item->enfermedad['enfermedad']== 'Planificación Familiar'){

                    if($item['tipo_atencion'] == "Primera"){
                        $mujer[2]="X";
                        $TOTAL[8]=$TOTAL[8]+1;
                    }else{
                        $mujer[3]="X";
                        $TOTAL[9]=$TOTAL[9]+1;
                    }
                }

               
            }

            $ninos[0]=" ";
            $ninos[1]=" ";
            $ninos[2]=" ";
            $ninos[3]=" ";
            $ninos[4]=" ";
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
                $edadesm[0]=" ";
                $edadesm[1]=" ";
                $edadesm[2]=" ";

            if($item['tipo_atencion']=='Prevención'){
                if($item->paciente['edad'] < '1'){
                    if($item['tipo_atencion'] == "Primera"){
                        $ninos[0]="X";
                        $TOTAL[10]=$TOTAL[10]+1;
                    }else{
                        $ninos[1]="X";
                        $TOTAL[11]=$TOTAL[11]+1;
                    }
                }else if($item->paciente['edad'] >= '1' && $item->paciente['edad'] <= '4'){
                    if($item['tipo_atencion'] == "Primera"){
                        $ninos[2]="X";
                        $TOTAL[12]=$TOTAL[12]+1;
                    }else{
                        $ninos[3]="X";
                        $TOTAL[13]=$TOTAL[13]+1;
                    }
                }else if($item->paciente['edad'] >= '5' && $item->paciente['edad'] <= '9'){
                    $ninos[4]="X";
                    $TOTAL[14]=$TOTAL[14]+1;
                }
    
                
    
                if($item->paciente['edad'] >= '10' && $item->paciente['edad'] <= '14'){
                    $edadesm[0]="X";
                    $TOTAL[15]=$TOTAL[15]+1;
                }else if($item->paciente['edad'] >= '15' && $item->paciente['edad'] <= '19'){
                    $edadesm[1]="X";
                    $TOTAL[16]=$TOTAL[16]+1;
                }else if($item->paciente['edad'] >= '20'){
                    $edadesm[2]="X";
                    $TOTAL[17]=$TOTAL[17]+1;
                }
            }else{
            if($item->paciente['edad'] < '0.1'){
                $morbilidad[0]="X";
                $TOTAL[18]=$TOTAL[18]+1;
            }else if($item->paciente['edad'] >= '0.1' && $item->paciente['edad'] <= '0.11'){
                $morbilidad[1]="X";
                $TOTAL[19]=$TOTAL[19]+1;
            }else if($item->paciente['edad'] >= '1' && $item->paciente['edad'] <= '4'){
                $morbilidad[2]="X";
                $TOTAL[20]=$TOTAL[20]+1;
            }else if($item->paciente['edad'] >= '5' && $item->paciente['edad'] <= '9'){
                $morbilidad[3]="X";
                $TOTAL[21]=$TOTAL[21]+1;
            }else if($item->paciente['edad'] >= '10' && $item->paciente['edad'] <= '14'){
                $morbilidad[4]="X";
                $TOTAL[22]=$TOTAL[22]+1;
            }else if($item->paciente['edad'] >= '15' && $item->paciente['edad'] <= '19'){
                $morbilidad[5]="X";
                $TOTAL[23]=$TOTAL[23]+1;
            }else if($item->paciente['edad'] >= '20' && $item->paciente['edad'] <= '35'){
                $morbilidad[6]="X";
                $TOTAL[24]=$TOTAL[25]+1;
            }else if($item->paciente['edad'] >= '36' && $item->paciente['edad'] <= '49'){
                $morbilidad[7]="X";
                $TOTAL[25]=$TOTAL[25]+1;
            }else if($item->paciente['edad'] >= '50' && $item->paciente['edad'] <= '64'){
                $morbilidad[8]="X";
                $TOTAL[26]=$TOTAL[26]+1;
            }else if($item->paciente['edad'] >= '65'){
                $morbilidad[9]="X";
                $TOTAL[27]=$TOTAL[27]+1;
            }
            }

            

            

            $diagnostico=$item['diagnostico'];

            $tipo[0]=" ";
            $tipo[1]=" ";
            $tipo[2]=" ";

            if($item['tipo_atencion'] == "Prevención"){
                $tipo[0]="X";
                $TOTAL[28]=$TOTAL[28]+1;
            }else if($item['tipo_atencion'] == "Primera"){
                $tipo[1]="X";
                $TOTAL[29]=$TOTAL[29]+1;
            }else{
                $tipo[2]="X";
                $TOTAL[30]=$TOTAL[30]+1;
            }

            $diagno[0]=" ";
            $diagno[1]=" ";

            if($item['condicion_diagnostico'] == "Presuntivo"){
                $diagno[0]="X";
                $TOTAL[31]=$TOTAL[31]+1;
            }else{
                $diagno[1]="X";
                $TOTAL[32]=$TOTAL[32]+1;
            }

            $certificado=" ";

            if($item['certificado'] == 1){
                $certificado="X";
                $TOTAL[33]=$TOTAL[33]+1;
            }

            $Result[]=[$num,$nombres,$lugar[0],$lugar[1],$lugar[2],'1',$sexo[0],$sexo[1],$mujer[0],$mujer[1],$mujer[2],$mujer[3],$ninos[0],$ninos[1],$ninos[2],$ninos[3],$ninos[4],
            $edadesm[0],$edadesm[1],$edadesm[2],$morbilidad[0],$morbilidad[1],$morbilidad[2],$morbilidad[3],$morbilidad[4],$morbilidad[5],$morbilidad[6],$morbilidad[7],
            $morbilidad[8],$morbilidad[9],$diagnostico,$tipo[0],$tipo[1],$tipo[2],$diagno[0],$diagno[1],$certificado];
            $totalAtenciones++;
            $num++;
        }

        // return response()->json(['result'=>$Result]);
        return \PDF::loadView('RegistroDiarioMedicina', compact('Result','dia','mes','anio','TOTAL'))->setPaper('a3', 'landscape')->stream('RegistroDiarioMedicina'.$fecha.'.pdf');

    }

    public function ValidarRegistroDiarioFisica($fecha){

        $datosRF=Historia_Clinica_RF::where('fecha',$fecha)->with('paciente','tratamiento')->get();

        $ndatos=count( $datosRF);
        if($ndatos > 0){
            return response()->json(['result'=>"Registro encontrado", 'code'=>'201']);
        }else{
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }
    }

    public function RegistroDiarioFisica($fecha){
        $datosRF=Historia_Clinica_RF::where('fecha',$fecha)->with('paciente','tratamiento')->get();
        $num=1;
        $valores = explode('-', $fecha);
        $anio = $valores[0];
        $mes = $valores[1];
        $dia = $valores[2];
        $Result=[];
        $TOTAL=[];
        $totalAtenciones=1;
        for ($i=0; $i<19; $i++){
            $TOTAL[$i]=0;
        };
        foreach ($datosRF as $item){
            $nombres=$item->paciente['apellidos']." ".$item->paciente['nombres'];
            $lugar[0]="";
            $lugar[1]="";
            if($item['lugar_atencion']=='Patronato'){
                $lugar[0]="X";
                $TOTAL[0]=$TOTAL[0]+1;
            }
            else{
                $lugar[1]="X";
                $TOTAL[1]=$TOTAL[1]+1;
            }
            $TOTAL[2]=$TOTAL[2]+1;
            $sexo[0]="";
            $sexo[1]="";
            if($item->paciente['sexo']=='Hombre'){
                $sexo[0]="X";
                $TOTAL[3]=$TOTAL[3]+1;
            }else{
                $sexo[1]="X";
                $TOTAL[4]=$TOTAL[4]+1;
            }

            $morbilidad[0]="";
            $morbilidad[1]="";
            $morbilidad[2]="";
            $morbilidad[3]="";
            $morbilidad[4]="";
            if($item->paciente['edad'] >= '0' && $item->paciente['edad'] <= '3'){
                $morbilidad[0]="X";
                $TOTAL[5]=$TOTAL[5]+1;
            }else if($item->paciente['edad'] >= '4' && $item->paciente['edad'] <= '12'){
                $morbilidad[1]="X";
                $TOTAL[6]=$TOTAL[6]+1;
            }else if($item->paciente['edad'] >= '13' && $item->paciente['edad'] <= '19'){
                $morbilidad[2]="X";
                $TOTAL[7]=$TOTAL[7]+1;
            }else if($item->paciente['edad'] >= '20' && $item->paciente['edad'] <= '49'){
                $morbilidad[3]="X";
                $TOTAL[8]=$TOTAL[8]+1;
            }else if($item->paciente['edad'] >= '50'){
                $morbilidad[4]="X";
                $TOTAL[9]=$TOTAL[9]+1;
            }

            $diagnostico=$item['diagnostico']['diagnostico'];

            //Tratamiento
            $tratamiento[0]="";
            $tratamiento[1]="";
            $tratamiento[2]="";
            $tratamiento[3]="";
            $tratamiento[4]="";
            $tratamiento[5]="";
            $tratamiento[6]="";
            $tratamiento[7]="";
            $tratamiento[8]="";
            if($item->tratamiento['estimulacion_temprana'] === "Estimulación temprana"){
                $tratamiento[0]="X";
                $TOTAL[10]=$TOTAL[10]+1;
            }else{
                $tratamiento[0]="";
            }
            if($item->tratamiento['magnetoterapia'] === "Magnetoterapia"){
                $tratamiento[1]="X";
                $TOTAL[11]=$TOTAL[11]+1;
            }else{
                $tratamiento[1]="";
            }
            if($item->tratamiento['electroestimulacion'] === "Electroestimulación"){
                $tratamiento[2]="X";
                $TOTAL[12]=$TOTAL[12]+1;
            }else{
                $tratamiento[2]="";
            }
            if($item->tratamiento['ultrasonido'] === "Ultrasonido"){
                $tratamiento[3]="X";
                $TOTAL[13]=$TOTAL[13]+1;
            }else{
                $tratamiento[3]="";
            }
            if($item->tratamiento['C_Q_C_O_H'] === "C.Q.C. O H."){
                $tratamiento[4]="X";
                $TOTAL[14]=$TOTAL[14]+1;
            }else{
                $tratamiento[4]="";
            }
            if($item->tratamiento['masaje'] === "Masaje"){
                $tratamiento[5]="X";
                $TOTAL[15]=$TOTAL[15]+1;
            }else{
                $tratamiento[5]="";
            }
            if($item->tratamiento['ejercicios_pasivos_resistidos'] === "Ejercicios pasivos y resistidos"){
                $tratamiento[6]="X";
                $TOTAL[16]=$TOTAL[16]+1;
            }else{
                $tratamiento[6]="";
            }
            if($item->tratamiento['laser'] === "Láser"){
                $tratamiento[7]="X";
                $TOTAL[17]=$TOTAL[17]+1;
            }else{
                $tratamiento[7]="";
            }
            if($item->tratamiento['otros'] === "No aplica"){
                $tratamiento[8]="";
            }else{
                $tratamiento[8]="X";
                $TOTAL[18]=$TOTAL[18]+1;
            }

            $Result[]=[$num,$nombres,$lugar[0],$lugar[1],'1',$sexo[0],$sexo[1],$morbilidad[0],$morbilidad[1],$morbilidad[2],$morbilidad[3],$morbilidad[4],$diagnostico,$tratamiento[0],$tratamiento[1],$tratamiento[2],$tratamiento[3],$tratamiento[4],$tratamiento[5],$tratamiento[6]
                    ,$tratamiento[7],$tratamiento[8]];
            $num++;
            $totalAtenciones++;
        }
        return \PDF::loadView('RegistroDiarioFisica', compact('Result','dia','mes','anio','TOTAL'))->setPaper('a3', 'landscape')->stream('RegistroDiarioFisica-'.$fecha.'.pdf');
    }

    public function ValidarConsolidadoMensualMedicinaGeneral($Mes, $Year){

        $datosMG = Historia_Clinica_MG::whereMonth('fecha', $Mes)->whereYear('fecha', $Year)->with('paciente')->get();

        $ndatos=count( $datosMG);
        if($ndatos > 0){
            return response()->json(['result'=>"Registro encontrado", 'code'=>'201']);
        }else{
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }
    }

    public function ConsolidadoMensualMedicinaGeneral($Mes, $Year)
    {


        $Result = [];

        $num = 1;
        $dia = 1;
        $mes =$Mes;
        $anio = $Year;
        $mesL="";
        $Total[0] = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0
        ];
        switch ($mes) {
            case 1:
                $mesL = "Enero";
                break;
            case 2:
                $mesL = "Febrero";
                break;
            case 3:
                $mesL = "Marzo";
                break;
            case 4:
                $mesL = "Abril";
                break;
            case 5:
                $mesL = "Mayo";
                break;
            case 6:
                $mesL = "Junio";
                break;
            case 7:
                $mesL = "Julio";
                break;
            case 8:
                $mesL = "Agosto";
                break;
            case 9:
                $mesL = "Septiembre";
                break;
            case 10:
                $mesL = "Octubre";
                break;
            case 11:
                $mesL = "Noviembre";
                break;
            case 12:
                $mesL = "Diciembre";
                break;
        }
        $mesL = strtoupper($mesL);


        $datosMG = Historia_Clinica_MG::whereMonth('fecha', $mes)->whereYear('fecha', $anio)->with('paciente')->get();


        for ($i = 1; $i < 32; $i++) {
            $Result[$i] = [
                $i, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0
            ];
        }

        $atenciones = 0;
        $horas=0;
        foreach ($datosMG as $item) {

            $separar = explode('-', $item['fecha']);

                $lugar[0] = 0;
                $lugar[1] = 0;
                $lugar[2] = 0;

                if ($item['lugar_atencion'] == 'Patronato') {
                    $lugar[0] = 1;
                } else if ($item['lugar_atencion'] == 'Comunidad') {
                    $lugar[1] = 1;
                } else {
                    $lugar[2] = 1;
                }

                $sexo[0] = 0;
                $sexo[1] = 0;

                if ($item->paciente['sexo'] == 'Hombre') {
                    $sexo[0] = 1;
                } else {
                    $sexo[1] = 1;
                }

                $mujer[0] = 0;
                $mujer[1] = 0;
                $mujer[2] = 0;
                $mujer[3] = 0;

                if($item->paciente['sexo'] == 'Mujer'){
                    if($item->enfermedad['enfermedad']== 'Control de Embarazo'){
                        
                        if($item['tipo_atencion'] == "Primera"){
                            $mujer[0]=1;
                        }else{
                            $mujer[1]=1;
                        }
    
                       
                    }
                    else if($item->enfermedad['enfermedad']== 'Planificación Familiar'){
    
                        if($item['tipo_atencion'] == "Primera"){
                            $mujer[2]=1;
                        }else{
                            $mujer[3]=1;
                        }
                    }
    
                    
                }


                $ninos[0] = 0;
                $ninos[1] = 0;
                $ninos[2] = 0;
                $ninos[3] = 0;
                $ninos[4] = 0;
                $morbilidad[0] = 0;
                $morbilidad[1] = 0;
                $morbilidad[2] = 0;
                $morbilidad[3] = 0;
                $morbilidad[4] = 0;
                $morbilidad[5] = 0;
                $morbilidad[6] = 0;
                $morbilidad[7] = 0;
                $morbilidad[8] = 0;
                $morbilidad[9] = 0;
                $edadesm[0] = 0;
                    $edadesm[1] = 0;
                    $edadesm[2] = 0;
                if($item['tipo_atencion']=='Prevención'){
                    if ($item->paciente['edad'] < '1') {
                        $ninos[0] = 1;
                        $ninos[1] = 0;
                    } else if ($item->paciente['edad'] >= '1' && $item->paciente['edad'] <= '4') {
                        $ninos[2] = 0;
                        $ninos[3] = 1;
                    } else if ($item->paciente['edad'] >= '5' && $item->paciente['edad'] <= '9') {
                        $ninos[4] = 1;
                    }
    
                    
    
                    if ($item->paciente['edad'] >= '10' && $item->paciente['edad'] <= '14') {
                        $edadesm[0] = 1;
                    } else if ($item->paciente['edad'] >= '15' && $item->paciente['edad'] <= '19') {
                        $edadesm[1] = 1;
                    } else if ($item->paciente['edad'] >= '20'){
                        $edadesm[2] = 1;
                    }
                }else{
                    if ($item->paciente['edad'] < '0.1') {
                        $morbilidad[0] = 1;
                    } else if ($item->paciente['edad'] >= '0.1' && $item->paciente['edad'] <= '0.11') {
                        $morbilidad[1] = 1;
                    } else if ($item->paciente['edad'] >= '1' && $item->paciente['edad'] <= '4') {
                        $morbilidad[2] = 1;
                    } else if ($item->paciente['edad'] >= '5' && $item->paciente['edad'] <= '9') {
                        $morbilidad[3] = 1;
                    } else if ($item->paciente['edad'] >= '10' && $item->paciente['edad'] <= '14') {
                        $morbilidad[4] = 1;
                    } else if ($item->paciente['edad'] >= '15' && $item->paciente['edad'] <= '19') {
                        $morbilidad[5] = 1;
                    } else if ($item->paciente['edad'] >= '20' && $item->paciente['edad'] <= '35') {
                        $morbilidad[6] = 1;
                    } else if ($item->paciente['edad'] >= '36' && $item->paciente['edad'] <= '49') {
                        $morbilidad[7] = 1;
                    } else if ($item->paciente['edad'] >= '50' && $item->paciente['edad'] <= '64') {
                        $morbilidad[8] = 1;
                    } else if ($item->paciente['edad'] >= '65'){
                        $morbilidad[9] = 1;
                    }
                }
                

                $tipo[0] = 0;
                $tipo[1] = 0;
                $tipo[2] = 0;

                if ($item['tipo_atencion'] == "Prevención") {
                    $tipo[0] = 1;
                } else if ($item['tipo_atencion'] == "Primera") {
                    $tipo[1] = 1;
                } else {
                    $tipo[2] = 1;
                }

                $diagno[0] = 0;
                $diagno[1] = 0;

                if ($item['condicion_diagnostico'] == "Presuntivo") {
                    $diagno[0] = 1;
                } else {
                    $diagno[1] = 1;
                }

                $certificado = 0;

                if ($item['certificado'] == 1) {
                    $certificado = 1;
                }

                
                $Result[$separar[2]] = [
                    $Result[$separar[2]][0], $lugar[0]+$Result[$separar[2]][1], $lugar[1]+$Result[$separar[2]][2], $lugar[2]+$Result[$separar[2]][3], 1+$Result[$separar[2]][4], $sexo[0]+$Result[$separar[2]][5], $sexo[1]+$Result[$separar[2]][6], $mujer[0]+$Result[$separar[2]][7], $mujer[1]+$Result[$separar[2]][8], $mujer[2]+$Result[$separar[2]][9], $mujer[3]+$Result[$separar[2]][10], $ninos[0]+$Result[$separar[2]][11], $ninos[1]+$Result[$separar[2]][12], $ninos[2]+$Result[$separar[2]][13], $ninos[3]+$Result[$separar[2]][14], $ninos[4]+$Result[$separar[2]][15],
                    $edadesm[0]+$Result[$separar[2]][16], $edadesm[1]+$Result[$separar[2]][17], $edadesm[2]+$Result[$separar[2]][18], $morbilidad[0]+$Result[$separar[2]][19], $morbilidad[1]+$Result[$separar[2]][20], $morbilidad[2]+$Result[$separar[2]][21], $morbilidad[3]+$Result[$separar[2]][22], $morbilidad[4]+$Result[$separar[2]][23], $morbilidad[5]+$Result[$separar[2]][24], $morbilidad[6]+$Result[$separar[2]][25], $morbilidad[7]+$Result[$separar[2]][26],
                    $morbilidad[8]+$Result[$separar[2]][27], $morbilidad[9]+$Result[$separar[2]][28], $tipo[0]+$Result[$separar[2]][29], $tipo[1]+$Result[$separar[2]][30], $tipo[2]+$Result[$separar[2]][31], $diagno[0]+$Result[$separar[2]][32], $diagno[1]+$Result[$separar[2]][33], $certificado+$Result[$separar[2]][34], $horas+$Result[$separar[2]][35],

                ];


                $num++;


        }

        for ($i = 1; $i < 32; $i++) {
            $Total[0] = [
                0, $Total[0][1]+$Result[$i][1], $Total[0][2]+$Result[$i][2], $Total[0][3]+$Result[$i][3], $Total[0][4]+$Result[$i][4], $Total[0][5]+$Result[$i][5], $Total[0][6]+$Result[$i][6], $Total[0][7]+$Result[$i][7], $Total[0][8]+$Result[$i][8], $Total[0][9]+$Result[$i][9],
                $Total[0][10]+$Result[$i][10], $Total[0][11]+$Result[$i][11], $Total[0][12]+$Result[$i][12], $Total[0][13]+$Result[$i][13], $Total[0][14]+$Result[$i][14], $Total[0][15]+$Result[$i][15], $Total[0][16]+$Result[$i][16], $Total[0][17]+$Result[$i][17], $Total[0][18]+$Result[$i][18], $Total[0][19]+$Result[$i][19], $Total[0][20]+$Result[$i][20], $Total[0][21]+$Result[$i][21],
                $Total[0][22]+$Result[$i][22], $Total[0][23]+$Result[$i][23], $Total[0][24]+$Result[$i][24], $Total[0][25]+$Result[$i][25], $Total[0][26]+$Result[$i][26], $Total[0][27]+$Result[$i][27], $Total[0][28]+$Result[$i][28], $Total[0][29]+$Result[$i][29],
                $Total[0][30]+$Result[$i][30], $Total[0][31]+$Result[$i][31], $Total[0][32]+$Result[$i][32], $Total[0][33]+$Result[$i][33], $Total[0][34]+$Result[$i][34], $Total[0][35]+$Result[$i][35], $Total[0][35]+$Result[$i][35]
            ];
        }


        return \PDF::loadView('ConsolidadoMensualMedicinaGeneral', compact('Result','mesL','anio', 'Total'))->setPaper('a3', 'landscape')->stream('ConsolidadoMensualMedicinaGeneral-'.$Mes.'-'.$Year.'.pdf');
    }

    public function ValidarConsolidadoMensualTerapia($Mes, $Year){

        $RF=Historia_Clinica_RF::whereMonth('fecha',$Mes)->whereYear('fecha',$Year)->with('paciente')->get();

        $ndatos=count( $RF);
        if($ndatos > 0){
            return response()->json(['result'=>"Registro encontrado", 'code'=>'201']);
        }else{
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }
    }

    public function ConsolidadoMensualTerapia($Mes, $Year){

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

            $Result= [];
            for ($i = 1; $i < 32; $i++) {
                $Result[$i] = [
                    $i, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ];
            }
            $Total[0] = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];

        $RF=Historia_Clinica_RF::whereMonth('fecha',$Mes)->whereYear('fecha',$Year)->with('paciente')->get();

        foreach ($RF as $item) {

            $separar = explode('-', $item['fecha']);

                $lugar[0] = 0;
                $lugar[1] = 0;

                if ($item['lugar_atencion'] == 'Patronato') {
                    $lugar[0] = 1;
                }  else {
                    $lugar[1] = 1;
                }

                $sexo[0] = 0;
                $sexo[1] = 0;

                if ($item->paciente['sexo'] == 'Hombre') {
                    $sexo[0] = 1;
                } else {
                    $sexo[1] = 1;
                }


                $edades[0] = 0;
                $edades[1] = 0;
                $edades[2] = 0;
                $edades[3] = 0;
                $edades[4] = 0;

                if ($item->paciente['edad'] >'0' && $item->paciente['edad'] <='3') {
                    $edades[0] = 1;
                } else if ($item->paciente['edad'] >= '4' && $item->paciente['edad'] <= '12') {
                    $edades[1] = 1;
                } else if ($item->paciente['edad'] >= '13' && $item->paciente['edad'] <= '19') {
                    $edades[2] = 1;
                } else if ($item->paciente['edad'] >= '20' && $item->paciente['edad'] <= '49') {
                    $edades[3] = 1;
                } else if ($item->paciente['edad'] >= '50'){
                    $edades[4] = 1;
                }

                $tratamiento[0] = 0;
                $tratamiento[1] = 0;
                $tratamiento[2] = 0;
                $tratamiento[3] = 0;
                $tratamiento[4] = 0;
                $tratamiento[5] = 0;
                $tratamiento[6] = 0;
                $tratamiento[7] = 0;
                $tratamiento[8] = 0;

                if ($item->tratamiento['estimulacion_temprana'] == "Estimulación temprana") {
                    $tratamiento[0] = 1;
                }if ($item->tratamiento['magnetoterapia'] == "Magnetoterapia") {
                    $tratamiento[1] = 1;
                }if ($item->tratamiento['electroestimulacion'] == "Electroestimulación") {
                    $tratamiento[2] = 1;
                }if ($item->tratamiento['ultrasonido'] == "Ultrasonido") {
                    $tratamiento[3] = 1;
                }if ($item->tratamiento['C_Q_C_O_H'] == "C.Q.C. O H.") {
                    $tratamiento[4] = 1;
                }if ($item->tratamiento['masaje'] == "Masaje") {
                    $tratamiento[5] = 1;
                }if ($item->tratamiento['ejercicios_pasivos_resistidos'] == "Ejercicios pasivos y resistidos") {
                    $tratamiento[6] = 1;
                }if ($item->tratamiento['laser'] == "Láser") {
                    $tratamiento[7] = 1;
                }if ($item->tratamiento['otros'] != "No aplica") {
                    $tratamiento[8] = 1;
                }

                $Result[$separar[2]] = [
                    $Result[$separar[2]][0], $lugar[0]+$Result[$separar[2]][1], $lugar[1]+$Result[$separar[2]][2], 1+$Result[$separar[2]][3], $sexo[0]+$Result[$separar[2]][4], $sexo[1]+$Result[$separar[2]][5], $edades[0]+$Result[$separar[2]][6], $edades[1]+$Result[$separar[2]][7], $edades[2]+$Result[$separar[2]][8], $edades[3]+$Result[$separar[2]][9], $edades[4]+$Result[$separar[2]][10],
                    $tratamiento[0]+$Result[$separar[2]][11], $tratamiento[1]+$Result[$separar[2]][12], $tratamiento[2]+$Result[$separar[2]][13], $tratamiento[3]+$Result[$separar[2]][14], $tratamiento[4]+$Result[$separar[2]][15], $tratamiento[5]+$Result[$separar[2]][16], $tratamiento[6]+$Result[$separar[2]][17], $tratamiento[7]+$Result[$separar[2]][18],$tratamiento[8]+$Result[$separar[2]][19],8
                ];

        }

        for ($i = 1; $i < 32; $i++) {
            $Total[0] = [
                0, $Total[0][1]+$Result[$i][1], $Total[0][2]+$Result[$i][2], $Total[0][3]+$Result[$i][3], $Total[0][4]+$Result[$i][4], $Total[0][5]+$Result[$i][5], $Total[0][6]+$Result[$i][6], $Total[0][7]+$Result[$i][7], $Total[0][8]+$Result[$i][8], $Total[0][9]+$Result[$i][9],
                $Total[0][10]+$Result[$i][10], $Total[0][11]+$Result[$i][11], $Total[0][12]+$Result[$i][12], $Total[0][13]+$Result[$i][13], $Total[0][14]+$Result[$i][14], $Total[0][15]+$Result[$i][15], $Total[0][16]+$Result[$i][16], $Total[0][17]+$Result[$i][17], $Total[0][18]+$Result[$i][18], $Total[0][19]+$Result[$i][19],$Total[0][20]+$Result[$i][20]
            ];
        }

          // return response()->json(['result'=>$Result, 'code'=>$Total]);

       return \PDF::loadView('ConsolidadoMensualTerapia', compact('Result','mes','Year', 'Total'))->setPaper('a3', 'landscape')->stream('ConsolidadoMensualTerapia-'.$Mes.'-'.$Year.'.pdf');
    }

    public function ValidarRecaudacionDiarioMedicinaGeneral($fecha,$id_rol){

        $datos=Recaudacion::where('fecha',$fecha)->where('id_rol',$id_rol)->with('paciente','rol')->get();

        $ndatos=count( $datos);
        if($ndatos > 0){
            return response()->json(['result'=>"Registro encontrado", 'code'=>'201']);
        }else{
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }
    }

    public function RecaudacionDiarioMedicinaGeneral($fecha,$id_rol){
        $valores = explode('-', $fecha);
        $year = $valores[0];
        $mes = $valores[1];
        $dia = $valores[2];

        $datos=Recaudacion::where('fecha',$fecha)->where('id_rol',$id_rol)->where('exonera',0)->with('paciente','rol')->get();

        switch ($mes) {
            case 1:
                $mesL = "Enero";
                break;
            case 2:
                $mesL = "Febrero";
                break;
            case 3:
                $mesL = "Marzo";
                break;
            case 4:
                $mesL = "Abril";
                break;
            case 5:
                $mesL = "Mayo";
                break;
            case 6:
                $mesL = "Junio";
                break;
            case 7:
                $mesL = "Julio";
                break;
            case 8:
                $mesL = "Agosto";
                break;
            case 9:
                $mesL = "Septiembre";
                break;
            case 10:
                $mesL = "Octubre";
                break;
            case 11:
                $mesL = "Noviembre";
                break;
            case 12:
                $mesL = "Diciembre";
                break;
        }
        $mes = strtoupper($mesL);



        return \PDF::loadView('RecaudacionDiarioMedicinaGeneral', compact('dia','mes','year','datos'))->setPaper('a4', 'lands')->stream('RecaudaciónDiarioMedicinaGeneral'.$fecha.'.pdf');
    }

    public function ValidarRecaudacionDiarioTerapia($fecha,$id_rol){
       
        $datos=Recaudacion::where('fecha',$fecha)->where('id_rol',$id_rol)->with('paciente','rol')->get();

        $ndatos=count( $datos);
        if($ndatos > 0){
            return response()->json(['result'=>"Registro encontrado", 'code'=>'201']);
        }else{
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }
    }

    public function RecaudacionDiarioTerapia($fecha,$id_rol){
        $valores = explode('-', $fecha);
        $year = $valores[0];
        $mes = $valores[1];
        $dia = $valores[2];

        $datos=Recaudacion::where('fecha',$fecha)->where('id_rol',$id_rol)->where('exonera',0)->with('paciente','rol')->get();
       
        switch ($mes) {
            case 1:
                $mesL = "Enero";
                break;
            case 2:
                $mesL = "Febrero";
                break;
            case 3:
                $mesL = "Marzo";
                break;
            case 4:
                $mesL = "Abril";
                break;
            case 5:
                $mesL = "Mayo";
                break;
            case 6:
                $mesL = "Junio";
                break;
            case 7:
                $mesL = "Julio";
                break;
            case 8:
                $mesL = "Agosto";
                break;
            case 9:
                $mesL = "Septiembre";
                break;
            case 10:
                $mesL = "Octubre";
                break;
            case 11:
                $mesL = "Noviembre";
                break;
            case 12:
                $mesL = "Diciembre";
                break;
        }
        $mes = strtoupper($mesL);
       
        return \PDF::loadView('RecaudacionDiarioTerapia', compact('dia','mes','year','datos'))->setPaper('a4', 'lands')->stream('RecaudaciónDiarioTerapia'.$fecha.'.pdf');
    }

    public function ValidarRecaudacionMensual($Mes, $Year){
       
        $dato=Recaudacion::whereMonth('fecha',$Mes)->whereYear('fecha',$Year)->with('paciente','rol')->get();

        $ndatos=count( $dato);
        if($ndatos > 0){
            return response()->json(['result'=>"Registro encontrado", 'code'=>'201']);
        }else{
            return response()->json(['result'=>"Registro no encontrado", 'code'=>'202']);
        }
    }

    public function RecaudacionMensual($Mes, $Year){

        $result=[];
        $posi=[];
        $dato=Recaudacion::whereMonth('fecha',$Mes)->whereYear('fecha',$Year)->with('paciente','rol')->get();
        $egre=Egreso::whereMonth('fecha',$Mes)->whereYear('fecha',$Year)->get();
        $egresos=0;

        foreach($egre as $item) {
            $egresos+=$item['valor'];
        }

        for ($i = 1; $i < 32; $i++) {
            $result[$i] = [$i,0,0,0,0,0,0,0,0,0,0];
        }
        foreach ($dato as $item) {
            $separar = explode('-', $item['fecha']);
            $separar[2] = intval($separar[2]);

            if($item->rol['rol']=='Medicina General'){
                if($item['exonera']==true){
                    $posi[0]=[0,1,0,0,1,0,0,0,0,0,0];
                }else{
                    if($item['valor']==1){
                        $posi[0]=[0,1,1,0,0,1,0,0,0,0,0];
                    }else{
                        $posi[0]=[0,1,0,1,0,0.5,0,0,0,0,0];
                    }
                }  
            }else if($item->rol['rol']=='Rehabilitación Física'){
                if($item['exonera']==1){
                    $posi[0]=[0,0,0,0,0,0,1,0,0,1,0];
                }else{
                    if($item['valor']==2){
                        $posi[0]=[0,0,0,0,0,0,1,1,0,0,2];
                    }else{
                        $posi[0]=[0,0,0,0,0,0,1,0,1,0,1];
                    }
                }  
            }
           
            $result[$separar[2]] = [$result[$separar[2]][0], $posi[0][1]+$result[$separar[2]][1],$posi[0][2]+$result[$separar[2]][2],$posi[0][3]+$result[$separar[2]][3], $posi[0][4]+$result[$separar[2]][4], $posi[0][5]+$result[$separar[2]][5], $posi[0][6]+$result[$separar[2]][6],$posi[0][7]+$result[$separar[2]][7],$posi[0][8]+$result[$separar[2]][8],$posi[0][9]+$result[$separar[2]][9],$posi[0][10]+$result[$separar[2]][10]
            ];

            
        }

        $total[0] = [0,0,0,0,0,0,0,0,0,0];

        for ($i = 1; $i < 32; $i++) {
            $total[0] = [$total[0][0] + $result[$i][1] , $total[0][1] + $result[$i][2] , $total[0][2] + $result[$i][3] , $total[0][3] + $result[$i][4] , $total[0][4] + $result[$i][5] , $total[0][5] + $result[$i][6] , $total[0][6] + $result[$i][7] , $total[0][7] + $result[$i][8] , $total[0][8] + $result[$i][9] , $total[0][9] + $result[$i][10]];
        }
        $recaudacion=$total[0][4]+$total[0][9];
        $saldo=$recaudacion-$egresos;

        switch ($Mes) {
            case 1:
                $mesL = "Enero";
                break;
            case 2:
                $mesL = "Febrero";
                break;
            case 3:
                $mesL = "Marzo";
                break;
            case 4:
                $mesL = "Abril";
                break;
            case 5:
                $mesL = "Mayo";
                break;
            case 6:
                $mesL = "Junio";
                break;
            case 7:
                $mesL = "Julio";
                break;
            case 8:
                $mesL = "Agosto";
                break;
            case 9:
                $mesL = "Septiembre";
                break;
            case 10:
                $mesL = "Octubre";
                break;
            case 11:
                $mesL = "Noviembre";
                break;
            case 12:
                $mesL = "Diciembre";
                break;
        }
        $Mes = strtoupper($mesL);

        //return response()->json(['result'=>$result]);

        return \PDF::loadView('RecaudacionMensual', compact('Mes','Year','result','total','recaudacion','egresos','saldo'))->setPaper('a4', 'lands')->stream('RecaudacionMensual'.$Mes.'-'.$Year.'pdf');
    }

    public function GenerarReceta($color,$nombre,$peso,$talla,$ta,$edad,$fecha,$rp,$pres){

        $valores = explode('-', $fecha);
        $mes = $valores[1];
        $dia = $valores[2];
        $final= explode('20', $valores[0]);
        $year=$final[1];
        $tab=0;
        
        switch ($mes) {
            case 1:
                $mesL = "Enero";
                break;
            case 2:
                $mesL = "Febrero";
                break;
            case 3:
                $mesL = "Marzo";
                break;
            case 4:
                $mesL = "Abril";
                break;
            case 5:
                $mesL = "Mayo";
                break;
            case 6:
                $mesL = "Junio";
                break;
            case 7:
                $mesL = "Julio";
                break;
            case 8:
                $mesL = "Agosto";
                break;
            case 9:
                $mesL = "Septiembre";
                break;
            case 10:
                $mesL = "Octubre";
                break;
            case 11:
                $mesL = "Noviembre";
                break;
            case 12:
                $mesL = "Diciembre";
                break;
        }

        $rp = explode('.', $rp);
        $pres = explode('.', $pres);
        
        $espaciosrp=[];
        foreach($rp as $item) {
            $tab+=20;
            $conteo = strlen($item);
            $espa= $conteo/35;
            $tab+=(int)$espa*20;
            array_push ( $espaciosrp , (int)$espa );
           
        }
        //return response()->json(['result'=>$tab."px"]);
        $espaciospres=[];
        foreach($pres as $item) {

            $conteo = strlen($item);
            $espa= $conteo/35;
            array_push ( $espaciospres , (int)$espa );
           
        }



        //return response()->json(['result'=>$rp,'result2'=>$espaciosrp]);
        
        $conteo=count($rp);
        
        $mes = strtoupper($mesL);
        $color=(int) $color;
        //return response()->json(['result'=>$color]);
        return \PDF::loadView('Receta', compact('color','conteo','dia','mes','year','nombre','talla','peso','ta','edad','rp','pres'))->setPaper('a5', 'landscape')->stream('Receta-'.$nombre.'-'.$fecha.'.pdf');
    }

}
