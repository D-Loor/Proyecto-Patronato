import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FiltroModule } from '../../../pipes/filtro.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';



@NgModule({
  imports: [
    CommonModule,
    AutocompleteLibModule,
    ReportesRoutingModule,
    FiltroModule,
    FormsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    CollapseModule,
    ReactiveFormsModule,
    NgxSpinnerModule,

  ],
  declarations: [
    ReportesComponent
  ]
})
export class ReportesModule { }
