<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consolidado Mensual Terapia</title>
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
            padding-top:0px;
            border-collapse: collapse;
            text-align: center;
        }
        th,td {
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                border: solid 1px black;
        }
        .segunda-fila{
             height: 80px;
        }
        thead tr th{
            color: rgb(0, 112, 192);
        }
        .doc{
            position:absolute;
        }
        .firma{
            margin-top: 70px;
            text-align: center;
            border-top: solid 1px black;
            width:290px;
            height: 5px;
            margin-left:-6px;
        }
        .doc {
            font-size:15px;
            font-weight: bold;
            padding-left:180px;
            margin:0px;
        }
        .cargo{
            margin-left: 5px;
        }
        .titu{
            font-size:22px;

        }
        .subti{
            margin-left:90px;
            font-size:20px;
        }
        h4 {
            position: absolute;
            margin:0px;
            text-align: center;
            padding: 200px ;
            padding-top: 0px;
            padding-bottom: 0px !important;
        }
        .LogoJunin{
            height:100px;
            weight:150px;
        }
        .LogoPatronato{
            float:right;
            height:80px;
            weight:120px;
        }
        .separador{
            height:25px;
        }
        tfoot tr td{
            font-size: 16px;
        }
        .numero{
            color: rgb(0, 112, 192);
        }
        .total{
            color: rgb(0, 112, 192);
        }
        .resul{
            color: rgb(255, 0, 0);
        }
        .ver{
            color: rgb(0, 176, 80);
        }
        .principal{
        	height: 20px;
        }
        .segt{
            position: relative;
            margin-left:1020px;
            margin-top: 42px;
            margin-right:100px;
            padding-right:100px;
        }
        .box-rotate {
            font-size:10px;
            -moz-transform: rotate(270deg);  /* FF3.5+ */
            -o-transform: rotate(270deg);  /* Opera 10.5 */
            -webkit-transform: rotate(270deg);  /* Saf3.1+, Chrome */
        }
        .nborde{
            border: none;
        }
        .th, .td {
            width: 80px !important;
            height: 6px !important;
            padding: 1px;
            text-align: center;
            border: solid 1px black;
        }
        .tama{
            height:115px;
        }
        .espacios{
        	table-layout: fixed;
           	width: 1300px;
        }
        .contenido{
            padding-left:50px !important;
        }
        .result{
            color: rgb(255, 0, 0);
        }

    </style>
</head>
<body>

<div class="separador"></div>

    <div class="contenedor">

   <img src="imagenes/LogoJunin.jpg" class="LogoJunin">
    <img src="imagenes/LogoPatronato.jpg" class="LogoPatronato">

    <h4 class="titu">UNIDAD DE ASISTENCIA SOCIAL DEL G.A.D MUNICIPAL CANT??N JUN??N </h4>
    <h4 class="subti"><br> CONSOLIDADO MENSUAL DE REHABILITACI??N F??SICA</h4>
    <div class="contenido">


        <table class="espacios">
            <thead>
                <tr>
                    <th class="nborde" colspan="6"></th>
                    <th class="numero encabezado principal" colspan="5">ATENCI??N MORBILIDAD</th>
                    <th class="nborde"></th>
                </tr>
                <tr>
                	<th class="nborde"></th>
                    <th class="numero encabezado" colspan="2">LUGAR DE ATENCI??N</th>
                    <th rowspan="2"><p class="box-rotate">TOTAL DE ATENCIONES</p></th>
                    <th class="numero encabezado" colspan="2">SEXO</th>
                    <th class="numero encabezado" colspan="5">GRUPOS DE EDAD - MORBILIDAD</th>
                    <th class="numero encabezado" colspan="9">TRATAMIENTO</th>
                    <th class="nborde"></th>
                </tr>
                <tr>
                	<th class="nborde"></th>
                    <th class="segunda-fila"><p class="box-rotate">PATRONATO</p></th>
                    <th class="tama"><p class="box-rotate">DOMICILIO</p></th>
                    <th class="tama"><p class="box-rotate">HOMBRE</p></th>
                    <th class="tama"><p class="box-rotate">MUJER</p></th>
                    <th class="tama"><p class="box-rotate">0-3 A??OS</p></th>
                    <th class="tama"><p class="box-rotate">4-12 A??OS</p></th>
                    <th class="tama"><p class="box-rotate">13-19 A??OS</p></th>
                    <th class="tama"><p class="box-rotate">20-49 A??OS</p></th>
                    <th class="tama"><p class="box-rotate">>= 50 A??OS</p></th>
                    <th class="tama"><p class="box-rotate">ESTIMULACI??N TEMPRANA</p></th>
                    <th  class="tama"><p class="box-rotate">MAGNETOTERAPIA</p></th>
                    <th  class="tama"><p class="box-rotate">ELECTRO ESTIMULACI??N</p></th>
                    <th  class="tama"><p class="box-rotate">ULTRASONIDO</p></th>
                    <th  class="tama"><p class="box-rotate">C.Q.C. O H.</p></th>
                    <th  class="tama"><p class="box-rotate">MASAJE</p></th>
                    <th  class="tama"><p class="box-rotate">EJERCICIOS PASIVOS RESISTIDOS</p></th>
                    <th  class="tama"><p class="box-rotate">LASER</p></th>
                    <th  class="tama"><p class="box-rotate">OTROS</p></th>
                    <th class="tama"><p class="box-rotate">HORAS TRABAJADAS</p></th>
                </tr>

                <tr  class="numero">
                	<td>N??</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                    <td>14</td>
                    <td>15</td>
                    <td>16</td>
                    <td>17</td>
                    <td>18</td>
                    <td>19</td>
                    <td>20</td>
                </tr>
            </thead>
            <tbody>
                @foreach ($Result as $item)
                    <tr>
                        @for($i = 0; $i < 21; $i++)
                            @if ($i===0)
                                <td class="numero">{{$item[$i]}}</td>
                            @endif
                            @if ($i != 0)
                                @if($item[$i] != 0){
                                    <td>{{$item[$i]}}</td>
                                }@else{
                                    <td></td>
                                }@endif
                                
                            @endif

                        @endfor
                    </tr>
                @endforeach

            </tbody>
            <tfoot>
                <tr>
                <th class="total"> TOTAL</th>
                @for($i = 1 ; $i < 21; $i++)
                   @if($i!=20)
                    <td> {{$Total[0][$i]}} </td>
                    @endif
                    @if($i===20)
                    <td class="result">{{$Total[0][$i]}}</td>
                    @endif

                 @endfor
                </tr>
            </tfoot>
        </table>
    </div>

        <div>
            <div class="doc">
                <div class="firma"></div>
                LCDO.  CARLOS ZAMBRANO MOREIRA
                    <div class="cargo"> ??REA DE REHABILITACI??N FISICA
                </div>

            </div>


            <div >
                <table class="segt" >
                    <thead>
                        <tr>
                            <th class="th"> MES</th>
                            <th class="th"> A??O</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="th">{{$mes}}</th>
                            <td class="td"> {{$Year}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>


</div>


</body>
</html>
