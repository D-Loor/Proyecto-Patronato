import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EgresosComponent } from './egresos.component';



const routes: Routes = [
  {
    path: '',
    component: EgresosComponent,
    data: {
      title: 'Egresos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EgresosRoutingModule {}
