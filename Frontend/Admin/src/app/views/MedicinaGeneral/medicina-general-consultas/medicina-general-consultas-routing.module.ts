import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicinaGeneralConsultasComponent } from './medicina-general-consultas.component';


const routes: Routes = [
  {
    path: '',
    component: MedicinaGeneralConsultasComponent,
    data: {
      title: 'Consultas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicinaGeneralConsultasRoutingModule {}
