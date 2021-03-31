<?php

$usuario = "root"; 
$password = ""; 
$endpoint = "localhost";
$basedatos = "patronato";

$conn = mysqli_connect($endpoint, $usuario, $password, $basedatos);


$nombres = $_POST['nombres'];
$cedula = $_POST['cedula'];
$especialidad = $_POST['especialidad'];
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];

    $insertar = "INSERT INTO citas (nombres, cedula, especialidad, fecha, hora) VALUES ('$nombres', '$cedula', '$especialidad', '$fecha', '$hora')";
    $validar = "SELECT * FROM citas WHERE cedula = '$cedula'";
    $verificar =  mysqli_query($conn, $validar);

    
    if (mysqli_num_rows($verificar) > 0){
      echo '<script>
      alert ("Usuario ya registrado")
      window.location.href="index.html";
      </script>';
    }else{
    $ingreso = mysqli_query($conn, $insertar);
      echo '<script>
      alert ("Registro con exito")
      window.location.href="index.html";
      </script>';
    }
   

mysqli_close($conn);

?>