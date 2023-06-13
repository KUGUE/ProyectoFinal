<?php
include("showaccount.php");

$conexion = mysqli_connect("localhost", "root", "", "zwdesingn");
if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}

// Obtener el ID del usuario logueado
$idUsuario = $id; // Reemplaza esto con el ID del usuario logueado

// Obtener los proyectos del usuario logueado
$sql = "SELECT * FROM proyectos WHERE usuario_id= '$idUsuario'";
$resultado = mysqli_query($conexion, $sql);

// Array para almacenar los proyectos encontrados
$proyectos = [];

// Verificar si se encontraron proyectos
if (mysqli_num_rows($resultado) > 0) {
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $proyectos[] = $fila;
    }
}

// Cerrar la conexión a la base de datos
mysqli_close($conexion);

?>