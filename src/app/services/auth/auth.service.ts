import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN, URL_WS } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  token: string;
  rutas = [];
  url = URL_WS + '/Auth';
  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem(TOKEN)) {
      const token = localStorage.getItem(TOKEN);
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  public deleteToken() {
    localStorage.removeItem(TOKEN);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  public getPlayLoad() {
    const token = localStorage.getItem(TOKEN);
    const decodeToken = this.jwtHelper.decodeToken(token);
    return decodeToken;
  }

  login(usuario: any) {
    const url = this.url;

    return this.http.post<any>(url, usuario);
    // .pipe(map(resp => {
    // this.guardarStorage(resp.token);
    // this.cargarStorage();
    // }));

  }

  cargarStorage() {
    if (localStorage.getItem(TOKEN)) {
      this.token = localStorage.getItem(TOKEN);
      const tkn = this.jwtHelper.decodeToken(this.token);
      this.rutas = tkn.menu;
    } else {
      this.token = '';
    }
  }

  guardarStorage(token: string) {
    localStorage.setItem(TOKEN, token);
    this.token = token;
    this.router.navigate(["/inicio"]);
  }

  guardarStorageRes(token: string) {
    localStorage.setItem(TOKEN, token);
    this.token = token;
  }

  salir() {

    localStorage.removeItem(TOKEN);
    this.rutas = [];
    this.token = "";
    this.router.navigate(["/login"]);
  }

  salir_log() {
    let id = this.getPlayLoad().data.idusuario;
    return this.http.get(this.url + '/cierre_sesion/' + id).pipe(map(resp => { }));
  }

  authGuard(path: string, idrol: number)
  {
    const url = URL_WS + '/Authguard'

    return this.http.post<any>(url, {path, idrol})
    .pipe(
      map( ( respuesta ) => { return respuesta })
    )
  }

  Authguardusuario(idusuario: number, idformato: number) {
    const url = URL_WS + '/Authguardusuario'
    

    return this.http.post<any>(url, { idusuario, idformato })
      .pipe(
        map((respuesta) => { return respuesta })
      )
  }
}
