import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UsuariosRoutes } from './usuarios.routing';
import { ListarUsuariosComponent } from './listar/listar.component';
import { AgregarUsuarioComponent } from './agregar/agregar.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [
        ListarUsuariosComponent,
        AgregarUsuarioComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(UsuariosRoutes),
        SharedModule
    ]
})

export class UsuariosModule { }