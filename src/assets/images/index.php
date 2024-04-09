<?php
require 'funciones.php';
require 'config.php';
$conexion = conexion($bd_config);
if (!$conexion) {
    echo "error";
}
$consulta = obtenerdatos($conexion);
require 'vista/index.php';
?>