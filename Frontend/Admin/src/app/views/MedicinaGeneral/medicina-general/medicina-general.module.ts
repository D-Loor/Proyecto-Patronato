import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MedicinaGeneralRoutingModule } from './medicina-general-routing.module';
import { MedicinaGeneralComponent } from './medicina-general.component';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from '../../notifications/modals.component';


@NgModule({
  imports: [
    MedicinaGeneralRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    MedicinaGeneralComponent,
    ModalsComponent
  ]
})

export class MedicinaGeneralModule { }

