import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RegistrosRoutes } from './registros.routing';
import { SharedModule } from '../../shared/shared.module';


import { ChartsModule } from 'ng2-charts';




@NgModule({
    declarations: [
       // AtencionComponent,
        //PrimerRegistroComponent
       // ListarCargoComponent,
        
],
    imports: [
        CommonModule,
        RouterModule.forChild(RegistrosRoutes),
        SharedModule,
        ChartsModule
    ]
})

export class RegistrosModule { }