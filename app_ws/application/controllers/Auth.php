<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
include APPPATH . '/third_party/jwt/JWT.php';
include APPPATH . '/third_party/jwt/BeforeValidException.php';
include APPPATH . '/third_party/jwt/ExpiredException.php';
include APPPATH . '/third_party/jwt/SignatureInvalidException.php';

require APPPATH . '/helpers/jwt_helper.php';

class Auth extends REST_Controller
{
   public function __construct()
   {
      parent::__construct();
      $this->load->model('auth_model');
   }
  
   public function index_post()
   {
            $respuesta = $this->auth_model->autentificar($this->post());

            // Verificando que exista y este activo
            if ($respuesta["error"]) {
           
               $this->response($respuesta);
            } else {
               // Generando el token
               $userToken = Jwt_helper::generarToken($respuesta['usuario']);

               // Devolviendo el token con un codigo 200 HTTP OK 
               $this->response($userToken, REST_Controller::HTTP_OK);
            }

   }
}
