import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportesRecaudacionComponent } from './reportesrecaudacion.component';



const routes: Routes = [
  {
    path: '',
    component: ReportesRecaudacionComponent,
    data: {
      title: 'Reportes Recaudacion'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRecaudacionRoutingModule {}
