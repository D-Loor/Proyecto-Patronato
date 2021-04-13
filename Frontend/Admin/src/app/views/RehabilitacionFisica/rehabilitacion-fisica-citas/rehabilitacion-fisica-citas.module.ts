import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { RehabilitacionFisicaCitasComponent } from './rehabilitacion-fisica-citas.component';
import { RehabilitacionFisicaCitasRoutingModule } from './rehabilitacion-fisica-citas-routing.module';


@NgModule({
  imports: [
    RehabilitacionFisicaCitasRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule
  ],
  declarations: [
    RehabilitacionFisicaCitasComponent
  ]
})

export class RehabilitacionFisicaCitasModule { }

