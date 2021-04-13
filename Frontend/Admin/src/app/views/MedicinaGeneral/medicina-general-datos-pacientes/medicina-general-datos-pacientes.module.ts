import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicinaGeneralDatosPacientesRoutingModule } from './medicina-general-datos-pacientes-routing.module';
import { MedicinaGeneralDatosPacientesComponent } from './medicina-general-datos-pacientes.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';


 
@NgModule({
  imports: [
    MedicinaGeneralDatosPacientesRoutingModule,
    CollapseModule.forRoot(),
    CollapseModule,
    FormsModule,
    CommonModule,
    
  ],
  declarations: [
    MedicinaGeneralDatosPacientesComponent,
    
  ]
})
export class MedicinaGeneralDatosPacientesModule { }
