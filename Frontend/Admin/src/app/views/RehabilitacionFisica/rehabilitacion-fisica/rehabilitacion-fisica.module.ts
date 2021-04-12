import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { RehabilitacionFisicaRoutingModule } from './rehabilitacion-fisica-routing.module';
import { RehabilitacionFisicaComponent } from './rehabilitacion-fisica.component';



@NgModule({
  imports: [
    RehabilitacionFisicaRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule
  ],
  declarations: [
    RehabilitacionFisicaComponent
  ]
})

export class RehabilitacionFisicaModule { }

