import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import {CitasService} from '../../../servicios/citas.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-rehabilitacion-fisica-citas',
  templateUrl: './rehabilitacion-fisica-citas.component.html',
  styleUrls: ['./rehabilitacion-fisica-citas.component.scss']
})
export class RehabilitacionFisicaCitasComponent implements OnInit {

  constructor(public citasser:CitasService, public rutas:Router) { }
  isCollapsed2 = false;
  isCollapsed = true;
  search;
  especialidad:string="Rehabilitacion Fisica";
  public sidebarMinimized = false;
  public navItems = navItems;
  citasRF=[];
  citasRFPaginate=[];
  citasRFPaginateFilter=[];
  citasRFFilter=[];
  today = new Date();
  fechaActual:string;
  validarVacio;

  ngOnInit(): void {

    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    this.cargar();
  }

  cargar(){
    this.citasser.citas(this.especialidad,this.fechaActual).then(data =>{
      this.citasRF=data['result'];
      this.citasRFPaginate = this.citasRF.slice(0, 10);
      this.validarVacio=data['code'];
      if(this.validarVacio == '202'){
        this.citasRF=null;
        this.citasRFPaginate = null;
        debugger
      }else{
        this.citasRFPaginate = this.citasRF.slice(0, 10);
      }
      if(this.search!=null){
        debugger
        this.dataPaginate(event);
      }
    }).catch(error =>{
      console.log(error);
  });
  }

  buscarRH(){
    if(this.search.length>10 || this.search.length==0){
      Swal.fire({
        icon: 'warning',
        title: '¡Advertencia!',
        text: 'La Cédula a buscar no es válida!'
      })
    }else if(this.citasRFFilter.length==0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay Citas Registradas con esta Cédula!'
      })
    }
  }
 

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes
    debugger
    this.citasRFFilter=[];
      this.citasRFPaginateFilter=[];
    if(this.search==null){
    }else{
      for (const x of this.citasRF) {
        if(x.cedula.indexOf(this.search)> -1){
         this.citasRFFilter.push(x);
       };
      };
      this.citasRFPaginateFilter = this.citasRFFilter.slice(0, 10);
    }

  }

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasRFPaginate = this.citasRF.slice(startItem, endItem);
  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasRFPaginateFilter = this.citasRFFilter.slice(startItem, endItem);
  }



  citasEliminar:any[];
  eliminar(id:string) {
    this.citasser.elicitas(id).then(data => {
        this.citasEliminar=data['result'];
        this.cargar();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
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
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar registro!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonColor: '#4BB543',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminar(id);
        //this.cargar(this.especialidad,this.fechaActual);
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

  HistoriaPaciente(cedula:string){
    localStorage.setItem('cedulaMGandRF', cedula);
    this.rutas.navigate(['/pacientes']);
  }

  ngOnDestroy(): void{
    this.citasRFPaginate = null;
    this.citasRF = null;
  }
  ConsultarPaciente(cedula:string, idCita:string){
    this.rutas.navigate(['/rehabilitacionfisicaconsultas']);
    localStorage.setItem('cedulaRF', cedula);
    localStorage.setItem('idCita', idCita);
  }

  CrearHistoriaClinica(){
    this.rutas.navigate(['/registrarhistoriaclinica']);
  }



}
