import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';



@NgModule({
  imports: [
    PacientesRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule
  ],
  declarations: [
    PacientesComponent
  ]
})

export class PacientesModule { }

