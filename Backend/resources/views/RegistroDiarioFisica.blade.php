<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Diario de Rehabilitación Física</title>

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
            padding:30px;
            padding-top: 0px !important;
            margin-top: 0px !important;
        }

        table{
            padding-top:10px;
            border-collapse: collapse;
            text-align: center;
        }

        th,td {

            width: 20px;
            height: 20px;
            font-size: 13px;
            font-weight: bold;
            text-align: center;
            border: solid 1px black;
        }


        thead tr th{
            color: rgb(0, 112, 192);
            font-weight:none;
        }
        .doc{
            position:absolute;

        }
        .foot{
            padding-left:150px;
        }
        .firma{
            margin-top: 70px;
            text-align: center;
            border-top: solid 1px black;
            width:290px;
            height: 5px;
            margin-left:-22px;
        }
        .doc{
            font-size:13px;
            font-weight: bold;
            padding-left:100px;
            margin:0px;
        }
        .cargo{
            margin-left: 12px;
        }

        h4 {
            font-size: 24px;
            position: absolute;
            margin-top:10px !important;
            text-align: center;
            padding-left: 248px; 
            padding-right: 370px ;
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
            border: solid 1.5px black;
        }
        .prevencion{
            color: rgb(0, 176, 80) !important;
        }
        .tema{
            font-weight:bold;
            font-size:12px;
        }
        .subtema{
            font-weight:bold;
            font-size:11px;
        }
        .subtema2{
            font-weight: none !important;
            font-size:10px;
            min-width: 20px !important;
            width: 20px;
            height: 120px;
        }
        .subtemaalt{
            
            font-size:11px;
        }
        .ulti th{
            height:90px;
        }

        .size{
            font-size: 11px;
        }

        .nvertical th , .nhorizontal th{
            font-size:11px;
            padding: 0px !important;
        }
        .nvertical th{
            color: rgb(0, 112, 192);
        }
        .subt{
            padding-left:230px ;
        }

        .bori{
            border-right: solid 1px black !important;
        }

        .segt{
            position: relative;
            margin-left:1130px;
            margin-top: 60px;
            margin-right:100px;
            padding-right:100px;
        }
        .nborde{
            border: none;
        }
        .box-rotate {
            -moz-transform: rotate(270deg);
            -o-transform: rotate(270deg);
            -webkit-transform: rotate(270deg);
            margin:0px;
            padding:0px;

        }
        .espacios{
        	table-layout: fixed;
           	width: 1505px;
        }

        .th, .td {
            width: 80px !important;
            height: 6px !important;
            padding: 1px;
            text-align: center;
            border: solid 1px black;
        }
    </style>

   
</head>
<body>

