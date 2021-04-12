import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicinaGeneralRoutingModule } from './medicina-general-routing.module';
import { MedicinaGeneralComponent } from './medicina-general.component';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    MedicinaGeneralRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule
  ],
  declarations: [
    MedicinaGeneralComponent
  ]
})

export class MedicinaGeneralModule { }

