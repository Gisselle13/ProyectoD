import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Validations } from 'src/app/shared/utils/validations';
import { UsuariosService } from 'src/app/services/configuration/usuarios.service';

import { RegistrosService } from '../../services/registros.service';
@Component({
  selector: 'app-registro-llamadas',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css' , './registros.scss']
})
export class RegistrosComponent implements OnInit {
  forma: FormGroup;
  idllamada = 0;
  playLoad: any;
  textButton: string = 'Agregar';
  registros: any[] = new Array();
  filtro = new Subject<string>();
  filtros = [];
  order = [];
  total = 0;
  page = 1;
  limit = 10;
  errMsj = null;
  fechaHoy; HoraActual;
  NombresPsicologo: any[] = new Array();
  Nombres: any[] = new Array();
  selectedValue: string; id: any; nombre: any; user: string; correo: any;
  selectedValue2: string;
  selectedValue3: string;
  dirigido = 0; idtipousuario = 0; idUsuarioActual;
  Alertas: any[] = new Array();
  idCall:any;edit=0;encuesta=0;titulo:any;Data:any;idFiltro:any;
  obligatorio = 'false'; mensaje = 0; Llamadas: any[] = new Array(); Telefonos: any[] = new Array();
  constructor(private fb: FormBuilder, private activeRoutes: ActivatedRoute, private authService: AuthService, private registrosService: RegistrosService, private usuariosService: UsuariosService, private cdr: ChangeDetectorRef) {

    this.playLoad = this.authService.getPlayLoad();
    this.idtipousuario = this.playLoad.datos.tipo;
    this.idUsuarioActual = this.playLoad.datos.idusuario;
    this.idFiltro = this.playLoad.datos.idusuario;
    console.log('idusser: ', this.idUsuarioActual);
     if(this.idtipousuario==1 ){
      this.idFiltro= ''
      }
    this.buildForm();
    // this.getUsuarios();
    this.idllamada = this.activeRoutes.snapshot.params.id;
    if (this.idllamada == undefined) {
      this.idllamada = 0;
      this.textButton = 'Agregar';
    }

    if (this.idllamada != 0) {
      this.textButton = 'Editar';
      this.idllamada = this.idllamada;

      //-- this.cargarDatos();

    }
    else {
      this.idllamada = 0;
      this.textButton = 'Agregar';
    }

    this.filtro.pipe(debounceTime(800)).subscribe(() => {
        this.paginado();
    });


    this.filtros = [
      {
        col: 'idllamada',
        param: '',
        type: 'string',
      },
      {
        col: 'telefono',
        param: '',
        type: 'string',
      },
      {
        col: 'atendio',
        param: '',
        type: 'string',
      },
      {
        col: 'hora',
        param: '',
        type: 'string',
      },
      {
        col: 'fecha',
        param: '',
        type: 'string',
      },
      {
        col: 'sexo',
        param: '',
        type: 'string',
      },
      {
        col: 'edad',
        param: '',
        type: 'string',
      },

      {
        col: 'pregunta_1',
        param: '',
        type: 'string',
      },
      {
        col: 'pregunta_2',
        param: '',
        type: 'string',
      },
      {
        col: 'pregunta_3',
        param: '',
        type: 'string',
      },
      {
        col: 'pregunta_4',
        param: '',
        type: 'string',
      },
      {
        col: 'pregunta_5',
        param: '',
        type: 'string',
      },
      {
        col: 'comentarios',
        param: '',
        type: 'string',
      },
      //Filtrando los registros Individuales
      {
        col: 'idusuario',
        param: this.idFiltro,
        type: 'string',
      }
    ];

    this.order = [
      {
        orderBy: 'fecha',
        direction: 'desc'
      }
    ];

     this.paginado();


this.obtenerLlamadasAll();
  }

