import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable()
export class AlertasService {

    constructor
    (
        private router: Router,
    )  { }

    mostrarMensaje(titulo, mensaje, icono, callBack: Function)
    {
        Swal.fire({
            icon: icono,
            title: titulo,
            text: mensaje
          }).then( () => {
            callBack(true)
          })
    }

    mostrarMensajeCambioEstado(nombreElemento: string, estado: number, callBack: Function)
    {
        const text = (estado == 1) ? `Activar usuario: ${nombreElemento}` : `Desactivar usuario: ${nombreElemento}`;

        Swal.fire({
            title: '¿Cambiar Estado?',
            text,
            icon: 'question',
            confirmButtonText: 'Sí',
            showCancelButton: true,
            cancelButtonText: 'No',
            cancelButtonColor: '#EF5350',
            reverseButtons: true
          }).then(respuesta => {
              if(respuesta.isConfirmed){
                    callBack(true)
              }
          })
    }
    MensajeCambioEstadoCargo(nombreElemento: string, estado: number, callBack: Function) {
        const text = (estado == 1) ? `Activar cargo: ${nombreElemento}` : `Desactivar cargo: ${nombreElemento}`;

        Swal.fire({
            title: '¿Cambiar Estado?',
            text,
            icon: 'question',
            confirmButtonText: 'Sí',
            showCancelButton: true,
            cancelButtonText: 'No',
            cancelButtonColor: '#EF5350',
            reverseButtons: true
        }).then(respuesta => {
            if (respuesta.isConfirmed) {
                callBack(true)
            }
        })
    }

    mostrarMensajeToast(titulo: string, mensaje, icono)
    {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: icono,
            toast: true,
            showConfirmButton: false,
            timer: 2000,
            position: 'top'
        })
    }
}