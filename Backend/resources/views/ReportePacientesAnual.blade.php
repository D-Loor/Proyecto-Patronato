<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte Pacientes Anual</title>
    <link rel="stylesheet" href="../style.css">
    <style>
        @page {
            margin: 0cm 1cm;
        }

        *{
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

        }
        img{
            padding-top:25px;
            padding-bottom:0px;
            margin:0px;
        }
        .contenedor{
            padding:50px;
            padding-top: 0px !important;
            margin-top: 0px !important;
        }
        h4{
            margin-top:5px;
            margin-bottom: 15px;
            text-align:center;
            padding-right:10px;
            padding-left:10px;

        }
        table{
            padding-top:0px;
            border-collapse: collapse;
            text-align: center;
        }

        footer {
            position: fixed;
            bottom: 0cm;
            left: 0cm;
            right: 0cm;
            height: 0cm;
        }

        th,td {

            height: 20px;
            padding: 3px;
            height: 20px;
            font-size: 13px;
            font-weight: bold;
            text-align: center;
            border: solid 1px black;
            }

        .hinicio{
            width: 180px;
        }
        .tinicio{
            width: 180px;
        }

        .hmedio{
            width: 140px;
        }
        .tmedio{
            width: 45px;
        }
        .hfin{
            width: 180px;
        }
        .tfin{
            width: 180px;
        }

        thead tr th, .suma{
            color: rgb(0, 112, 192);
        }

        body{
            margin-bottom:0px;
        }

        .LogoJunin{
            height:90px;
            weight:150px;
        }
        .LogoPatronato{
            float:right;
            height:70px;
            weight:160px;
        }
        tfoot tr th{
            color: rgb(0, 112, 192);
        }
        tfoot tr td{
            font-size: 16px;
        }

        .resul{
            color: rgb(255, 0, 0);
            font-size: 16px;
        }
        p{
            font-size: 11px;
            margin:2px;
        }
        .Doc{
            font-size: 12px;
        }
        .firmas{
            padding-right: 80px;
            padding-left: 80px;
            padding-top:80px;
        }
        .Izq{

            float:left;
        }
        .Der{
            float:right;
        }
        .espaciado{
            padding-left:25px;
        }

    </style>