  ngOnInit(): void {
    //this.obtenerPsicologo();
    //this.obtenerAbogadas();
    this.fechaHoy = moment(new Date()).format('YYYY-MM-DD');
    this.HoraActual = moment(new Date()).format('HH:mm');

    this.forma.patchValue({ 'fecha': this.fechaHoy, 'hora': this.HoraActual, 
   'telefono': '(867)' 
  });
    const numerosEvitar = [2, 3, 4];
    let numeroAleatorio: number;
    do {
      numeroAleatorio = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    } while (numerosEvitar.includes(numeroAleatorio));

    // const numeroAleatorio = this.generarNumeroTelefono();
     console.log('Número de teléfono aleatorio:', numeroAleatorio);
  }

  // Ejemplo de cómo podrías usar la función
  // generarNumero() {
  //   const numeroAleatorio = this.generarNumeroTelefono();
  //   console.log('Número de teléfono aleatorio:', numeroAleatorio);
  //   this.forma.patchValue({
  //    'telefono': numeroAleatorio
  //   });
  // }

  // generarNumeroTelefono(): string {
  //   let numeroTelefono = '867'; // Prefijo telefónico (puedes cambiarlo según tu región)

  //   // Generar el resto del número de teléfono (9 dígitos)
  //   for (let i = 0; i < 7; i++) {
  //     numeroTelefono += Math.floor(Math.random() * 10).toString();
  //   }
  //   const numerosEvitar = [2, 3, 4,5];
  //   let numeroAleatorio: number;
  //   do {
  //     numeroAleatorio = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
  //   } while (numerosEvitar.includes(numeroAleatorio));
  //   // Formatear el número de teléfono
  //   numeroTelefono = numeroTelefono.replace(/(\d{3})(\d{3})(\d{4})/, '$1$2$3'); // Formato (123) 456-7890

  //   return numeroTelefono;
  // }

  generarNumeroTelefonoAleatorio(numerosEvitar: string[]): string {
    let numeroTelefono: string;
    do {
      numeroTelefono = '867'; // Prefijo telefónico 
      for (let i = 0; i < 7; i++) {
        numeroTelefono += Math.floor(Math.random() * 10).toString();
      }
      // Formatear el número de teléfono
     numeroTelefono = numeroTelefono.replace(/(\d{3})(\d{3})(\d{4})/, '$1$2$3'); // Formato (123) 456-7890
    } while (numerosEvitar.includes(numeroTelefono));

    return numeroTelefono;
  }

  generarNumeroSinRepetir() {
    const numeroAleatorio = this.generarNumeroTelefonoAleatorio(this.Telefonos);
   // console.log('Número SIN REPETIR:', numeroAleatorio);
    this.forma.patchValue({
      'telefono': numeroAleatorio
    });
  }

  buildForm() {
    this.forma = this.fb.group({
      idllamada: this.idllamada,
      telefono: ['', [Validators.required], [Validations.existeTelValidator(this.registrosService)]],
      atendio: [''],
      pregunta_1: [''],
      pregunta_2: [''],
      pregunta_3: [''],
      pregunta_4: [''],
      pregunta_5: [''],
      fecha: [''],
      hora: [''],
      comentarios: [''],
      sexo: [''],
      edad: [''],
      idusuario: [''],
    },
      {
        updateOn: 'change'
      });
  }






  agregarLlamada() {

    let text = 'Llamada Agregada'
    this.forma.value.idusuario = this.idUsuarioActual;

    this.registrosService.agregarLlamada(this.forma.value, this.idllamada, this.encuesta)
      .subscribe(resp => {
        Swal.fire({
          title: 'Éxito',
          icon: 'success',
          toast: true,
          text: text,
          position: 'top',
          showConfirmButton: false,
          timer: 1500
        })
          .then(resp => {
            console.log('form: ', this.forma.value);
            window.location.reload();
            //-- this.router.navigateByUrl('/atencion');
          });
      }, err => {
        Swal.fire({
          title: 'Error',
          text: err.error.mensaje,
          icon: 'error'
        });
      })

  }


