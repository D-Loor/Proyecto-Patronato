import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarHistoriaClinicaComponent } from './registrar-historia-clinica.component';


const routes: Routes = [
  {
    path: '',
    component: RegistrarHistoriaClinicaComponent,
    data: {
      title: 'Registrar Historia Clinica'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarHistoriaClinicaRoutingModule {}
