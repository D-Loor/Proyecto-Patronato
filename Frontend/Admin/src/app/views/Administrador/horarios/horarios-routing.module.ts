import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorariosComponent } from './horarios.component';



const routes: Routes = [
  {
    path: '',
    component: HorariosComponent,
    data: {
      title: 'Horarios'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosRoutingModule {}
