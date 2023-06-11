<?php
include("./showaccount.php");

$conexion = mysqli_connect("localhost", "root", "", "zwdesingn");
if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}

// Obtener los datos del proyecto del formulario
$nombreProyecto = $_POST['nombre_proyecto'];
$idUsuario = $_POST['usuario_id'];
$imagenProyectoBase64 = $_POST['imagen_proyecto'];
$figurasJson = $_POST['figuras_json'];
$figurasTextLong = $_POST['figuras_textlong'];

// Convertir la imagen Base64 a un objeto de imagen
$imagenProyecto = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imagenProyectoBase64));

// Insertar los datos en la base de datos
$sql = "INSERT INTO proyectos (nombre_proyecto, usuario_id, imagen_proyecto, figuras_json, figuras_textlong) VALUES (?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($conexion, $sql);
mysqli_stmt_bind_param($stmt, 'sisss', $nombreProyecto, $idUsuario, $imagenProyecto, $figurasJson, $figurasTextLong);
mysqli_stmt_execute($stmt);

if (mysqli_stmt_affected_rows($stmt) > 0) {
    echo 'Proyecto guardado exitosamente.';
} else {
    echo 'Error al guardar el proyecto.';
}

// Cerrar la conexión a la base de datos
mysqli_stmt_close($stmt);
mysqli_close($conexion);
?>
