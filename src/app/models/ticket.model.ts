//import { URL_IMAGES } from "../../environments/environment";

export class Ticket {
  public idticket: any;
  public nombre: string;
  public fecha_captura: string;
  public iddireccion: any;
  public direccion: string;
  public secretaria: string;
  public idsubdireccion: any;
  public subdireccion: string;
  public idproyecto: any;
  public descripcion: string;
  public idmedio: string;
  public medio: string;
  public proyecto: string;
  public idusuario_asignado: any;
  public usuario_asignado: string;
  public correo?: string;
  public telefono?: any;
  public extension?: string;
  public oficio?: any;
  public documentos?: File[];
  public idestado: any;
  public estado: any;

  public solicitante?: string;
  public comentarios?: [];
  public testados?: [];
  public asignaciones: [];
  public color: any;
  public cantidad?: number;
  constructor() {
    this.idticket = 0;
    this.idsubdireccion = undefined;
    this.iddireccion = undefined;
    this.idproyecto = undefined;
    this.idmedio = '1';
    this.idusuario_asignado = undefined;
    this.idestado = undefined;
    this.nombre = "";
    this.fecha_captura = "";
    this.direccion = "";
    this.secretaria = "";
    this.subdireccion = "";
    this.descripcion = "";
    this.extension = "";
    this.correo = "";
    this.medio = "";
    this.proyecto = "";
    this.oficio = "N/A";
    this.usuario_asignado = "";
    this.telefono = "";
    this.solicitante = "";
    this.color = "";
    this.estado = "";
    
    this.cantidad = 1;
  }
}
