import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxSpinnerModule } from "ngx-spinner";
import { EgresosRoutingModule } from './egresos-routing.module';
import { EgresosComponent } from './egresos.component';

@NgModule({
  imports: [
    EgresosRoutingModule,
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
    EgresosComponent,
  ]
})

export class EgresosModule { }

