import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { NgxSpinnerModule } from 'ngx-spinner';
import { FiltroModule } from '../../../pipes/filtro.module';
import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CitasRoutingModule,
    CollapseModule.forRoot(),
    CollapseModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    CitasComponent
  ]
})

export class CitasModule { }

