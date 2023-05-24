<?php

SESSION_START();
include("con_db.php");

$_SESSION['activo'];
if (isset($_POST['login_enter'])) {
  loguearse();

}
if (isset($_POST['register_enter'])) {
   register();

}



function loguearse()
{
    echo ("se intento ");
   $inc = include("con_db.php");
   if ($inc) {
      $correo = $_POST['email'];
      $_SESSION['activo'] = $correo;
      $pass = $_POST['password'];
      $consulta = "SELECT * FROM USUARIOS WHERE CORREO = '$correo' and CONTRASEÑA= '$pass'";
      $resultado = mysqli_query($conex, $consulta);
      $filas = mysqli_num_rows($resultado);
      if ($filas) {
echo ("si entro ");
         header("Location: user-designs.php");
      } else {
         header("Location: login.html");
         echo "No entraste guapo";
      }
   }
}
function register()
{

   include("con_db.php");
   $password_re = $_POST['repeat_password'];
   if ($_POST['password'] === $password_re) {
      if (
         strlen($_POST['password']) >= 1 && strlen($_POST['repeat_password']) >= 1 && strlen($_POST['email'])
         >= 1 && strlen($_POST['username']))
       {
         $nombre = $_POST['username'];
         $correo_elec = $_POST['email'];
         $password_one = $_POST['password'];

         $consultaa = "INSERT INTO usuarios(CORREO, CONTRASEÑA,NOMBRE) VALUES ('$correo_elec','$password_one','$nombre')";
         $resultadoo = mysqli_query($conex, $consultaa);
         if ($resultadoo) {
            header("Location: login.html");
         }

      }
      else{
         header("Location: signup.html");
      }
   }
   else{
      header("Location: signup.html");
   }
}