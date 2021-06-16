import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { NgxSpinnerModule } from 'ngx-spinner';
import { FiltroModule } from '../../../pipes/filtro.module';
import { RehabilitacionFisicaConsultasRoutingModule } from './consultas-routing.module';
import { ConsultasComponent } from './consultas.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  imports: [
    RehabilitacionFisicaConsultasRoutingModule,
    CommonModule,
    AutocompleteLibModule,
    PaginationModule,
    FiltroModule,
    NgxSpinnerModule,
    FormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    ConsultasComponent
  ]
})

export class RehabilitacionFisicaConsultaModule { }

