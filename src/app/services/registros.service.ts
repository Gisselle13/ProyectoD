import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_WS } from 'src/environments/environment';
import { AgregarData } from '../models/agregarData.model';
import { GetData } from '../models/getData.model';
import { Registro } from '../models/registro.model';
import { ExisteUser } from '../models/existeUser';
import { Formato } from '../models/formato.model';
@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  constructor(private http: HttpClient) { }


  agregarPaciente(form: FormData, idllamada: number) {
    const url = URL_WS + `/Registros/agregar_paciente/${idllamada}`;
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }

  paginadoPacientes(limit: number, page: number, filtros, order) {
    const url = URL_WS +  `/Registros/pagpacientes`;
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }
  paginadoReportes(limit: number, page: number, filtros, order) {
    const url = URL_WS + `/Registros/pagreportes`;
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  eliminarPaciente(idpaciente: number) {
    const url = URL_WS + '/Registros/eliminar_paciente';
    return this.http.post<any>(url, idpaciente)
      .pipe(map((resp: any) => resp));
  }


  obtener_info(idpaciente: number) {
    const url = URL_WS + `/Registros/obtenerinfo/${idpaciente}`;
    return this.http.get(url)
      .pipe(map((resp: GetData) => {
        let proyectos: Registro = resp.registro;
        const { mensaje, status } = resp;
        const proyecto = { status, mensaje, registro: proyectos, idpaciente: idpaciente }
        return proyecto;
      }));
  }
  editarLlamada(form: FormData, idllamada: number, encuesta: number) {
    const url = URL_WS + `/Registros/editar_llamada/${idllamada}/${encuesta}`;
    return this.http.post<AgregarData>(url, form)
      .pipe(map((resp: AgregarData) => resp));
  }


  obtenerDatos(fechai: any, fechaf: any) {
    const url = URL_WS + `/Registros/datos/${fechai}/${fechaf}`;
    return this.http.get<any>(url)
      .pipe(
        map((proyecto) => { return proyecto },
          error => { console.log(error) })
      )
  }


  EnviarIdencuesta(idencuesta: number, idregistro: any) {
    const url = URL_WS + `/Registros/enviar_idencuesta/${idencuesta}/${idregistro}`;
    return this.http.post(url, { idencuesta: idencuesta, idregistro: idregistro})
      .pipe(map((f) => {
        return f;
      }));
  }


  obtenerFormato() {
    const url = URL_WS + `/Registros/formato`;
    return this.http.get(url)
      .pipe(map((resp: GetData) => {
        let formato: Formato = resp.registro;
        const { mensaje, status } = resp;
        const c = { status, mensaje, registro: formato }
        return c;
      }));
  }


  // existe_user(telefono: string, idllamada) {
  //   const url = URL_WS + '/Registros/existe_tel';
  //   return this.http.post<ExisteUser>(url, { telefono, idllamada });
  // }


  existe_user(nombre: string, idpaciente) {
    const url = URL_WS + '/Registros/existe_user';
    return this.http.post<ExisteUser>(url, { nombre, idpaciente });
  }

  obtenerCargo() {
    const url = URL_WS + '/Registros/cargo';

    return this.http.get<any>(url)
      .pipe(
        map((cargo) => {
          return cargo;
        })
      )
  }
  obtenerLlamadasAll() {
    const url = URL_WS + '/Registros/llamadas';

    return this.http.get<any>(url)
      .pipe(
        map((l) => {
          return l;
        })
      )
  }

  obtenerNombresPacientes() {
    const url = URL_WS + '/Registros/nombres_pacientes';
    return this.http.get<any>(url)
      .pipe(map((n) => {
        return n;
      }));
  }
}
