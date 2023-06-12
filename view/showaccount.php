<?php

    
    include("con_db.php");
    include("Loguearse.php");
    $activo = $_SESSION['activo'];

    $busqueda = $conex->query("SELECT * FROM USUARIOS WHERE ID = (SELECT ID FROM USUARIOS WHERE CORREO = '$activo')");

    while ($loguado = $busqueda->fetch_assoc()) {
        $nombre1 = $loguado['nombre'];
        $correo3 = $loguado['correo'];
        $id  = $loguado['id'];
    }

