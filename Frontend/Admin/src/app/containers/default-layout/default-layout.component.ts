import {Component, Input, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import {LoginService} from '../../servicios/login.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  constructor(public login:LoginService, public rutas:Router) { }

  public sidebarMinimized = false;
  public navItems = navItems;
  @Input () usuario: string;
  Usuario:string="Como estas";

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit() {

  }

  Salir(){
    //sessionStorage.removeItem('sesionLogin');
    this.rutas.navigate(['/login']);
  }

}
