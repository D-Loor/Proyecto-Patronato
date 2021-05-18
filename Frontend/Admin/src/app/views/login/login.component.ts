import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../servicios/login.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  correo: string;
  pass: string;
  arraydat:any = [];
  usuario:string [];

  loadingText = 'Ingresando...';
  /**
   * Spinner configuration
   *
   * @type {object}
   * @memberof AppComponent
   */
  spinnerConfig: object = {
    bdColor: 'rgba(0, 0, 0, 0.8)',
    size: 'medium',
    color: '#fff',
    type: 'square-jelly-box',
    fullScreen: true,
    template: null,
    showSpinner: false
  };

  constructor(public login:LoginService, public rutas:Router, private spinner: NgxSpinnerService ) {
  }



  ngOnInit() {
  }


  IniciarSesion(){
    this.spinner.show('sample');
    if(this.correo==null || this.pass==null || this.correo=="" || this.pass==""){
      this.spinner.hide('sample');
      Swal.fire({
        title: 'Error!',
        text: 'Existen campos vacios',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    }else{
      this.login.ValidarLogin(this.correo, this.pass).then(data =>{
        if(data['code'] == "202"){
          this.spinner.hide('sample');
          Swal.fire({
            title: 'Error!',
            text: 'El correo o la contraseña estan incorrectos',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }else{
          localStorage.setItem('sesionLogin', data['result'][0].id_cuenta);
          localStorage.setItem('sesionLoginInicio', 'true');
          this.arraydat=data['result'];
          this.rutas.navigate(['/medicinageneralcitas']);
          this.spinner.hide('sample');
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
