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
 
  id:string=localStorage.getItem('sesionLogin');
  usuario:any [];
  Nombre:string;
  Imagen:string;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit() {
    this.user();
  }

  salir(){
    localStorage.removeItem('sesionLogin');
    localStorage.removeItem('sesionLoginInicio');
    this.rutas.navigate(['/login']);
  }

  user(){
    this.login.Usuario(this.id).then(data =>{
      this.usuario=data['result'];
      this.Nombre=this.usuario['nombres'];
      this.Imagen=this.usuario['imagen'];
    }).catch(error =>{
      console.log(error);
  });
  }


}
