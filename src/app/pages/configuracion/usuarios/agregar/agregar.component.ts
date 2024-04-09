import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormControlName, FormBuilder } from '@angular/forms';
import { UsuariosService } from 'src/app/services/configuration/usuarios.service';
import { Usuario } from '../../../../models/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Validations } from 'src/app/shared/utils/validations';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidators } from 'ngx-custom-validators';
import { RegistroService } from '../../../../services/registro.service';
@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar.component.html'
}) 
export class AgregarUsuarioComponent implements OnInit {
  idusuario: number = 0;
  // Modelo de usuario
  usuario: Usuario = new Usuario()

  // Variable para mostrar o no los campos de departamento y modulo
  mostrarDepartamentoModulo: boolean = false;
  forma: FormGroup;

  playLoad: any;
  textButton: string = 'Agregar';
  tiposUsuario: any[] = new Array;
  idUsuarioActual: any = '';
  idtipo_usuario: any;
  // Formulario para el usuario
  // usuarioForm = new FormGroup({
  //   id_usuario: new FormControl(0),
  //   idrol: new FormControl(0),
  //   nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
  //   correo: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],[Validations.validateCorreo(this.usuariosService, 1, this.idusuario)]),
  //   contrasena: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //   activo: new FormControl(1, Validators.required)
  // });

  constructor
  ( private usuariosService: UsuariosService, 
    private router: Router, 
    private authService: AuthService,
    private activedRoutes: ActivatedRoute, private activeRoutes: ActivatedRoute, private fb: FormBuilder, private registroService: RegistroService ) 
  { 
    this.playLoad = this.authService.getPlayLoad();
    this.idUsuarioActual = this.playLoad.datos.idusuario
    this.buildForm();
    this.idusuario = this.activeRoutes.snapshot.params.id;
    if (this.idusuario == undefined) {
      this.idusuario = 0;
      this.textButton = 'Agregar';
    }

    if (this.idusuario != 0) {
      this.obtenerUsuario(this.idusuario);
      this.textButton = 'Editar';
      this.idusuario = this.idusuario;

    }
    else {
      this.idusuario = 0;
      this.textButton = 'Agregar';
    }
    this.obtenerTiposUsuario();

  }

  ngOnInit(): void 
  {
    //this.obtenerTiposUsuario()
    this.forma.value.idusuario = this.idusuario;
    this.forma.get("idusuario").valueChanges.subscribe(idusuario => {
      this.forma.get('password').updateValueAndValidity();
    });
  }
  buildForm() {
    this.forma = this.fb.group({
      idusuario: this.idusuario,
      activo: [1],
      idtipo_usuario: [undefined, Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, CustomValidators.email], [Validations.existeCorreoValidator(this.usuariosService)]],
      password: ['', [Validations.requiredIfValidator('idusuario', 0), Validators.minLength(4)]]

    },
      {
        updateOn: 'change'
      });
  }

  // Obteniendo los tipos de usuario
  obtenerTiposUsuario()
  {
    this.usuariosService.getTiposUsuario()
    .subscribe( tiposUsuario => {
        this.tiposUsuario = tiposUsuario
    })
  }

  agregarUsuario() {


    if (this.idusuario != 0) {

      this.usuariosService.agregarUsuario(this.forma.value)
        .subscribe(resp => {
          Swal.fire({
            title: 'Exito',
            text: 'Usuario editado correctamente',
            icon: 'success'
          })
            .then(resp => {
              this.router.navigateByUrl('/usuarios');
            });
        }, err => {
          Swal.fire({
            title: 'Error',
            text: err.error.mensaje,
            icon: 'error'
          });
        })
    } else {
      this.usuariosService.agregarUsuario(this.forma.value)
        .subscribe(resp => {
          Swal.fire({
            title: 'Exito',
            text: 'Usuario agregado correctamente',
            icon: 'success'
          })
            .then(resp => {
              // window.location.reload()
              this.router.navigateByUrl('/usuarios');
            });
        }, err => {
          Swal.fire({
            title: 'Error',
            text: err.error.mensaje,
            icon: 'error'
          });
        })

    }
  }

  // actualizarUsuario()
  // {
  //   this.usuariosService.actualizarUsuario(this.usuarioForm.value).subscribe(
  //     response => {
  //        // Si devuelve código de exito
  //        Swal.fire({
  //         title: 'Exito',
  //         text: "Usuario actualizado correctamente",
  //         icon: "success",
  //         showLoaderOnConfirm: true,
  //         reverseButtons: true,
  //       }).then( () => {        
  //           // Navegar al listado de servicios
  //           this.router.navigate(['/usuarios'])
  //       })
  //     }
  //   )
  // } 

  get id() {
    return this.forma.get('idusuario').value;
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && (this.forma.get('correo').touched || this.forma.get('correo').dirty)
  }

  get correoField() {
    return this.forma.get('correo');
  }


  obtenerUsuario(idusuario: number) 
  {
    this.usuariosService.obtenerUsuario(idusuario)
      .subscribe(
        data => {
          this.idtipo_usuario = data.registro.idtipo_usuario;
          console.log('idtipo_usuario', data.registro.idtipo_usuario);
          this.forma.patchValue(data.registro);
        },
        err => {
          console.log(err.error);
        }
      )
  }

}
