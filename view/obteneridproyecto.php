<?php
include("con_db.php");

$idProyecto = $_POST['id_proyecto'];

$busqueda = $conex->query("SELECT id, nombre_proyecto, figuras_json FROM PROYECTOS WHERE ID = '3'");

// Crear un arreglo para almacenar los datos
$datos = array();

while ($loguado = $busqueda->fetch_assoc()) {
    $nombre = $loguado['nombre_proyecto'];
    $figuras_json = $loguado['figuras_json'];
    $id = $loguado['id'];

    // Agregar los datos al arreglo
    $datos['nombre'] = $nombre;
    $datos['figuras_json'] = $figuras_json;
    $datos['id'] = $id;
}

// Convertir el arreglo a formato JSON
$jsonDatos = json_encode($datos);

echo $jsonDatos;
?>