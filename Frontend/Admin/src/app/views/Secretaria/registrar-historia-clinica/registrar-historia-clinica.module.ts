import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { RegistrarHistoriaClinicaRoutingModule } from './registrar-historia-clinica-routing.module';
import { RegistrarHistoriaClinicaComponent } from './registrar-historia-clinica.component';

@NgModule({
  imports: [
    RegistrarHistoriaClinicaRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule
  ],
  declarations: [
    RegistrarHistoriaClinicaComponent
  ]
})

export class RegistrarHistoriaClinicaModule { }