</head>
<body>


    <div class="contenedor">

         <img src="imagenes/LogoJunin.jpg" class="LogoJunin">
    <img src="imagenes/LogoPatronato.jpg" class="LogoPatronato">

        <h4>TOTAL DE PACIENTES ATENDIDOS EN LA UNIDAD DE ASISTENCIA SOCIAL DEL GAD MUNICIPAL DEL CANTÓN JUNÍN EN LAS ÁREAS DE MEDICINA GENERAL Y REHABILITACIÓN FÍSICA EN EL AÑO {{$year}}.</h4>
        <div>
            <table>
                <thead>
                    <tr>
                        <th class="hinicio"> {{$year}} </th>
                        <th class="hmedio"  colspan="2"> MEDICINA GENERAL</th>
                        <th class="hmedio"  colspan="2"> REHABILITACION FISICA</th>
                        <th class="hmedio"  colspan="2"> SUBTOTAL</th>
                        <th class="hfin" rowspan="2"> TOTAL DE PACIENTES ATENDIDOS MEDICINA GENERAL Y REHABILITACION FISICA</th>
                    </tr>
                    <tr>
                        <th class="tinicio"> MESES </th>
                        <th class="tmedio"  > M</th>
                        <th class="tmedio"  > F</th>
                        <th class="tmedio"  > M</th>
                        <th class="tmedio"  > F</th>
                        <th class="tmedio"  > M</th>
                        <th class="tmedio"  > F</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th> ENERO </th>

                        @if($MGH[0] != 0){
                            <td> {{$MGH[0]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($MGM[0] != 0){
                            <td> {{$MGM[0]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFH[0] != 0){
                            <td> {{$RFH[0]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFM[0] != 0){
                            <td> {{$RFM[0]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STH[0] != 0){
                            <td> {{$STH[0]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STM[0] != 0){
                            <td> {{$STM[0]}} </td>
                        }@else{
                            <td> </td> 
                        }@endif
                        
                            <td > {{$Total[0]}} </td>
                        
                    </tr>
                    <tr>
                        <th> FEBRERO </th>

                        @if($MGH[1] != 0){
                            <td> {{$MGH[1]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($MGM[1] != 0){
                            <td> {{$MGM[1]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFH[1] != 0){
                            <td> {{$RFH[1]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFM[1] != 0){
                            <td> {{$RFM[1]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STH[1] != 0){
                            <td> {{$STH[1]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STM[1] != 0){
                            <td> {{$STM[1]}} </td>
                        }@else{
                            <td> </td> 
                        }@endif

                            <td > {{$Total[1]}} </td>

                        
                    </tr>
                    <tr>
                        <th> MARZO </th>
                        
                        @if($MGH[2] != 0){
                            <td> {{$MGH[2]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($MGM[2] != 0){
                            <td> {{$MGM[2]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFH[2] != 0){
                            <td> {{$RFH[2]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFM[2] != 0){
                            <td> {{$RFM[2]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STH[2] != 0){
                            <td> {{$STH[2]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STM[2] != 0){
                            <td> {{$STM[2]}} </td>
                        }@else{
                            <td> </td> 
                        }@endif

                            <td > {{$Total[2]}} </td>


                    </tr>
                    <tr>
                        <th> ABRIL </th>
                        
                        @if($MGH[3] != 0){
                            <td> {{$MGH[3]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($MGM[3] != 0){
                            <td> {{$MGM[3]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFH[3] != 0){
                            <td> {{$RFH[3]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFM[3] != 0){
                            <td> {{$RFM[3]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STH[3] != 0){
                            <td> {{$STH[3]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STM[3] != 0){
                            <td> {{$STM[3]}} </td>
                        }@else{
                            <td> </td> 
                        }@endif

                            <td > {{$Total[3]}} </td>

                    </tr>
                    <tr>
                        <th> MAYO </th>
                        
                        @if($MGH[4] != 0){
                            <td> {{$MGH[4]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($MGM[4] != 0){
                            <td> {{$MGM[4]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFH[4] != 0){
                            <td> {{$RFH[4]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFM[4] != 0){
                            <td> {{$RFM[4]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STH[4] != 0){
                            <td> {{$STH[4]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STM[4] != 0){
                            <td> {{$STM[4]}} </td>
                        }@else{
                            <td> </td> 
                        }@endif

                            <td > {{$Total[4]}} </td>
                        
                    </tr>
                    <tr>
                        <th> JUNIO </th>
                        
                        @if($MGH[5] != 0){
                            <td> {{$MGH[5]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($MGM[5] != 0){
                            <td> {{$MGM[5]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFH[5] != 0){
                            <td> {{$RFH[5]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFM[5] != 0){
                            <td> {{$RFM[5]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STH[5] != 0){
                            <td> {{$STH[5]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STM[5] != 0){
                            <td> {{$STM[5]}} </td>
                        }@else{
                            <td> </td> 
                        }@endif

                            <td > {{$Total[5]}} </td>
                        
                    </tr>
                    <tr>
                        <th> JULIO </th>
                        
                        @if($MGH[6] != 0){
                            <td> {{$MGH[6]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($MGM[6] != 0){
                            <td> {{$MGM[6]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFH[6] != 0){
                            <td> {{$RFH[6]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFM[6] != 0){
                            <td> {{$RFM[6]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STH[6] != 0){
                            <td> {{$STH[6]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STM[6] != 0){
                            <td> {{$STM[6]}} </td>
                        }@else{
                            <td> </td> 
                        }@endif

                            <td > {{$Total[6]}} </td>
                        
                    </tr>
                    <tr>
                        <th> AGOSTO </th>

                        @if($MGH[7] != 0){
                            <td> {{$MGH[7]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($MGM[7] != 0){
                            <td> {{$MGM[7]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFH[7] != 0){
                            <td> {{$RFH[7]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFM[7] != 0){
                            <td> {{$RFM[7]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STH[7] != 0){
                            <td> {{$STH[7]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STM[7] != 0){
                            <td> {{$STM[7]}} </td>
                        }@else{
                            <td> </td> 
                        }@endif

                            <td > {{$Total[7]}} </td>

                    </tr>
                    <tr>
                        <th> SEPTIEMBRE </th>
                        
                        @if($MGH[8] != 0){
                            <td> {{$MGH[8]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($MGM[8] != 0){
                            <td> {{$MGM[8]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFH[8] != 0){
                            <td> {{$RFH[8]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFM[8] != 0){
                            <td> {{$RFM[8]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STH[8] != 0){
                            <td> {{$STH[8]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STM[8] != 0){
                            <td> {{$STM[8]}} </td>
                        }@else{
                            <td> </td> 
                        }@endif

                            <td > {{$Total[8]}} </td>
                        
                    </tr>
                    <tr>
                        <th> OCTUBRE </th>

                        @if($MGH[9] != 0){
                            <td> {{$MGH[9]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($MGM[9] != 0){
                            <td> {{$MGM[9]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFH[9] != 0){
                            <td> {{$RFH[9]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFM[9] != 0){
                            <td> {{$RFM[9]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STH[9] != 0){
                            <td> {{$STH[9]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STM[9] != 0){
                            <td> {{$STM[9]}} </td>
                        }@else{
                            <td> </td> 
                        }@endif
                        
                            <td > {{$Total[9]}} </td>

                    </tr>
                    <tr>
                        <th> NOVIEMBRE </th>
                        
                        @if($MGH[10] != 0){
                            <td> {{$MGH[10]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($MGM[10] != 0){
                            <td> {{$MGM[10]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFH[10] != 0){
                            <td> {{$RFH[10]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFM[10] != 0){
                            <td> {{$RFM[10]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STH[10] != 0){
                            <td> {{$STH[10]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STM[10] != 0){
                            <td> {{$STM[10]}} </td>
                        }@else{
                            <td> </td> 
                        }@endif

                            <td > {{$Total[10]}} </td>

                    </tr>
                    <tr>
                    <th> DICIEMBRE </th>
                        
                    @if($MGH[11] != 0){
                            <td> {{$MGH[11]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($MGM[11] != 0){
                            <td> {{$MGM[11]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFH[11] != 0){
                            <td> {{$RFH[11]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($RFM[11] != 0){
                            <td> {{$RFM[11]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STH[11] != 0){
                            <td> {{$STH[11]}}</td>
                        }@else{
                            <td> </td> 
                        }@endif

                        @if($STM[11] != 0){
                            <td> {{$STM[11]}} </td>
                        }@else{
                            <td> </td> 
                        }@endif
                        
                            <td > {{$Total[11]}} </td>

                    </tr>

                </tbody>
                <tfoot>
                <tr>
                        <th> TOTAL DE PACIENTES ATENDIDOS </th>
                            <td class="suma"> {{$MGH[12]}}</td>
                            <td class="suma"> {{$MGM[12]}}</td>
                            <td class="suma"> {{$RFH[12]}}</td>
                            <td class="suma"> {{$RFM[12]}}</td>
                            <td class="suma"> {{$STH[12]}}</td>
                            <td class="suma"> {{$STM[12]}} </td>
                            <td class="resul"> {{$Total[12]}} </td>

                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="firmas">
            <div class="Izq">
                <p class="Doc">Dr. Martín Dueñas Intriago.</p>
                <p class="espaciado"> Medicina General.</p>
            </div>

            <div class="Der">
                <p class="Doc">Lic. Carlos Zambrano Moreira.</p>
                <p class="espaciado"> Rehabilitación Física.</p>
            </div>
        </div>



    </div>


</body>
</html>


