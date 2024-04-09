<?php

function conexion($bd_config){
  try {
    $conexion = new PDO('mysql:host=localhost;charset=utf8;dbname='.$bd_config['proyectod'], $bd_config['root'], $bd_config['']);
    return $conexion;
  } catch (PDOException $e) {
    return false;
  }
}

function obtenerdatos($conexion){
  $resultado = $conexion->query("SELECT * FROM oficios");
  $resultado = $resultado->fetchAll();
  return($resultado);
}

