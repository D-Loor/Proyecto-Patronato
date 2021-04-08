import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MedicinaGeneralConsultasRoutingModule } from './medicina-general-consultas-routing.module';
import { MedicinaGeneralConsultasComponent } from './medicina-general-consultas.component';



@NgModule({
  imports: [
    CommonModule,
    MedicinaGeneralConsultasRoutingModule
  ],
  declarations: [
    MedicinaGeneralConsultasComponent
  ]
})
export class MedicinaGeneralConsultasModule { }
