<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
include APPPATH . '/third_party/jwt/JWT.php';
require APPPATH . '/helpers/jwt_helper.php';
include APPPATH . '/third_party/jwt/BeforeValidException.php';
include APPPATH . '/third_party/jwt/ExpiredException.php';
include APPPATH . '/third_party/jwt/SignatureInvalidException.php';

class Authguard extends REST_Controller
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

        $this->load->model('authguard_model');
    }

    public function index_post()
   {
      $respuesta = $this->authguard_model->accesoARuta($this->post('path'), $this->post('idrol'));

      $this->response($respuesta["respuesta"], $respuesta["status"]);
        
   }
}
