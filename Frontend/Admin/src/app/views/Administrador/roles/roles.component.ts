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
  result="";

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
    debugger
    let validator=0;
    for (let item of Object.keys(this.rol)) {
      if(this.rol[item]['rol'] == this.Rol){
        validator=1;
      }
    }

    this.estado=0;

    if(validator==1){
      Swal.fire({
        icon: 'error',
        title: 'Rol Inválida..!',
        text: 'La cédula a buscar no es válida.'
      })
      this.limpiar();
    }else{
      
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
    
  }

  cargarTablas(){
    this.administradorService.cargarRol().then(data =>{
      
      this.rol=data['result'];
      this.validarVacio=data['code'];
      if(this.validarVacio == '202'){
        
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
    debugger
    let validator=0;
    for (let item of Object.keys(this.rol)) {
      if(this.rol[item]['rol'] == this.Rol){
        validator=1;
      }
    }
    if(validator==1){
      Swal.fire({
        icon: 'error',
        title: 'Rol Inválida..!',
        text: 'La cédula a buscar no es válida.'
      })
      this.limpiar();
    }else{
      
      let arrayUpdate={
        "rol":this.Rol,
      }
      
      this.administradorService.updateRol(arrayUpdate,this.id_rol).then(data =>{
        
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

    
  }

  cargarEditar(id:string){
    this.estado=1;
    this.administradorService.cargarRolId(id).then(data =>{
      
      this.Rol=data['result'].rol;
      this.id_rol=data['result'].id_rol;
    })
  }

  buscar(){
    if(this.search== null || this.search.length==0||this.search.length>10){

      Swal.fire({
        icon: 'error',
        title: 'Rol Inválida..!',
        text: 'La cédula a buscar no es válida.'
      })

    }else if(this.rolPaginateFilter.length==0){

      Swal.fire({
        icon: 'error',
        title: '¡No hay Registros..!',
        text: 'No hay rol registradas con este nombre.'
      })

    }
  }

  alertEliminado(result:string){
    if(result=="203"){
      Swal.fire(
        'Eliminado!',
        'Rol relacionado.',
        'success'
      )
    }else{
      Swal.fire(
        'Eliminado!',
        'El rol ha sido eliminada.',
        'success'
      )
    }
  }

  eliminar(id:string){
    this.administradorService.eliminarRol(id).then(data => {
      this.result=data['code'];
      this.spinner.hide('sample');
      this.alertEliminado(this.result);
      this.cargarTablas();
    })
    .catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
    });
  }

  notificacion(id:string){
    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro de eliminar?',
      text: "Una vez eliminado no se podrá recuperar el mismo!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar cita!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonColor: '#20a8d8',
      cancelButtonColor: '#f86c6b',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingText = 'Cargando...';
        this.spinner.show('sample');
        this.eliminar(id);

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado!',
          'La cita no ha sido eliminada.',
          'error'
        )
      }
    })
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
