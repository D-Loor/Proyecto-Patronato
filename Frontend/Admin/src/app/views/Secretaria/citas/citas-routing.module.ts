import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitasComponent } from './citas.component';


const routes: Routes = [
  {
    path: '',
    component: CitasComponent,
    data: {
      title: 'Citas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule {}
