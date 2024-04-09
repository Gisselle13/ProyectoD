<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . '/helpers/jwt_helper.php';

include APPPATH . '/third_party/jwt/JWT.php';
include APPPATH . '/third_party/jwt/BeforeValidException.php';
include APPPATH . '/third_party/jwt/ExpiredException.php';
include APPPATH . '/third_party/jwt/SignatureInvalidException.php';


class Menu extends REST_Controller
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
    }

    public function index_post()
    {
       // $modeloMenu = new Menu_model();
       $this->load->model("menu_model");
        // Obteniendo el id rol del payload del token
        $idRol = Jwt_helper::leerToken()->tipo;

        // Devolviendo el menú con un codigo 200 HTTP_OK
        $this->response($this->menu_model->obtenerMenu($idRol), REST_Controller::HTTP_OK);
    }
}
