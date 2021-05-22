import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FiltroModule } from '../../../pipes/filtro.module';
import { MedicinaGeneralCitasRoutingModule } from './medicina-general-citas-routing.module';
import { MedicinaGeneralCitasComponent } from './medicina-general-citas.component';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  imports: [
    MedicinaGeneralCitasRoutingModule,
    CollapseModule.forRoot(),
    CollapseModule,
    CommonModule,
    FiltroModule,
    FormsModule,
    PaginationModule,
    NgxSpinnerModule,


  ],
  declarations: [
    MedicinaGeneralCitasComponent,

  ]
})
export class MedicinaGeneralCitasModule { }
