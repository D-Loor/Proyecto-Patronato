import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicinaGeneralRoutingModule } from './medicina-general-routing.module';
import { MedicinaGeneralComponent } from './medicina-general.component';
import { PaginationModule } from 'ngx-bootstrap/pagination'


@NgModule({
  imports: [
    MedicinaGeneralRoutingModule,
    CommonModule,
    PaginationModule
  ],
  declarations: [
    MedicinaGeneralComponent
  ]
})

export class MedicinaGeneralModule { }
