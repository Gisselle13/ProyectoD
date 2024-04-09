<?php

function paginar_todo($tabla, $pagina, $por_pagina, $campos, $filtros, $order = null)
{
    $CI = &get_instance();
    $CI->load->database();

    if (!isset($por_pagina)) {
        $por_pagina = 20;
    }

    if (!isset($pagina)) {
        $pagina = 1;
    }

    foreach ($filtros as $value) {
        $value = (array) $value;
        $col = $value['col'];
        $param = $value['param'];
        $type = $value['type'];
        switch ($type) {
            case 'date':$CI->db->where($col, $param);
                break;
            case 'obligatorio':$CI->db->where($col, $param);
                break;
            default:$CI->db->like($col, $param, 'both');
        }
    }

    // $CI->db->like($filtros, 'match', 'both');
    $CI->db->from($tabla);
    $CI->db->where('activo =', 1);
    $cuantos = $CI->db->count_all_results();

    $total_paginas = ceil($cuantos / $por_pagina);

    if ($pagina > $total_paginas) {
        $pagina = $total_paginas;
    }

    $pagina -= 1;
    $desde = $pagina * $por_pagina;
    if ($desde < 0) {
        $desde = 0;
    }

    if ($pagina >= $total_paginas - 1) {
        $pagina_siguiente = 1;
    } else {
        $pagina_siguiente = $pagina + 2;
    }

    if ($pagina < 1) {
        $pagina_anterio = $total_paginas;
    } else {
        $pagina_anterio = $pagina;
    }

    $CI->db->select($campos);
    foreach ($filtros as $value) {
        $value = (array) $value;
        $col = $value['col'];
        $param = $value['param'];
        $type = $value['type'];
        switch ($type) {
            case 'date':$CI->db->where($col, $param);
                break;
            case 'obligatorio':$CI->db->where($col, $param);
                break;
            default:$CI->db->like($col, $param, 'both');
        }
    }
    $CI->db->where('activo = ', 1);
    // $CI->db->like($filtros, 'match', 'both');
    $CI->db->order_by($order['param'], $order['direction']);   
    $query = $CI->db->get($tabla, $por_pagina, $desde);
    

    $respuesta = array(
        'cuantos' => $cuantos,
        'total_paginas' => $total_paginas,
        'pagina_actual' => ($pagina + 1),
        'pag_siguiente' => $pagina_siguiente,
        'pag_anterior' => $pagina_anterio,
        'registros' => $query->result(),
        'query' => $CI->db->last_query(),
        'status' => 200,
    );
    
    return $respuesta;

}

