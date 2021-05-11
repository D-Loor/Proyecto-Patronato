<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box-rotate {
            -moz-transform: rotate(270deg);  /* FF3.5+ */
            -o-transform: rotate(270deg);  /* Opera 10.5 */
            -webkit-transform: rotate(270deg);  /* Saf3.1+, Chrome */
        }

        .la {
    color: blue;
    font-size: 55px;
}
.webera {
    color: gray;
    display: block;
    font-size: 20px;
}
.es{
    -webkit-transform: rotate(-90deg); 
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    transform: rotate(-90deg);
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
    height:20px;
    width:25px;
}
.inline-block{
    display:-moz-inline-stack;
    display:inline-block;
    zoom:1;
    *display:inline; 
}
</style>
<body>
    
    <!--p class="box-rotate"><span>hola como estas</span></p-->

    <div class="contenedor">
  <span class="es inline-block">.es</span>
</div>
</body>
</html>