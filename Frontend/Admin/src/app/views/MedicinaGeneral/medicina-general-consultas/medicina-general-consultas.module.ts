import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MedicinaGeneralConsultasRoutingModule } from './medicina-general-consultas-routing.module';
import { MedicinaGeneralConsultasComponent } from './medicina-general-consultas.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule } from '@angular/forms';
import { FiltroModule } from '../../../pipes/filtro.module';



@NgModule({
  imports: [
    CommonModule,
    AutocompleteLibModule,
    MedicinaGeneralConsultasRoutingModule,
    FiltroModule,
    FormsModule
    
  ],
  declarations: [
    MedicinaGeneralConsultasComponent
  ]
})
export class MedicinaGeneralConsultasModule { }
