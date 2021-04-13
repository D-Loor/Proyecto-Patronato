import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RehabilitacionFisicaCitasComponent } from './rehabilitacion-fisica-citas.component';



const routes: Routes = [
  {
    path: '',
    component: RehabilitacionFisicaCitasComponent,
    data: {
      title: 'Rehabilitación Física Citas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RehabilitacionFisicaCitasRoutingModule {}