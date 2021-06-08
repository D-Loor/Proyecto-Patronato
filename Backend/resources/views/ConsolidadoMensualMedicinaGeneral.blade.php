<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consolidado Mensual Medicina General</title>
    <style>
        @page {
            margin: 0cm 1cm;
        }

        * {
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

        }

        img {
            padding-top: 75px;
            padding: 0px;
            margin: 0px;
        }

        .contenedor {
            padding: 50px;
            padding-top: 0px !important;
            margin-top: 0px !important;
        }

        table {
            border-collapse: collapse;
            text-align: center;
        }

        th,
        td {

            width: 20px;
            height: 20px;
            font-size: 13px;
            font-weight: bold;
            text-align: center;
            border: solid 1px black;
        }


        thead tr th {
            color: rgb(0, 112, 192);
            font-weight: none;
        }

        .doc {
            position: absolute;

        }

        .foot {
            padding-left: 150px;
        }

        .firma {
            margin-top: 70px;
            text-align: center;
            border-top: solid 1px black;
            width: 290px;
            height: 5px;
            margin-left: -5px;
        }

        .doc,
        .doc .cargo {
            font-size: 13px;
            font-weight: bold;
            padding-left: 15px;
            margin: 0px;
        }

        .cargo {
            margin-left: 5px;
        }

        h4 {
            font-size: 21px;
            position: absolute;
            margin-top: 10px !important;
            text-align: center;
            padding-left: 195px;
            padding-right: 370px;
            padding-top: 0px;
        }

        .LogoJunin {
            height: 90px;
            weight: 150px;
        }

        .LogoPatronato {
            float: right;
            height: 70px;
            weight: 120px;
        }


        .separador {
            height: 25px;
        }

        .th {
            font-weight: bold;
        }

        .th,
        .td {
            padding: 3px 10px;
        }

        .numero {
            color: rgb(0, 112, 192);
        }

        .total {
            color: rgb(0, 112, 192);
        }

        tfoot tr td {
            font-size: 16px;
            border: solid 1.5px black;
        }

        .prevencion {
            color: rgb(0, 176, 80) !important;
        }

        .tema {
            font-weight: bold;
            font-size: 11px;
        }

        .subtema {
            font-weight: bold;
            font-size: 10px;
        }

        .subtema2 {
            font-weight: none !important;
            font-size: 10px;
            min-width: 20px !important;
            width: 20px;
            height: 20px;
        }

        .ulti th {
            height: 90px;
        }

        .nvertical th,
        .nhorizontal th {
            font-size: 11px;
            padding: 0px !important;
        }

        .nvertical th {
            color: rgb(0, 112, 192);
        }

        .subt {
            padding-left: 230px;
        }

        .segt {
            position: absolute;
            margin-left: 920px;
            margin-top: 55px;
            margin-right: 100px;
            padding-right: 100px;
        }
        

        .nborde {
            border: none;
        }

        .box-rotate {
            -moz-transform: rotate(270deg);
            -o-transform: rotate(270deg);
            -webkit-transform: rotate(270deg);
            margin: 0px;
            padding: 0px;

        }
        tbody td{
            height: 1px;
        }
        .espacios {
            table-layout: fixed;
            width: 1410px;
            
        }
    </style>
</head>

