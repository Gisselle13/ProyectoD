import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommunicationService } from '../../shared/services/communication.service';
import { UsuariosService } from '../../services/configuration/usuarios.service';
import Swal from 'sweetalert2';
import { CustomValidators } from 'ngx-custom-validators';
import { Validations } from 'src/app/shared/utils/validations';
import { RegistroService } from '../../services/registro.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    correo: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required])
  });
Data:any;
  el_down:any;
forma: FormGroup;
  // Mostrar mensaje de error
  error: boolean = false;
  // Texto del mensaje de error
  mensajeError: string = '';
Registro = 0;
CorreoMatch=0;
valid=0;
numero_empleado = 0;
  numero : number;
  numeroInvalido=0;
  constructor(private authService: AuthService, private router: Router, private communicationService: CommunicationService, private fb: FormBuilder,private usuariosService: UsuariosService, private registroService: RegistroService) {
    this.buildForm();
   }

  ngOnInit(): void {
    if (this.communicationService.getMessage != 'undefined' && this.communicationService.getContext == 'login') {
      this.mensajeError = this.communicationService.getMessage;
      this.error = true;
    }
    //this.CorreoMatch = 1;
    // this.forma.controls['nombre'].disable();
    // this.forma.controls['apellido_paterno'].disable();
    // this.forma.controls['apellido_materno'].disable();
    //this.forma.controls['correo2'].disable();
  }

  buildForm() {
    this.forma = this.fb.group({
      // idregistro: [''],
      // num_empleado: [''],
      // nombre: [''],
      // apellido_paterno: [''],
      // apellido_materno: [''],
      // correo_electronico: [''],
      // password: [''],
      idusuario:[0],
      activo: [1],
      idtipo_usuario: [3],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
     apellido_paterno:[''],
      apellido_materno: [''],
     // correo: [''],
      correo: ['', [Validators.required, CustomValidators.email], [Validations.CorreoValidator(this.registroService)]],
      correo2: [''],
      numero_empleado: [''],
      password: ['']
    
    },
      {
        updateOn: 'change'
      });
  }

  agregarRegistro() {
    this.generatePass();
  //-- this.forma.value.nombre = this.forma.value.nombre + ' ' + this.forma.value.apellido_paterno + ' ' +  this.forma.value.apellido_materno
   this.forma.value.nombre = this.Data.nombre;
  //  console.log('form', this.forma.value);


    // this.loginForm.value.correo = 'admin@correo.com';
    // this.loginForm.value.contrasena = 'admin';
    // this.authService.login(this.loginForm.value)
    //   .subscribe(res => {
    //     if (res.error) {
    //       this.error = res.error;
    //       this.mensajeError = res.mensaje;
    //     } else {
    //      this.authService.guardarStorageRes(res);

          this.registroService.agregarRegistro(this.forma.value)
          
            .subscribe(resp => {
              Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Cuenta registrada correctamente',
                text: 'Sus credenciales han sido enviadas al correo: '+ this.forma.value.correo ,
                showConfirmButton: true,
              }).then(function () {
                location.reload();
              })
            }, err => {
              Swal.fire({
                title: 'Error',
                text: err.error.mensaje,
                icon: 'error'
              });
            })



      //  }
      // },
      //   // Si el servicio nos devuelve un codigo de error 
      //   err => {
      //     this.error = err.error;
      //     this.mensajeError = err.mensaje;
      //   })



  }


  login() {
    if (this.loginForm.valid) {
      // Limpiando los valores de los mensajes de exito o error
      this.limpiarMensajes();
      // Realizando la validación
      this.authService.login(this.loginForm.value)
        .subscribe(res => {
          if(res.error){
            this.error = res.error;
            this.mensajeError = res.mensaje;
          } else {
            this.authService.guardarStorage(res);
            this.router.navigate(['/inicio']);
          }

          //this.mensajeExito = "Entraste correctamente: este es tu token: " + localStorage.getItem('token').substring(0, 20) + '...';
        },
          // Si el servicio nos devuelve un codigo de error 
          err => {
            this.error = err.error;
            this.mensajeError = err.mensaje;
          })
    }
  }


  registro() {
  //  this.CorreoMatch = 0;
    //console.log('CorreoMatch---', this.CorreoMatch);
    this.Registro= 1; 
  }
  
  generatePass() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 1; i <= 5; i++) {
      var char = Math.floor(Math.random()
        * str.length + 1);
      pass += str.charAt(char);
    }
//console.log('pass---', pass);
this.forma.value.password = pass;
  //  console.log('Fpass---', this.forma.value.password);
    return pass;
    
  }
  // Funcion para limpiar los mensajes
  limpiarMensajes() 
  {
    this.error = false;
    this.mensajeError = '';
  }
  cancel(){
  //  this.Registro=0;
    location.reload();
  }
  

  validarIguales(valor: string) {
  //  let valor1 = document.getElementById("input1").value;
let valor1 = this.forma.value.correo;
    if (valor === valor1) {
        this.CorreoMatch = 0;
     // console.log('Los valores son iguales');
    } else {
      this.CorreoMatch = 1;
      this.valid=1;
      //console.log('los valores NOO son iguales - ', this.CorreoMatch);
    }
  }


  

 

  get correoField() {
    return this.forma.get('correo');
  }


  obtenerEmpleado(valor: number) {


    // this.loginForm.value.correo = 'admin@correo.com';
    // this.loginForm.value.contrasena = 'admin';
    // this.authService.login(this.loginForm.value)
    //   .subscribe(res => {
    //     if (res.error) {
    //       this.error = res.error;
    //       this.mensajeError = res.mensaje;
    //     } else {
    //       this.authService.guardarStorageRes(res);

      
   this.numero_empleado = valor;
    this.registroService.obtenerEmpleado(this.numero_empleado)
      .subscribe(
        data => {
         this.Data= data.registro
     //    console.log('data-', this.Data);
          if(data.registro!=null){
            this.numeroInvalido = 0;
            this.forma.value.nombre = data.registro.nombre;
            this.forma.patchValue({
            nombre: data.registro.nombre,
            // apellido_paterno: data.registro.nombre,
            // apellido_materno: data.registro.nombre,
            })

          }else{
            this.numeroInvalido=1;
            this.forma.patchValue({
              nombre: '',
              // apellido_paterno: '',
              // apellido_materno: '',
            })
            this.forma.value.nombre = ' ';
          //  this.CorreoMatch = 1;
           // this.forma.controls['correo2'].disable();
          }
        },
        err => {
          console.log(err.error);
        }
      )



      //  }
      // },
      //   // Si el servicio nos devuelve un codigo de error 
      //   err => {
      //     this.error = err.error;
      //     this.mensajeError = err.mensaje;
      //   })

  }


 
}
