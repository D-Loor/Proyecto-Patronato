import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultasComponent } from './consultas.component';


const routes: Routes = [
  {
    path: '',
    component: ConsultasComponent,
    data: {
      title: 'Rehabilitación Física Consultas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RehabilitacionFisicaConsultasRoutingModule {}
