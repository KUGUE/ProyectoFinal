<?php
// Obtener los datos del formulario
$nombre_proyecto = $_POST['nombre_proyecto'];
$usuario_id = $_POST['usuario_id'];

// Conectar a la base de datos
$conexion = mysqli_connect("localhost", "root", "", "zwdesingn");
if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}

// FALTA ACTUALZIAR 
$stmt = $conexion->prepare("INSERT INTO proyectos WHERE (nombre_proyecto, usuario_id ) VALUES (?, ?)");
$stmt->bind_param("siss", $nombre_proyecto, $usuario_id);

if ($stmt->execute()) {
    echo "Datos insertados correctamente.";
} else {
    echo "Error al insertar los datos: " . $stmt->error;
}
$stmt->close();
$conexion->close();
?>