   paginado() {

     this.registrosService.obtenerFormato().subscribe(
       data => {
         this.Data = data
         this.encuesta = this.Data.registro.idencuesta
         console.log('encuesta::::', this.encuesta);


         console.log('pag:', this.encuesta);
         this.registrosService.paginadoLlamadas(this.limit, this.page, this.filtros, this.order, this.encuesta)
           .subscribe(
             (data) => {
               this.registros = data.registros;
               //  console.log('registros Llamadas-', this.registros);
               this.total = data.total;
             }
           );
       }
     )
   


   }





  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      data => {
        this.Nombres = data.registro
        //console.log('Nombres-', this.Nombres);
      })

  }



  eliminarLlamada(id: number) {
    //  this.varaux = 1;
    this.idCall = id;
    // console.log('v-', this.varaux);
    console.log('id idCall:', this.idCall);


    const text = `¿Seguro que desea eliminar?`;
    Swal.fire({
      title: 'Eliminar Llamada',
      text,
      icon: 'warning',
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonText: 'No',
      cancelButtonColor: '#EF5350',
      reverseButtons: true
    })
      .then(resp => {
        if (resp.isConfirmed) {
          this.eliminar(id);
        }
      });


  }

  eliminar(id) {

    this.registrosService.eliminarLlamada(id).subscribe(
        data => {
        //  this.buildForm();
        //  this.ObtenerHijos();
        location.reload();
          const toast = this.swalToastOpen();
          toast.fire();
        },
        err => {
          this.errMsj = err.error.mensaje;
          console.log(err);
        }
      );
    }

  swalToastOpen(): typeof Swal {
    const toast = Swal.mixin({
      title: 'Éxito',
      text: 'Se eliminó exitosamente',
      icon: 'success',
      toast: true,
      showConfirmButton: false,
      timer: 2000,
      position: 'top'
    })
    return toast;
  }






  obtenerLlamada(id: number) {

    this.edit = 1;
    this.idCall = id;
    this.textButton = 'Editar';
    console.log('idCall', this.idCall);

      this.registrosService.obtener_info(this.idCall, this.encuesta)
        .subscribe(
          data => {
            this.forma.patchValue(data.registro);
          },
          err => {
            // console.log(err.error);
          }
        )
  }

  editarLlamada(id: number) {
    this.forma.value.idllamada = this.idCall;
    console.log('id',id);


    this.registrosService.editarLlamada(this.forma.value, id, this.encuesta)
        .subscribe(resp => {
          Swal.fire({
            title: 'Exito',
            text: 'Llamada editada',
            icon: 'success',
            toast: true,
            showConfirmButton: false,
            timer: 1500,
            position: 'top',
          })
            .then(resp => {
              window.location.reload();
              // this.buildForm();
              // this.ObtenerHijos();
            });
        }, err => {
          Swal.fire({
            title: 'Error',
            text: err.error.mensaje,
            icon: 'error'
          });
        })
  

    this.edit = 0;
  }


  toggle2() {

    if (this.forma.value.pregunta_1.trim() == 'SI') {
      this.obligatorio = 'true'
      this.mensaje=0;
    }
    else {
      this.obligatorio = 'false'
      this.mensaje= 1;
    }
    this.cdr.detectChanges();
  }
 

  get nombreField() {
    return this.forma.get('telefono');
  }


  obtenerLlamadasAll() {
    this.registrosService.obtenerLlamadasAll()
      .subscribe(
        data => {
          this.Llamadas = data.respuesta;

          for (let i = 0; i <= this.Llamadas.length - 1; i++) {
            this.Telefonos[i] = this.Llamadas[i].telefono;
           // this.Telefonos[i] = this.Llamadas[i].idllamada;
          }
          console.log('Telefonos---', this.Telefonos);
        },
        err => {
          console.log(err.error);
        }
      )
  }
}
