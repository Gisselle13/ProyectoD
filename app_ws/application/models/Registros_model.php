<?php
class Registros_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('Registros_model');
        //$this->load->helper('correo');
    }



    public function obtenerDatos()
    {
        $fechai = $this->uri->segment(3);
        $fechaf = $this->uri->segment(4);
        $where =  'idllamada >=  1';
      //  $where =  'fecha >=  ' . "'" . $fechai . " 00:00:00' AND fecha<= '" . $fechaf . " 23:59:59'";
        $query = $this->db->select("*");
        $this->db->from('view_llamadas');
        $this->db->where($where);
        $query = $this->db->get();

        // $where2 = 'fecha >=  ' . "'" . $fechai . " 00:00:00' AND fecha<= '" . $fechaf . " 23:59:59'";
        // $query2 = $this->db->select("*");
        // $this->db->from('view_llamadas');
        // $this->db->where($where2);
        // $query2 = $this->db->get();

       

        if ($query && $query->num_rows() >= 1 || $query2 && $query2->num_rows() >= 1) {
            $data = $query->result_array();
            //  $data2 = $query2->result_array();


            // $data = array($data, $data2);
            $data = array($data);
            $respuesta = array(
                'mensaje' => 'Registros cargado correctamente',
                'registro' => $data,
                $this->db->last_query(),
                'status' => 200,
            );
        } else {
            $respuesta = array(
                'mensaje' => 'Error al cargar registros',
                $this->db->last_query(),
                'status' => 400,
            );
        }
        return $respuesta;
    }
    

    public function obtenerCentros()
    {
        $this->db->select('*')->from('centros_comunitarios');
        $publicidad = $this->db->get()->result_array();

        $respuesta = array(
            'respuesta' => $publicidad,
            'status' => REST_Controller::HTTP_OK
        );

        return $respuesta;
    }





    ///------------------Registro de Llamadas
    public function agregarLlamada($datos)
    {
        $idllamada = $this->uri->segment(3);
        $encuesta = $this->uri->segment(4);
        $tabla = 'registro_llamadas';
        // $idregistro = $datos['idregistro'];

        $data = array(
            'telefono' => $datos['telefono'],
            'atendio' => $datos['atendio'],
            'fecha' => $datos['fecha'],
            'hora' => $datos['hora'],
            'pregunta_1' => $datos['pregunta_1'],
            'pregunta_2' => $datos['pregunta_2'],
            'pregunta_3' => $datos['pregunta_3'],
            'pregunta_4' => $datos['pregunta_4'],
            'pregunta_5' => $datos['pregunta_5'],
            'sexo' => $datos['sexo'],
            'edad' => $datos['edad'],
            'comentarios' => $datos['comentarios'],
            'idusuario' => $datos['idusuario'],
            'idllamada' =>  $idllamada
        );


        if($encuesta==1){
            $tabla = 'encuesta_1';
        }
        if ($encuesta == 2) {
            $tabla = 'encuesta_2';
        }

        $this->db->insert($tabla, $data);
        // $this->db->insert('registro_llamadas', $data);
        // $idllamada = $this->db->insert_id();



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

            $this->db->trans_commit();
            $respuesta = array(
                'mensaje' => 'Inserción correcta',
                'idllamada:' => $idllamada,
                'status' => 200,
            );
        }
        return $respuesta;
    }


    ///Paginado
    public function paginadoLlamadas($datos)
    {

        $encuesta = $this->uri->segment(3);
        $tabla='registro_llamadas';
        if($encuesta==1){
            $tabla = 'encuesta_1';
        }
        if ($encuesta == 2) {
            $tabla = 'encuesta_2';
        }
        $this->load->library('paginado');
        $paginado = $this->paginado->paginar($datos, $tabla);

        $respuesta = array(
            'respuesta' =>  $paginado,
            'status' => REST_Controller::HTTP_OK
        );

        return $respuesta;
    }



    public function eliminarLlamada($data)
    {
        $idllamada = $data['0'];
        $this->db->trans_begin();
        $where =  array('idllamada' => $idllamada);
        $query = $this->db->select("*")->get_where('registro_llamadas', $where);

        if ($query && $query->num_rows() >= 1) {
            $this->db->delete('registro_llamadas', array('idllamada' => $idllamada));
            if ($this->db->trans_status() === false) {
                $this->db->trans_rollback();
                $respuesta = array(
                    'mensaje' => 'Error en eliminación.',
                    'error' => $this->db->error(),
                    'status' => 409,
                );
            } else {
                $this->db->trans_commit();
                $respuesta = array(
                    'mensaje' => 'Eliminación correcta',
                    'status' => 200,
                );
            }
            return $respuesta;
        } else {
            $respuesta = array(
                'mensaje' => 'No existe el id',
                'status' => 400,
            );
            return $respuesta;
        }
    }




    public function obtener_info($datos)
    {

        $idllamada = $this->uri->segment(3);
        $encuesta = $this->uri->segment(4);
        $tabla = 'registro_llamadas';
        if ($encuesta == 1) {$tabla = 'encuesta_1'; }
        if ($encuesta == 2) {$tabla = 'encuesta_2';  }
        $where =  array('idllamada' => $idllamada);
        $query = $this->db->select("*")->get_where($tabla, $where);
        if ($query && $query->num_rows() >= 1) {
            $data = $query->row();

            $respuesta = array(
                'mensaje' => 'Registros cargado correctamente',
                'datos-/', $datos,
                $this->db->last_query(),
                'idllamada/', $idllamada,
                'registro' => $data,
                'status' => 200,
            );
        } else {
            $respuesta = array(
                'mensaje' => 'Error al cargar registros',
                'idllamada/', $idllamada,
                'datos-/', $datos,
                'status' => 400,
            );
        }
        return $respuesta;
    }



    public function editarLlamada($datos)
    {
        $idllamada = $this->uri->segment(3);
        $encuesta = $this->uri->segment(4);
        $tabla = 'registro_llamadas';
        $data = array(
            'telefono' => $datos['telefono'],
            'atendio' => $datos['atendio'],
            'fecha' => $datos['fecha'],
            'hora' => $datos['hora'],
            'pregunta_1' => $datos['pregunta_1'],
            'pregunta_2' => $datos['pregunta_2'],
            'pregunta_3' => $datos['pregunta_3'],
            'pregunta_4' => $datos['pregunta_4'],
            'pregunta_5' => $datos['pregunta_5'],
            'sexo' => $datos['sexo'],
            'edad' => $datos['edad'],
            'comentarios' => $datos['comentarios'],
            'idusuario' => $datos['idusuario'],
        );

        if ($idllamada > 0) {

            if ($encuesta == 1) {$tabla = 'encuesta_1'; }
            if ($encuesta == 2) {$tabla = 'encuesta_2';  }

            $this->db->where('idllamada', $idllamada);
            $this->db->update($tabla, $data);
        }

        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            $respuesta = array(
                'mensaje' => 'Error en Edición.',
                'error' => $this->db->error(),
                'status' => 409,
            );
        } else {
            $this->db->trans_commit();
            $respuesta = array(
                'mensaje' => 'Edición correcta',
                'status' => 200,
            );
        }
        return $respuesta;
    }





    public function EnviarIdencuesta($idencuesta, $idregistro)
    {

      //  $fecha_termino = $this->uri->segment(4);
   //   $fechaf= $fecha_termino . ' ' . $hora_termino;
        date_default_timezone_set('America/Matamoros');
        $fecha = date("Y-m-d H:i:s");
        $data = array(
            //'servidor_inactivo' => 1,
            'idencuesta' => $idencuesta,
            'fecha_inicio' => $fecha,
           // 'fecha_termino' => $fechaf,
        );

        $dataEdit = array(
            'fecha_termino' => $fecha,
        );
        if ($idencuesta > 0) {
            // $this->db->where('idregistro = 1');
            // $this->db->update('encuesta', $data);
            $this->db->insert('encuesta', $data);


            $this->db->where('idregistro', $idregistro);
            $this->db->update('encuesta', $dataEdit);
        }
        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            $respuesta = array(
                'mensaje' => 'Error en inserción.',
                'error' => $this->db->error(),
                'idencuesta' => $idencuesta,
                'status' => 409,
            );
        } else {
            $this->db->trans_commit();
            $respuesta = array(
                'mensaje' => 'Inserción correcta',
                'idencuesta' => $idencuesta,
                'status' => 200,
            );
        }
        return $respuesta;
    }



    public function obtenerFormato()
    {

        $query = $this->db->order_by('idregistro', 'DESC') // Ordena por el campo 'id' en orden descendente
        ->limit(1) // Obtiene solo un registro
            ->get('encuesta'); // Nombre de tu tabla

        // $idformato = $this->uri->segment(3);
        // $where =  array('idformato' => $idformato);
        // $query = $this->db->select("*")->get_where('encuesta', $where);

        if ($query && $query->num_rows() >= 1) {
            $data = $query->row();
            //VAR---'registro' => $data, -- no cambiar
            $respuesta = array(
                'mensaje' => 'Registros cargado correctamente',
                'registro' => $data,
                'status' => 200,
            );
        } else {
            $respuesta = array(
                'mensaje' => 'Error al cargar registros',
                'status' => 400,
            );
        }
        return $respuesta;
    }



    public function existe_tel($data)
    {
        $telefono = $data["telefono"];
        $idllamada = $data["idllamada"];
        if ($idllamada > 0) {
            $this->db->where_not_in('idllamada', [$idllamada]);
        }
        //crear vista general
        $existe = (bool) $this->db->select('idllamada')->from('view_llamadas_all')->where('telefono', $telefono)->count_all_results();
        $respuesta = array(
            'respuesta' => $existe,
            'status' => REST_Controller::HTTP_ACCEPTED
        );
        return $respuesta;
    }



    public function obtenerDuracion()
    {
        $this->db
            ->select('*')
            ->from('encuesta')
            ->where('idregistro >= ', 1);

        $cargos = $this->db->get()->result_array();

        $respuesta = array(
            'respuesta' => $cargos,
            'status' => REST_Controller::HTTP_OK
        );

        return $respuesta;
    }

    public function obtenerLlamadasAll()
    {
        $this->db
            ->select('*')
            ->from('view_llamadas_all')
            ->where('idllamada >= ', 1);

        $cargos = $this->db->get()->result_array();

        $respuesta = array(
            'respuesta' => $cargos,
            'status' => REST_Controller::HTTP_OK
        );

        return $respuesta;
    }
}


 