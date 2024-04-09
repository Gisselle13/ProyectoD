<?php
function asignarMenu($permisos)
{
    $menu = array(
        ['path' => '/starter']
    );

    $noticias = array(
        'path' => '/noticias'
    );

    if($permisos["noticias"])
    {
        array_push($menu, $noticias);
    }

    $videos = array(
        'path' => '/videos'
    );

    if($permisos["videos"])
    {
        array_push($menu, $videos);
    }


    $usuarios = array(
        'path' => '/usuarios'
    );

    if($permisos["usuarios"])
    {
        array_push($menu, $usuarios);
    }

    $publicidad = array(
        'path' => '/publicidad'
    );

    if($permisos["publicidad"])
    {
        array_push($menu, $publicidad);
    }

    return $menu;
}
?>
