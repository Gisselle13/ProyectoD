import { Routes } from '@angular/router';
import { ReportesComponent } from './reportes.component';
//import { ReportesComponent } from './reportes/reportes.component';



export const ReportesRoutes: Routes = [
    {
        path: '',
        component: ReportesComponent,
        data: {
            title: 'Reportes',
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
