import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_WS } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { AgregarData } from '../models/agregarData.model';
import { ExisteCorreo } from '../models/existeCorreo';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }

  obtenerEmpleado(idEmpleado: number) {
    const url = URL_WS + '/Registro/empleado/' + idEmpleado

    return this.http.get<any>(url)
      .pipe(
        map((empleado) => {
          return empleado;
        })
      )
  }

  agregarRegistro(form: FormData) {
    const url = URL_WS + '/Registro/agregarregistro';
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }


  correo(correo: string, idusuario) {
    const url = URL_WS + '/Registro/correo';
    return this.http.post<ExisteCorreo>(url, { correo, idusuario });
  }
}
