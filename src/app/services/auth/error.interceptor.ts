import {Injectable} from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { CommunicationService } from '../../shared/services/communication.service'
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private communicationService: CommunicationService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        let errorMessage = '';

        // Error en el cliente
        if (error instanceof ErrorEvent) 
        {
          errorMessage = `Ocurio un error: ${error.error.message}`;
        } 

        // Error en el backend
        else 
        {
          switch(error.status)
          {
              case 401:
              {
                errorMessage = 'La sesión ha expirado, por favor vuelve a ingresar.';
                
                // Guardando el contexto en el servicio de comunicación
                this.communicationService.setContext = 'login';

                // Guardando el mensaje en el servicio de comunicación
                this.communicationService.setMessage = errorMessage;

                // Forzamos al usuario a ingresar de nuevo
                this.router.navigate(['/login'])

                break;
              }

               case 403:
                 Swal.fire('Error', 'Acceso denegado', "error");
                 this.router.navigate(['/atencion']);
                 break;
              /*
              case 500:             
                Swal.fire("Aviso", "Ocurrió un error " + error.error.mensaje.error, "error");
                break;
              */

              // default:
              //    Swal.fire("Aviso", error.error, "error");
              //    break;
              
          }
        }

        return throwError(errorMessage);
      })
    );
  }
}