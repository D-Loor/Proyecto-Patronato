<?php



$data = array(
    'nombres' => $_POST["nombres"],
    'cedula' => $_POST["cedula"],
    'especialidad' => $_POST["especialidad"],
    'fecha' => $_POST["fecha"],
    'hora' => $_POST["hora"]
);

$datosCodificados = json_encode($data);
$url = "http://127.0.0.1:8000/api/Cita";
$ch = curl_init($url);

curl_setopt_array($ch, array(
  // Indicar que vamos a hacer una petición POST
  CURLOPT_CUSTOMREQUEST => "POST",
  // Justo aquí ponemos los datos dentro del cuerpo
  CURLOPT_POSTFIELDS => $datosCodificados,
  // Encabezados
  //CURLOPT_HEADER => true,
  CURLOPT_HTTPHEADER => array(
      'Content-Type: application/json',
      'Content-Length: ' . strlen($datosCodificados), // Abajo podríamos agregar más encabezados
      'Personalizado: ¡Hola mundo!', # Un encabezado personalizado
  ),
  # indicar que regrese los datos, no que los imprima directamente
  CURLOPT_RETURNTRANSFER => true,
));

$resultado = curl_exec($ch);
$codigoRespuesta = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if($codigoRespuesta === 200){
    # Decodificar JSON porque esa es la respuesta
    $respuestaDecodificada = json_decode($resultado);
    # Simplemente los imprimimos
    echo "<strong> </strong>" . $respuestaDecodificada->result;
}else{
    # Error
    echo "Error consultando. Código de respuesta: $codigoRespuesta";
}
curl_close($ch);



$fechaHora = $_POST["fecha"];
//Peticion GET
$urlHora = "http://127.0.0.1:8000/api/validarHora/{$fechaHora}";
$datos = file_get_contents($urlHora);
$horas = array("8:00","8:20","8:40");
//$horario = json_decode($datos);
//echo $horario->result->hora;

//foreach($horario->result as $res){
//echo ($res->hora),' \n';
//}

?>