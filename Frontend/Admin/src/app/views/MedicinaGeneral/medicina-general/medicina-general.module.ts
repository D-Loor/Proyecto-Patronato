import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicinaGeneralRoutingModule } from './medicina-general-routing.module';
import { MedicinaGeneralComponent } from './medicina-general.component';



@NgModule({
  imports: [
    MedicinaGeneralRoutingModule,
    CommonModule
  ],
  declarations: [
    MedicinaGeneralComponent
  ]
})
export class MedicinaGeneralModule { }
