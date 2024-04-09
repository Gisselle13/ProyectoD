import { Component, AfterViewInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


import { unescapeIdentifier } from '@angular/compiler';
import { UsuariosService } from 'src/app/services/configuration/usuarios.service';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./nav.css','./nav.scss'],
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  usuario: string = '';
  tipo:any;
  public config: PerfectScrollbarConfigInterface = {};
  totalN = 0; OficiosPdf: any[] = new Array(); registros2: any[] = new Array();
  id: any; totalA = 0;
  customColor ='F5BD3B';
  public showSearch = false;
  formaNot: FormGroup;formaAlerta: FormGroup;
  idusuario; idtipousuario; foliosListos: any; ArrayFolios: any[] = new Array(); redaccionListos: any; ArrayRedaccion: any[] = new Array(); ArrayAceptados: any[] = new Array(); aceptados: any; autorizados: any; ArrayAutorizados: any[] = new Array(); 
  alertas: any; ArrayAlertas: any[] = new Array(); 
  // Asegúrate de definir una bandera 'alive' y establecerla en 'true' en el componente.
  alive = true;
  constructor(private modalService: NgbModal, private authService: AuthService, private usuariosService:UsuariosService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.usuario = this.authService.getPlayLoad().datos.nombre
    this.tipo = this.authService.getPlayLoad().datos.tipo
    this.idusuario = this.authService.getPlayLoad().datos.idusuario
    this.idtipousuario = this.authService.getPlayLoad().datos.tipo

   // console.log('idtipousuario:', this.idtipousuario);
    // this.obtenerAlertas();
    //  if (this.idtipousuario==4 || this.idtipousuario==5){
    //    this.obtenerFolios();
    
    //  }
    //  if (this.idtipousuario == 7){
    //    this.obtenerOficios();
    //    this.obtenerRedacciones();
    //  }

    // if (this.idtipousuario == 6) {
    //   this.obtenerAceptados();
    //   this.obtenerAutorizados();
    // }
   
    //this.totalN = 1;
 // console.log('datos:', this.authService.getPlayLoad().datos);


this.buidlform();
  }

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  ngAfterViewInit() {}

  ngOnInit() {
    // Llama a la función cada minuto

     interval(1800000) // 60000 milisegundos = 1 minuto    300000 -- 5 min
         .pipe(takeWhile(() => this.alive)) // La bandera 'alive' indica si el componente está activo
         .subscribe(() => {
    

         });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  buidlform(){
    this.formaNot = this.fb.group({
      idoficio: [''],
      redaccion_not: [''],
      autorizado: [''],
    },
      {
        updateOn: 'change'
      });

      this.formaAlerta = this.fb.group({
      idllamada: [''],
      alerta: [''],

    },
      {
        updateOn: 'change'
      });
  }
  



  

   
  

  salir()
  {
   //console.log('idusuario;;;', this.idusuario);
    this.usuariosService.cambiar('usuarios', this.idusuario).subscribe(
      respuesta => {
        //console.log('cambio estado!!:', this.idusuario)

      }
    )


    this.authService.salir()
  }



  myFunction() {
    // Lógica de la función aquí
    console.log('Función llamada');
  }
}
