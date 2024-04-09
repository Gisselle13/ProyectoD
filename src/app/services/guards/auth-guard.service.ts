import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from "@angular/router"
import { FormatoService } from '../formato.service';
import {  Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    idformato: any;
    TipoUsuario: any;
    ruta: any;
    constructor(private authService: AuthService, public router: Router, private activeRoutes: ActivatedRoute, private formatoService: FormatoService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
    {
        if (!this.authService.isAuthenticated()) 
        {
            this.router.navigate(['/login']);
            return false;
        }
        // Al enviar la petición se envia el path al que se trata de entrar
        // Se elimina todo lo que este despues del '/' para asi obtener la ruta original
        return this.authService.authGuard(state.url.split('/')[1], Number(this.authService.getPlayLoad().datos.tipo));
    }


    //  obtenerTipoUsuario() {

    //      this.formatoService.tipoUsuario(Number(this.authService.getPlayLoad().datos.idusuario)).subscribe(
    //          tipousuario => {
    //              this.TipoUsuario = tipousuario;
    //              this.idformato = this.TipoUsuario.respuesta.idformato;
    //              console.log('idformato-:', this.idformato);
    //              if (this.ruta == undefined) {
    //                  this.ruta = this.idformato;
    //                  console.log('ruta-', this.ruta)
    //              }
    //          }
    //      )
    //  }
    
    canActivateChild( 
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
       // this.ruta = this.router.url.split('/')[3];
       // console.log('ruta completa:', this.router.url);

          this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.ruta = event.url.split('/')[3];;
                //console.log('STAR-RUTA-', this.ruta)
            }

            if (event instanceof NavigationEnd) {
                this.ruta = event.url.split('/')[3];;
                //console.log('END-RUTA-', this.ruta)
            }

            if (event instanceof NavigationError) {
               //console.log('event--',event.error);
                this.ruta = event.url.split('/')[3];;
               // console.log('error-ruta-', this.ruta)  
            }
        });

        //Solo si es Usuario
        if (this.authService.getPlayLoad().datos.tipo==3){
        if(this.ruta!= undefined){
                
            if (!this.authService.isAuthenticated()) {
                this.router.navigate(['/login']);
                return false;
            }
           // console.log('Y:----', this.router.url);

            return this.authService.Authguardusuario(Number(this.authService.getPlayLoad().datos.idusuario), Number(this.ruta));
            
         }else{ 
            //console.log('N:----', this.router.url);
           // console.log('r:', this.ruta);
             if (!this.authService.isAuthenticated()) {
                 this.router.navigate(['/login']);
                 return false;
             }
             return this.authService.authGuard(state.url.split('/')[1], Number(this.authService.getPlayLoad().datos.tipo));
         } 
        }
        else {
          //  console.log('Usuario ADMIN y MANAGER');
            
            if (!this.authService.isAuthenticated()) {
                this.router.navigate(['/login']);
                return false;
            }
            return this.authService.authGuard(state.url.split('/')[1], Number(this.authService.getPlayLoad().datos.tipo));
        } 
       
        
        
    }
}
