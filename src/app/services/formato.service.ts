import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_WS } from 'src/environments/environment';
import { AgregarData } from '../models/agregarData.model';
import { GetData } from '../models/getData.model';
import { Formato } from '../models/formato.model';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class FormatoService {

  constructor(private http: HttpClient) { }


  obtenerFormatos() {
    const url = URL_WS + '/Formato'

    return this.http.post<any>(url, localStorage.getItem('token'))
      .pipe(
        map((formato) => {
          return formato
        },
          error => {
            console.log(error)
          })
      )
  }


  obtenerFormato(idformato: number) {
    const url = URL_WS + `/Formato/formato/${idformato}`;
    return this.http.get(url)
      .pipe(map((resp: GetData) => {
        let formato: Formato = resp.registro;
        const { mensaje, status } = resp;
        const c = { status, mensaje, registro: formato }
        return c;
      }));
  }

  

  agregarFormato(form: FormData) {
    const url = URL_WS + '/Formato/agregar';
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }

  Enviar(idformato: number) {
    // const url = URL_WS + '/Formato/enviar';
    // const formData: FormData = new FormData();
    // let i = 1;
    // formData.append('form', JSON.stringify(form));
    // return this.http.post<AgregarData>(url, formData)
    //   .pipe(map((resp: AgregarData) => resp));
    const url = URL_WS + `/Formato/enviar/${idformato}`;
    return this.http.post(url, { idformato: idformato })
      .pipe(map((f) => {
        return f;
      }));
  }


  paginado(limit: number, page: number, filtros, order) {
    const url = URL_WS + "/Formato/formatospag";
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }



  obtenerReportePDF(idformato: number) {
    const url = URL_WS + '/Formato/obtener_reporte/' + idformato

    return this.http.post(url, { idformato: idformato }, { responseType: 'blob' })
      .pipe(
        map(solicitud => {
          const downloadUrl = window.URL.createObjectURL(solicitud);
          window.open(downloadUrl);
        })
      )
  }

  Impresion(idformato) {
    let url = URL_WS + '/Formato' + "/pdf_plantilla";
    return this.http
      .post(
        url,
        { idformato },
        { responseType: "blob" }
      )
      .map((resp: any) => {
        let downloadUrl = window.URL.createObjectURL(resp);
        window.open(downloadUrl);
      });
  }


  Acuse(idformato) {
    let url = URL_WS + '/Formato' + "/pdf_acuse";
    return this.http
      .post(
        url,
        { idformato },
        { responseType: "blob" }
      )
      .map((resp: any) => {
        let downloadUrl = window.URL.createObjectURL(resp);
        window.open(downloadUrl);
      });
  }

  Test(idformato) {
    let url = URL_WS + '/Formato' + "/pdf_plantillatest";
    return this.http
      .post(
        url,
        { idformato },
        { responseType: "blob" }
      )
      .map((resp: any) => {
        let downloadUrl = window.URL.createObjectURL(resp);
        window.open(downloadUrl);
      });
  }

  TestMod(idformato) {
    let url = URL_WS + '/Formato' + "/pdf_plantillatestmod";
    return this.http
      .post(
        url,
        { idformato },
        { responseType: "blob" }
      )
      .map((resp: any) => {
        let downloadUrl = window.URL.createObjectURL(resp);
        window.open(downloadUrl);
      });
  }

  TestCon(idformato) {
    let url = URL_WS + '/Formato' + "/pdf_plantillatestcon";
    return this.http
      .post(
        url,
        { idformato },
        { responseType: "blob" }
      )
      .map((resp: any) => {
        let downloadUrl = window.URL.createObjectURL(resp);
        window.open(downloadUrl);
      });
  }

  ImpresionInicial(idformato) {
    let url = URL_WS + '/Formato' + "/pdf_plantillainicial";
    return this.http
      .post(
        url,
        { idformato },
        { responseType: "blob" }
      )
      .map((resp: any) => {
        let downloadUrl = window.URL.createObjectURL(resp);
        window.open(downloadUrl);
      });
  }

  ImpresionConclusion(idformato) {
    let url = URL_WS + '/Formato' + "/pdf_plantillaconclusion";
    return this.http
      .post(
        url,
        { idformato },
        { responseType: "blob" }
      )
      .map((resp: any) => {
        let downloadUrl = window.URL.createObjectURL(resp);
        window.open(downloadUrl);
      });
  }

  obtenerProgreso(idformato: number) {
    const url = URL_WS + `/Formato/progreso/${idformato}`;
    return this.http.post(url, { idformato: idformato })
      .pipe(map((tiposdeclarante) => {
        return tiposdeclarante;
      }));
  }

  obtenerTiposDeclarante() {
    const url = URL_WS + '/Datos13/tiposdeclarante';
    return this.http.get<any>(url)
      .pipe(map((tiposdeclarante) => {
        return tiposdeclarante;
      }));
  }


  tipoUsuario(idusuario: number) {
    const url = URL_WS + `/Formato/tipousuario/${idusuario}`;
    return this.http.post(url, { idusuario: idusuario })
      .pipe(map((tipousuario) => {
        return tipousuario;
      }));
  }

  tiposUsuario(idusuario: number) {
    const url = URL_WS + `/Formato/tiposusuario/${idusuario}`;
    return this.http.post(url, { idusuario: idusuario })
      .pipe(map((tipousuario) => {
        return tipousuario;
      }));
  }

  obtenerSecciones() {
    const url = URL_WS + '/Formato/secciones';
    return this.http.get<any>(url)
      .pipe(map((secciones) => {
        return secciones;
      }));
  }

  obtenerNivel(idusuario: number) {
    const url = URL_WS + `/Formato/nivel/${idusuario}`;
    return this.http.post(url, { idusuario: idusuario })
      .pipe(map((n) => {
        return n;
      }));
  }
}
