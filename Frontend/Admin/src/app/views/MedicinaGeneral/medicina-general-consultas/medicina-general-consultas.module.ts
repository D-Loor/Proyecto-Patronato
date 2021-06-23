import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MedicinaGeneralConsultasRoutingModule } from './medicina-general-consultas-routing.module';
import { MedicinaGeneralConsultasComponent } from './medicina-general-consultas.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FiltroModule } from '../../../pipes/filtro.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  imports: [
    CommonModule,
    AutocompleteLibModule,
    MedicinaGeneralConsultasRoutingModule,
    FiltroModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    MedicinaGeneralConsultasComponent
  ]
})
export class MedicinaGeneralConsultasModule { }
