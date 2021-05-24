import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FiltroModule } from '../../../pipes/filtro.module';
import { RehabilitacionFisicaCitasComponent } from './rehabilitacion-fisica-citas.component';
import { RehabilitacionFisicaCitasRoutingModule } from './rehabilitacion-fisica-citas-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  imports: [
    RehabilitacionFisicaCitasRoutingModule,
    CollapseModule.forRoot(),
    CollapseModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  declarations: [
    RehabilitacionFisicaCitasComponent
  ]
})

export class RehabilitacionFisicaCitasModule { }

