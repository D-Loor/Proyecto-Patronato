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
                width:20px;
                font-size: 9px;
                font-weight: bold;
                text-align: center;
                border: solid 1px black;
        }

        .segunda-fila{
             height: 90px;
        }
        .encabezado{
            height: -5px !important;
        }
        .individual{
            width: -5px !important;
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
            font-size: 10px;
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

    </style>
</head>
<body>

<div class="separador"></div>

    <div class="contenedor">

   <img src="imagenes/LogoJunin.jpg" class="LogoJunin">
    <img src="imagenes/LogoPatronato.jpg" class="LogoPatronato">

    <h4>UNIDAD DE ASISTENCIA SOCIAL DEL G.A.D MUNICIPAL CANTÓN JUNÍN <br> CONSOLIDADO MENSUAL DE REHABILITACIÓN FÍSICA</h4>
    <div class="contenido">
     

        <table>
            <thead>
                <tr>
                    <th class="numero encabezado" colspan="2">LUGAR DE ATENCIÓN</th>
                    <th class="segunda-fila" rowspan="2">
                        <div  class="box-rotate">
                            <p>TOTAL DE</p>
                            <p>ATENCIONES</p>
                        </div>
                    </th>
                    <th class="numero encabezado" colspan="2">SEXO</th>
                    <th class="numero encabezado" colspan="5">GRUPOS DE EDAD - MORBILIDAD</th>
                    <th class="numero encabezado" colspan="9">TRATAMIENTO</th>
                    <th class="nborde"></th>
                </tr>
                <tr>
                    <th><p class="box-rotate">PATRONATO</p></th>
                    <th><p class="box-rotate">DOMICILIO</p></th>
                    <th><p class="box-rotate">HOMBRE</p></th>
                    <th><p class="box-rotate">MUJER</p></th>
                    <th><p class="box-rotate">0-3 AÑOS</p></th>
                    <th><p class="box-rotate">4-12 AÑOS</p></th>
                    <th><p class="box-rotate">13-19 AÑOS</p></th>
                    <th><p class="box-rotate">20-49 AÑOS</p></th>
                    <th>
                        <div  class="box-rotate">
                            <p> >= 50 AÑOS</p>
                        </div>
                    </th>
                    <th>
                        <div  class="box-rotate">
                            <p>ESTIMULACIÓN</p>
                            <p>TEMPRANA</p>
                        </div>
                    </th>
                    <th><p class="box-rotate">MAGNETOTERAPIA</p></th>
                    <th  class="segunda-fila">
                        <div  class="box-rotate">
                            <p>ELECTRO</p>
                            <p>ESTIMULACIÓN</p>
                        </div>
                    </th>
                    <th><p class="box-rotate">ULTRASONIDO</p></th>
                    <th><p class="box-rotate">C.Q.C. O H.</p></th>
                    <th><p class="box-rotate">MASAJE</p></th>
                    <th>
                        <div  class="box-rotate">
                            <p>EJERCICIOS</p>
                            <p>PASIVOS</p>
                            <p>RESISTIDOS</p>
                        </div>
                    </th>
                    <th><p class="box-rotate">LASER</p></th>
                    <th><p class="box-rotate">OTROS</p></th>
                    <th><p class="box-rotate">HORAS TRABAJADAS</p></th>
                    
                     
                </tr>
               
                <tr  class="numero">
                    <td>1</td>
                    <td>2</td>
                    <td >3</td>
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
                <tr>
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
                            <th class="th">ENERO</th>
                            <td class="td"> 2018</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


</div>


</body>
</html>


