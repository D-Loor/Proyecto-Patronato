import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicinaGeneralDatosPacientesRoutingModule } from './medicina-general-datos-pacientes-routing.module';
import { MedicinaGeneralDatosPacientesComponent } from './medicina-general-datos-pacientes.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';
import { FiltroModule } from '../../../pipes/filtro.module';


 
@NgModule({
  imports: [
    MedicinaGeneralDatosPacientesRoutingModule,
    CollapseModule.forRoot(),
    CollapseModule,
    FiltroModule,
    FormsModule
    
  ],
  declarations: [
    MedicinaGeneralDatosPacientesComponent
  ]
})
export class MedicinaGeneralDatosPacientesModule { }
