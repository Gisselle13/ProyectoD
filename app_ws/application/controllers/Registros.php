<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . '/helpers/jwt_helper.php';
include APPPATH . '/third_party/jwt/JWT.php';
include APPPATH . '/third_party/jwt/BeforeValidException.php';
include APPPATH . '/third_party/jwt/ExpiredException.php';
include APPPATH . '/third_party/jwt/SignatureInvalidException.php';

use Firebase\JWT\JWT;

class Registros extends REST_Controller
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
        $this->load->model('registros_model');
    }


    // public function datos_get()
    // {
    //     $registros_model = new registros_model();
    //     $this->response($registros_model->obtenerDatos(), REST_Controller::HTTP_OK);
    // }
    
    public function index_get()
    {
        $respuesta = $this->registros_model->obtenerCentros();
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }

    public function index_post()
    {
        $post = (array) json_decode($this->post('form'));
        $respuesta = $this->registros_model->agregarCentro($post);
        if ($respuesta["status"] == '200')
            $this->response($respuesta["mensaje"], REST_Controller::HTTP_OK);
        else
            $this->response($respuesta["mensaje"], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
    }



    public function usuariaspag_post()
    {
        $this->load->model('registros_model');
        $respuesta = $this->registros_model->paginadoUsuarias($this->post());
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }


    public function usuariasgen_post()
    {
        $this->load->model('registros_model');
        $respuesta = $this->registros_model->usuariasGeneral($this->post());
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }




    public function word_diario_post()
    {
        $this->load->helper("word_diario");
        word_diario($this->post());
    }



    public function agregar_paciente_post()
    {
        $post = (array) json_decode($this->post('form'));
        $respuesta = $this->registros_model->agregarPaciente($post);
        $this->response($respuesta, $respuesta['status']);
    }

    public function pagpacientes_post()
    {
        $this->load->model('registros_model');
        $respuesta = $this->registros_model->paginadoPacientes($this->post());
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }
    public function pagreportes_post()
    {
        $this->load->model('registros_model');
        $respuesta = $this->registros_model->paginadoReportes($this->post());
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }



    public function eliminar_paciente_post()
    {
        $this->load->model('registros_model');
        $respuesta = $this->registros_model->eliminarPaciente($this->post());
        $this->response($respuesta, $respuesta['status']);
    }


    public function obtenerinfo_get()
    {
        $this->load->model('registros_model');
        $respuesta = $this->registros_model->obtener_info($this->get());
        $status = $respuesta['status'];
        $this->response($respuesta, $status);
    }

    public function editar_llamada_post()
    {
        $this->load->model('registros_model');
        $respuesta = $this->registros_model->editarLlamada($this->post());
        $status = $respuesta['status'];
        $this->response($respuesta, $status);
    }


    public function datos_get()
    {
        $registros_model = new registros_model();
        $this->response($registros_model->obtenerDatos(), REST_Controller::HTTP_OK);
    }


    public function enviar_idencuesta_post()
    {
        $respuesta = $this->registros_model->EnviarIdencuesta($this->post('idencuesta'), $this->post('idregistro'));
        $this->response($respuesta);
    }


    public function formato_get()
    {
        $respuesta = $this->registros_model->obtenerFormato($this->get());
        $this->response($respuesta, $respuesta['status']);
    }


    public function existe_tel_post()
    {
        $respuesta = $this->registros_model->existe_tel($this->post());
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }


    public function cargo_get()
    {
      $this->response($this->registros_model->obtenerDuracion(), REST_Controller::HTTP_OK);
    }

    public function llamadas_get()
    {
        $this->response($this->registros_model->obtenerLlamadasAll(), REST_Controller::HTTP_OK);
    }
}