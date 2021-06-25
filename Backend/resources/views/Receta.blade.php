<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receta</title>

    <style>

        @page {
            margin-top:0px;
            margin-bottom:0px;
            margin-right:20px;
            margin-left:3px;
           
        }
        .datos{
           
            font-size:18px;
            position: relative;
            padding-top: 127px;
        }
        .portada{
            width: 789px;
            height: 559px;
            position: absolute;
        }
        .nombre{
            margin-left:85px;
            
        }
        .peso{
            position: absolute;
            font-size:17px;
            word-spacing: -8px !important;
            letter-spacing: -1px;
            margin-left:60px;
        }
        .talla{
            position: absolute;
            font-size:17px;
            word-spacing: -5px !important;
            letter-spacing: -2px;
            margin-left:144px;
        }
        .ta{
            position: absolute;
            font-size:17px;
            word-spacing: -6px !important;
            letter-spacing: -1px;
            margin-left:230px;
        }
        .edad{
            position: absolute;
            font-size:17px;
            word-spacing: -4px !important;
            letter-spacing: -2px;
            margin-left:327px;
        }
        .dia{
            position: absolute;
            font-size:17px;
            word-spacing: -5px !important;
            letter-spacing: -2px;
            margin-left:98px;
        }
        .mes{
            position: absolute;
            font-size:17px;
            word-spacing: -6px !important;
            letter-spacing: -1px;
            margin-left:208px;
        }
        .anio{
            position: absolute;
            font-size:17px;
            word-spacing: -4px !important;
            letter-spacing: -2px;
            margin-left:348px;
        }
        .fecha{
            padding-top:-2px !important;
        }
        .rp{          
            
            word-spacing: -4px !important;
            letter-spacing: -1px; 
           font-size:19px;
           position: relative;
           
           
       }
       .pres{
            word-spacing: -4px !important;
            letter-spacing: -1px;
           font-size:19px;
           position: relative;

       }
      
       .cont1{
            
           position: absolute;
           padding-top: 50px;
           max-width: 365px;
           padding-left: 20px;
       }
       .tdatos{
           
           font-size:18px;
           top:5px;
           left:20px;
           position: relative;

       }
       .celdai{
        padding-top:5px;
        width: 365px !important;
       }
       .celdad{
        width: 365px !important;
       }
        tr td{
            font: oblique lighter monospace;
            font-weight:0;
        }
        strong{
            font: oblique 300 monospace;

        }

    </style>
</head>
<body>

    @if ($color === 1) 
    <img src='imagenes/receta1.jpg' class="portada">
    @endif
    @if ($color === 2) 
    <img src='imagenes/receta2.jpg' class="portada">
    @endif
   
  
  
  <div class="datos">
    <samp class="nombre"> {{$nombre}}</samp>
    <br>
    <samp class="peso"> {{$peso}}</samp>
    <samp class="talla"> {{$talla}}</samp>
    <samp class="ta">  {{$ta}} </samp>
    <samp class="edad">  {{$edad}}</samp>
    <br>
    <div class="fecha">
        <samp class="dia">  {{$dia}}</samp>
        <samp class="mes">  {{$mes}}</samp>
        <samp class="anio">  {{$year}}</samp>
    </div>
    
  </div>

  <div class="tdatos">
       <table>
        @for($i = 0; $i<= $conteo; $i++) 
 
                @if ($i === 0) 

                    <tr>
                        <td class="celdai">  </td>
                        <td class="celdad"> <strong>{{$i+1}})</strong> {{$pres[$i]}}</td>
                    </tr>

                @endif
                @if ($i === $conteo)     

                    <tr>
                        <td class="celdai"> <strong>{{$i}})</strong> {{$rp[$i-1]}} </td>
                        <td class="celdad"> </td>
                    </tr> 

                @endif
                @if ($i != $conteo && $i != 0)     

                    <tr>
                        <td class="celdai"> <strong>{{$i}})</strong> {{$rp[$i-1]}} </td>
                        <td class="celdad"> <strong>{{$i+1}})</strong>  {{$pres[$i]}}</td>
                    </tr> 

                @endif

        @endfor
       </table>
  </div>


</body>
</html>
