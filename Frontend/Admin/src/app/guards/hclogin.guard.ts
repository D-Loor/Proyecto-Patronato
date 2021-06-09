import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HcloginGuard implements CanActivate {


  constructor(private rutas:Router){}

  canActivate(){
    let inicio = localStorage.getItem('sesionLoginInicio');
    let rol = localStorage.getItem('rol');
    if(!inicio){
      this.rutas.navigate(["login"]);
      return false;
    }else if(rol == "Medicina General"|| rol == "Rehabilitación Física" || rol == "Administrador"){
      return true;
    }
    return false;
  }

}
