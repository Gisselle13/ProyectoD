<?php
class Authguardusuario_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function accesoAUsuario($idusuario, $idformato)
    {
            $permiso = $this->db->select("idusuario, idformato")->from('view_formato_usuarios')->where(array('idusuario'=> $idusuario,'idformato'=> $idformato))->get()->row("idusuario");
            if($permiso > 0)
            {
                $respuesta = array(
                    "respuesta" => true,
                    "query:"=>  $this->db->last_query(),
                    'status' => REST_Controller::HTTP_OK
                );

                return $respuesta;
            }

            else
            {
                $respuesta = array(
                    "respuesta" => false,
                    'status' => REST_Controller::HTTP_FORBIDDEN
                );
                
                return $respuesta;
            }
       }
    }
