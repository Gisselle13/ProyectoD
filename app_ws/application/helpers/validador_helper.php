<?php

class Validador_helper
{
    // Si ocurre un error se cambia esta variable a false
    private $esValido;

    // Array para guardar
    private $mensaje;

    public function validarUsuario($correo, $contrasena)
    {
        if(empty($correo))
        {
            $this->esValido = false;
            $this->mensaje = "El correo no debe de estar vacio.";
        }

        else if(empty($contrasena))
        {
            $this->esValido = false;
            $this->mensaje = "La contraseña no debe de estar vacia.";
        }

        else if(!filter_var($correo, FILTER_VALIDATE_EMAIL))
        {
            $this->esValido = false;
            $this->mensaje = "Ingresa un correo valido.";
        }

        else
        {
            $this->esValido = true;
        }
    }

    public function esValido()
    {
        return $this->esValido;
    }

    public function obtenerMensajeError()
    {
        return $this->mensaje;
    }

    public function validarUsuarioM($usuario)
    {
        // Obteniendo los datos individuales del usuario
        $nuevo= '';
        $idusuario =  $usuario["idnombre"];
        $idtipo_usuario = $usuario["idtipo_usuario"];
        $nombre =  $usuario["nombre"];
        $correo = $usuario["correo"];
        $contrasena = $usuario["password"];
        $activo = $usuario["activo"];

        // Verificando si existe el correo
        $modeloUsuarios = new Usuarios_model();
        $existeCorreo = $modeloUsuarios->existeCorreo($usuario["correo"],$nuevo,$idusuario);
        
        // Si existe se devuelve el error
        if($existeCorreo["registrado"])
        {
            return array(
                'mensaje'=> "El correo ya existe",
                'status' => false
            );
        }
        
        // Verificando que los datos esenciales no esten vacios
        if(empty($idtipo_usuario))
        {
            return array(
                'mensaje' => "El tipo de acceso no debe de estar vacio",
                'status'  => false
            );
        }

        else if(empty($nombre))
        {
            return array(
                'mensaje' => "El nombre no debe de estar vacio",
                'status'  => false
            );
        }

        else if(!empty($departamento) && empty($modulo))
        {
                return array(
                    'mensaje' => 'El modulo no debe de estar vacio',
                    'status' => false,
                );
        }

        else if(empty($correo))
        {
            return array(
                'mensaje' => "El correo no debe de estar vacio",
                'status'  => false
            );
        }

        else if(empty($contrasena))
        {
            return array(
                'mensaje' => "La contraseña no debe de estar vacia",
                'status'  => false
            );
        }

        // Si nada esta vacio devolvemos el mensaje vacio con un status de verdadero
        else
        {
            return array(
                'mensaje' => "",
                'status'  => true
            );
        }
    }
}
