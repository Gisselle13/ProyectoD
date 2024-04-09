<?php

class Auth_model extends CI_Model
{
    private $correo;
    private $contrasena;

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function autentificar($datos)
    {
        $this->correo = $datos['correo'];
        $this->contrasena = $datos['contrasena'];
        
        // Realizando la consulta a la base de datos donde el correo exista
        $usuario = $this->db->select('idusuario, tipo, nombre, correo, password, activo')->from('usuarios')->where('correo', $this->correo)->get()->row_array();

        if($usuario){
            if($usuario['activo'] == 1){
                $contrasena_temp = $usuario['password'];
                unset($usuario['password']);
                if (password_verify($this->contrasena, $contrasena_temp)) {
                    $respuesta = array(
                        'usuario' => $usuario,
                        'mensaje' => 'Acceso autorizado',
                        'error' => false,
                        'status' => 200
                    );
                    $data = array(
                        'estado' => 1,
                    );
                    $iduser = $usuario['idusuario'];
                    $this->db->where('idusuario', $iduser);
                    $this->db->update('usuarios', $data);

                } else {
                    //contrasena incorrecta
                    $respuesta = array(
                        'usuario' => $usuario,
                        'mensaje' => 'La contraseña que ingresaste es incorrecta',
                        'error' => true,
                        'status' => 200
                    );
                }    
            } else {
                //usuario inactivo
                $respuesta = array(
                    'usuario' => $usuario,
                    'mensaje' => 'La cuenta se encuentra suspendida',
                    'error' => true,
                    'status' => 200
                );
            }
        } else {
            // usuario no encontrado 
            $respuesta = array(
                'usuario' => $usuario,
                'mensaje' => 'El correo electrónico que ingresaste no está conectado a una cuenta',
                'error' => true,
                'status' => 200
            );
        }

        return $respuesta;
    }
}
