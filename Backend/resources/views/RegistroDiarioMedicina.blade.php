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
            margin-left:-5px;
        }
        .doc , .doc .cargo {
            font-size:13px;
            font-weight: bold;
            padding-left:15px;
            margin:0px;
        }
        .cargo{
            margin-left: 5px;
        }

        h4 {
            font-size: 24px;
            position: absolute;
            margin-top:10px !important;
            text-align: center;
            padding-left: 215px ;
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
            font-size:11px;
        }
        .subtema{
            font-weight:bold;
            font-size:10px;
        }
        .subtema2{
            font-weight: none !important;
            font-size:10px;
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
            margin-left:1220px;
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

    <!--style>

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
                
                
                padding: 5px;
                font-size: 8px;
                text-align: center;
                border: solid 1px black;    
        }

        .segunda-fila{
            font-weight: none !important;
            font-size:10px;
            min-width: 20px !important;
            width: 10px;
            height: 80px;
        }
    
        .encabezado{
            height: -25px !important;
        }
        .individual{
            width: -5px !important;
        }

        thead tr th{
            color: rgb(0, 112, 192);
            font-weight:none;
        }
        .doc{
            padding-left: 60px;
            position:absolute;

        }
        .firma{
            margin-top: 70px;
            text-align: center;
            border-top: solid 1px black;
            width:290px;
            height: 5px;
            margin-left:-22px;
        }
        .doc , .doc .cargo {
            font-size:13px;
            font-weight: bold;
            padding-left:10px;
            margin:0px;
        }
        .cargo{
            margin-left: 5px;
        }
        .text-space{
            padding: 5px;
            padding-bottom: 5px;
        }
        h4 {
            position: absolute;
            margin:0px;
            text-align: center;
            padding:100px ;
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
        .resul{
            color: rgb(255, 0, 0);
        }
        .ver{
            color: rgb(0, 176, 80);
        }
        .item{
            font-size: 10px;
            font-weight:bold;
            color: rgb(0, 112, 192);
            padding-left:10px ;
        }
        .subt{
            padding-left:230px ;
        }

        .items{
            font-size:15px;
            font-weight:bold;
        }
        .segt{
            position: relative;
            margin-left:720px;
            margin-top: 60px;
            margin-right:100px;
            padding-right:100px;
        }
        .box-rotate {
            -moz-transform: rotate(270deg);  /* FF3.5+ */
            -o-transform: rotate(270deg);  /* Opera 10.5 */
            -webkit-transform: rotate(270deg);  /* Saf3.1+, Chrome */
        }
        .nborde{
            border: none;
        }

        .dario{
            table-layout: fixed;
            width: 1570px;
        }
        .th, .td {
            width: 80px !important;
            height: 6px !important;
            padding: 1px;
            text-align: center;
            border: solid 1px black;
        }
        

    </style-->
</head>
<body>

<div class="separador"></div>

    <div class="contenedor">

   <img src="imagenes/LogoJunin.jpg" class="LogoJunin">
    <img src="imagenes/LogoPatronato.jpg" class="LogoPatronato">

    <h4> UNIDAD DE ASISTENCIA SOCIAL DEL G.A.D MUNICIPAL JUNÍN <br> REGISTRO DIARIO DE ATENCIÓN Y CONSULTAS MÉDICAS</h4>
    <div class="contenido">
     

        <table class="espacios">
            <thead>
                <tr>
                    <th class="nborde" colspan="13"></th>
                    <th colspan="12" class="tema">ATENCIÓN PREVENTIVA</th>
                    <th colspan="16" class="tema">ATENCIÓN PREVENTIVA </th>
                    <th class="nborde"></th>
                </tr>
                <tr>
                    <th colspan="1" rowspan="4" class="tema">N°</th>
                    <th colspan="6" rowspan="4" class="tema">APELLIDOS Y NOMBRES / H.C</th>
                    <th class="subtema" colspan="3">LUGAR DE ATENCIÓN</th>
                    <th rowspan="3" class="subtema2"> <p class="box-rotate">TOTAL ATENCIONES</p> </th>
                    <th class="subtema" colspan="2">SEXO</th>
                    <th class="subtema" colspan="4">MUJERES</th>
                    <th class="subtema" colspan="5">NIÑOS</th>
                    <th rowspan="3" class="subtema2"><p class="box-rotate"> 10-14 AÑOS</p></th>
                    <th class="subtema2" rowspan="3"><p class="box-rotate"> 15-19 AÑOS</p></th>
                    <th class="subtema2" rowspan="3"> <p class="box-rotate"> >=20 AÑOS</p></th>
                    <th class="subtema" colspan="10">GUPOS DE EDAD - MORBILIDAD</th>
                    <th class="subtema" rowspan="4" colspan="6">DIAGNÓSTICO</th>
                    <th class="tema" colspan="3">TIPOS DE ATENCIÓN</th>
                    <th class="subtema" colspan="2">CONDICIÓN DE DIAGNOSTICO</th>
                    <th class="nborde"></th>
                </tr>
                <tr>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">PATRONATO</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">COMUNIDAD</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">DOMICILIO</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">HOMBRE</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">MUJER</p></th>
                    <th class="subtema" colspan="2">PRE NATAL</th>
                    <th class="subtema" colspan="2">PLANIF. FAMILIAR</th>
                    <th class="subtema" colspan="2">1 AÑO</th>
                    <th class="subtema" colspan="2">1 - 4 AÑOS</th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">5-9 AÑOS</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate"> -1 MES </p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">1-11 MESES</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">1-4 AÑOS</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">5-9 AÑOS</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">10-14 AÑOS</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">15-19 AÑOS</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">20-35 AÑOS</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">36-49 AÑOS</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">50-64 AÑOS</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">+65 AÑOS </p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">PREVENCIÓN</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">PRIMERA</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">SUBSECUENTE</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">PRESUNTIVO</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">DEFINITIVO</p></th>
                    <th class="subtema2" rowspan="2"><p class="box-rotate">CERTIFICADO DE SALUD</p></th>
                    <th class="nborde"></th>
                </tr>
                <tr>
                <th class="subtema2"><p class="box-rotate">PRIMERA</p></th>
                <th class="subtema2"><p class="box-rotate">SUBSECUENTE</p></th>
                <th class="subtema2"><p class="box-rotate">PRIMERA</p></th>
                <th class="subtema2"><p class="box-rotate">SUBSECUENTE</p></th>
                <th class="subtema2"><p class="box-rotate">PRIMERA</p></th>
                <th class="subtema2"><p class="box-rotate">SUBSECUENTE</p></th>
                <th class="subtema2"><p class="box-rotate">PRIMERA</p></th>
                <th class="subtema2"><p class="box-rotate">SUBSECUENTE</p></th>
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
                    <td>20</td>
                    <td>21</td>
                    <td>22</td>
                    <td>23</td>
                    <td>24</td>
                    <td>25</td>
                    <td>26</td>
                    <td>27</td>
                    <td>28</td>
                    <td>29</td>
                    <td>30</td>
                    <td>31</td>
                    <td>32</td>
                    <td>33</td>
                    <td>34</td>
                    <th class="nborde"></th> 
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td colspan="6"></td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td colspan="6">V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <td>V</td>
                    <th class="nborde"></th>
                </tr>

                
            </tbody>
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
                            <th class="th"> MES</th>
                            <th class="th"> AÑO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="td">ENERO</th>
                            <td class="td"> 2018</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


</div>


</body>
</html>


