<?php
include("ShowAccount.php")

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AREA DE PRUEBAS</title>
    <!-- BOOTSTRAP 5.3.0 -->
    <link rel="stylesheet" href="../public/libs/bootstrap-5.3.0/css/bootstrap.min.css">
    <!-- FONT AWESOME -->
    <link rel="stylesheet" href="../public/libs/fontawesome/css/all.min.css">
    <!-- MAIN CSS -->
    <link rel="stylesheet" href="../public/css/main.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>
</head>

<body class="user-project">
    <form action="" method="" class="d-flex flex-column h-100">
        <!-- TOOLBAR -->
        <div class="header-toolbar ps-2">
            <!-- FIGURES BAR -->
            <div class="figures-bar d-flex align-items-center">
                <div class="d-flex">
                    <button onclick="seleccionar()" type="button" class="mx-1">
                        <img src="../public/images/icono-cursor.png" alt="">
                    </button>
                    <button onclick="pintarCuadrados()" type="button" class="mx-1">
                        <img src="../public/images/icono-cuadrado.png" alt="">
                    </button>
                    <button onclick="pintarLineas()" type="button" class="mx-1">
                        <img src="../public/images/icono-linea-diagonal.png" alt="">
                    </button>
                    <button onclick="pintarCirculos()" type="button" class="mx-1">
                        <img src="../public/images/icono-circulo.png" alt="">
                    </button>
                    <button onclick="addText()" type="button" class="mx-1">
                        <img src="../public/images/icono-texto.png" alt="">
                    </button>
                    <button onclick="Eliminar()" type="button" class="mx-1">
                        <img src="../public/images/eliminar.png" alt="">
                    </button>
                </div>
            </div>
            <div class="project-save   d-flex ">
                <div class="d-flex justify-content-end">
                    <label for="">NOMBRE DEL PROYECTO :</label>
                    <input min="0" type="text" name="" id="nombreProyectoInput">
                </div>
                <a class="main-btn save-btn px-3 align-right" href="user-designs.php" >MIS PROYECTOS</a>
                <button onclick="capturarLienzoYGuardar(<?php echo $id ?>)" type="button" class="mx-1">GUARDAR CAMBIOS</button>
            </div>
        </div>

        <div class="d-flex h-100">
            <!-- SIDEBAR ELEMENTS -->
            <div class="sidebar-elements bgcolor-tertiary px-2">
                <h2 class="text-center p-3">
                    Elementos
                </h2>
                <div class="col-12 mb-2 d-flex">
                    <button class="nav-link main-btn" id="up" onclick="moveShapeDown()" type="button"
                        style="display: inline-block; width: 100%;">
                        <i class="fa-solid fa-arrow-up"></i>
                    </button>
                    <button class="nav-link main-btn" onclick="moveShapeUp()" id="down" type="button"
                        style="display: inline-block; width: 100%;">
                        <i class="fa-solid fa-arrow-down"></i>
                    </button>
                </div>
                <!-- ROW -->
                <div class="row">
                    <!-- COLUMN -->
                    <div class="col-12">
                        <div id="sidebar-elements"></div>
                    </div>
                </div>
            </div>

            <!-- CANVAS AREA -->
            <div class="canvas">
                <input type="hidden" value="<?php echo $_SESSION['proyecto_id']; ?>" id="obtener_id">
                <div id="sidebar"></div>
            </div>
            <!-- SIDEBAR OPTIONS -->
            <div class="sidebar-options bgcolor-tertiary">
                <div class="measures px-2 mb-0">
                    <div class="col-6 mb-2" id="medidas">
                        <h2 class="text-center px-2 my-3">
                            Medidas
                        </h2>
                    </div>
                    <div class="row justify-content-center px-2 m-0">


                        <div class="col-6 mb-2" id="xinput">

                            <div class="d-flex justify-content-end">
                                <label for="">X:</label>
                                <input type="number" name="" id="Xpos" class="ms-2">
                            </div>
                        </div>
                        <div class="col-6 mb-2" id="yinput">
                            <div class="d-flex justify-content-end">
                                <label for="">Y:</label>
                                <input type="number" name="" id="Ypos" class="ms-2">
                            </div>
                        </div>
                        <div class="col-6 mb-2" id="FIGURA1">
                            <div class="d-flex justify-content-end">
                                <label for="">H:</label>
                                <input min="0" type="number" name="" id="height">
                            </div>
                        </div>
                        <div class="col-6 mb-2" id="FIGURA2">
                            <div class="d-flex justify-content-end">
                                <label for="">W:</label>
                                <input min="0" type="number" name="" id="width">
                            </div>
                        </div>
                        <div class="col-6 mb-2" id="CUADRADO">
                            <div class="d-flex justify-content-end">
                                <label for=""><img src="../public/images/rounded.png" alt=""></label>
                                <input min="0" type="number" name="" id="cornerRadius">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="filled px-2 mb-4" id="FIGURA4">
                    <div class="d-flex flex-column text-center mb-3">
                        <h2 class="px-2 mb-0">
                            Relleno
                        </h2>
                    </div>
                    <div class="row  px-2 m-0">
                        <div class="col-12 mb-3">
                            <label for="">Color:</label>
                            <input type="color" name="" id="RellenoColor" class="">
                        </div>
                        <div class="col-12 ">
                            <div class="justify-content-end">
                                <label for="">Opacidad:</label>
                                <input min="0" type="number" name="" id="RellenoOpacidad" class="">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- BORDED -->
                <div class="filled px-2 mb-4" id="FIGURA3">
                    <!-- TITLE -->
                    <div class="d-flex flex-column text-center mb-3">
                        <h2 class="px-2 mb-0">
                            Borde
                        </h2>
                    </div>
                    <!-- INPUTS -->
                    <div class="row justify-content-center px-2 m-0">
                        <!-- INPUT "R" -->
                        <div class="col-12 mb-2">
                            <label for="">Color:</label>
                            <input type="color" name="" id="Bordecolor" class="ms-2">
                        </div>
                        <!-- INPUT "GROSOR" -->
                        <div class="col-12 mb-2">
                            <label for="">Grosor:</label>
                            <input min="0" type="number" name="" id="Bordegrosor" class="ms-2">
                        </div>
                        <!-- INPUT "GROSOR" -->
                        <div class="col-12 mb-2">
                            <label for="">Opacidad:</label>
                            <input min="0" type="number" name="" id="Bordeopacidad" class="ms-2">
                        </div>
                    </div><!-- end row -->
                </div><!-- end filled -->
                <!-- BORDED -->
                <div class="filled px-2 mb-4" id="TEXTO">
                    <!-- TITLE -->
                    <div class="d-flex flex-column text-center mb-3">
                        <h2 class="px-2 mb-0">
                            TEXTO
                        </h2>
                    </div>
                    <!-- INPUTS -->
                    <div class="row justify-content-center px-2 m-0">
                        <!-- INPUT "R" -->
                        <div class="col-12 mb-2 d-flex">
                            <label for="">texto:</label>
                            <input type="text" name="" id="texto" class="flex-grow-1">
                        </div>
                        <div class="col-12 mb-2">
                            <label for="">tamaño:</label>
                            <input type="number" name="" id="tamañotexto">
                        </div>
                    </div><!-- end row -->
                </div><!-- end filled -->
            </div>
        </div>
    </form>
</body>
<script src="userproject.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

</html>
