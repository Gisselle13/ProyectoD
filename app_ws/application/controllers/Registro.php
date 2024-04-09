<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . '/helpers/jwt_helper.php';
include APPPATH . '/third_party/jwt/JWT.php';
include APPPATH . '/third_party/jwt/BeforeValidException.php';
include APPPATH . '/third_party/jwt/ExpiredException.php';
include APPPATH . '/third_party/jwt/SignatureInvalidException.php';

use Firebase\JWT\JWT;
class Registro extends REST_Controller
{

    public function __construct()
    {
        parent::__construct();
        $token = $this->input->get_request_header('Authorization', true);
        $token = Jwt_helper::verificarToken($token);

        // if ($token["status"] == 'HTTP_UNAUTHORIZED') {
        //     // Devolviendo el mensaje de error con un codigo 401 HTTP_UNAUTHORIZED
        //     $this->response($token["message"], REST_Controller::HTTP_UNAUTHORIZED);
        // }
        $this->load->model('registro_model');
    }

    public function empleado_get()
    {
        $respuesta = $this->registro_model->obtenerEmpleado($this->get());
        $this->response($respuesta, $respuesta['status']);
    }

    public function agregarregistro_post()
    {
        $post = (array) json_decode($this->post('form'));
        $respuesta = $this->registro_model->agregarRegistro($post);
        $this->response($respuesta, $respuesta['status']);
    }

    public function correo_post()
    {
        $respuesta = $this->registro_model->correo($this->post());
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }


  
}
