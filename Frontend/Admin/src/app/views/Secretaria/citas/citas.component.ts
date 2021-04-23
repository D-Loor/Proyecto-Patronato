import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import Swal from 'sweetalert2';
import { CitasService } from '../../../servicios/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  constructor(public citasser:CitasService, public rutas:Router) { }

  isCollapsedMG = false;
  isCollapsedRF = false;
  searchMG:string="";
  searchRF:string="";

  public sidebarMinimized = false;
  public navItems = navItems;

  citasMG:any[];
  citasMGFilter:any[];
  citasMGPaginate:any[];
  citasMGPaginateFilter:any[];
  citasRF:any[];
  citasRFFilter:any[];
  citasRFPaginate:any[];
  citasRFPaginateFilter:any[];

  today = new Date();
  fechaActual:string;

  ngOnInit(): void {
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    this.cargarRF("Rehabilitacion Fisica",this.fechaActual);
    this.cargarMG("Medicina General",this.fechaActual);

  }

  cargarMG(especialidad:string,fechaActual:string){
    this.citasser.citas(especialidad,fechaActual).then(data =>{
    this.citasMG=data['result'];
    this.citasMGPaginate = this.citasMG.slice(0, 10);
    }).catch(error =>{
      console.log(error);
  });
  }

  dataPaginateMG(event){//Función para el filtrado con paginado sin los pipes
    this.citasMGFilter=[];
      this.citasMGPaginateFilter=[];
    if(this.searchMG==''){
    }else{
      debugger
      for (const x of this.citasMG) {
        debugger
        if(x.cedula.indexOf(this.searchMG)> -1){
         this.citasRFFilter.push(x);
       };
      };
      debugger
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
      })
      .catch((error) => {
        console.log(error);
      });
  }



  cargarRF(especialidad:string,fechaActual:string){
    this.citasser.citas(especialidad,fechaActual).then(data =>{
    this.citasRF=data['result'];
    this.citasRFPaginate = this.citasRF.slice(0, 10);
    }).catch(error =>{
      console.log(error);
  });
  }

  dataPaginateRF(event){//Función para el filtrado con paginado sin los pipes
    this.citasRFFilter=[];
      this.citasRFPaginateFilter=[];
    if(this.searchRF==''){
    }else{
      debugger
      for (const x of this.citasRF) {
        debugger
        if(x.cedula.indexOf(this.searchRF)> -1){
         this.citasRFFilter.push(x);
       };
      };
      debugger
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
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar registro!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonColor: '#4BB543',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if(especialidad=="MG"){
          this.eliminarMG(id);
          this.cargarMG("MedicinaGeneral",this.fechaActual);
        }else{
          this.eliminarRF(id);
          this.cargarMG("RehabilitaciónFísica",this.fechaActual);
        }

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El dato se ha eliminado.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Se ha cancelado',
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


}
