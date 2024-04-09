<?php
class Authguard_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function accesoARuta($path, $idrol)
    {
        $exists = $this->db->field_exists($path, 'roles');

        if($exists)
        {
            $permiso = $this->db->select("{$path}")->from('roles')->where('idrol', $idrol)->get()->row("{$path}");

            if($permiso > 0)
            {
                $respuesta = array(
                    "respuesta" => true,
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
}
