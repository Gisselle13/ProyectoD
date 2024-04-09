<?php
class Registro_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('registro_model');
        $this->load->helper('correo');
    }

    // Función para obtener la lista de tipos de usuarios


    public function obtenerEmpleado()
    {
        $Empleado = $this->uri->segment(3);
        $where =  array('clave' => $Empleado);
        $query = $this->db->select("*")->get_where('empleados', $where);

        if ($query && $query->num_rows() >= 1) {
            $data = $query->row();
            $respuesta = array(
                'mensaje' => 'Registros cargado correctamente',
                'registro' => $data,
                'query' => $this->db->last_query(),
                'status' => 200,
            );
        } else {
            $respuesta = array(
                'mensaje' => 'Error al cargar registros',
                'registro' => null,
                'query' => $this->db->last_query(),
                'status' => 200,
            );
        }
        return $respuesta;
    }



    public function agregarRegistro($datos)
    {
        $idusuario = $datos['idusuario'];
        $password = $datos['password'];
        $password2 = $datos['password'];

        $correo = $datos["correo"];
        $tipo = $datos['idtipo_usuario'];
        if (!empty($password)) {
            $password = password_hash($password, PASSWORD_BCRYPT);
        }
        $data = array(
            'tipo' =>  $datos['idtipo_usuario'],
            'nombre' => $datos['nombre'],
            'correo' => $datos['correo'],
            'password' => $password,
            'activo' => $datos['activo'],
            'clave' => $datos['numero_empleado'],
        );

        $dataCorreo = array(
            'tipo' =>  $datos['idtipo_usuario'],
            'nombre' => $datos['nombre'],
            'correo' => $datos['correo'],
            'password' => $password,
            'activo' => $datos['activo'],
            'password2' => $password2,
        );


            

        $existe = (bool) $this->db->select('idusuario')->from('usuarios')->where('correo', $correo)->count_all_results();

        if($existe!=true){
            $this->db->insert('usuarios', $data);
            $id = $this->db->insert_id();
        }


        if (
            $this->db->trans_status() === false
        ) {
            $this->db->trans_rollback();
            $respuesta = array(
                'mensaje' => 'Error en inserción.',
                'error' => $this->db->error(),
                'status' => 409,
            );
        } else {
            //Enviando el correo con sus credenciales
            correo($dataCorreo);

            $this->db->trans_commit();
            $respuesta = array(
                'mensaje' => 'Inserción correcta',
                'Existe:', $existe,
                'status' => 200,
            );
        }
        return $respuesta;
    }



    public function correo($data)
    {
        $correo = $data["correo"];
        $idusuario = $data["idusuario"];
        if ($idusuario > 0) {
            $this->db->where_not_in('idusuario', [$idusuario]);
        }
        $existe = (bool) $this->db->select('idusuario')->from('usuarios')->where('correo', $correo)->count_all_results();

        $respuesta = array(
            'respuesta' => $existe,
            'status' => REST_Controller::HTTP_ACCEPTED
        );
        return $respuesta;
    }
    
}
 