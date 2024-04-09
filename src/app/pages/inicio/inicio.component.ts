import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  departamentos: any[] = new Array();

  departamentoSeleccionado: string = 'Sin seleccionar'
  iddepartamento: number = 0;
  prioridadForm: FormGroup;
  iconoActivo = ''
  icons: string[] = ['mdi mdi-message-reply-text', 'mdi mdi-folder-multiple']

  indiceDepartamentoSeleccionado: number = null;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  seleccionarDepartamento(departamento: string, iddepartamento: number, indice: number) {
    if (departamento == 'Psicologia') {
      this.iconoActivo = 'mdi mdi-message-reply-text';
    }
    else if (departamento == 'Juridico') {
      this.iconoActivo = 'mdi mdi-book-open-page-variant'
    }
    else if (departamento == 'Trabajo S') {
      this.iconoActivo = 'mdi mdi-nature-people'
    }
    else if (departamento == 'Medico') {
      this.iconoActivo = 'mdi mdi-pill'
    }
    this.departamentoSeleccionado = departamento
    this.iddepartamento = iddepartamento;
    this.indiceDepartamentoSeleccionado = indice;
  }
}
