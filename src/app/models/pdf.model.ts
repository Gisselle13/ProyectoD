export class Pdf {
    public archivo: File;
    public nombre: string;
    public idtipo_documento: string;
    public ruta?: any;

    constructor() {
        this.archivo = null;
        this.nombre = '';
        this.idtipo_documento = '';
        this.ruta = null;
    }

}
