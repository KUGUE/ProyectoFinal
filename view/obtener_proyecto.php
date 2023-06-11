<?php
include("./showaccount.php");

// Obtener el ID del proyecto desde la solicitud AJAX
$idProyecto = $_POST['idProyecto'];

$conexion = mysqli_connect("localhost", "root", "", "zwdesingn");
if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}

// Obtener los detalles del proyecto y las figuras desde la base de datos
$sql = "SELECT * FROM proyectos WHERE id = '$idProyecto'";
$resultado = mysqli_query($conexion, $sql);

if ($resultado && mysqli_num_rows($resultado) > 0) {
    $proyecto = mysqli_fetch_assoc($resultado);

    // Crear un arreglo con los datos del proyecto y las figuras
    $datosProyecto = array(
        'nombre_proyecto' => $proyecto['nombre_proyecto'],
        'usuario_id' => $proyecto['usuario_id'],
        'imagen_proyecto' => base64_encode($proyecto['imagen_proyecto']),
        'figuras_json' => $proyecto['figuras_json'],
        'figuras_textlong' => $proyecto['figuras_textlong']
    );

    // Convertir el arreglo a formato JSON y enviar la respuesta al cliente
    echo json_encode($datosProyecto);
} else {
    echo "No se encontró el proyecto.";
}

// Cerrar la conexión a la base de datos
mysqli_close($conexion);
?>
