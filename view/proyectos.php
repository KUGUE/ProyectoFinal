<?php
include("con_db.php");
// Obtener los datos del formulario
$nombre_proyecto = $_POST['nombre_proyecto'];
$usuario_id = $_POST['usuario_id'];
$imagen_proyecto = $_POST['imagen_proyecto'];
$figuras_json = json_encode($_POST['figuras_json']); // Convertir a JSON
// Conectar a la base de datos

if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}

// FALTA ACTUALZIAR 
$stmt = $conexion->prepare("UPDATE INTO proyectos WHERE (nombre_proyecto, usuario_id, imagen_proyecto, figuras_json) VALUES (?, ?, ?, ?)");
$stmt->bind_param("siss", $nombre_proyecto, $usuario_id, $imagen_proyecto, $figuras_json);

if ($stmt->execute()) {
    echo "Datos insertados correctamente.";
} else {
    echo "Error al insertar los datos: " . $stmt->error;
}
$stmt->close();
$conexion->close();
?>