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
        title: '¡Campos Vacíos..!',
        text: 'Se deben completar todos los campos.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
      this.login.ValidarLogin(this.correo, this.pass).then(data =>{

        if(data['code'] == "202"){
          this.spinner.hide('sample');
          Swal.fire({
            title: '¡Datos Incorrectos..!',
            text: 'El correo o la contraseña está incorrecto.',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
        else if(data['code'] == "203"){
          this.spinner.hide('sample');
          Swal.fire({
            title: '¡Cuenta Inhabilitada..!',
            text: 'La cuenta se encuentra en estado inhabilitada.',
            icon: 'warning',
            confirmButtonText: 'OK'
          })
        }
        else{
          localStorage.setItem('sesionLogin', data['result'][0].id_cuenta);
          localStorage.setItem('rol', data['result'][0].role.rol);
          localStorage.setItem('sesionLoginInicio', data['result'][0].role.rol);
          this.arraydat=data['result'];
          if(data['result'][0].role.rol == "Administrador"){
            this.rutas.navigate(['/cuentas']);
          }else if(data['result'][0].role.rol == "Medicina General"){
            this.rutas.navigate(['/medicinageneralcitas']);
          }else if(data['result'][0].role.rol == "Rehabilitación Física"){
            this.rutas.navigate(['/rehabilitacionfisicacitas']);
          }else if(data['result'][0].role.rol == "Secretaría"){
            this.rutas.navigate(['/citas']);
          }else{
            this.rutas.navigate(['/404']);
          }


          this.spinner.hide('sample');

        }
        }).catch(error =>{

            console.log(error);
            this.spinner.hide('sample');
            this.rutas.navigate(['/500']);
        });
    }

  }

}
