import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicinaGeneralComponent } from './medicina-general.component';



const routes: Routes = [
  {
    path: '',
    component: MedicinaGeneralComponent,
    data: {
      title: 'Historia Clinica'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicinaGeneralRoutingModule {}
