<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
class Menu_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // Función para obtener el menu basado en el rol del usuario
    public function obtenerMenu($idrol)
    {
        // Consulta para obtener los datos del menú
        $menu_consulta = $this->db->select('*')->from('menu')->where('activo', 1)->get()->result();
        
        $menu = [];
        foreach ($menu_consulta as $m) {
            if ($this->db->field_exists("{$m->path}", 'roles')) {                
                $permiso = $this->db->select("{$m->path}")->from('roles')->where('idrol', $idrol)->get()->row("{$m->path}");
            } else {
                $permiso = 1;
            }
            if ($permiso == 0) {
                continue;
            }
            $m->extralink = false;
            if ($m->submenu == 0) {
                $m->path = "/{$m->path}";
                $m->submenu = [];
            } else {
                $submenu_consulta = $this->db->select('*')->from('sub_menu')->where(array('idmenu' => $m->idmenu, 'activo' => 1))->get()->result();
                $submenu = [];
                foreach ($submenu_consulta as $sm) {
                    if ($this->db->field_exists("{$sm->path}", 'roles')) {
                        $permiso = $this->db->select("{$sm->path}")->from('roles')->where('idrol', $idrol)->get()->row("{$sm->path}");
                    } else {
                        $permiso = 1;
                    }
                    if ($permiso == 0) {
                        continue;
                    }
                    $sm->path = "/{$sm->path}";
                    $sm->submenu = [];
                    $submenu[] = $sm;
                }
                $m->submenu = $submenu;
            }
            $menu[] = $m;
        }
        return $menu;
    }

    // Función para obtener el submenu
    public function obtenerSubMenu($idRol)
    {
        $this->db
            ->select('sub_menu.path, sub_menu.icon, sub_menu.class, sub_menu.extralink, sub_menu.title')
            ->from('menu')
            ->join('sub_menu', 'menu.idmenu = sub_menu.idmenu')
            ->where('sub_menu.rol = ', $idRol);

        return $consulta = $this->db->get()->result_array();
    }
}
