import { Component, AfterViewInit, EventEmitter, Output, ChangeDetectorRef, OnInit } from '@angular/core';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from '../services/menu.service';
import { CommunicationService } from '../services/communication.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  totalN = 0; OficiosPdf: any[] = new Array(); autorizados = 0; registros2: any[] = new Array();
  id: any;

  public showSearch = false;
  formaNot: FormGroup;
  idusuario; idtipousuario; foliosListos: any; ArrayFolios: any[] = new Array(); redaccionListos: any; ArrayRedaccion: any[] = new Array();
  usuario: string = '';
  tipo: any;
  alive = true;
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  menuItems: any[] = new Array()
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    }

    else {
      this.showMenu = element;
    }

  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    }

    else {
      this.showSubMenu = element;
    }

    window.scroll(
      {
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
  }

  constructor
    (
      private modalService: NgbModal,
      private router: Router,
      private route: ActivatedRoute,
      private menuService: MenuService,
      private communicationService: CommunicationService,
    private authService: AuthService,
    private fb: FormBuilder
   
    ) { 


    this.usuario = this.authService.getPlayLoad().datos.nombre
    this.tipo = this.authService.getPlayLoad().datos.tipo
    this.idusuario = this.authService.getPlayLoad().datos.idusuario
    this.idtipousuario = this.authService.getPlayLoad().datos.tipo
   // console.log('idtipousuario', this.idtipousuario);
    if (this.idtipousuario == 4 || this.idtipousuario == 5) {
      //this.obtenerFolios();
    }
    if (this.idtipousuario == 1) {
    //  this.obtenerOficios();
      //this.obtenerRedacciones();
    }

    this.buidlform();
    }

  // End open close 
  ngOnInit() {
    // this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    // Realizando la petición para obtener el menú de acuerdo al rol del usuario
    this.menuService.obtenerMenu(localStorage.getItem('token'))
      .subscribe((menu) => {
        this.sidebarnavItems = menu;
      });



    // interval(1800000) // 60000 milisegundos = 1 minuto    300000 -- 5 min
    //   .pipe(takeWhile(() => this.alive)) // La bandera 'alive' indica si el componente está activo
    //   .subscribe(() => {

    //     // this.myFunction();
    //     if (this.idtipousuario == 4 || this.idtipousuario == 5) {
    //       this.obtenerFolios();
    //     }
    //     if (this.idtipousuario == 1) {
    //       this.obtenerOficios();
    //       this.obtenerRedacciones();
    //     }
    //   });
  }




  ngOnDestroy() {
    this.alive = false;
  }

  buidlform() {
    this.formaNot = this.fb.group({
      idoficio: [''],
      redaccion_not: [''],
      autorizado: [''],
    },
      {
        updateOn: 'change'
      });
  }


 
}
