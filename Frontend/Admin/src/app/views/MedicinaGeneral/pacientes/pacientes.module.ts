import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';



@NgModule({
  imports: [
    PacientesRoutingModule,
    CommonModule,
    PaginationModule
  ],
  declarations: [
    PacientesComponent
  ]
})

export class PacientesModule { }

