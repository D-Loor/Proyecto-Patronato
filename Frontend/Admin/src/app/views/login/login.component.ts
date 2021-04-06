import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../servicios/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit { 

  constructor(public login:LoginService, public rutas:Router) { }

  ngOnInit() {
  
  }

  correo: string;
  pass: string;
  arraydat:any = [];
  
  IniciarSesion(){ 
    if(this.correo==null || this.pass==null || this.correo=="" || this.pass==""){
      Swal.fire({
        title: 'Error!',
        text: 'Existen campos vacios',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    }else{
      this.login.ValidarLogin(this.correo, this.pass).then(data =>{
        if(data['code'] == "202"){
          Swal.fire({
            title: 'Error!',
            text: 'El correo o la contraseña estan incorrectos',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }else{
          localStorage.setItem('sesionLogin', 'true');
          this.arraydat=data['result'];
          this.rutas.navigate(['/dashboard']);
          Swal.fire({
            title: 'Bienvenido',
            text: 'Sesión Iniciada',
            icon: 'success',
            confirmButtonText: 'OK',
            timer:1900
          })
        }
        }).catch(error =>{
            console.log(error);
        });
    }
    
  }

}
