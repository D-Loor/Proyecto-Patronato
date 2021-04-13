import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { AgendarCitaRoutingModule } from './agendar-cita-routing.module';
import { AgendarCitaComponent } from './agendar-cita.component';


@NgModule({
  imports: [
    AgendarCitaRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule
  ],
  declarations: [
    AgendarCitaComponent
  ]
})

export class AgendarCitaModule { }

