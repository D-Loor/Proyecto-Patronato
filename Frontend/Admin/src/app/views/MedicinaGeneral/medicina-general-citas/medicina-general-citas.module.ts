import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicinaGeneralCitasRoutingModule } from './medicina-general-citas-routing.module';

import { MedicinaGeneralCitasComponent } from './medicina-general-citas.component';


@NgModule({
  imports: [
    MedicinaGeneralCitasRoutingModule,
    CommonModule,
  ],
  declarations: [
    MedicinaGeneralCitasComponent

  ]
})
export class MedicinaGeneralCitasModule { }