<body>

    <div class="separador"></div>

    <div class="contenedor">

        <img src="imagenes/LogoJunin.jpg" class="LogoJunin">
        <img src="imagenes/LogoPatronato.jpg" class="LogoPatronato">

        <h4>UNIDAD DE ASISTENCIA SOCIAL DEL G.A.D MUNICIPAL CANTÓN JUNÍN CONSOLIDADO MENSUAL DE CONSULTAS MÉDICAS</h4>
        <div class="contenido">


            <table class="espacios">
                <thead>
                    <tr>
                        <th colspan="7" class="nborde"></th>
                        <th colspan="12" class="tema">ATENCIÓN PREVENTIVA</th>
                        <th colspan="10" class="tema"> ATENCIÓN MORBILIDAD</th>
                        <th colspan="7" class="nborde"></th>
                    </tr>

                    <tr>
                        <th rowspan="3" class="nborde"></th>
                        <th colspan="3" class="subtema"> LUGAR DE ATENCIÓN </th>
                        <th rowspan="3" class="subtema2">
                            <p class="box-rotate">TOTAL ATENCIONES</p>
                        </th>
                        <th colspan="2" class="subtema"> SEXO </th>
                        <th colspan="4" class="subtema"> MUJERES </th>
                        <th colspan="5" class="subtema"> NIÑOS </th>
                        <th rowspan="3" class="subtema2">
                            <p class="box-rotate">10-14 AÑOS</p>
                        </th>
                        <th rowspan="3" class="subtema2">
                            <p class="box-rotate">15-19 AÑOS</p>
                        </th>
                        <th rowspan="3" class="subtema2">
                            <p class="box-rotate"> >= 20 AÑOS </p>
                        </th>

                        <th colspan="10" class="subtema"> GRUPOS DE EDAD - MORBILIDAD</th>
                        <th colspan="3" class="tema"> TIPO DE ATENCIÓN </th>
                        <th colspan="2" class="subtema"> CONDICIÓN DIAGNÓSTICO </th>
                        <th colspan="2" class="nborde"> </th>
                    </tr>
                    <tr>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> PATRONATO</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> COMUNIDAD</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> DOMICILIO</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> HOMBRE</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> MUJER</p>
                        </th>
                        <th colspan="2" class="subtema"> PRE NATAL </th>
                        <th colspan="2" class="subtema"> PLANIF. FAMILIAR</th>
                        <th colspan="2" class="subtema"> -1 AÑO </th>
                        <th colspan="2" class="subtema"> 1 - 4 AÑOS </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> 5 a 9 AÑOS</p>
                        </th>

                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> MENOR 1 MES</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> 1-11 MESES</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> 1-4 AÑOS</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> 5-9 AÑOS</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> 10-14 AÑOS</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> 15-19 AÑOS</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> 20-35 AÑOS</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> 36-49 AÑOS</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> 50-64 AÑOS</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> >= 65 AÑOS </p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> PREVENCIÓN</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> PRIMERA</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> SUBSECUENTE</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> PRESUNTIVO</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> DEFINITIVO</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> CERTIFICADO</p>
                        </th>
                        <th rowspan="2" class="subtema2">
                            <p class="box-rotate"> HORAS TRABAJADAS</p>
                        </th>


                    </tr>
                    <tr class="ulti">
                        <th class="subtema2">
                            <p class="box-rotate"> PRIMERA</p>
                        </th>
                        <th class="subtema2">
                            <p class="box-rotate"> SUBSECUENTE</p>
                        </th>
                        <th class="subtema2">
                            <p class="box-rotate"> PRIMERA</p>
                        </th>
                        <th class="subtema2">
                            <p class="box-rotate"> SUBSECUENTE</p>
                        </th>
                        <th class="subtema2">
                            <p class="box-rotate"> PRIMERA</p>
                        </th>
                        <th class="subtema2">
                            <p class="box-rotate"> SUBSECUENTE</p>
                        </th>
                        <th class="subtema2">
                            <p class="box-rotate"> PRIMERA</p>
                        </th>
                        <th class="subtema2">
                            <p class="box-rotate"> SUBSECUENTE</p>
                        </th>

                    </tr>
                    <tr class="nhorizontal">
                        <th>N°</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th>10</th>
                        <th>11</th>
                        <th>12</th>
                        <th>13</th>
                        <th>14</th>
                        <th>15</th>
                        <th>16</th>
                        <th>17</th>
                        <th>18</th>
                        <th>19</th>
                        <th>20</th>
                        <th>21</th>
                        <th>22</th>
                        <th>23</th>
                        <th>24</th>
                        <th>25</th>
                        <th>26</th>
                        <th>27</th>
                        <th>28</th>
                        <th>29</th>
                        <th>30</th>
                        <th>31</th>
                        <th>32</th>
                        <th>33</th>
                        <th>34</th>
                        <th>35</th>
                    </tr>


                </thead>
                <tbody>
                    @foreach ($Result as $item)
                    <tr class="nvertical">
                        @for($i = 0; $i <= 35; $i++) 
                            @if ($i===0) 
                                <th>{{$item[$i]}}</th>
                            @endif
                            @if ($i >= 7 && $i <= 18) 
                                @if($item[$i] != 0){
                                    <td class="prevencion">{{$item[$i]}}</td>
                                }@else{
                                    <td class="prevencion"> </td>
                                }@endif
                            @endif
                            @if ($i === 29)
                                @if($item[$i] != 0){
                                    <td class="prevencion">{{$item[$i]}}</td>
                                }@else{
                                    <td class="prevencion"> </td>
                                }@endif
                            @endif
                            @if ($i >= 1 && $i <= 6 || $i>= 19 && $i <= 28 || $i>= 30 && $i <= 35) 
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
                        <td class="nborde"></td>
                        <td>{{$Total[0][1]}}</td>
                        <td>{{$Total[0][2]}}</td>
                        <td>{{$Total[0][3]}}</td>
                        <td>{{$Total[0][4]}}</td>
                        <td>{{$Total[0][5]}}</td>
                        <td>{{$Total[0][6]}}</td>
                        <td class="prevencion">{{$Total[0][7]}}</td>
                        <td class="prevencion">{{$Total[0][8]}}</td>
                        <td class="prevencion">{{$Total[0][9]}}</td>
                        <td class="prevencion">{{$Total[0][10]}}</td>
                        <td class="prevencion">{{$Total[0][11]}}</td>
                        <td class="prevencion">{{$Total[0][12]}}</td>
                        <td class="prevencion">{{$Total[0][13]}}</td>
                        <td class="prevencion">{{$Total[0][14]}}</td>
                        <td class="prevencion">{{$Total[0][15]}}</td>
                        <td class="prevencion">{{$Total[0][16]}}</td>
                        <td class="prevencion">{{$Total[0][17]}}</td>
                        <td class="prevencion">{{$Total[0][18]}}</td>
                        <td>{{$Total[0][19]}}</td>
                        <td>{{$Total[0][20]}}</td>
                        <td>{{$Total[0][21]}}</td>
                        <td>{{$Total[0][22]}}</td>
                        <td>{{$Total[0][23]}}</td>
                        <td>{{$Total[0][24]}}</td>
                        <td>{{$Total[0][25]}}</td>
                        <td>{{$Total[0][26]}}</td>
                        <td>{{$Total[0][27]}}</td>
                        <td>{{$Total[0][28]}}</td>
                        <td class="prevencion">{{$Total[0][29]}}</td>
                        <td>{{$Total[0][30]}}</td>
                        <td>{{$Total[0][31]}}</td>
                        <td>{{$Total[0][32]}}</td>
                        <td>{{$Total[0][33]}}</td>
                        <td>{{$Total[0][34]}}</td>
                        <td>{{$Total[0][35]}}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="foot">
            <div class="doc">
                <div class="firma"></div>
                DR. FERNANDO MARTIN DUEÑAS INTRIAGO
                <div class="cargo"> DEPARTAMENTO DE ASISTENCIA SOCIAL
                </div>

                
            </div>
            <table class="segt">
                    <thead>
                        <tr>
                            <th class="th"> MES</th>
                            <th class="th"> AÑO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="th">{{$mesL}}</th>
                            <td class="td">{{$anio}}</td>
                        </tr>
                    </tbody>
                </table>
        </div>


    </div>


</body>

</html>