import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { RegistrarHistoriaClinicaRoutingModule } from './registrar-historia-clinica-routing.module';
import { RegistrarHistoriaClinicaComponent } from './registrar-historia-clinica.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  imports: [
    RegistrarHistoriaClinicaRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule,
    CollapseModule.forRoot(),
    CollapseModule,
  ],
  declarations: [
    RegistrarHistoriaClinicaComponent
  ]
})

export class RegistrarHistoriaClinicaModule { }

