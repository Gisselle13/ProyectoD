import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, registerLocaleData
} from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoginComponent } from './authentication/login/login.component';
import { TokenInterceptor } from './services/auth/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderInterceptor } from './config/loader.interceptor';
import { LoaderService } from './config/loader.service';
import localeMx from '@angular/common/locales/es-MX';

import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';

// Modules
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedServicesModule } from './shared/services/shared-services.module';
import { ServiceModule } from './services/servicios.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HttpErrorInterceptor } from './services/auth/error.interceptor';
import { AuthGuard } from './services/guards/auth-guard.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
registerLocaleData(localeMx, "es-MX");
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedService } from './shared/services/shared.service';

import { NgxMaskModule, IConfig } from 'ngx-mask'
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistroComponent } from './authentication/registro/registro.component';


import { MatButtonModule } from '@angular/material/button';


import { ExitGuard } from './services/guards/exit-guard.service';



import { MatBadgeModule } from '@angular/material/badge';



import { ChartsModule } from 'ng2-charts';

import { RegistrosComponent } from './pages/registros/registros.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    LoginComponent,
    InicioComponent,
    RegistroComponent,
    
    RegistrosComponent,
    
    ReportesComponent,


  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes),
    PerfectScrollbarModule,
    ReactiveFormsModule,
    SharedServicesModule,
    ServiceModule,
    MatTabsModule,
    MatRadioModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatListModule,
    NgxMaskModule.forRoot(),
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    TreeViewModule,
    DropDownListAllModule,
    MultiSelectAllModule,
    MaskedTextBoxModule,
    UploaderAllModule,
    ToolbarAllModule,
    ContextMenuAllModule,
    // ButtonAllModule,
    // CheckBoxAllModule,
    DatePickerAllModule,
    TimePickerAllModule,
    DateTimePickerAllModule,
    NumericTextBoxAllModule,
    ScheduleAllModule,
    RecurrenceEditorAllModule,
    MatCheckboxModule,
    MatMenuModule,
    MatBadgeModule,
    ChartsModule
    



  ],
  exports: [MatListModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatBadgeModule],
  providers: [ExitGuard, 
    SharedService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    ,
    {
      provide: LOCALE_ID,
      useValue: 'es-MX'
    },
    AuthGuard
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
