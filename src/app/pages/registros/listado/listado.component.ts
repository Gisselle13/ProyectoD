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
import { RegistrosService } from 'src/app/services/registros.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  filtro = new Subject<string>();
  filtros = [];
  order = [];
  total = 0;
  page = 1;
  limit = 10;
  errMsj = null;
  fechaHoy; HoraActual;
  registros: any[] = new Array();
  idCall: any; edit = 0; encuesta = 0; titulo: any; Data: any; idFiltro: any;
  constructor(private fb: FormBuilder, private activeRoutes: ActivatedRoute, private authService: AuthService, private registrosService: RegistrosService, private usuariosService: UsuariosService, private cdr: ChangeDetectorRef) { 


    this.filtro.pipe(debounceTime(800)).subscribe(() => {
      this.paginado();
    });


    this.filtros = [
      {
        col: 'idpaciente',
        param: '',
        type: 'string',
      },
      {
        col: 'fecha_ingreso',
        param: '',
        type: 'string',
      },
      {
        col: 'codigo',
        param: '',
        type: 'string',
      },
      {
        col: 'nombre',
        param: '',
        type: 'string',
      },
      {
        col: 'curp',
        param: '',
        type: 'string',
      },
      {
        col: 'edad',
        param: '',
        type: 'string',
      },

      //Filtrando los registros Individuales
      // {
      //   col: 'idusuario',
      //   param: this.idFiltro,
      //   type: 'string',
      // }
    ];

    this.order = [
      {
        orderBy: 'fecha_ingreso',
        direction: 'desc'
      }
    ];

    this.paginado();
  }

  ngOnInit(): void {
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







  eliminarPaciente(id: number) {
    //  this.varaux = 1;
    this.idCall = id;
    // console.log('v-', this.varaux);
    console.log('id idCall:', this.idCall);


    const text = `Confirmar`;
    Swal.fire({
      title: 'Eliminar Paciente',
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

    this.registrosService.eliminarPaciente(id).subscribe(
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
}
