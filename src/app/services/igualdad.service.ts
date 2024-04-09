import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_WS } from 'src/environments/environment';
import { AgregarData } from '../models/agregarData.model';
@Injectable({
  providedIn: 'root'
})
export class IgualdadService {

  constructor(private http: HttpClient) { }

  paginado(limit: number, page: number, filtros, order) {
    const url = URL_WS + "/Igualdad/igualdad";
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }
  agregarRegistro(forma: any, documentos: any[]) {
    const url = URL_WS + "/Igualdad/agregar";
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
  getRegistro(idigualdad: any) {
    const url = URL_WS + `/Igualdad/registroimg/${idigualdad}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  obtenerLugar() {
    const url = URL_WS + '/Igualdad/lugar';
    return this.http.get<any>(url)
      .pipe(map((temas) => {
        return temas;
      }));
  }

  obtenerTemas() {
    const url = URL_WS + '/Igualdad/temas';
    return this.http.get<any>(url)
      .pipe(map((temas) => {
        return temas;
      }));
  }
  agregarTema(form: FormData) {
    const url = URL_WS + '/Igualdad';
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }

  agregarLugar(form: FormData) {
    const url = URL_WS + '/Igualdad/lugar';
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }

  eliminarDocumento(data: any) {
    const url = URL_WS + "/Igualdad/eliminar_doc";
    return this.http.post(url, data).map((resp: any) => {
      return resp;
    });
  }
}
