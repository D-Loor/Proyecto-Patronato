import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GloginGuard implements CanActivate {

  constructor(private rutas:Router){}

  canActivate(){
    let inicio = sessionStorage.getItem('sesionLogin');
    if(!inicio){
      this.rutas.navigate(["login"]);
      return false;
    }
    return true;
  }
  
}
