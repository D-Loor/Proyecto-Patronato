import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { AgendarCitaRoutingModule } from './agendar-cita-routing.module';
import { AgendarCitaComponent } from './agendar-cita.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    AgendarCitaRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AgendarCitaComponent
  ]
})

export class AgendarCitaModule { }

