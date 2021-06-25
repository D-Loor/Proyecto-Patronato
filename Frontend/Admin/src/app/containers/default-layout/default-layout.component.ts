import {Component, Input, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { navItemsMG } from '../../_nav';
import { navItemsRF } from '../../_nav';
import { navItemsST } from '../../_nav';
import { navItemsAdmin } from '../../_nav';
import {LoginService} from '../../servicios/login.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  constructor(public login:LoginService, public rutas:Router) { }

  public sidebarMinimized = false;
  public navItems = null;

  id:string=localStorage.getItem('sesionLogin');
  usuario:any [];
  Nombre:string;
  Imagen:string;
  Rol:string=localStorage.getItem('rol');

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit() {
    if(this.Rol=='Medicina General'){
      this.navItems = navItemsMG;
    }
    else if(this.Rol=='Rehabilitación Física'){
      this.navItems = navItemsRF;
    }
    else if(this.Rol=='Secretaría'){
      this.navItems = navItemsST;
    }
    else if(this.Rol=='Administrador'){
      this.navItems = navItemsAdmin;
    }
    this.user();
  }

  salir(){
    localStorage.removeItem('sesionLogin');
    localStorage.removeItem('sesionLoginInicio');
    localStorage.removeItem('cedulaMG');
    localStorage.removeItem('cedulaRF');
    localStorage.removeItem('id_paciente');
    localStorage.removeItem('CedulaExamenes');
    localStorage.removeItem('rol');
    localStorage.removeItem('idCita');
    localStorage.removeItem('nombres');
    localStorage.removeItem('secretariaEdit');
    localStorage.removeItem('CedulaExamenes');
    localStorage.removeItem('RolV');
    localStorage.removeItem('historiaClinica');
    localStorage.removeItem('Rol');
    localStorage.removeItem('cedulaTemporal');
    localStorage.removeItem('contadorT');
    this.rutas.navigate(['/login']);
  }

  user(){
    this.login.Usuario(this.id).then(data =>{
      this.usuario=data['result'];
      this.Nombre=this.usuario['nombres'];
      this.Imagen="http://127.0.0.1:8000"+this.usuario['imagen'];
    }).catch(error =>{
      console.log(error);
      this.rutas.navigate(['/500']);
  });
  }


}
