<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morbilidad Rehabilitación Física</title>
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
        .contenedor2 {
            padding-left:25%;
            position:relative;
            margin-top:-30px
        }

        .tdcontenedor2{
                min-width: 100px;
                width: 30px;
                min-height: 20px;
                height: 20px;
                padding: 2px;
                padding-left: 30px;
                padding-right: 30px;
                font-size: 15px;
                font-weight: bold;
                text-align: center;
                border: solid 1px black;
        }

        .contenedor{
            padding:15px;
            padding-top: 0px !important;
            margin-top: 0px !important;
        }

        table{
            padding-top:10px;
            border-collapse: collapse;
            text-align: center;
        }

        th{
            font-weight: bold!important;
        }

        .recobs{
                width: 50px;
                min-height: 20px;
                height: 10px;
                padding-left: 20px;
                padding-right:20px;
                font-size: 9px;
                font-weight: normal;
                text-align: center;
                border: solid 1px black;

        }

        th,td {
                min-width: 100px;
                width: 30px;
                min-height: 20px;
                height: 10px;
                padding: 4px;
                font-size: 12px;
                font-weight: normal;
                text-align: center;
                border: solid 1px black;
        }


        thead tr th{
            color: rgb(0, 112, 192);
        }
        .doc{
            padding-left: 0px;
            position: absolute;
        }
        .antFirma{
            margin-left: 25px;
            
        }
        .firma{
            margin-top: 70px;
            text-align: center;
            border-top: solid 1px black;
            width: 270px;
            height: 5px;
            margin-left: -5px;
        }
        .doc , .doc  {
            font-size: 13px;
            font-weight: bold;
            padding-left: 115px;
            margin:0px;
        }
        .cargo{
            margin-left: 12px;
        }
        .th, .td {
            width: 80px !important;
            height: 6px !important;
            padding: 1px;
            text-align: center;
            border: solid 1px black;
        }
        h4 {
            font-size: 21px;
            position: absolute;
            margin:0px;
            text-align: center;
            padding: 80px ;
            padding-top: 0px;
        }
        .LogoJunin{
            height:90px;
            weight:150px;
        }
        .LogoPatronato{
            float:right;
            height:70px;
            weight:120px;
        }


        .separador{
            height:25px;
        }


        .numero{
            color: rgb(0, 112, 192);
        }

        .total{
            color: rgb(0, 112, 192);
        }
        tfoot tr td{
            font-size: 12px;
        }

        .fecha{
            text-align: left;
        }

        .resul{
            color: rgb(255, 0, 0);
        }
        .ver{
            color: rgb(0, 176, 80);
        }
        .item{
            font-size:13px;
            font-weight:bold;
            color: rgb(0, 112, 192);
            padding-left:10px ;
        }
        .subt{
            padding-left:275px ;
        }

        .items{
            font-size:15px;
            font-weight:bold;
        }
        .segt{
            position: relative;
            margin-left:1100px;
            margin-top: 60px;
            margin-right:100px;
            padding-right:100px;
        }
        .tamnio{
            width: 150px !important;
        }
        .grande{
            width: 51px !important;
        }
        .titu{
            font-size:14px;
            margin-left:60px;
            margin-top:40px;
        }
        .subti{
            margin-left:70px;
            font-size:21px;
        }

        .nborde{
            border: none;
        }

    </style>
</head>
<body>

<div class="separador"></div>

    <div class="contenedor">

   <img src="imagenes/LogoJunin.jpg" class="LogoJunin">
    <img src="imagenes/LogoPatronato.jpg" class="LogoPatronato">
    <h4 class="titu">DIRECCION DE DESARROLLO HUMANO</h4>
    <div class="contenedor2">
    <table>
    <tr>
        <th class="tdcontenedor2">CONTROL DIARIO DE TERAPIA</th>
    </tr>
    </table>
    </div>   
    <div class="contenido">
        <table>
            <thead>
                <tr>
                    <th rowspan="2"> N°</th>
                    <th rowspan="2" class="tamnio"> NOMBRES Y APELLIDOS</th>
                    <th class="recobs" colspan="4"> RECAUDACIÓN </th>
                    <th rowspan="2"> N°</th>
                    <th rowspan="2" class="tamnio"> NOMBRES Y APELLIDOS</th>
                    <th class="recobs" colspan="4"> RECAUDACIÓN </th>
                    <th class="recobs" class="nborder" rowspan="2"> OBSERVACIÓN</th>
                </tr>
                <tr>
                    <th class="numero" colspan="2" rowspan="1"> $1 </th>
                    <th class="numero" colspan="2" rowspan="1"> $2 </th>
                    <th class="numero" colspan="2" rowspan="1"> $1 </th>
                    <th class="numero" colspan="2" rowspan="1"> $2 </th>
                </tr>
            </thead>
            <tbody>
            @php($numDato = count($datos))
                @for($i=0; $i < 22 ; $i++)
                    <tr>
                            @if( $numDato < 22 && $i < $numDato)
                                <th class="numero">{{$i+1}}</th>
                                <td class="grande">{{$datos[$i]->paciente['nombres']}}</td>
                                    @if($datos[$i]->valor == 1)
                                        <td colspan="2">X</td>
                                        <td colspan="2"></td>
                                    @else
                                        <td colspan="2"></td>
                                        <td colspan="2">X</td>
                                    @endif
                                <th class="numero">{{$i+23}}</th>
                                <td class=""></td>
                                <td colspan="2"></td>
                                <td colspan="2"></td>
                                <td class="grande"></td>
                            @elseif($numDato < 22)
                                <th class="numero">{{$i+1}}</th>
                                <td class="grande"></td>
                                <td colspan="2"></td>
                                <td colspan="2"></td>
                                <th class="numero">{{$i+23}}</th>
                                <td class="grande"></td>
                                <td colspan="2"></td>
                                <td colspan="2"></td>
                                <td class="grande"></td>
                            @endif
                            @if( $numDato > 21)
                                <th class="numero">{{$i+1}}</th>
                                <td class="grande">{{$datos[$i]->paciente['nombres']}}</td>
                                @if($datos[$i]->valor == 1)
                                        <td colspan="2">X</td>
                                        <td colspan="2"></td>
                                 @else
                                        <td colspan="2"></td>
                                        <td colspan="2">X</td>
                                @endif
                                @if($numDato > $i+22)
                                    <th class="numero">{{$i+23}}</th>
                                    <td class="grande">{{$datos[22]->paciente['nombres']}}</td>
                                        @if($datos[22]->valor == 1)
                                            <td colspan="2">X</td>
                                            <td colspan="2"></td>
                                        @else
                                            <td colspan="2"></td>
                                            <td colspan="2">X</td>
                                        @endif
                                    <td class="grande"></td>
                                @else
                                    <th class="numero">{{$i+23}}</th>
                                    <td class="grande"></td>
                                    <td colspan="2"></td>
                                    <td colspan="2"></td>
                                    <td class="grande"></td>
                                @endif
                            @endif
                    </tr>
                @endfor
            </tbody>
            <tfoot>
                <tr>
                    <td class="fecha" colspan="5">DIA <span style="margin: left 35%; font: size 10px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">{{$dia}}</span></td>
                    <td class="fecha" colspan="4">MES <span style="margin: left 35%; font: size 10px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">{{$mes}}</span></td>
                    <td class="fecha" colspan="4">AÑO <span style="margin: left 30%; font: size 10px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">{{$year}}</span></td>
                </tr>
            </tfoot>
            
        </table>
    </div>

</div>


</body>
</html>