function paginarTodoCitas($tabla, $pagina, $por_pagina, $campos, $filtros, $order = null)
{
    // Preparando la base de datos
    $CI = &get_instance();
    $CI->load->database();

    // Si no se especifica cuantos elementos por página, por defecto seran 20
    if (!isset($por_pagina)) {
        $por_pagina = 20;
    }

    // Si no se especifica el numero de la pagina, por defecto sera 1
    if (!isset($pagina)) {
        $pagina = 1;
    }

    // Variables para guardar el valor de fecha_inicia y fecha_termina
    $fechaInicia = "";
    $fechaTermina = "";

    foreach ($filtros as $value) 
    {
        // Obteniendo los datos individuales del array
        $value = (array) $value;
        $col = $value['col'];
        $param = $value['param'];
        $type = $value['type'];

        // Si fecha_inicia existe y el valor no esta vacio
        if($type == "fecha_inicia" && $param != '')
        {
            // Se guarda el valor en la variable
            $fechaInicia = $param;
        }

        // Si fecha_termina existe y el valor no esta vacio
        if($type == "fecha_termina" && $param != '')
        {
            //Se guarda el valor en la variable
            $fechaTermina = $param;

            // Se agrega el WHERE donde fecha_cita sea mayor o igual a fecha_inicia  y menor o igual a fechaTermina
            $CI->db->where('CAST(fecha_cita as DATE) >= ', $fechaInicia)->where('CAST(fecha_cita as DATE) <= ', $fechaTermina);
        }

        // Si el type es diferente a fecha_inicia y fecha_termina
        else
        {
            switch ($type) {
                case 'date':$CI->db->where($col, $param);
                    break;
                case 'obligatorio':$CI->db->where($col, $param);
                    break;
                case 'fecha_inicia': $CI->db->where('CAST(fecha_cita as DATE) >= ', $fechaInicia);
                    break;
                default:$CI->db->like($col, $param, 'both');
            }
        }

    }

    // Especificando en que tabla se hara la consulta
    $CI->db->from($tabla);
    $CI->db->where('activo =', 1);
    // Obteniendo el total de resultados
    $cuantos = $CI->db->count_all_results();

    // Obteniendo el total de páginas
    $total_paginas = ceil($cuantos / $por_pagina);

    // Si la página es mayor al total de páginas
    if ($pagina > $total_paginas) 
    {
        $pagina = $total_paginas;
    }

    $pagina -= 1;

    $desde = $pagina * $por_pagina;

    if ($desde < 0) 
    {
        $desde = 0;
    }

    if ($pagina >= $total_paginas - 1) 
    {
        $pagina_siguiente = 1;
    }

    else 
    {
        $pagina_siguiente = $pagina + 2;
    }

    if ($pagina < 1) 
    {
        $pagina_anterio = $total_paginas;
    } 
    else 
    {
        $pagina_anterio = $pagina;
    }

    // Creando la consulta
    //$CI->db->select("idcita,nombre_departamento, nombre_ciudadano, nombre_personal, DATE_FORMAT(fecha_cita, '%d-%m-%Y') AS fecha, CONCAT(DATE_FORMAT(fecha_cita, '%h'), ':00') AS hora")
    //->join('departamentos', 'citas.iddepartamento = departamentos.iddepartamento');

    //$CI->db->get('view_citas');
    // Iterando en el array de los filtros
    foreach ($filtros as $value) 
    {
        // Obteniendo los datos individuales del array
        $value = (array) $value;
        $col = $value['col'];
        $param = $value['param'];
        $type = $value['type'];

        // Si fecha_inicia existe y el valor no esta vacio
        if($type == "fecha_inicia" && $param != '')
        {
            // Se guarda el valor en la variable
            $fechaInicia = $param;
        }

        // Si fecha_termina existe y el valor no esta vacio
        if($type == "fecha_termina" && $param != '')
        {
            //Se guarda el valor en la variable
            $fechaTermina = $param;

            // Se agrega el WHERE donde fecha_cita sea mayor o igual a fecha_inicia  y menor o igual a fechaTermina
            $CI->db->where('CAST(fecha_cita as DATE) >= ', $fechaInicia)->where('CAST(fecha_cita as DATE) <= ', $fechaTermina);
        }

        // Si el type es diferente a fecha_inicia y fecha_termina
        else
        {
            switch ($type) {
                case 'date':$CI->db->where($col, $param);
                    break;
                case 'obligatorio':$CI->db->where($col, $param);
                    break;
                case 'fecha_inicia': $CI->db->where('CAST(fecha_cita as DATE) >= ', $fechaInicia);
                    break;
                default:$CI->db->like($col, $param, 'both');
            }
        }
    }

    $CI->db->where('activo =', 1);

    // Ordenando los datos en orden descendente
    $CI->db->order_by($order['param'], $order['direction']);   

    // Obteniendo los datos de la consulta
    $query = $CI->db->get($tabla, $por_pagina, $desde);
    
    // Creando la respuesta
    $respuesta = array(
        'cuantos' => $cuantos,
        'total_paginas' => $total_paginas,
        'pagina_actual' => ($pagina + 1),
        'pag_siguiente' => $pagina_siguiente,
        'pag_anterior' => $pagina_anterio,
        'registros' => $query->result(),
        'query' => $CI->db->last_query(),
        'status' => 200,
    );
    
    // Devolviendo la respuesta
    return $respuesta;
}
