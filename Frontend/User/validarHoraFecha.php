<?php

    
//Peticion GET
    $urlHora = "http://127.0.0.1:8000/api/validarHora/{$fechaHora}";
    $datos = file_get_contents($urlHora);
//$horas = array("8:00","8:20","8:40");
    $horario = json_decode($datos);
//echo $horario->result->hora;

    foreach($horario->result as $res){
        echo ($res->hora),' \n';
    }
    
?>
