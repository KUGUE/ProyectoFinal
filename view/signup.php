<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrarse</title>
    <!-- FAVICON -->
    <link rel="icon" href="../public/images/logo.png">
    <!-- BOOTSTRAP 5.3.0 -->
    <link rel="stylesheet" href="../public/libs/bootstrap-5.3.0/css/bootstrap.min.css">
    <!-- MAIN CSS -->
    <link rel="stylesheet" href="../public/css/main.css">
</head>
<body>
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
                    <li class="nav-item"><a class="nav-link px-3 my-3 main-btn" href="login.php">Iniciar sesión</a></li>
                    <li class="nav-item"><a class="nav-link px-3 my-3 main-btn" href="signup.php">Registrarse</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="main-content landing-page">
        <div class="main-banner d-flex justify-content-center align-items-center p-5">
            <div class="container d-flex justify-content-center align-items-center w-100 h-100">
                <div class="card-login p-4">
                    <form action="Loguearse.php" method="post" oninput='repeat_password.setCustomValidity(repeat_password.value != password.value ? "Las contraseñas no coinciden." : "")'>
                        <h1 class="mb-4">
                            REGISTRARSE
                        </h1>
                        <div class="d-flex flex-column mb-3">
                            <label for="username" class="mb-1">Nombre de usuario:</label>
                            <input type="text" name="username" id="" required>
                        </div>
                        <div class="d-flex flex-column mb-3">
                            <label for="email" class="mb-1">Correo electrónico:</label>
                            <input type="email" name="email" id="" required>
                        </div>
                        <div class="d-flex flex-column mb-4">
                            <label for="password" class="mb-1">Contraseña:</label>
                            <input type="password" name="password" id="" required>
                        </div>
                        <div class="d-flex flex-column mb-4">
                            <label for="repeat_password" class="mb-1">Repetir contraseña:</label>
                            <input type="password" name="repeat_password" id="" required>
                        </div>
                        <button type="submit" class="mb-3" name="register_enter">
                            Crear cuenta
                        </button>                      
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
</html>