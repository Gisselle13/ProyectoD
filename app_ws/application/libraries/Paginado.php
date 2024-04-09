<?php
require_once('system/core/Model.php');
class Paginado extends CI_Model
{
    private $limit;
    private $offset;
    private $order;
    private $filtros;
    private $tabla;
/*
    function __construct($datos, $tabla)
    {
        parent::__construct();
        $this->load->database();
        $this->limit = $datos['limit'];
        $this->offset = $datos['offset'];
        $this->order = $datos['order'];
        $this->filtros = $datos['filtros'];
        $this->tabla = $tabla;
    }
*/
    public function paginar($datos, $tabla)
    {
        $this->load->database();
        $this->limit = $datos['limit'];
        $this->offset = $datos['offset'];
        $this->order = $datos['order'];
        $this->filtros = $datos['filtros'];
        $this->tabla = $tabla;
        
        $campos = array('*');

        foreach ($this->order as $o) {
            $this->db->order_by($o['orderBy'], $o['direction']);
        }

        foreach ($this->filtros as $value) {
            $value = (array) $value;
            $col = $value['col'];
            $param = $value['param'];
            if ($param == "") continue;
            $type = $value['type'];
            switch ($type) {
                case 'date':
                case 'number':
                    $this->db->where($col, $param);
                    break;
                case 'fecha_inicia':
                    $this->db->where("CAST({$col} as DATE) >= ", $param);
                    break;
                case 'fecha_termina':
                    $this->db->where("CAST({$col} as DATE) <= ", $param);
                    break;
                case 'fecha':
                    $this->db->where("fecha_captura =", date("d-m-Y", strtotime($param)));
                    break;
                default:
                    $this->db->like($col, $param, 'both');
            }
        }
        $registros = $this->db->select($campos)->from($this->tabla)->limit($this->limit)->offset($this->offset)->get()->result();
        //$total = $this->db->from($this->tabla)->count_all_results();
        $total = explode("LIMIT", $this->db->last_query());
        $total = $this->db->query($total[0])->num_rows();

        $respuesta = array(
            'registros' => $registros,
            'total' =>  $total
        );

        return $respuesta;
    }

    public function paginarReporte()
    {
        $campos = array('*');

        foreach ($this->order as $o) {
            $this->db->order_by($o['orderBy'], $o['direction']);
        }

        foreach ($this->filtros as $value) {
            $value = (array) $value;
            $col = $value['col'];
            $param = $value['param'];
            if (empty($param)) continue;
            $type = $value['type'];
            switch ($type) {
                case 'date':
                case 'number':
                    $this->db->where($col, $param);
                    break;
                case 'fecha_inicia':
                    $this->db->where("CAST({$col} as DATE) >= ", $param);
                    break;
                case 'fecha_termina':
                    $this->db->where("CAST({$col} as DATE) <= ", $param);
                    break;
                default:
                    $this->db->like($col, $param, 'both');
            }
        }
        
        $registros = $this->db->select($campos)->from($this->tabla)->limit($this->limit)->offset($this->offset)->get()->result();
        // print_r($registros);
        $json = array();
        foreach ($registros as $row) {
            $idturno = $row->idturno;
            $servicios = $this->db->get_where('view_turnos_servicios', array('idturno' => $idturno));
            //$servicios = $CI->db->query("SELECT s.servicio FROM turnos_servicios as ts JOIN servicios as s ON ts.idservicio = s.idservicio WHERE ts.idturno = '$idturno'");
            $jsonServicios = array();

            foreach ($servicios->result() as $row2) {
                $jsonServicios[] = $row2->servicio;

            }
            $json[] = array(
                "idturno" => $row->idturno,
                "no_turno" => $row->numero_turno,
                "fecha" => $row->fecha,
                "nombre" => $row->nombre,
                "departamento" => $row->nombre_departamento,
                "servicios" => implode(', ', $jsonServicios),
            );

     }

        //
        $n = $this->db->select($campos)->from($this->tabla)->count_all_results();
        //
        
        $total = $this->db->from($this->tabla)->count_all_results();
        
        $respuesta = array(
            'registros' => $json,
            'total' => $total
        );
        return $respuesta;
    }
} 
