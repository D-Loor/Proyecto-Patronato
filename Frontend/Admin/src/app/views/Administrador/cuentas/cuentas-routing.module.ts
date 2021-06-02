import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuentasComponent } from './cuentas.component';



const routes: Routes = [
  {
    path: '',
    component: CuentasComponent,
    data: {
      title: 'Cuentas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentasRoutingModule {}
