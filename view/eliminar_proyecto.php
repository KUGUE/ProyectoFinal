<?php
// Obtener el ID del proyecto a eliminar desde la solicitud AJAX
$idProyecto = $_POST['idProyecto'];

// Realizar la lógica para eliminar el proyecto en la base de datos
// Puedes utilizar consultas SQL u otros métodos según tu configuración de base de datos

// Ejemplo utilizando MySQLi
$conexion = mysqli_connect("localhost","root","","zwdesingn");
if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}

// Ejecutar la consulta para eliminar el proyecto
$sql = "DELETE FROM proyectos WHERE id = '$idProyecto'";
$resultado = mysqli_query($conexion, $sql);

// Verificar si se eliminó el proyecto correctamente
if ($resultado) {
    // Proyecto eliminado exitosamente
    echo "Proyecto eliminado correctamente";
} else {
    // Error al eliminar el proyecto
    echo "Error al eliminar el proyecto: " . mysqli_error($conexion);
}

// Cerrar la conexión a la base de datos
mysqli_close($conexion);
?>
