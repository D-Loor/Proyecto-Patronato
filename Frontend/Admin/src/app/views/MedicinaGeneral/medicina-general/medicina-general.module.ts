import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicinaGeneralRoutingModule } from './medicina-general-routing.module';
import { MedicinaGeneralComponent } from './medicina-general.component';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from '../../notifications/modals.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';


@NgModule({
  imports: [
    MedicinaGeneralRoutingModule,
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
    MedicinaGeneralComponent,
    ModalsComponent
  ]
})

export class MedicinaGeneralModule { }

