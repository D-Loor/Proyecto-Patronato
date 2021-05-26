import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiarioComponent } from './diario.component';


const routes: Routes = [
  {
    path: '',
    component: DiarioComponent,
    data: {
      title: 'Reporte Diario'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiairioMGRoutingModule {}
