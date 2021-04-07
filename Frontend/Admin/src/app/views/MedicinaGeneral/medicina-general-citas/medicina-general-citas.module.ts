import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MedicinaGeneralCitasComponent } from './medicina-general-citas.component';
import { CardsComponent } from '../../base/cards.component';
import { TablesComponent } from '../../base/tables.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CollapsesComponent } from '../../base/collapses.component';

@NgModule({
  imports: [
    CommonModule,
    CollapseModule.forRoot(),
  ],
  declarations: [
    MedicinaGeneralCitasComponent,
    CardsComponent,
    TablesComponent,
    CollapseModule,
    CollapsesComponent

  ]
})
export class MedicinaGeneralCitasModule { }
