import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { RegistrarHistoriaClinicaRoutingModule } from './registrar-historia-clinica-routing.module';
import { RegistrarHistoriaClinicaComponent } from './registrar-historia-clinica.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  imports: [
    RegistrarHistoriaClinicaRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule,
    CollapseModule.forRoot(),
    CollapseModule,
    NgxSpinnerModule
  ],
  declarations: [
    RegistrarHistoriaClinicaComponent
  ]
})

export class RegistrarHistoriaClinicaModule { }

