import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { FiltroModule } from '../../../pipes/filtro.module';
import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';

@NgModule({
  imports: [
    CitasRoutingModule,
    CommonModule,
    PaginationModule,
    FiltroModule,
    FormsModule
  ],
  declarations: [
    CitasComponent
  ]
})

export class CitasModule { }

