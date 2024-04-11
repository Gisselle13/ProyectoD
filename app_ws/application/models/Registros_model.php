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
    public function agregarPaciente($datos)
    {
        $idpaciente = $this->uri->segment(3);
        $encuesta = $this->uri->segment(4);
        $tabla = 'registro_llamadas';
        // $idregistro = $datos['idregistro'];

        $data = array(
            'fecha_ingreso' => $datos['fecha_ingreso'],
            'nombre' => $datos['nombre'],
            'curp' => $datos['curp'],
            'codigo' => $datos['codigo'],
            'sexo' => $datos['sexo'],
            'edad' => $datos['edad'],
            'meses' => $datos['meses'],
            'fecha_nacimiento' => $datos['fecha_nacimiento'],
            'medico_titular' => $datos['medico_titular'],
            'calle' => $datos['calle'],
            'colonia' => $datos['colonia'],
            'no_exterior' => $datos['no_exterior'],
            'no_interior' => $datos['no_interior'],
            'estado' => $datos['estado'],
            'pais' => $datos['pais'],
            'ciudad' => $datos['ciudad'],
            'nacionalidad' => $datos['nacionalidad'],
            'codigo_postal' => $datos['codigo_postal'],
            'tel_casa' => $datos['tel_casa'],
            'tel_oficina' => $datos['tel_oficina'],
            'celular' => $datos['celular'],
            'correo' => $datos['correo'],
            'alergico_medicamento' => $datos['alergico_medicamento'],
            'realizado_endodoncias' => $datos['realizado_endodoncias'],
            'diabetico' => $datos['diabetico'],
            'padece_corazon' => $datos['padece_corazon'],
            'padece_presion_baja' => $datos['padece_presion_baja'],
            'padece_presion_alta' => $datos['padece_presion_alta'],
            'padece_riñon' => $datos['padece_riñon'],
            'otra_enfermedad' => $datos['otra_enfermedad'],
            'tomando_medicamento' => $datos['tomando_medicamento'],
            'sangran_encias' => $datos['sangran_encias'],
            'dolor_piezas' => $datos['dolor_piezas'],
            'color' => $datos['color'],
            'notas' => $datos['notas'],
            'idpaciente' =>  $idpaciente
        );


        if($encuesta==1){
            $tabla = 'encuesta_1';
        }
        if ($encuesta == 2) {
            $tabla = 'encuesta_2';
        }

        if ($idpaciente > 0) {
            $this->db->where('idpaciente', $idpaciente);
            $this->db->update('pacientes', $data);
        }else{
         $this->db->insert('pacientes', $data);
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


    ///Paginado
    public function paginadoPacientes($datos)
    {
        $tabla='pacientes';
        $this->load->library('paginado');
        $paginado = $this->paginado->paginar($datos, $tabla);
        $respuesta = array(
            'respuesta' =>  $paginado,
            'status' => REST_Controller::HTTP_OK
        );
        return $respuesta;
    }

    ///Paginado
    public function paginadoReportes($datos)
    {
        $tabla = 'pacientes';
        $this->load->library('paginado');
        $paginado = $this->paginado->paginar($datos, $tabla);
        $respuesta = array(
            'respuesta' =>  $paginado,
            'status' => REST_Controller::HTTP_OK
        );
        return $respuesta;
    }



    public function eliminarPaciente($data)
    {
        $idpaciente = $data['0'];
        $this->db->trans_begin();
        $where =  array('idpaciente' => $idpaciente);
        $query = $this->db->select("*")->get_where('pacientes', $where);

        if ($query && $query->num_rows() >= 1) {
            $this->db->delete('pacientes', array('idpaciente' => $idpaciente));
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

        $idpaciente = $this->uri->segment(3);
        $encuesta = $this->uri->segment(4);

        $where =  array('idpaciente' => $idpaciente);
        $query = $this->db->select("*")->get_where('pacientes', $where);
        if ($query && $query->num_rows() >= 1) {
            $data = $query->row();

            $respuesta = array(
                'mensaje' => 'Registros cargado correctamente',
                'datos-/', $datos,
                $this->db->last_query(),
                'idpaciente/', $idpaciente,
                'registro' => $data,
                'status' => 200,
            );
        } else {
            $respuesta = array(
                'mensaje' => 'Error al cargar registros',
                'idpaciente/', $idpaciente,
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

        $query = $this->db->order_by('idpaciente', 'DESC') // Ordena por el campo 'id' en orden descendente
        ->limit(1) // Obtiene solo un registro
            ->get('pacientes'); // Nombre de tu tabla

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

    public function obtenerNombresPacientes()
    {
        $this->db->select('idpaciente,nombre')->from('pacientes');
        $sector = $this->db->get()->result_array();
        $respuesta = array(
            'respuesta' => $sector,
            'status' => REST_Controller::HTTP_OK
        );
        return $respuesta;
    }


    public function existe_user($data)
    {
        $nombre = $data["nombre"];
        $idpaciente = $data["idpaciente"];
        if ($idpaciente > 0) {
            $this->db->where_not_in('idpaciente', [$idpaciente]);
        }
        $existe = (bool) $this->db->select('idpaciente')->from('pacientes')->where('nombre', $nombre)->count_all_results();
        $respuesta = array(
            'respuesta' => $existe,
            'status' => REST_Controller::HTTP_ACCEPTED
        );
        return $respuesta;
    }
}


 