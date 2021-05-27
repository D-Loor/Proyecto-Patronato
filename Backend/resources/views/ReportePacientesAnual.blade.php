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
                        <td> {{$MGH[0]}}</td>
                        <td> {{$MGM[0]}}</td>
                        <td> {{$RFH[0]}}</td>
                        <td> {{$RFM[0]}}</td>
                        <td> {{$STH[0]}}</td>
                        <td> {{$STM[0]}} </td>
                        <td > {{$Total[0]}} </td>
                    </tr>
                    <tr>
                        <th> FEBRERO </th>
                        <td> {{$MGH[1]}}</td>
                        <td> {{$MGM[1]}}</td>
                        <td> {{$RFH[1]}}</td>
                        <td> {{$RFM[1]}}</td>
                        <td> {{$STH[1]}}</td>
                        <td> {{$STM[1]}} </td>
                        <td > {{$Total[1]}} </td>
                    </tr>
                    <tr>
                        <th> MARZO </th>
                        <td> {{$MGH[2]}}</td>
                        <td> {{$MGM[2]}}</td>
                        <td> {{$RFH[2]}}</td>
                        <td> {{$RFM[2]}}</td>
                        <td> {{$STH[2]}}</td>
                        <td> {{$STM[2]}} </td>
                        <td> {{$Total[2]}} </td>
                    </tr>
                    <tr>
                        <th> ABRIL </th>
                        <td> {{$MGH[3]}}</td>
                        <td> {{$MGM[3]}}</td>
                        <td> {{$RFH[3]}}</td>
                        <td> {{$RFM[3]}}</td>
                        <td> {{$STH[3]}}</td>
                        <td> {{$STM[3]}} </td>
                        <td > {{$Total[3]}} </td>
                    </tr>
                    <tr>
                        <th> MAYO </th>
                        <td> {{$MGH[4]}}</td>
                        <td> {{$MGM[4]}}</td>
                        <td> {{$RFH[4]}}</td>
                        <td> {{$RFM[4]}}</td>
                        <td> {{$STH[4]}}</td>
                        <td> {{$STM[4]}} </td>
                        <td> {{$Total[4]}} </td>
                    </tr>
                    <tr>
                        <th> JUNIO </th>
                        <td> {{$MGH[5]}}</td>
                        <td> {{$MGM[5]}}</td>
                        <td> {{$RFH[5]}}</td>
                        <td> {{$RFM[5]}}</td>
                        <td> {{$STH[5]}}</td>
                        <td> {{$STM[5]}} </td>
                        <td > {{$Total[5]}} </td>
                    </tr>
                    <tr>
                        <th> JULIO </th>
                        <td> {{$MGH[6]}}</td>
                        <td> {{$MGM[6]}}</td>
                        <td> {{$RFH[6]}}</td>
                        <td> {{$RFM[6]}}</td>
                        <td> {{$STH[6]}}</td>
                        <td> {{$STM[6]}} </td>
                        <td > {{$Total[6]}} </td>
                    </tr>
                    <tr>
                        <th> AGOSTO </th>
                        <td> {{$MGH[7]}}</td>
                        <td> {{$MGM[7]}}</td>
                        <td> {{$RFH[7]}}</td>
                        <td> {{$RFM[7]}}</td>
                        <td> {{$STH[7]}}</td>
                        <td> {{$STM[7]}} </td>
                        <td > {{$Total[7]}} </td>
                    </tr>
                    <tr>
                        <th> SEPTIEMBRE </th>
                        <td> {{$MGH[8]}}</td>
                        <td> {{$MGM[8]}}</td>
                        <td> {{$RFH[8]}}</td>
                        <td> {{$RFM[8]}}</td>
                        <td> {{$STH[8]}}</td>
                        <td> {{$STM[8]}} </td>
                        <td > {{$Total[8]}} </td>
                    </tr>
                    <tr>
                        <th> OCTUBRE </th>
                        <td> {{$MGH[9]}}</td>
                        <td> {{$MGM[9]}}</td>
                        <td> {{$RFH[9]}}</td>
                        <td> {{$RFM[9]}}</td>
                        <td> {{$STH[9]}}</td>
                        <td> {{$STM[9]}} </td>
                        <td > {{$Total[9]}} </td>
                    </tr>
                    <tr>
                        <th> NOVIEMBRE </th>
                        <td> {{$MGH[10]}}</td>
                        <td> {{$MGM[10]}}</td>
                        <td> {{$RFH[10]}}</td>
                        <td> {{$RFM[10]}}</td>
                        <td> {{$STH[10]}}</td>
                        <td> {{$STM[10]}} </td>
                        <td > {{$Total[10]}} </td>
                    </tr>
                    <tr>
                    <th> DICIEMBRE </th>
                        <td> {{$MGH[11]}}</td>
                        <td> {{$MGM[11]}}</td>
                        <td> {{$RFH[11]}}</td>
                        <td> {{$RFM[11]}}</td>
                        <td> {{$STH[11]}}</td>
                        <td> {{$STM[11]}} </td>
                        <td> {{$Total[11]}} </td>
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


