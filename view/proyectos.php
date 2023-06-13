<?php
include("./showaccount.php");

$conexion = mysqli_connect("localhost", "root", "", "zwdesingn");
if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}
$idProyecto = $_POST['idProyecto'];
// Obtener los datos del proyecto del formulario
$nombreProyecto = $_POST['nombre_proyecto'];
$idUsuario = $_POST['usuario_id'];
$imagenProyectoBase64 = $_POST['imagen_proyecto'];
$figurasJson = $_POST['figuras_json'];
$figurasTextLong = $_POST['figuras_textlong'];

// Convertir la imagen Base64 a un objeto de imagen
$imagenProyecto = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imagenProyectoBase64));


// Verificar si hay un proyecto existente con el mismo nombre
$sql = "SELECT id FROM proyectos WHERE nombre_proyecto = ? AND usuario_id = ?";
$stmt = mysqli_prepare($conexion, $sql);
mysqli_stmt_bind_param($stmt, 'si', $nombreProyecto, $idUsuario);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);

if (mysqli_stmt_num_rows($stmt) > 0) {
    // Si hay un proyecto existente, realizar la actualización
    $sql = "UPDATE proyectos SET imagen_proyecto = ?, figuras_json = ?, figuras_textlong = ? WHERE nombre_proyecto = ? AND usuario_id = ?";
    $stmt = mysqli_prepare($conexion, $sql);
    mysqli_stmt_bind_param($stmt, 'ssssi', $imagenProyecto, $figurasJson, $figurasTextLong, $nombreProyecto, $idUsuario);
    mysqli_stmt_execute($stmt);

    if (mysqli_stmt_affected_rows($stmt) > 0) {
        echo 'Proyecto actualizado exitosamente.';
    
    } else {
        echo 'Error al actualizar el proyecto.';
    }
} else {
    // Si no hay un proyecto existente, realizar la inserción
    $sql = "INSERT INTO proyectos (nombre_proyecto, usuario_id, imagen_proyecto, figuras_json, figuras_textlong) VALUES (?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($conexion, $sql);
    mysqli_stmt_bind_param($stmt, 'sisss', $nombreProyecto, $idUsuario, $imagenProyecto, $figurasJson, $figurasTextLong);
    mysqli_stmt_execute($stmt);

    if (mysqli_stmt_affected_rows($stmt) > 0) {
        echo 'Proyecto guardado exitosamente.';
    } else {
        echo 'Error al guardar el proyecto.';
    }
}

// Cerrar la conexión a la base de datos
mysqli_stmt_close($stmt);
mysqli_close($conexion);
?>




