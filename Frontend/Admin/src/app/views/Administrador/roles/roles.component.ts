import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../../servicios/administrador.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  constructor(private administradorService:AdministradorService,private spinner: NgxSpinnerService) { }

  isCollapsed1=false;
  isCollapsed2=false;
  rol=[];
  rolPaginate=[];
  rolFilter=[];
  rolPaginateFilter=[];
  search=null;
  estado=0;
  Rol=""; 
  validarVacio;
  id_rol="";

  ClaseRol:string="form-control form-input select-number";

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

  limpiar(){
    this.Rol="";
  }

  ngOnInit(): void {
    this.cargarTablas();
  }

  CrearRol(){
    let array={
      "rol": this.Rol
    }
    this.administradorService.agregarRol(array).then(data=>{
      this.limpiar(); 
      this.spinner.hide('sample');
      Swal.fire(
        'Correcto',
        'Datos guardados correctamente',
        'success'
      )
      this.cargarTablas();
    })
  }

  cargarTablas(){
    this.administradorService.cargarRol().then(data =>{
      debugger
      this.rol=data['result'];
      this.validarVacio=data['code'];
      if(this.validarVacio == '202'){
        debugger
      this.rol=[];
      this.rolPaginate = [];
      }else{
        this.rolPaginate = this.rol.slice(0, 10);
      }

      if(this.search!=null){
        this.spinner.hide('sample');
        this.dataPaginate(event);
      }
      this.estado=0;
    }).catch(error =>{
      console.log(error);
    });
  }

  ActualizarRol(){

    let arrayUpdate={
      "rol":this.Rol,
    }
    debugger
    this.administradorService.updateRol(arrayUpdate,this.id_rol).then(data =>{
      debugger
      data['result'];
      this.spinner.hide('sample');
      Swal.fire(
        'Correcto',
        'Datos actualizados correctamente',
        'success'
      )
      this.cargarTablas();
      this.limpiar();
    })
  }

  cargarEditar(id:string){
    this.estado=1;
    this.administradorService.cargarRolId(id).then(data =>{
      debugger
      this.Rol=data['result'].rol;
      this.id_rol=data['result'].id_rol;

    })
  }

  buscar(){

  }

  eliminar(id:string){
    this.administradorService.eliminarRol(id).then(data => {
      data['result'];
      this.spinner.hide('sample');
      this.cargarTablas();
    })
    .catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
    });
  }

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes

    this.rolFilter=[];
      this.rolPaginateFilter=[];
    if(this.search==null){

      //this.citasMGPaginate = this.citasMG.slice(0, 10);
    }else{
      
      for (const x of this.rol) {

        if(x.rol.indexOf(this.search)> -1){
         this.rolFilter.push(x);
       };
      };
      this.rolPaginateFilter = this.rolFilter.slice(0, 10);
      
    }

  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.rolPaginateFilter = this.rolFilter.slice(startItem, endItem);
  }

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.rolPaginate = this.rol.slice(startItem, endItem);
  }
}
