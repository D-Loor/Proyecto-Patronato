<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receta</title>

    <style>

        @page {
            margin-top:20px;
            margin-bottom:0px;
            margin-right:20px;
            margin-left:20px;
           
        }
        
        .contenedor{
            max-width: 800px;
            height: 516px;
            border: 1px solid rgb(0,200,0); 
        }
        .LogoJunin{
            margin-left: 20px;
            margin-top: 10px !important;
            height:60px;
            weight:125px;
        }
        .LogoPatronato{
            float:right;
            margin-right: 20px;
            margin-top:10px !important;
            height:55px;
            weight:100px;
        }
        .LogoCentral{
            position: absolute;
            opacity:0.3;
            margin-top: 150px !important;
            margin-left: 100px !important;
            max-height: 130px;
        }
       .Doctor{
            position: absolute;
            margin-top: 275px !important;
            margin-left: 385px !important;
            max-height: 130px;
            color:#125D98; 
            font-family: "Segoe IU", sans-serif;

       }
       .Rol{
            margin-left: 55px !important;
            font-size:9px;
       }
       .Nombre{
            letter-spacing: 0.03em;
            font-size:12px;
       }
       .texto{
           margin-top:20px;
           margin-left:20px;
           font-family: "Segoe IU", sans-serif;
           color:#125D98;  
       }
       .linea1{
           
       }

    </style>
</head>
<body>

    

    <div class="contenedor">
    <img src="imagenes/logoCompleto.png" class="LogoJunin">
    <img src="imagenes/LogoPatronato.jpg" class="LogoPatronato">
    
    <div class="texto">
       <span>Nombre</span> <span class="linea1">Diego Oswaldo Loor Morán</span>

       <br>

       <span>Peso</span> <span class="linea1">60 Kg</span> 
       <span>Talla</span> <span class="linea1">1.76 m</span> 
       <span>T.A.</span> <span class="linea1">xxxx</span>
       <span>Edad</span> <span class="linea1">21 años</span>

       <br>

       <span>Fecha</span> <span class="linea1">22</span>
       <span>de</span> <span class="linea1">Junio</span>
       <span>de 20</span> <span class="linea1">21</span>
       
       <br>
       <br>

       <span>Rp.</span> 

    </div>

    <img src="imagenes/logoCompleto.png" class="LogoCentral">


        <div class="Doctor">
            <div class="Nombre"> DR. MARTÍN DUEÑAS INTRIAGO</div>
            <div class="Rol">MÉDICO CIRUJANO</div>
        </div>
    </div>


</body>
</html>
