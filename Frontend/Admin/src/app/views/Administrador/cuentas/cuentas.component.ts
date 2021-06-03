import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../../servicios/administrador.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {

  constructor(private administradorService:AdministradorService) { }

  isCollapsed1=false;
  isCollapsed2=false;
  cuentas=[];
  cuentasPaginate=[];
  cuentasFilter=[];
  cuentasPaginateFilter=[];
  search=null;
  estado=0;
  nombres="";
  correo="";
  rol;
  password="";
  foto:any;
  listaRoles:any=[];
  
  ClaseCorreo:string="form-control form-input select-number";
  ClaseNombre:string="form-control form-input select-number";
  ClaseRol:string="form-control form-input select-number";
  ClasePassword:string="form-control form-input select-number";
  ClaseCHora:string="form-control form-input select-number";

  loadingText = 'Cargando...';

  spinnerConfig: object = {
    bdColor: 'rgba(0, 0, 0, 0.8)',
    size: 'medium',
    color: '#fff',
    type: 'square-jelly-box',
    fullScreen: true,
    template: null,
    showSpinner: false
  };


  ngOnInit(): void {
    this.cargarRoles();
    this.cargarTablas();
  }

  cargarRoles(){
    this.administradorService.cargarRoles().then(data=>{
      this.listaRoles=data['result'];
    }).catch(error =>{
      console.log(error);
    });
  }

  cargarTablas(){
    this.administradorService.cargarCuenta().then(data =>{
      this.cuentas=data['result'];
      this.cuentasPaginate = this.cuentas.slice(0, 10);
      debugger
    }).catch(error =>{
      console.log(error);
    });
  }

  CrearCuenta(){
    let array={
      "id_rol":this.rol,
      "nombres":this.nombres,
      "correo":this.correo,
      "password":this.password,
      "imagen": this.foto
    }
    debugger
    this.administradorService.AgregarCuenta(array).then(data =>{
      data['result'];
      debugger
    }).catch(error =>{
      console.log(error);
    });
  }

  ActualizarCuenta(){

  }

  buscar(){

  }

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes

    this.cuentasFilter=[];
      this.cuentasPaginateFilter=[];
    if(this.search==null){

      //this.citasMGPaginate = this.citasMG.slice(0, 10);
    }else{
      /*
      for (const x of this.citasMG) {

        if(x.cedula.indexOf(this.search)> -1){
         this.citasMGFilter.push(x);
       };
      };
      this.citasMGPaginateFilter = this.citasMGFilter.slice(0, 10);
      */
    }

  }


}