<div class="separador"></div>

    <div class="contenedor">

   <img src="imagenes/LogoJunin.jpg" class="LogoJunin">
    <img src="imagenes/LogoPatronato.jpg" class="LogoPatronato">

    <h4> UNIDAD DE ASISTENCIA SOCIAL DEL GAD MUNICIPAL JUNÍN  <br> REGISTRO DIARIO DE REHABILITACIÓN FÍSICA</h4>
    <div class="contenido">
     

        <table class="espacios">
            <thead>
                <tr>
                    <th class="nborde" colspan="12"></th>
                    <th colspan="10" class="tema">ATENCIÓN MORBILIDAD</th>
                    <th class="nborde"></th>
                </tr>
                <tr>
                    <th colspan="1" rowspan="3" class="tema">N°</th>
                    <th colspan="6" rowspan="3" class="tema">APELLIDOS Y NOMBRES / H.C</th>
                    <th class="subtema" colspan="2">LUGAR DE ATENCIÓN</th>
                    <th rowspan="2" class="subtemaalt"> <p class="box-rotate">TOTAL ATENCIONES</p> </th>
                    <th class="subtema" colspan="2">SEXO</th>
                    <th class="subtema" colspan="5">GRUPOS DE EDAD - MORBILIDAD</th>
                    <th class="subtemaalt" rowspan="3" colspan="5">DIAGNÓSTICO</th>
                    <th class="subtema" colspan="9">TRATAMIENTO</th>
                    <th class="nborde"></th>
                </tr>
                <tr>
                    <th class="subtema2" ><p class="box-rotate">PATRONATO</p></th>
                    <th class="subtema2" ><p class="box-rotate">DOMICILIO</p></th>
                    <th class="subtema2" ><p class="box-rotate">HOMBRE</p></th>
                    <th class="subtema2" ><p class="box-rotate">MUJER</p></th>
                    <th class="subtema2" ><p class="box-rotate">0-3 AÑOS</p></th>
                    <th class="subtema2" ><p class="box-rotate">4-12 AÑOS </p></th>
                    <th class="subtema2" ><p class="box-rotate">13-19 AÑOS</p></th>
                    <th class="subtema2" ><p class="box-rotate">20-49 AÑOS</p></th>
                    <th class="subtema2" ><p class="box-rotate">50 AÑOS Y MÁS</p></th>
                    <th class="subtema2" ><p class="box-rotate">ESTIMULACION TEMPRANA</p></th>
                    <th class="subtema2" ><p class="box-rotate">MAGNETOTERAPIA</p></th>
                    <th class="subtema2" ><p class="box-rotate">ELECTRO ESTIMULACION</p></th>
                    <th class="subtema2" ><p class="box-rotate">ULTRASONIDO</p></th>
                    <th class="subtema2" ><p class="box-rotate">C.Q.C. O H.</p></th>
                    <th class="subtema2" ><p class="box-rotate">MASAJE</p></th>
                    <th class="subtema2" ><p class="box-rotate">EJERCICIOS PASIVOS/ RESISTIDOS</p></th>
                    <th class="subtema2" ><p class="box-rotate">LASER</p></th>
                    <th class="subtema2" ><p class="box-rotate">OTROS</p></th>
                    <th class="nborde"></th>
                </tr>
                <tr  class="numero">
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
                    <th class="nborde"></th> 
                </tr>
            </thead>
            <tbody>
            @foreach ($Result as $item)
                    <tr >

                        @for($i = 0; $i <= 21; $i++)

                            @if ($i === 0)
                                <td class="prevencion">{{$item[$i]}}</td>
                            @endif
                            @if ($i === 1)
                                <td colspan="6">{{$item[$i]}}</td>
                            @endif
                            @if ( $i === 12)
                                <td colspan="5">{{$item[$i]}}</td>
                            @endif
                            @if ($i != 1 && $i != 12 && $i != 0 && $i != 21)
                                <td>{{$item[$i]}}</td>
                            @endif
                            @if ($i == 21)
                                <td class="bori">{{$item[$i]}}</td>
                                <th class="nborde"></th>
                            @endif

                        @endfor
                    </tr>
                @endforeach

                
            </tbody>
            <tfoot>
                <tr>
                <th class="nborde" colspan="1"></th>
                <th colspan="6" class="total"> TOTAL</th>
                @for($i=0; $i < 19; $i++)
                <th>{{$TOTAL[$i]}}</th>
                    @if(($i==9))
                        <th colspan="5"></th>
                    @endif
                @endfor
                <th class="nborde"></th>
                </tr>
            </tfoot>
        </table>
    </div>

        <div>
            <div class="doc">
                <div class="firma"></div>
                LCDO.  CARLOS ZAMBRANO MOREIRA
                    <div class="cargo"> ÁREA DE REHABILITACIÓN FISICA
                </div>

            </div>


            <div >
                <table class="segt" >
                    <thead>
                        <tr>
                            <th class="th"> DIA</th>
                            <th class="th"> MES</th>
                            <th class="th"> AÑO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th class="td">{{$dia}}</th>
                            <th class="td">{{$mes}}</th>
                            <td class="td">{{$anio}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


</div>


</body>
</html>


