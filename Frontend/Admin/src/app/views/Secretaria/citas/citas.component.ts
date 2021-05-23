import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import Swal from 'sweetalert2';
import { CitasService } from '../../../servicios/citas.service';
import { SecretariaService } from '../../../servicios/secretaria.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  constructor(public citasser:CitasService, public rutas:Router, private secretaria:SecretariaService) { }

  isCollapsedMG = false;
  isCollapsedRF = false;
  searchMG;
  searchRF;
  public sidebarMinimized = false;
  public navItems = navItems;

  citasMG=[];
  citasMGFilter=[];
  citasMGPaginate=[];
  citasMGPaginateFilter=[];
  citasRF=[];
  citasRFFilter=[];
  citasRFPaginate=[];
  citasRFPaginateFilter=[];
  FechaMg:string='';
  FechaRf:string='';
  validarVacio;

  today = new Date();
  fechaActual:string;

  ngOnInit(): void {
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    this.cargarRF(this.fechaActual,0,false);
    this.cargarMG(this.fechaActual,0,false);
  }

  cargarMG(fechaActual:string,fecha:number,cambio:boolean){

    this.citasser.citas("Medicina General",fechaActual).then(data =>{

    if(data['code']!="202"){
    this.citasMG=data['result'];
    this.citasMGPaginate = this.citasMG.slice(0, 10);


    if(cambio==true){
      Swal.fire({
        icon: 'success',
        title: '¡Citas Filtradas..!',
        text: 'Se filtró las citas con la fecha seleccionada.'
      })
    }

    }else if(fecha==1){
    this.citasMG = null;
    this.citasMGPaginate = null;
      Swal.fire({
        icon: 'error',
        title: '¡Sin Registros..!',
        text: 'No hay citas registradas en esta fecha.'
      })
    }else{
      this.citasMG = [];
    this.citasMGPaginate = [];
    }
    }).catch(error =>{
      console.log(error);
  });
  }

  dataPaginateMG(event){//Función para el filtrado con paginado sin los pipes
    this.citasMGFilter = [];
    this.citasMGPaginateFilter = [];

    if(this.searchMG==null){

    }else{

      for (const x of this.citasMG) {

        if(x.cedula.indexOf(this.searchMG)> -1){
         this.citasMGFilter.push(x);
       };
      };

      this.citasMGPaginateFilter = this.citasMGFilter.slice(0, 10);
    }

  }

  pageChangedFiltroMG(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasMGPaginateFilter = this.citasMGFilter.slice(startItem, endItem);
  }

  citasEliminarMG:any[];
  eliminarMG(id:string) {

    this.citasser.elicitas(id).then(data => {
        this.citasEliminarMG=data['result'];

        if(this.FechaMg==''){
          this.cargarMG(this.fechaActual,0,false);

        }else{
          this.cargarMG(this.FechaMg,0,false);
        }


      })
      .catch((error) => {
        console.log(error);
      });
  }

  abonar(id, valor){
    if(valor ==true || valor==1){
      return false;
    }

  }

  cargarRF(fechaActual:string,fecha:number,cambio:boolean){
    this.citasser.citas("Rehabilitacion Fisica",fechaActual).then(data =>{

      this.citasRF=data['result'];
      this.citasRFPaginate = this.citasRF.slice(0, 10);
    if(data['code']!="202"){
      if(cambio==true){
        Swal.fire({
          icon: 'success',
          title: '¡Citas Filtradas..!',
          text: 'Se filtró las citas con la fecha seleccionada.'
        })
      }
    }else if(fecha==1){
      this.citasRF=null;
      this.citasRFPaginate = null;
      Swal.fire({
        icon: 'error',
        title: '¡Sin Registros..!',
        text: 'No hay citas registradas en esta fecha.'
      })
    }else if(fecha!=1 && this.searchRF==null){
      this.citasRF = null;
      this.citasRFPaginate = null;
    }else{

      if(this.searchRF!=null){

        this.dataPaginateRF(event);
      }
    }
    }).catch(error =>{
      console.log(error);
  });
  }


  buscarMG(){
    if(this.searchMG== null || this.searchMG.length==0 || this.searchMG.length>10){
      Swal.fire({
        icon: 'error',
        title: '¡Cédula inválida..!',
        text: 'La Cédula a buscar no es válida.'
      })
    }else if(this.citasMGPaginateFilter.length==0){
      Swal.fire({
        icon: 'error',
        title: '¡Sin Registros..!',
        text: 'No hay Citas Registradas con esta Cédula.'
      })
    }
  }

  buscarRF(){
    if(this.searchRF== null || this.searchRF.length==0 || this.searchRF.length>10){
      Swal.fire({
        icon: 'error',
        title: '¡Cédula inválida..!',
        text: 'La Cédula a buscar no es válida.'
      })
    } else if(this.citasRFPaginateFilter.length==0){
      Swal.fire({
        icon: 'error',
        title: '¡Sin Registros..!',
        text: 'No hay Citas Registradas con esta Cedula.'
      })
    }
  }



  dataPaginateRF(event){//Función para el filtrado con paginado sin los pipes
    this.citasRFFilter=[];
      this.citasRFPaginateFilter=[];
    if(this.searchRF==null){
    }else{

      for (const x of this.citasRF) {

        if(x.cedula.indexOf(this.searchRF)> -1){
         this.citasRFFilter.push(x);
       };
      };

      this.citasRFPaginateFilter = this.citasRFFilter.slice(0, 10);
    }

  }

  pageChangedFiltroRF(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasRFPaginateFilter = this.citasRFFilter.slice(startItem, endItem);
  }

  citasEliminarRF:any[];
  eliminarRF(id:string) {
    this.citasser.elicitas(id).then(data => {
        this.citasEliminarRF=data['result'];
        if(this.FechaRf==''){
          this.cargarRF(this.fechaActual,0,false);

        }else{
          this.cargarRF(this.FechaRf,0,false);
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  notificacion(id:string, especialidad:string){
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
        debugger
        if(especialidad=="MG"){
          debugger
          this.eliminarMG(id);
          debugger
        }else{
          debugger
          this.eliminarRF(id);
          debugger
        }

        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'La cita ha sido eliminada.',
          'success'
        )
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

  pageChangedMG(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasMGPaginate = this.citasMG.slice(startItem, endItem);

  }
  pageChangedRF(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasRFPaginate = this.citasRF.slice(startItem, endItem);
  }

  ngOnDestroy(): void{
    this.citasMG = null;
    this.citasMGPaginate = null;
    this.citasRF = null;
    this.citasRFPaginate = null;
  }

  HistoriaPaciente(cedula:string){
    localStorage.setItem('cedulaMGandRF', cedula);
    this.rutas.navigate(['/pacientes']);
  }

  CrearHistoriaClinica(){
    this.rutas.navigate(['/registrarhistoriaclinica']);
  }


}
