<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization");

include 'dbArchivos.php';

$json = array();
$data = mysql_query("SELECT * FROM oficios ORDER BY idoficio ASC") or die(mysql_error());
while($q = mysql_fetch_object($data)){
    $json[] = array(
            "idoficio"  => (int)$q->idoficio,
            "folio"    => utf8_encode($q->folio),
            "fecha"    => $q->fecha
        );
}
echo json_encode($json);
