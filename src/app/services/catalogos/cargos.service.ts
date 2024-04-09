import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { URL_WS } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { ExisteCorreo } from '../../models/existeCorreo';
import { AgregarData } from '../../models/agregarData.model';
@Injectable({
  providedIn: 'root'
})
export class CargosService {

  constructor(private http : HttpClient) {
   }

  getTiposCargo() {
    const url = URL_WS + '/Cargos/tiposcargo'

    return this.http.get<any>(url)
      .pipe(
        map((cargos) => {
          return cargos
        },
          error => {
          })
      )
  }
  obtenerCargo(idCargo: number) {
    const url = URL_WS + '/Cargos/cargo/' + idCargo

    return this.http.get<any>(url)
      .pipe(
        map((cargo) => {
          return cargo;
        })
      )
  }

  paginado(limit: number, page: number, filtros, order) {
    const url = URL_WS + "/Cargos/cargospag";
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }


  agregarCargo(form: FormData) {
    const url = URL_WS + '/Cargos';
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }

  cambiarEstado(idCargo, valor) {
    const url = URL_WS + '/Cargos/cambiar_estado';

    return this.http.put<any>(url, { idCargo: idCargo, valor: valor })
      .pipe(
        map(response => {
        },
          err => {
          })
      )
  }


}
