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
       .cont2{
           position: absolute;
           padding-top: 20px;
           max-width: 377px;
           padding-left: 410px;
       }

    </style>
</head>
<body>

    
    <img src="imagenes/receta1.jpg" class="portada">
  
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

  
  <span class="rp">
    $lineas=0;
    @foreach($rp as $item)
        
        <samp class="cont1">{{$item}}</samp> 

        <br>

        $lineas++;
    @endforeach
  </span>

  <span class="pres">
        <samp class="cont2">{{$pres}}</samp>
  </span>

</body>
</html>
