<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte Pacientes Mensual</title>
    <link rel="stylesheet" href="../style.css">
    <style>

        @page {
            margin: 0cm 1cm;
        }

        *{
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

        }
        img{
            padding-top:75px;
            padding:0px;
            margin:0px;
        }
        .contenedor{
            padding:50px;
            padding-top: 0px !important;
            margin-top: 0px !important;
        }

        table{
            padding-top:10px;
            border-collapse: collapse;
            text-align: center;
        }
        th,td {
                min-width: 100px;
                width: 220px;
                min-height: 20px;
                height: 25px;
                padding: 5px;
                font-size: 12.5px;
                font-weight: bold;
                text-align: center;
                border: solid 1px black;
            }
        .azul td{
            color: rgb(0, 112, 192);
        }
        .rojo td, .rojo th{
            color: rgb(148, 54, 52);
        }
        .doc{
            text-align: center;
            margin-top: 80px;

        }
        .firma{
            text-align: center;
            border-top: solid 1px black;
            width:330px;
            height: 15px;
            margin-left:300px;
        }
        .doc h5{
            padding:2px;
            margin:0px;
        }
        .nombre{
            margin-top:40px !important;
        }
        .th, .td {

                width: 80px !important;
                height: 6px !important;
                padding: 1px;
                text-align: center;
                border: solid 1px black;
            }
        h4 {
            text-align: center;
            padding:20px ;
            padding-top: 0px;
        }
        .LogoJunin{
            height:100px;
            weight:150px;
        }
        .LogoPatronato{
            float:right;
            height:80px;
            weight:160px;
        }

        .mes{
           margin-top:90px;
           margin-left:730px;
        }
        .separador{
            height:25px;
        }
    </style>
</head>
<body>

<div class="separador"></div>
    <div class="contenedor">

        <img src="imagenes/LogoJunin.jpg" class="LogoJunin">
    <img src="imagenes/LogoPatronato.jpg" class="LogoPatronato">

        <h4>TOTAL DE PACIENTES ATENDIDOS EN LA UNIDAD DE ASISTENCIA SOCIAL  DEL GAD MUNICIPAL DEL CANTÓN JUNÍN EN LAS ÁREAS DE MEDICINA GENERAL Y REHABILITACIÓN FÍSICA</h4>
        <div>
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th> HOMBRES</th>
                        <th> MUJERES</th>
                        <th> TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="azul">
                        <th> MEDICINA GENERAL </th>
                        
                        @if($MGcontH != 0){
                            <td>{{$MGcontH}}</td>
                        }@else{
                            <td> </td>
                        }@endif

                        @if($MGcontM != 0){
                            <td>{{$MGcontM}}</td>
                        }@else{
                            <td> </td>
                        }@endif

                            <td>{{$datosMG}}</td>
  
                    </tr>
                    <tr class="azul">
                        <th> REHABILITACIÓN FÍSICA </th>

                        @if($RFcontH != 0){
                            <td>{{$RFcontH}}</td>
                        }@else{
                            <td> </td>
                        }@endif

                        @if($RFcontM != 0){
                            <td>{{$RFcontM}}</td>
                        }@else{
                            <td> </td>
                        }@endif

                            <td>{{$datosRF}}</td>

                    </tr>
                    <tr class="rojo">

                        <th> TOTAL </th>

                        <td>{{$TotalH}}</td>
                        <td>{{$TotalM}}</td>
                        <td>{{$Total}}</td>
 
                    </tr>

                </tbody>
            </table>
        </div>


        <div class="doc">
        <div class="firma"></div>
            <h5 class="nombre">DR. FERNANDO MARTIN DUEÑAS INTRIAGO</h5>
            <h5 >DEPARTAMENTO DE ASISTENCIA SOCIAL</h5>
        </div>

        <div class="mes">
            <table class="fecha">
                <thead>
                    <tr>
                        <th class="th"> MES</th>
                        <th class="th"> AÑO</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <th class="th">{{$mes}}</th>
                        <td class="td">{{$Year}}</td>
                    </tr>


                </tbody>
            </table>
        </div>

    </div>


</body>
</html>


