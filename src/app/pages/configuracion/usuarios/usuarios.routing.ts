import { Routes } from '@angular/router';

import { ListarUsuariosComponent } from './listar/listar.component';
import { AgregarUsuarioComponent } from './agregar/agregar.component';


export const UsuariosRoutes: Routes = [
    {
        path: '',
        component: ListarUsuariosComponent,
        data: {
            title: 'Usuarios',
        },
    },

    {
        path: 'agregar',
        component: AgregarUsuarioComponent,
        data: {
            title: 'Agregar usuario',
            urls: [
                { title: 'Usuarios', url: '/usuarios' },
                { title: 'Agregar' }
            ]
        },
    },
    
    {
        path: 'editar/:id',
        component: AgregarUsuarioComponent,
        data: {
            title: 'Editar usuario',
            urls: [
                { title: 'Usuarios', url: '/usuarios' },
                { title: 'Editar' }
            ]
        },
    },

 
];
