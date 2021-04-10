import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MedicinaGeneralConsultasRoutingModule } from './medicina-general-consultas-routing.module';
import { MedicinaGeneralConsultasComponent } from './medicina-general-consultas.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  imports: [
    CommonModule,
    AutocompleteLibModule,
    MedicinaGeneralConsultasRoutingModule
  ],
  declarations: [
    MedicinaGeneralConsultasComponent
  ]
})
export class MedicinaGeneralConsultasModule { }
