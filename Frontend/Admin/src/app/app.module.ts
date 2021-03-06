import { BrowserModule } from '@angular/platform-browser';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers

import { DefaultLayoutComponent } from './containers';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';


const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {

  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { CommonModule } from '@angular/common';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicinaGeneralConsultasModule } from './views/MedicinaGeneral/medicina-general-consultas/medicina-general-consultas.module';
import { PacientesModule } from './views/MedicinaGeneral/pacientes/pacientes.module';
import { MedicinaGeneralModule } from './views/MedicinaGeneral/medicina-general/medicina-general.module';
import { MedicinaGeneralCitasModule } from './views/MedicinaGeneral/medicina-general-citas/medicina-general-citas.module';
import { FiltroModule } from './pipes/filtro.module';
import { RehabilitacionFisicaConsultaModule } from './views/RehabilitacionFisica/consultas/consultas.module';
import { RehabilitacionFisicaModule } from './views/RehabilitacionFisica/rehabilitacion-fisica/rehabilitacion-fisica.module';
import { RehabilitacionFisicaCitasModule } from './views/RehabilitacionFisica/rehabilitacion-fisica-citas/rehabilitacion-fisica-citas.module';
import { CitasModule } from './views/Secretaria/citas/citas.module';
import { RegistrarHistoriaClinicaModule } from './views/Secretaria/registrar-historia-clinica/registrar-historia-clinica.module';
import { AgendarCitaModule } from './views/Secretaria/agendar-cita/agendar-cita.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { CuentasModule } from './views/Administrador/cuentas/cuentas.module';
import { RolesModule } from './views/Administrador/roles/roles.module';
import { HorariosModule } from './views/Administrador/horarios/horarios.module';
import { ReportesModule } from './views/MedicinaGeneral/reportes/reportes.module';
import { ReportesModuleRF } from './views/RehabilitacionFisica/reportes/reportes.module';
import { EgresosModule } from './views/Secretaria/egresos/egresos.module';
import { ReportesRecaudacionModule } from './views/Secretaria/reportesrecaudacion/reportesrecaudacion.module';




@NgModule({
  imports: [
    CollapseModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AutocompleteLibModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    HttpClientModule,
    FormsModule,
    PaginationModule,
    MedicinaGeneralConsultasModule,
    PacientesModule,
    MedicinaGeneralModule,
    MedicinaGeneralCitasModule,
    FiltroModule,
    RehabilitacionFisicaConsultaModule,
    RehabilitacionFisicaModule,
    CommonModule,
    RehabilitacionFisicaCitasModule,
    CitasModule,
    RegistrarHistoriaClinicaModule,
    AgendarCitaModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    HorariosModule,
    RolesModule,
    CuentasModule,
    ReportesModule,
    ReportesModuleRF,
    EgresosModule,
    ReportesRecaudacionModule


  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
  ],
  bootstrap: [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
