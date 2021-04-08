import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicinaGeneralDatosPacientesRoutingModule } from './medicina-general-datos-pacientes-routing.module';
import { MedicinaGeneralDatosPacientesComponent } from './medicina-general-datos-pacientes.component';



@NgModule({
  imports: [
    MedicinaGeneralDatosPacientesRoutingModule,
    CommonModule
  ],
  declarations: [
    MedicinaGeneralDatosPacientesComponent
  ]
})
export class MedicinaGeneralDatosPacientesModule { }
