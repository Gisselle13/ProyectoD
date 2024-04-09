export class Archivo {
  constructor(
    public iddocumento?: any,
    public ruta?: any,
    public nombre?: any,
    public guardado?: any,
    public archivo?: any,
    public type?: any,
  ) {
    this.iddocumento = 0;
    this.ruta = "";
    this.nombre = "";
    this.type = "";
    this.guardado = 0;
  }
}
