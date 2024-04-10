import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  idpaciente = 0;
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

  Medicos = [
    { value: 'FLORES TAMEZ DR. SIGIFREDO', viewValue: 'FLORES TAMEZ DR. SIGIFREDO' },
    { value: 'HERNANDEZ ZARAGOZA DRA. MIRIAM', viewValue: 'HERNANDEZ ZARAGOZA DRA. MIRIAM' },
  ]; medico: string;
  constructor(private fb: FormBuilder, private activeRoutes: ActivatedRoute, private authService: AuthService, private registrosService: RegistrosService, private usuariosService: UsuariosService, private cdr: ChangeDetectorRef, private router: Router) {

    this.playLoad = this.authService.getPlayLoad();
    this.idtipousuario = this.playLoad.datos.tipo;
    this.idUsuarioActual = this.playLoad.datos.idusuario;
    this.idFiltro = this.playLoad.datos.idusuario;
    this.idpaciente = this.activeRoutes.snapshot.params.id;


    console.log('idusser: ', this.idUsuarioActual);
     if(this.idtipousuario==1 ){
      this.idFiltro= ''
      }
    this.buildForm();
    // this.getUsuarios();
    this.idpaciente = this.activeRoutes.snapshot.params.id;
    if (this.idpaciente == undefined) {
      this.idpaciente = 0;
      this.textButton = 'Agregar';
    }

    if (this.idpaciente != 0) {
      this.textButton = 'Editar';
      this.idpaciente = this.idpaciente;

       this.obtenerPaciente(this.idpaciente);

    }
    else {
      this.idpaciente = 0;
      this.textButton = 'Agregar';
    }

    // this.filtro.pipe(debounceTime(800)).subscribe(() => {
    //     this.paginado();
    // });


    // this.filtros = [
    //   {
    //     col: 'idpaciente',
    //     param: '',
    //     type: 'string',
    //   },
    //   {
    //     col: 'fecha_ingreso',
    //     param: '',
    //     type: 'string',
    //   },
    //   {
    //     col: 'codigo',
    //     param: '',
    //     type: 'string',
    //   },
    //   {
    //     col: 'nombre',
    //     param: '',
    //     type: 'string',
    //   },
    //   {
    //     col: 'curp',
    //     param: '',
    //     type: 'string',
    //   },
    //   {
    //     col: 'edad',
    //     param: '',
    //     type: 'string',
    //   },


    
    //   //Filtrando los registros Individuales
    //   // {
    //   //   col: 'idusuario',
    //   //   param: this.idFiltro,
    //   //   type: 'string',
    //   // }
    // ];

    // this.order = [
    //   {
    //     orderBy: 'fecha_ingreso',
    //     direction: 'desc'
    //   }
    // ];

    //  this.paginado();


//this.obtenerLlamadasAll();
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
      idpaciente: this.idpaciente,
      fecha_ingreso: [''],
      nombre: [''],
      codigo: [''],
      curp: [''],
      sexo: [''],
      edad: [''],
      meses: [''],
   
      fecha_nacimiento: [''],
      medico_titular: [''],
      calle: [''],
      colonia: [''],
      no_exterior: [''],
      no_interior: [''],
      estado: [''],
      pais: [''],
      ciudad: [''],
      nacionalidad: [''],
      codigo_postal: [''],
      tel_casa: [''],
      tel_oficina: [''],
      celular: [''],
      correo: [''],
      alergico_medicamento: [''],
      realizado_endodoncias: [''],
      diabetico: [''],
      padece_corazon: [''],
      padece_presion_baja: [''],
      padece_presion_alta: [''],
      padece_riñon: [''],
      otra_enfermedad: [''],
      tomando_medicamento: [''],
      sangran_encias: [''],
      dolor_piezas: [''],
      color: [''],
      notas: [''],
    },
      {
        updateOn: 'change'
      });
  }






  agregarPaciente() {

    let text = 'Realizado'
    if (this.idpaciente == 0) { text = 'Paciente Agregado' }else{
    text = 'Paciente Editado'
    }
    this.forma.value.idusuario = this.idUsuarioActual;

    if (this.forma.value.medico_titular==undefined){
      this.forma.value.medico_titular = ' ';
    }
    this.registrosService.agregarPaciente(this.forma.value, this.idpaciente)
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
          //  window.location.reload();
            this.router.navigateByUrl('/registros');
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
         this.registrosService.paginadoPacientes(this.limit, this.page, this.filtros, this.order)
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






  obtenerPaciente(id: number) {
    this.id = this.idpaciente;
      this.registrosService.obtener_info(this.id)
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
    this.forma.value.idpaciente = this.idCall;
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
  

    //this.edit = 0;
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
 

  // get nombreField() {
  //   return this.forma.get('telefono');
  // }


  obtenerLlamadasAll() {
    this.registrosService.obtenerLlamadasAll()
      .subscribe(
        data => {
          this.Llamadas = data.respuesta;

          for (let i = 0; i <= this.Llamadas.length - 1; i++) {
            this.Telefonos[i] = this.Llamadas[i].telefono;
           // this.Telefonos[i] = this.Llamadas[i].idpaciente;
          }
          console.log('Telefonos---', this.Telefonos);
        },
        err => {
          console.log(err.error);
        }
      )
  }
}
