<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morbilidad Medcina Genenral</title>
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
                width: 46px;
                min-height: 20px;
                height: 20px;
                padding: 4px;
                font-size: 10px;
                font-weight: bold;
                text-align: center;
                border: solid 1px black;
        }
        .tdCeldas{
            font-size: 12px;
        }
        .causas{
                min-width: 100px;
                width: 352px;
                min-height: 20px;
                height: 20px;
                padding: 5px;
                font-size: 10px;
                font-weight: bold;
                text-align: center;
                border: solid 1px black;
        }


        thead tr th{
            color: rgb(0, 112, 192);
        }
        .doc{
            padding-left: 60px;
            position:absolute;

        }
        .firma{
            margin-top: 70px;
            text-align: center;
            border-top: solid 1px black;
            width:250px;
            height: 5px;
            margin-left:-5px;
        }
        .doc , .doc .cargo {
            font-size:11px;
            font-weight: bold;
            padding-left:5px;
            margin:0px;
        }
        .cargo{
            margin-left: 5px;
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
            padding:110px;
            padding-top: 0px;
            
            font-size:21px;
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
            font-size: 14px;
        }
        .resul{
            color: rgb(255, 0, 0);
        }
        .ver{
            font-size: 14px;
            color: rgb(0, 176, 80);
        }
        .item{
            font-size:15px;
            font-weight:bold;
            color: rgb(0, 112, 192);
            padding-left:10px ;
        }
        .subt{
            padding-left:400px ;
        }

        .items{
            font-size:15px;
            font-weight:bold;
            padding-left:0px;
            margin-top: 10px;
        }
        .segt{
            position: absolute;
            margin-left:1150px;
            margin-top: 53px;
            margin-right:100px;
            padding-right:100px;
        }

        .result{
            font-size: 14px;
            color: rgb(255, 0, 0);
        }
        .espacios{
        	table-layout: fixed;
           	width: 1380px;
        }

        

    </style>
</head>
<body>

<div class="separador"></div>

    <div class="contenedor">

   <img src="imagenes/LogoJunin.jpg" class="LogoJunin">
    <img src="imagenes/LogoPatronato.jpg" class="LogoPatronato">

    <h4>REGISTRO  DE LAS 20 PRINCIPALES CAUSAS DE MORBILIDAD EN MEDICINA GENERAL 
    <br> SEGÚN EDAD Y SEXO EN LA UNIDAD DE ASISTENCIA SOCIAL DEL GAD MUNICIPAL CANTÓN JUNÍN</h4>
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
<div class="">
        <table >
            <thead>
                <tr>
                    <th rowspan="4"> N°</th>
                    <th rowspan="4" class="causas"> CAUSAS</th>
                    <th class="grupos" colspan="16" class="ulti"> GRUPOS DE EDAD </th>
                    <th colspan="1" style="border-top: none !important; border-bottom: none !important" ></th>
                </tr>
                <tr>
                    <th class="numero" colspan="4"> &lt; 1 AÑO </th>
                    <th class="tmedio" colspan="2" rowspan="2"> 1 a 4 AÑOS</th>
                    <th class="tmedio" colspan="2" rowspan="2"> 5 a 14 AÑOS</th>
                    <th class="tmedio" colspan="2" rowspan="2"> 15 a 49 AÑOS</th>
                    <th class="tmedio" colspan="2" rowspan="2"> 50 a 64 AÑOS</th>
                    <th class="tmedio" colspan="2" rowspan="2"> 65 AÑOS Y MÁS</th>
                    <th class="tmedio" colspan="2" rowspan="2" class="ulti"> TOTAL EDADES</th>
                    <th colspan="1" style="border-top: none !important" rowspan="2"></th>
                </tr>
                <tr>
                    <th class="" colspan="2"> Menores de 28 días </th>
                    <th class="" colspan="2" > 29 - 365 días</th>
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
                    <th class="g1" > H </th>
                    <th class="g1" > M</th>
                    <th class="g1" > H </th>
                    <th class="g1" > M</th>
                    <th class="g1" > Total </th>
                    <th class="g1" > %</th>
                </tr>

            </thead>
            <tbody>
        @php ($aux = 0)
        @foreach ($Result as $item)
                <tr>
                @for($i = 0 ; $i <= 2; $i++)
                    @if($i===0)
                        <th class="numero">{{$item[$i]}}</th>
                    @endif
                    @if($i===1)
                        <td class="tdCeldas">{{$item[$i]}}</td>
                    @endif
                    @if($i>1)
                        @for($j=0;$j<=16;$j++)
                            <td class="tdCeldas">{{$item[$i][$j]}}</td>
                        @endfor
                    @endif
                    @if($i===2)
                    <td class="tdCeldas">{{$porcentajes[$aux]}}</td>
                    @endif
                 @endfor
                </tr>
           @php ($aux++)
        @endforeach
                
        @if(count($Result)!=20)
             @for($x = count($Result)+1; $x <= 20; $x++)
                <tr>
                    <th class="numero">{{$x}}</th>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                    <td class="tdCeldas"></td>
                </tr>
             @endfor
        @endif
            </tbody>
            <tfoot>
                <tr>
                <th colspan="2" class="total"> TOTAL</th>
                @for($i = 0 ; $i <= 16; $i++)
                    @if($i <= 13)
                        <td class="tdCeldas">{{$total[$i]}}</td>
                    @endif
                    @if($i > 13)
                    <td class="ver"> {{$total[$i]}} </td>
                    @endif
                    @if($i == 16)
                    <td class="result">100%</td>
                    @endif
                    
                 @endfor
                </tr>
            </tfoot>
        </table>
        </div>
    </div>

        <div>
            <div class="doc">
                <div class="firma"></div>
                DR. FERNANDO MARTIN DUEÑAS INTRIAGO
                    <div class="cargo"> DEPARTAMENTO DE ASISTENCIA SOCIAL
                </div>

            </div>


            <div>
                <table  class="segt">
                    <thead>
                        <tr>
                            <th class="th"> MES</th>
                            <th class="th"> AÑO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="td">{{$mes}}</th>
                            <td class="td"> {{$Year}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


</div>


</body>
</html>


