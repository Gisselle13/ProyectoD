import { Routes } from '@angular/router';
import { RegistrosComponent } from './registros.component';
//import { ReportesComponent } from './reportes/reportes.component';



export const RegistrosRoutes: Routes = [
    {
        path: '',
        component: RegistrosComponent,
        data: {
            title: 'DATOS DEL PACIENTE',
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
