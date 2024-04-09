import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_WS } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) 
  { }

  obtenerMenu(idRol)
  {
    const url = URL_WS + '/Menu';
    
    return this.http.post<any>(url, idRol)
    .pipe(
      map(menu => {
          return menu
      },
      error => {
      })
    )
  }

}
