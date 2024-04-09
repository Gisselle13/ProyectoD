import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RegistrosRoutes } from './registros.routing';
import { SharedModule } from '../../shared/shared.module';


import { ChartsModule } from 'ng2-charts';
import { ListadoComponent } from './listado/listado.component';




@NgModule({
    declarations: [
       // AtencionComponent,
        //PrimerRegistroComponent
       // ListarCargoComponent,
        
ListadoComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(RegistrosRoutes),
        SharedModule,
        ChartsModule
    ]
})

export class RegistrosModule { }