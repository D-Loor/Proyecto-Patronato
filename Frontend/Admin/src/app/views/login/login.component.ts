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
        title: 'Existen campos vacios!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }else{
      this.login.ValidarLogin(this.correo, this.pass).then(data =>{
        if(data['code'] == "202"){
          Swal.fire({
            title: 'Error!',
            text: 'El correo o la contraseña estan incorrectos',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }else{
          this.arraydat=data['result'];
          this.rutas.navigate(['/dashboard']);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Bienvenido',
            showConfirmButton: false,
            timer: 1500
          })
        }
        }).catch(error =>{
            console.log(error);
        });
    }
    
  }

}
