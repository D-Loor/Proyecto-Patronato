import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal.component';


@NgModule({
  imports: [
    PrincipalRoutingModule,
    CommonModule,
  ],
  declarations: [
    PrincipalComponent
  ]
})

export class PrincipalModule { }

