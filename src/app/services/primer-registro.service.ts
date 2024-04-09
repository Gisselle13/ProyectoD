import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_WS } from 'src/environments/environment';
import { AgregarData } from '../models/agregarData.model';
import { GetData } from '../models/getData.model';
import { Registro } from '../models/registro.model';
import { ExisteUser } from '../models/existeUser';
@Injectable({
  providedIn: 'root'
})
export class PrimerRegistroService {

  constructor(private http: HttpClient) { }


  obtenerAsesoria(idregistro: number) {
    const url = URL_WS + `/Primerregistro/asesoria/${idregistro}`;
    return this.http.get(url)
      .pipe(map((resp: GetData) => {
        let formato: Registro = resp.registro;
        const { mensaje, status } = resp;
        const c = { status, mensaje, registro: formato }
        return c;
      }));
  }

  // obtenerFormatos() {
  //   const url = URL_WS + '/Formato'

  //   return this.http.post<any>(url, localStorage.getItem('token'))
  //     .pipe(
  //       map((formato) => {
  //         return formato
  //       },
  //         error => {
  //           console.log(error)
  //         })
  //     )
  // }


  obtenerRegistro(idregistro: number) {
     const url = URL_WS + `/Primerregistro/registro/${idregistro}`;
     return this.http.get(url)
       .pipe(map((resp: GetData) => {
         let formato: Registro = resp.registro;
         const { mensaje, status } = resp;
         const c = { status, mensaje, registro: formato }
         return c;
       }));
   }


  // agregarRegistro(form: FormData) {
  //   const url = URL_WS + '/Primerregistro/agregar';
  //   const formData: FormData = new FormData();
  //   let i = 1;
  //   formData.append('form', JSON.stringify(form));
  //   return this.http.post<AgregarData>(url, formData)
  //     .pipe(map((resp: AgregarData) => resp));
  // }

  obtenerUsuaria(idregistro: any) {
    const url = URL_WS + `/Primerregistro/obtener_usuaria/${idregistro}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  agregarRegistro(forma: any, documentos: any[]) {
    const url = URL_WS + "/Primerregistro/agregar";
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


  eliminarDocumento(data: any) {
    const url = URL_WS + "/Primerregistro/eliminar_doc";
    return this.http.post(url, data).map((resp: any) => {
      return resp;
    });
  }

  paginado(limit: number, page: number, filtros, order) {
    const url = URL_WS + "/Primerregistro/registrospag";
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  paginadoVisitas(limit: number, page: number, filtros, order) {
    const url = URL_WS + "/Primerregistro/registrosvisitas";
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  paginadoAsignacion(limit: number, page: number, filtros, order) {
    const url = URL_WS + "/Primerregistro/sin_asignacion";
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }



  agregarLlamada(form: FormData, idllamada: number) {
    const url = URL_WS + `/Primerregistro/agregar_llamada/${idllamada}`;
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }

  paginadoLlamadas(limit: number, page: number, filtros, order) {
    const url = URL_WS + "/Primerregistro/pagllamadas";
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  paginadoUsuarias(limit: number, page: number, filtros, order) {
    const url = URL_WS + "/Primerregistro/usuariaspag";
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  paginadoCentros(limit: number, page: number, filtros, order) {
    const url = URL_WS + "/Primerregistro/centrospag";
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }


  agregarRegistroCentro(forma: any, documentos: any[]) {
    const url = URL_WS + "/Primerregistro/agregar_registro_centro";
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



  obtenerRegistroCentros(idregistro: number) {
    const url = URL_WS + `/Primerregistro/registro_centro/${idregistro}`;
    return this.http.get(url)
      .pipe(map((resp: GetData) => {
        let formato: Registro = resp.registro;
        const { mensaje, status } = resp;
        const c = { status, mensaje, registro: formato }
        return c;
      }));
  }

  getCentro(idregistro: any) {
    const url = URL_WS + `/Primerregistro/registro_user/${idregistro}`;
    return this.http.get(url).map((resp: any) => {
      return resp;
    });
  }

  obtenerAlertas(idusuario: any, idtipousuario:any) {
    const url = URL_WS + `/Primerregistro/alertas/${idusuario}/${idtipousuario}`;
    return this.http.get<any>(url)
      .pipe(map((nombres) => {
        return nombres;
      }));
  }

  existe_user(nombre: string, idregistro) {
    const url = URL_WS + '/Primerregistro/existe_user';
    return this.http.post<ExisteUser>(url, { nombre, idregistro });
  }

}
