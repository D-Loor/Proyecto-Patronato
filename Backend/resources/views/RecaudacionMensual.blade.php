<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Diario de Atención y Consultas Médicas</title>

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
            padding: 15px;
            padding-top: 0px !important;
            margin-top: 0px !important;
        }

        table{
            padding-top:10px;
            border-collapse: collapse;
            text-align: center;
        }

        .size{
            font-size: 12px;
        }

        th,td {
            width: 20px;
            height: 20px;
            font-size: 11px;
            font-weight: bold;
            text-align: center;
            border: solid 1px black;
        }
        .bori{
            border-right: solid 1px black !important;
        }

        thead tr th{
            color: rgb(0, 112, 192);
            font-weight:none;
        }
        .doc{
            position:absolute;
            padding-top: 20px;

        }
        .foot{
            padding-left:150px;
        }
        .firma{
            margin-top: 70px;
            text-align: center;
            border-top: solid 1px black;
            width:200px;
            height: 5px;
            margin-left:-25px;
        }
        .doc {
            color: rgb(0, 112, 192);
            font-size:9px;
            font-weight: bold;
            padding-left:37%;
            margin:0px;
        }
        .cargo{
            margin-left: -10px;
        }

        h4 {
            font-size: 13px;
            color: rgb(0, 112, 192);
            position: absolute;
            margin-top:0px !important;
            text-align: center;
            padding-left: 100px;
            padding-right: 0px ;
            padding-top: 0px;
        }
        .fecha th {
            font-size: 12px;
        }
        .fecha td{
            font-size: 12px;
        }
        .LogoJunin{
            height:50px;
            weight:150px;
        }
        .LogoPatronato{
            float:right;
            height:35px;
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
            color: rgb(0, 112, 192) !important;
        }

        .temacolor{
            color: rgb(255,0,0);
        }

        .tema{
            font-weight:bold;
            font-size:11px;
        }
        .subtema{
            font-weight:bold;
            font-size:9px;
        }
        .subtema2{
            font-weight: none !important;
            font-size:8px;
            min-width: 20px !important;
            width: 20px;
            height: 80px;
        }
        .ulti th{
            height:90px;
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

        .segt{
            position: relative;
            margin-left:520px;
            margin-top: 20px;
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
           	width: 720px;
        }

        .th{
            color: rgb(255,0,0);
            font-weight:bold;
        }

        .td{
            color: rgb(0, 112, 192);
        }

        .th, .td {
            
            width: 80px !important;
            height: 6px !important;
            padding: 1px;
            text-align: center;
            border: solid 1px black;
        }

        .recauda{
            font-size: 8px;
            color: rgb(0,176,80);
        }

        .recauda2{
            font-size: 8px;
            color: rgb(0,176,80);
            width: 80px !important;
            height: 20px !important;
            padding: 1px;
            text-align: center;
            border: solid 1px black;
            font-weight: bold;
        } 
        .recauda3{
            font-size: 11px;
            width: 50px !important;
            height: 6px !important;
            padding: 1px;
            text-align: center;
            border: solid 1px black;
            font-weight: bold;
        }     

        .segt2{
            position: absolute;
            margin-left:0px;
            margin-top: 20px;
            margin-right:520px;
            padding-right:100px;
        }
    </style>
</head>
<body>

<div class="separador"></div>

    <div class="contenedor">

   <img src="imagenes/LogoJunin.jpg" class="LogoJunin">
    <img src="imagenes/LogoPatronato.jpg" class="LogoPatronato">

    <h4> UNIDAD DE ASISTENCIA SOCIAL DEL G.A.D JUNÍN <br> CONSOLIDADO MENSUAL DE RECAUDACIÓN DE MEDICINA GENERAL Y REHABILITACIÓN FÍSICA</h4>
    <div class="contenido">


        <table class="espacios">
            <thead>
                <tr>
                    <th class="tema" rowspan="3" colspan="2" ><p class="box-rotate">Días</p></th>
                    <th colspan="10" class="tema temacolor">ÁREA: MEDICINA GENERAL</th>
                    <th class="nborde"></th>
                    <th colspan="10" class="tema temacolor">ÁREA: REHABILITACIÓN FÍSICA</th>
                    <th class="nborde"></th>
                </tr>
                
                <tr>
                    <th class="subtema2" colspan="2" ><p class="box-rotate">TOTAL DE ATENCIONES</p></th>
                    <th class="subtema2" colspan="2" ><p class="box-rotate">VALOR POR ATENCION ($1,00)</p></th>
                    <th class="subtema2"  colspan="2"><p class="box-rotate">VALOR REVISION DE EXAMEN ($0,50)</p></th>
                    <th class="subtema2"  colspan="2"><p class="box-rotate">EXONERACIÓN O MUNICIPIALES</p></th>
                    <th class="subtema2"  colspan="2"><p class="box-rotate">TOTAL RECAUDADO</p></th>
                    <th class="nborde"></th>
                    <th class="subtema2"  colspan="2"><p class="box-rotate">TOTAL DE ATENCIONES</p></th>
                    <th class="subtema2" colspan="2" ><p class="box-rotate">VALOR POR ATENCION ($1,00)</p></th>
                    <th class="subtema2" colspan="2" ><p class="box-rotate">VALOR REVISION DE EXAMEN ($0,50)</p></th>
                    <th class="subtema2" colspan="2" ><p class="box-rotate">EXONERACIÓN O MUNICIPIALES</p></th>
                    <th class="subtema2" colspan="2" ><p class="box-rotate">TOTAL RECAUDADO</p></th>
                    <th class="nborde"></th>
                </tr>
                <tr>
                    <th colspan="2">1</th>
                    <th colspan="2">2</th>
                    <th colspan="2">3</th>
                    <th colspan="2">4</th>
                    <th colspan="2">5</th>
                    <th class="nborde"></th>
                    <th colspan="2">6</th>
                    <th colspan="2">7</th>
                    <th colspan="2">8</th>
                    <th colspan="2">9</th>
                    <th colspan="2">10</th>
                    <th class="nborde"></th>
                </tr>

            </thead>
            <tbody>
            @for($i=0 ; $i< 32; $i++)
                <tr>
                    <th class="td" style="font-weight: bold;" colspan="2">1</th>
                    <td colspan="2"></td>
                    <td colspan="2"></td>
                    <td colspan="2"></td>
                    <td colspan="2"></td>
                    <td colspan="2"></td>
                    <th class="nborde"></th>
                    <td colspan="2"></td>
                    <td colspan="2"></td>
                    <td colspan="2"></td>
                    <td colspan="2"></td>
                    <td colspan="2"></td>
                    <th class="nborde"></th>
                </tr>
            @endfor
            </tbody>
            <tfoot>
                <tr>
                    <th class="recauda" colspan="2">TOTAL RECAUD. MENSUAL</th>
                    <th colspan="2"></th>
                    <th colspan="2"></th>
                    <th colspan="2"></th>
                    <th colspan="2"></th>
                    <th colspan="2"></th>
                    <th class="nborde"></th>
                    <th colspan="2"></th>
                    <th colspan="2"></th>
                    <th colspan="2"></th>
                    <th colspan="2"></th>
                    <th colspan="2"></th>
                    <th class="nborde"></th>

                </tr>
            </tfoot>
        </table>

        <div>
            <table class="segt2">
                <thead>
                    <tr>
                        <th class="recauda2">TOTAL RECAUD. MENSUAL MEDICINA Y TERAPIA</th>
                        <td class="recauda3"> {{$recaudacion}}$</td>
                    </tr>
                    <tr>
                        <th class="recauda2">EGRESO</th>
                        <td class="recauda3"> {{$egresos}}$</td>
                    </tr>
                    <tr>
                        <th class="recauda2">SALDO</th>
                        <td class="recauda3"> {{$saldo}}$</td>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="doc">
                <div class="firma"></div>
                LCDA. OBDULIA MARÍA MENDOZA
                    <div class="cargo"> DIRECCIÓN DE DESARROLLO HUMANO
                </div>

            </div>
        <div >
                <table class="segt">
                    <thead>
                        <tr >
                            <th class="th"> MES</th>
                            <th class="th"> AÑO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="fecha">
                            <th class="td">{{$Mes}}</th>
                            <td class="td">{{$Year}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

    </div>


</div>


</body>
</html>


