import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MedicinaGeneralCitasRoutingModule } from './medicina-general-citas-routing.module';
import { MedicinaGeneralCitasComponent } from './medicina-general-citas.component';



@NgModule({
  imports: [
    MedicinaGeneralCitasRoutingModule,
    CollapseModule.forRoot(),
    CollapseModule,
    CommonModule
  
    
  ],
  declarations: [
    MedicinaGeneralCitasComponent,
    
  ]
})
export class MedicinaGeneralCitasModule { }
