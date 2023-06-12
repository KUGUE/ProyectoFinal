<?php
include("showaccount.php");
$conexion = mysqli_connect("localhost", "root", "", "zwdesingn");
if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}

// Obtener el ID del usuario logueado
$idUsuario = $id; // Reemplaza esto con el ID del usuario logueado

// Obtener los proyectos del usuario logueado
$sql = "SELECT * FROM proyectos WHERE usuario_id= '$idUsuario'";
$resultado = mysqli_query($conexion, $sql);

// Array para almacenar los proyectos encontrados
$proyectos = [];

// Verificar si se encontraron proyectos
if (mysqli_num_rows($resultado) > 0) {
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $proyectos[] = $fila;
    }
}

// Cerrar la conexión a la base de datos
mysqli_close($conexion);

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyectos</title>
    <!-- FAVICON -->
    <link rel="icon" href="../public/images/logo.png">
    <!-- BOOTSTRAP 5.3.0 -->
    <link rel="stylesheet" href="../public/libs/bootstrap-5.3.0/css/bootstrap.min.css">
    <!-- FONT AWESOME -->
    <link rel="stylesheet" href="../public/libs/fontawesome/css/all.min.css">
    <!-- MAIN CSS -->
    <link rel="stylesheet" href="../public/css/main.css">
</head>

<body class="bgcolor-primary">
    <!-- HEADER -->
    <nav id="header" class="navbar navbar-expand-lg navbar-dark text-white bgcolor-secondary">
        <div class="container">
            <a class="navbar-brand d-flex" href="../index.php">
                <img src="../public/images/logo.png" height="60" alt="asd">
            </a>
            <a class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon text-white fs-22"></span>
            </a>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav navbar-options">
                    <li class="nav-item">
                        <div class="user-data d-flex flex-column text-end pe-lg-4 pe-0 pt-lg-0 pt-3">
                            <h3><?php echo $nombre1; ?></h3>
                            <h4 class="text-lg-end text-center"><?php echo $correo3; ?></h4>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link px-3 my-3 main-btn logout-btn" href="../index.php">Cerrar sesión</a>
                    </li>
                    <li class="nav-item">
                        <a id="Nuevoproyecto"
                            class="nav-link px-3 my-3 main-btn logout-btn" href="user-project.php">Nuevo proyecto</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="">
        <div class="container d-flex flex-column h-100 p-5">
            <h1 class="text-center text-md-start mb-3">
                Tempalates
            </h1>
            <div class="designs-list row">

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card-design mb-4 p-2">
                        <img src="../public/images/diseño-preview.png" class="mb-3" alt="">
                        <div class="d-flex justify-content-center ">
                            <button type="button" class="nav-link px-3 my-3 main-btn ">
                                ELIMINAR
                            </button>
                            <button type="button" class="nav-link px-3 my-3 main-btn ">
                                EDITAR
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card-design mb-4 p-2">
                        <img src="../public/images/diseño-preview2.png" class="mb-3" alt="">
                        <div class="d-flex justify-content-center ">
                            <button type="button" class="nav-link px-3 my-3 main-btn ">
                                ELIMINAR
                            </button>
                            <button type="button" class="nav-link px-3 my-3 main-btn ">
                                EDITAR
                            </button>
                        </div>
                    </div>

                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card-design mb-4 p-2">
                        <img src="../public/images/diseño-preview3.png" class="mb-3" alt="">
                        <div class="d-flex justify-content-center ">
                            <button type="button" class="nav-link px-3 my-3 main-btn ">
                                ELIMINAR
                            </button>
                            <button type="button" class="nav-link px-3 my-3 main-btn ">
                                EDITAR
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="main-content user-designs">
        <div class="container d-flex flex-column h-100 p-5">
            <h1 class="text-center text-md-start mb-3">Actividad reciente</h1>
            <div class="designs-list row">
                <?php
                if (count($proyectos) > 0) {
                    
                    foreach ($proyectos as $proyecto) {
                        $imagenBase64 = base64_encode($proyecto['imagen_proyecto']);
                        echo '
                        <div class="col-lg-3 col-md-4 col-sm-6">
                            <div class="card-design mb-4 p-2">
                                <img src="data:image/jpg;base64,' . $imagenBase64 . '" class="mb-3" alt="">
                                <h4 class="text-left">' . $proyecto['nombre_proyecto'] . '</h4> 
                                <div class="d-flex justify-content-center">
                                <button id="eliminar"type="button" class="nav-link px-3 my-3 main-btn" data-id="' . $proyecto['id'] . '" onclick="eliminarProyecto(' . $proyecto['id'] . ')">ELIMINAR</button>
                                <button type="button" class="nav-link px-3 my-3 main-btn"  onclick="editarProyecto(' . $proyecto['id'] . ')">EDITAR</button>
                                </div>
                            </div>
                        </div>';
                    }
                } else {
                    echo '<p>No se encontraron proyectos.</p>';
                }
                ?>
            </div>
        </div>
    </div>

    <!-- SCRIPTS -->
    <script src="../public/libs/bootstrap-5.3.0/js/bootstrap.bundle.min.js"></script>
    <script src="../public/js/jquery-3.6.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="userproject.js"></script>
    <script src="main.js"></script>
</body>
</html>
