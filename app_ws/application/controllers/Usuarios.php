<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . '/helpers/jwt_helper.php';
include APPPATH . '/third_party/jwt/JWT.php';
include APPPATH . '/third_party/jwt/BeforeValidException.php';
include APPPATH . '/third_party/jwt/ExpiredException.php';
include APPPATH . '/third_party/jwt/SignatureInvalidException.php';

use Firebase\JWT\JWT;

class Usuarios extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $token = $this->input->get_request_header('Authorization', true);
        $token = Jwt_helper::verificarToken($token);

        if($token["status"] == 'HTTP_UNAUTHORIZED')
        {
             // Devolviendo el mensaje de error con un codigo 401 HTTP_UNAUTHORIZED
             $this->response($token["message"], REST_Controller::HTTP_UNAUTHORIZED);
        }
        $this->load->model('usuarios_model');
    }

    // Función para obtener la lista de los tipos de usuarios
    public function tiposusuario_get()
    {

        // Devolviendo el menú con un codigo 200 HTTP_OK
        $respuesta = $this->usuarios_model->obtenerTiposDeUsuario();
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }

    // Función para obtener la lista de los tipos de usuarios
    // public function usuario_get($idUsuario = 0)
    // {

    //     if ($idUsuario != 0)
    //     {
    //          // Devolviendo los usuarios con un codigo 200 HTTP_OK
    //         $respuesta = $this->usuarios_model->obtenerUsuario($idUsuario);
    //         $this->response($respuesta["respuesta"], $respuesta["status"]);
    //     }

    //     else
    //     {
    //         // Devolviendo el usuario con un codigo 200 HTTP_OK
    //         $respuesta = $this->usuarios_model->obtenerUsuarios();
    //         $this->response($respuesta["respuesta"], $respuesta["status"]);
    //     }
    // }

    public function usuario_get($idUsuario = 0)
    {
        if ($idUsuario != 0) {
            // Devolviendo los usuarios con un codigo 200 HTTP_OK
            $this->response($this->usuarios_model->obtenerUsuario($idUsuario), REST_Controller::HTTP_OK);
        } else {
            // Devolviendo el usuario con un codigo 200 HTTP_OK
            $this->response($this->usuarios_model->obtenerUsuarios(), REST_Controller::HTTP_OK);
        }
    }

    // Función para saber si existe el correo
    public function existe_correo_post()
    {
        // $respuesta = $this->usuarios_model->existeCorreo($this->post()["correo"], $this->post()["nuevo"], $this->post()["idUsuario"]);
        // $this->response($respuesta["respuesta"], $respuesta["status"]);
        $respuesta = $this->usuarios_model->existe_correo($this->post());
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }

    // public function index_post()
    // {

    //     // Devolviendo la respuesta con un codigo 200 HTTP_OK
    //     $respuesta = $this->usuarios_model->guardarUsuario($this->post());

    //     $this->response($respuesta["respuesta"], $respuesta["status"]);
    // }

    public function index_post()
    {
        $post = (array) json_decode($this->post('form'));
        $respuesta = $this->usuarios_model->agregarUsuario($post);

        if ($respuesta["status"] == '200')
            $this->response($respuesta["mensaje"], REST_Controller::HTTP_OK);
        else
            $this->response($respuesta["mensaje"], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
    }

    

    // Obtener el paginador
    public function usuariospag_post()
    {
        $this->load->model('usuarios_model');
        $respuesta = $this->usuarios_model->paginado($this->post());
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }

     // Función para actualizar el usuario
     public function index_put()
     {
 
        // Obteniendo la respuesta de la funcion
        $respuesta = $this->usuarios_model->actualizarUsuario($this->put());
 
        $this->response($respuesta["respuesta"], $respuesta["status"]);
     }

     // Función para cambiar el estado del usuario
     public function cambiar_estado_put($idUsuario = 0)
     {
        $respuesta = $this->usuarios_model->cambiarEstado($idUsuario);

        $this->response($respuesta["respuesta"], $respuesta['status']);
     }

    public function estado_off_put($idusuario=0)
    {
        $respuesta = $this->usuarios_model->estadoOff($idusuario);

        $this->response($respuesta["respuesta"], $respuesta['status']);
    }



    // public function empleado_get()
    // {
    //     $respuesta = $this->usuarios_model->obtenerEmpleado($this->get());
    //     $this->response($respuesta, $respuesta['status']);
    // }


    // public function agregarregistro_post()
    // {
    //     $post = (array) json_decode($this->post('form'));
    //     $respuesta = $this->usuarios_model->agregarRegistro($post);
    //     $this->response($respuesta, $respuesta['status']);
    // }
    public function getusuarios_get()
    {
        $usuarios_model = new usuarios_model();
        $this->response($usuarios_model->getUsuarios(), REST_Controller::HTTP_OK);
    }
}