import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../pipes/pipes.module';
import { VerImagenComponent } from './galeria/modal/ver-imagen.component';


@NgModule({
  declarations: [VerImagenComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    VerImagenComponent
   
  ]
})
export class SharedModule { }
