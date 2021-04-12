import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RehabilitacionFisicaComponent } from './rehabilitacion-fisica.component';


const routes: Routes = [
  {
    path: '',
    component: RehabilitacionFisicaComponent,
    data: {
      title: 'Rehabilitación Física'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RehabilitacionFisicaRoutingModule {}
