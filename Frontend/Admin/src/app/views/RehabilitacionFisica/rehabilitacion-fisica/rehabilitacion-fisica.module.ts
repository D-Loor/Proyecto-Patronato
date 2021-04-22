import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { RehabilitacionFisicaRoutingModule } from './rehabilitacion-fisica-routing.module';
import { RehabilitacionFisicaComponent } from './rehabilitacion-fisica.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from '../../notifications/modals.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';



@NgModule({
  imports: [
    RehabilitacionFisicaRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    CollapseModule,
  ],
  declarations: [
    RehabilitacionFisicaComponent,
    //ModalsComponent
  ]
})

export class RehabilitacionFisicaModule { }

