<?php

use Firebase\JWT\JWT;

class Jwt_helper
{
    public static function generarToken($datos)
    {
        // Tiempo en el que fue emitido el token
        $emitido = time();

        // Tiempo de expiración: fecha de creacion + n segundos
        $expira = $emitido + (60 * 480);
        //$expira = $emitido + (60 * 1);
        // Propiedades estandar ejemplo: Tiempo de creación, No antes de, tiempo de expiración
        $cuerpo = [
            'iat' => $emitido,
            'nbf' => $emitido,
            'exp' => $expira
        ];

        // Uniendo los dos arrays (propiedadesEstandar y datos) para formar el cuerpo(payload) del token
        $cuerpo['datos'] = $datos;

        // Devolviendo el token
        return  JWT::encode(
            $cuerpo,
            FIRMA_JWT,
            'HS512'
        );
    }
 
    public static function verificarToken($token)
    {
        try {
            // Verificando que el token sea valido
            $esValido = JWT::decode($token, FIRMA_JWT, array('HS512'));

            // Si no arroja ninguna excepción creamos una respuesta con un codigo de 200 HTTP OK
            $response = [
                'status' => 'HTTP_OK',
                'message' => $esValido
            ];

            // Devolvemos la respuesta
            return $response;
        } catch (Exception $excepcion) {
            // Si existe un error creamos la respuesta con un error 401 HTTP UNAUTHORIZED
            $response = [
                'status' => 'HTTP_UNAUTHORIZED',
                'message' => $excepcion->getMessage()
            ];

            // Devolvemos la respuesta
            return $response;
        }
    }

    public static function leerToken()
    {
        $CI = &get_instance();

        $key = FIRMA_JWT;
        $tkn = $CI->input->get_request_header('Authorization', true);

        try {
            $decode = JWT::decode($tkn, $key, array('HS512'));
            return $decode->datos;
        } catch (Exception $e) {
            return false;
        }
    }
}
