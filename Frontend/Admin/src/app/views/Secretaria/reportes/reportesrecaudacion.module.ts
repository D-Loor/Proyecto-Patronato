import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  imports: [
   ReportesRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    CollapseModule,
    NgxSpinnerModule,
  ],
  declarations:  [
    ReportesComponent,
  ]
})

export class ReportesModule { }

