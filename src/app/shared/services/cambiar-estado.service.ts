import { Injectable } from '@angular/core';
import { URL_WS } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CambiarEstadoService
{
    url: string = URL_WS;

    constructor(private http: HttpClient) { }

    cambiar(endPoint: string, idElemento: number, estado: number)
    {
        return this.http.put(`${this.url}/${endPoint}/cambiar_estado/${idElemento}`, {}).pipe(
            map( respuesta => respuesta)
          )
    }
}