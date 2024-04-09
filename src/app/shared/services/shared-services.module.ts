import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationService } from './communication.service';
import { MenuService } from './menu.service';
import { AlertasService } from './alertas.service';
import { CambiarEstadoService } from './cambiar-estado.service';
import { ArchivosService } from './archivos-service.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CommunicationService,
    MenuService,
    AlertasService,
    CambiarEstadoService,
    ArchivosService
  ]
})
export class SharedServicesModule { }
