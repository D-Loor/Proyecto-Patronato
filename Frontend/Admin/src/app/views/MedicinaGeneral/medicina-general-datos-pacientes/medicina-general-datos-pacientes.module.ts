import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicinaGeneralDatosPacientesRoutingModule } from './medicina-general-datos-pacientes-routing.module';
import { MedicinaGeneralDatosPacientesComponent } from './medicina-general-datos-pacientes.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';


 
@NgModule({
  imports: [
    MedicinaGeneralDatosPacientesRoutingModule,
    CollapseModule.forRoot(),
    CollapseModule
    
  ],
  declarations: [
    MedicinaGeneralDatosPacientesComponent
  ]
})
export class MedicinaGeneralDatosPacientesModule { }
