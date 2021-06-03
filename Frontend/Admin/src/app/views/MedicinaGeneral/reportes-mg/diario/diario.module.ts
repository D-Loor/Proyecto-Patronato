import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from "ngx-spinner";
import { DiairioMGRoutingModule } from './diario-routing.module';
import { DiarioComponent } from './diario.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
    imports: [
      DiairioMGRoutingModule,
      CommonModule,
      PaginationModule,
      FormsModule,
      ModalModule.forRoot(),
      TabsModule.forRoot(),
      CollapseModule.forRoot(),
      NgxSpinnerModule,
      PdfViewerModule,
    ],
    declarations: [
      DiarioComponent,
    ]
  })
  
  export class DiarioMGModule { }
  
  