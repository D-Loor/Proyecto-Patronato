import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { RehabilitacionFisicaConsultasRoutingModule } from './consultas-routing.module';
import { ConsultasComponent } from './consultas.component';


@NgModule({
  imports: [
    RehabilitacionFisicaConsultasRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule
  ],
  declarations: [
    ConsultasComponent
  ]
})

export class RehabilitacionFisicaConsultaModule { }

