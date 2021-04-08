import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicinaGeneralDatosPacientesComponent } from './medicina-general-datos-pacientes.component';


const routes: Routes = [
  {
    path: '',
    component: MedicinaGeneralDatosPacientesComponent,
    data: {
      title: 'Datos Paciente'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicinaGeneralDatosPacientesRoutingModule {}
