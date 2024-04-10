import { Routes } from '@angular/router';
import { RegistrosComponent } from './registros.component';
import { ListadoComponent } from './listado/listado.component';
//import { ReportesComponent } from './reportes/reportes.component';



export const RegistrosRoutes: Routes = [
    {
        path: '',
        component: ListadoComponent,
        data: {
            title: 'Registros',
        },
    },


    {
        path: 'editar/:id',
        component: RegistrosComponent,
        data: {
            title: 'Editar Paciente',
            urls: [
                { title: 'Registro', url: '/editar' },
                { title: 'Editar' }
            ]
        },
    },

    {
        path: 'registros',
        component: RegistrosComponent,
        data: {
            title: 'Agregar Paciente',
            urls: [
                { title: 'Registro', url: '/registros' },
                { title: 'Editar' }
            ]
        },
    },

    //  {
    //      path: 'reportes',
    //      component: ReportesComponent,
    //      data: {
    //          title: 'Reportes',
    //          urls: [
    //              { title: 'Reportes', url: '/reportes' },
    //              { title: 'Reportes' }
    //          ]
    //      },
    //  },


];
