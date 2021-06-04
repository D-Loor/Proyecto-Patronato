import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportesComponent } from './reportes.component';


const routes: Routes = [
  {
    path: '',
    component: ReportesComponent,
    data: {
      title: 'Reportes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReportesRoutingModule {}
