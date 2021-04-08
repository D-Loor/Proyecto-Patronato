import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicinaGeneralCitasComponent } from './medicina-general-citas.component';


const routes: Routes = [
  {
    path: '',
    component: MedicinaGeneralCitasComponent,
    data: {
      title: 'Citas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicinaGeneralCitasRoutingModule {}
