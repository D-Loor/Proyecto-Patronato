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
                width: 20px;
                min-height: 20px;
                height: 20px;
                padding: 5px;
                font-size: 14px;
                font-weight: bold;
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
            font-size: 16px;
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
            padding-left:225px ;
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
            width: 500px !important;
        }
        .grande{
            width: 51px !important;
        }

    </style>
</head>
<body>

<div class="separador"></div>

    <div class="contenedor">

   <img src="imagenes/LogoJunin.jpg" class="LogoJunin">
    <img src="imagenes/LogoPatronato.jpg" class="LogoPatronato">

    <h4>REGISTRO DE LAS 20 PRINCIPALES CAUSAS DE MORBILIDAD EN REHABILITACIÓN FÍSICA SEGÚN EDAD Y SEXO EN LA UNIDAD DE ASISTENCIA SOCIAL DEL GAD MUNICIPAL JUNÍN</h4>
    <div class="contenido">
        <div >
            <div class="items">
            <span class="item ">PROVINCIA:</span>
                MANABÍ
            <span class="item subt">MES:</span>
                {{$mes}}
            <span class="item subt">AÑO:</span>
                {{$Year}}
            </div>

        </div>

        <table>
            <thead>
                <tr>
                    <th rowspan="4"> N°</th>
                    <th rowspan="4" class="tamnio"> CAUSAS</th>
                    <th class="grupos" colspan="12"> GRUPOS DE EDAD </th>
                    <th colspan="1" style="border-top: none !important; border-bottom: none !important" ></th>
                </tr>
                <tr>
                    <th class="numero" colspan="2" rowspan="2"> 0 a 3 AÑOS </th>
                    <th class="tmedio" colspan="2" rowspan="2"> 4 a 12 AÑOS </th>
                    <th class="tmedio" colspan="2" rowspan="2"> 13 a 19 AÑOS </th>
                    <th class="tmedio" colspan="2" rowspan="2"> 20 a 49 AÑOS </th>
                    <th class="tmedio" colspan="2" rowspan="2"> 50 AÑOS y MÁS </th>
                    <th class="tmedio" colspan="2" rowspan="2"> TOTAL EDADES</th>
                    <th colspan="1" style="border-top: none !important" rowspan="2"></th>
                </tr>
                <tr>
                    
                </tr>
                <tr>
                    <th class="g1" > H </th>
                    <th class="g1" > M</th>
                    <th class="g1" > H </th>
                    <th class="g1" > M</th>
                    <th class="g1" > H </th>
                    <th class="g1" > M</th>
                    <th class="g1" > H </th>
                    <th class="g1" > M</th>
                    <th class="g1" > H </th>
                    <th class="g1" > M</th>
                    <th class="g1" > H </th>
                    <th class="g1" > M</th>
                    <th class="g1" > Total </th>
                    <th class="g1" > %</th>
                </tr>

            </thead>
            <tbody>
                @foreach ($Resultados as $item)
                    <tr>
                        @for($i = 0; $i < 16; $i++) 
                            @if ($i===0) 
                                <th class="numero">{{$item[$i]}}</th>
                            @endif
                            @if ($i >=1) 
                                <td class="grande" >{{$item[$i]}}</td>
                            @endif

                        @endfor
                    </tr>
                @endforeach
                    

            </tbody>
            <tfoot>
                <tr>
                    <th colspan="2" class="total"> TOTAL</th>
                    @for($i=0;$i <= 12;$i++)
                        @if($i !=12)
                        <td>{{$TotalF[$i]}}</td>
                        @endif
                        @if($i==12)
                        <td class="ver">{{$TotalF[$i]}}</td>
                        @endif
                    @endfor
                    <td class="resul"> 100% </td>
                </tr>
            </tfoot>
        </table>
    </div>

        <div>
            <div class="doc">
                <div class="firma"></div>
                <div class="antFirma">LCDO. CARLOS ZAMBRANO M.</div>
                    <div class="cargo"> ÁREA  DE  REHABILITACIÓN FÍSICA
                </div>

            </div>


            <div >
                <table class="segt" >
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


</div>


</body>
</html>


