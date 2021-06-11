import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PloginGuard implements CanActivate {

  constructor(private rutas:Router){}

  canActivate(){
    let inicio = localStorage.getItem('sesionLoginInicio');
    let rol = localStorage.getItem('rol');
    if(!inicio){
      this.rutas.navigate(["login"]);
      return false;
    }else if(rol == "Medicina General"|| rol == "Rehabilitación Física" || rol == "Secretaría"){
      return true;
    }
    return false;
  }

}
