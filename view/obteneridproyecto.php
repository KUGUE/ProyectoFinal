<?php
include("con_db.php");

$idProyecto = $_POST['idProyecto'];

// Utiliza consultas preparadas para evitar ataques de inyección SQL
$stmt = $conex->prepare("SELECT id, nombre_proyecto, figuras_json FROM PROYECTOS WHERE id = idProyecto");
$stmt->bind_param("s", $idProyecto);
$stmt->execute();
$result = $stmt->get_result();

// Crear un arreglo para almacenar los datos
$datos = array();

while ($row = $result->fetch_assoc()) {
    $nombre = $row['nombre_proyecto'];
    $figuras_json = $row['figuras_json'];
    $id = $row['id'];

    // Agregar los datos al arreglo
    $datos['nombre_proyecto'] = $nombre;
    $datos['figuras_json'] = $figuras_json;
    $datos['id'] = $id;
}

// Convertir el arreglo a formato JSON
$jsonDatos = json_encode($datos);

// Devolver el JSON como respuesta
header('Content-Type: application/json');
echo $jsonDatos;
?>