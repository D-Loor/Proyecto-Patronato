import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
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
import { PrincipalComponent } from './views/principal/principal.component';




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
    
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    PrincipalComponent,

  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
