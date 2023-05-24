<?php

    
    include("con_db.php");
    include("Loguearse.php");
    $activo = $_SESSION['activo'];

    $busqueda = $conex->query("SELECT * FROM USUARIOS WHERE ID = (SELECT ID FROM USUARIOS WHERE CORREO = '$activo')");

    while ($alumnosFila = $busqueda->fetch_assoc()) {
        $nombre1 = $alumnosFila['nombre'];
        $correo3 = $alumnosFila['correo'];
    }

