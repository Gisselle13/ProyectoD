import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_WS } from 'src/environments/environment';
import { AgregarData } from '../models/agregarData.model';
import { GetData } from '../models/getData.model';
import { Registro } from '../models/registro.model';
@Injectable({
  providedIn: 'root'
})
export class LegalService {

  constructor(private http: HttpClient) { }
  // agregarRegistro(form: FormData, idregistro: number) {
  //   const url = URL_WS + `/Legal/agregar/${idregistro}`;
  //   const formData: FormData = new FormData();
  //   let i = 1;
  //   formData.append('form', JSON.stringify(form));
  //   return this.http.post<AgregarData>(url, formData)
  //     .pipe(map((resp: AgregarData) => resp));
  // }

  agregarRegistro(forma: any, documentos: any[]) {
    const url = URL_WS + "/Legal/agregar";
    const formData = new FormData();
    formData.append("data", JSON.stringify(forma));
    let x = 1;
    for (const doc of documentos) {
      const name = `documento_${x}`;
      formData.append(name, doc.archivo);
      x++;
    }
    return this.http.post(url, formData).map((resp: any) => {
      return resp;
    });
  }

  

  getRegistro(idregistro: any) {
    const url = URL_WS + `/Legal/registroimg/${idregistro}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  obtenerNombres() {
    const url = URL_WS + '/Legal/nombres';
    return this.http.get<any>(url)
      .pipe(map((nombres) => {
        return nombres;
      }));
  }

  obtenerAbogadas() {
    const url = URL_WS + '/Legal/abogadas';
    return this.http.get<any>(url)
      .pipe(map((nombres) => {
        return nombres;
      }));
  }


  obtenerFormato(idformato: number) {
    const url = URL_WS + `/Legal/formato/${idformato}`;
    return this.http.get(url)
      .pipe(map((resp: GetData) => {
        let formato: Registro = resp.registro;
        const { mensaje, status } = resp;
        const c = { status, mensaje, registro: formato }
        return c;
      }));
  }



  verFecha(fecha: any, idusuario:any) {
    const url = URL_WS + `/Legal/fechas/${fecha}/${idusuario}`;
    return this.http.get<any>(url)
      .pipe(
        map((proyecto) => { return proyecto },
          error => { console.log(error) })
      )
  }


  agregarAgenda(form: FormData, idregistro: number) {
    const url = URL_WS + `/Legal/agregar_agenda/${idregistro}`;
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }

  agregarPermiso(form: FormData, idregistro: number) {
    const url = URL_WS + `/Legal/agregar_permiso/${idregistro}`;
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }





  obtenerAgenda(idregistro: number) {
    const url = URL_WS + `/Legal/citas/${idregistro}`;
    return this.http.get<any>(url)
      .pipe(
        map((proyecto) => { return proyecto },
          error => { console.log(error) })
      )
  }


  paginadoLegal() {
    const url = URL_WS + `/Legal/legalpag`;
    return this.http.get<any>(url)
      .pipe(
        map((proyecto) => { return proyecto },
          error => { console.log(error) })
      )
  }

  usuariasAbogada(idusuario: any, idtipo: any) {
    const url = URL_WS + `/Legal/usuarias/${idusuario}/${idtipo}`;
    return this.http.get<any>(url)
      .pipe(
        map((proyecto) => { return proyecto },
          error => { console.log(error) })
      )
  }

  paginadoCentros(idusuario: any, idtipo: any) {
    const url = URL_WS + `/Legal/centrospag/${idusuario}/${idtipo}`;
    return this.http.get<any>(url)
      .pipe(
        map((proyecto) => { return proyecto },
          error => { console.log(error) })
      )
  }


  abogada(idregistro: number) {
    const url = URL_WS + `/Legal/abogada/${idregistro}`;
    return this.http.get(url)
      .pipe(map((resp: GetData) => {
        let formato: Registro = resp.registro;
        const { mensaje, status } = resp;
        const c = { status, mensaje, registro: formato }
        return c;
      }));
  }

  AgendaPersonal(idregistro: number) {

    const url = URL_WS + `/Legal/personal/${idregistro}`;
    return this.http.get<any>(url)
      .pipe(
        map((proyecto) => { return proyecto },
          error => { console.log(error) })
      )
  }


  paginado(limit: number, page: number, filtros, order) {
    const url = URL_WS + "/Legal/registrospag";
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }


  obtenerRegistro(idregistro: number) {
    const url = URL_WS + `/Legal/registro/${idregistro}`;
    return this.http.get(url)
      .pipe(map((resp: GetData) => {
        let formato: Registro = resp.registro;
        const { mensaje, status } = resp;
        const c = { status, mensaje, registro: formato }
        return c;
      }));
  }

  obtenerRegistroCentro(idregistro: number) {
    const url = URL_WS + `/Legal/registrocentro/${idregistro}`;
    return this.http.get(url)
      .pipe(map((resp: GetData) => {
        let formato: Registro = resp.registro;
        const { mensaje, status } = resp;
        const c = { status, mensaje, registro: formato }
        return c;
      }));
  }


  editarCita(form: FormData, idagenda: number) {
    const url = URL_WS + `/Legal/editar/${idagenda}`;
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }


  obtenerCita(idagenda: number) {
    const url = URL_WS + `/Legal/cita/${idagenda}`;
    return this.http.get(url)
      .pipe(map((resp: GetData) => {
        let formato: Registro = resp.registro;
        const { mensaje, status } = resp;
        const c = { status, mensaje, registro: formato }
        return c;
      }));
  }



  eliminarCita(form: FormData) {
    const url = URL_WS + '/Legal/eliminar_cita';
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }



  eliminarFormato(form: FormData) {
    const url = URL_WS + '/Legal/eliminar_formato';
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }

  editarAsistio(form: FormData, idagenda: number) {
    const url = URL_WS + `/Legal/editar_a/${idagenda}`;
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }

  obtenerPermisos(idusuario:any) {
    const url = URL_WS + `/Legal/permisos/${idusuario}`;
    return this.http.get<any>(url)
      .pipe(map((nombres) => {
        return nombres;
      }));
  }
}
