export class Usuario
{
    public id_usuario?: number;
    public idtipo_usuario?: number;
    public iddepartamento?: number;
    public idmodulo?: number;
    public nombre?: string;
    public correo?: string;
    public contrasena?: string;
    public activo?: number;
    public clave?: number;
    
    constructor()
    {
        this.id_usuario = 0;
        this.idtipo_usuario = 0;
        this.iddepartamento = 0;
        this.idmodulo = 0;
        this.nombre = '';
        this.correo = '';
        this.contrasena = '';
        this.activo = 0;
        this.clave = 0;
    }
}