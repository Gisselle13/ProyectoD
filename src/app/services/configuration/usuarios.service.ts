import { Injectable } from '@angular/core';
import { HttpHeaders , HttpClient } from '@angular/common/http';
import { URL_WS } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { ExisteCorreo } from '../../models/existeCorreo';
import { AgregarData } from '../../models/agregarData.model';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url: string = URL_WS;
  constructor(private http: HttpClient) { }

  // Función para obtener la lista de los tipos de usuario
  getTiposUsuario()
  {
    
    const url = URL_WS + '/Usuarios/tiposusuario'

    return this.http.get<any>(url)
    .pipe(
      map( (usuarios) => {
          return usuarios
      },
      error => {
      })
    )
  }

  // Función para obtener el usuario basado en el ID
  obtenerUsuario(idUsuario: number)
  {
    const url = URL_WS + '/Usuarios/usuario/' + idUsuario

    return this.http.get<any>(url)
    .pipe(
      map( (usuario) => {
          return usuario;
      })
    )
  }


  // obtenerEmpleado(idEmpleado: number) {
  //   const url = URL_WS + '/Usuarios/empleado/' + idEmpleado

  //   return this.http.get<any>(url)
  //     .pipe(
  //       map((empleado) => {
  //         return empleado;
  //       })
  //     )
  // }

  paginado(limit: number, page: number, filtros, order) {
    const url = URL_WS + "/Usuarios/usuariospag";
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }


  agregarUsuario(form: FormData) {
    const url = URL_WS + '/Usuarios';
    const formData: FormData = new FormData();
    let i = 1;
    formData.append('form', JSON.stringify(form));
    return this.http.post<AgregarData>(url, formData)
      .pipe(map((resp: AgregarData) => resp));
  }


  // agregarRegistro(form: FormData) {
  //   const url = URL_WS + '/Usuarios/agregarregistro';
  //   const formData: FormData = new FormData();
  //   let i = 1;
  //   formData.append('form', JSON.stringify(form));
  //   return this.http.post<AgregarData>(url, formData)
  //     .pipe(map((resp: AgregarData) => resp));
  // }

  // Función para guardar el usuario
  // agregarUsuario(usuario)
  //  {
  //    const url = URL_WS + '/Usuarios';
  //       return this.http.post(url, usuario).pipe(
  //           map((resp: any) => {
  //               return resp;
  //           })
  //       );
  //  }

   // Función para actualizar el usuario
  //  actualizarUsuario(usuario)
  //  {
  //   const url = URL_WS + '/Usuarios';

  //   return this.http.put<any>(url, usuario)
  //   .pipe(
  //     map(response => {
  //     },
  //     err => {
  //     })
  //   )
  //  }

  cambiarEstado(idUsuario, valor)
  {
    const url = URL_WS + '/Usuarios/cambiar_estado';

    return this.http.put<any>(url, { idUsuario: idUsuario, valor: valor })
    .pipe(
      map(response => {
      },
      err => {
      })
    )
  }

  // estadoOff(idusuario, valor) {
  //   const url = URL_WS + '/Usuarios/estado_off';

  //   return this.http.put<any>(url, { idusuario: idusuario })
  //     .pipe(
  //       map(response => {
  //       },
  //         err => {
  //         })
  //     )
  // }

  cambiar(endPoint: string, idElemento: number, ) {
    
    return this.http.put(`${this.url}/${endPoint}/estado_off/${idElemento}`, {}).pipe(
      map(respuesta => respuesta)
    )
  }
 
  //  existeCorreo(correo: string, nuevo: number, idUsuario: number)
  //  {
  //   const url = URL_WS + '/Usuarios/existecorreo';
  //   return this.http.post<ExisteCorreo>(url, {correo: correo, nuevo: nuevo, idUsuario: idUsuario}).pipe(
  //       map((resp: any) => {
  //           return {emailRegistrado: resp.registrado}
  //       })
  //   );
  //  }

  existe_correo(correo: string, idusuario) {
    const url = URL_WS + '/Usuarios/existe_correo';
    return this.http.post<ExisteCorreo>(url, { correo, idusuario });
  }

  getUsuarios() {
    const url = URL_WS + `/Usuarios/getusuarios`;
    return this.http.get<any>(url)
      .pipe(
        map((proyecto) => { return proyecto },
          error => { console.log(error) })
      )
  }

}
