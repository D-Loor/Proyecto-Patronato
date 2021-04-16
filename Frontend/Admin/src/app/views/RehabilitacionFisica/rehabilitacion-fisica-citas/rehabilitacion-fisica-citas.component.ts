import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import {CitasService} from '../../../servicios/citas.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'app-rehabilitacion-fisica-citas',
  templateUrl: './rehabilitacion-fisica-citas.component.html',
  styleUrls: ['./rehabilitacion-fisica-citas.component.scss']
})
export class RehabilitacionFisicaCitasComponent implements OnInit {

  constructor(public citasser:CitasService, public rutas:Router) { }
  isCollapsed2 = false;
  isCollapsed = true;
  buscar:string="";
  especialidad:string="RehabilitaciónFísica";
  public sidebarMinimized = false;
  public navItems = navItems;
  citasRF:any[];
  citasRFPaginate:any[];
  today = new Date();
  fechaActual:string;
  ngOnInit(): void {
    
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    this.cargar(this.especialidad,this.fechaActual);
  }

  cargar(especialidad:string,fechaActual:string){
    debugger
    this.citasser.citas(especialidad,fechaActual).then(data =>{
      this.citasRF=data['result'];
    this.citasRFPaginate = this.citasRF.slice(0, 10);
    debugger
    }).catch(error =>{
      console.log(error);
  });
  }

  citasEliminar:any[];
  eliminar(id:string) {
    debugger
    this.citasser.elicitas(id).then(data => {
        this.citasEliminar=data['result'];
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
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro de eliminar?',
      text: "Una vez eliminado no se podrá recuperar el mismo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar registro!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminar(id);
        this.cargar(this.especialidad,this.fechaActual);
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

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasRFPaginate = this.citasRF.slice(startItem, endItem);
    debugger
  }

  ngOnDestroy(): void{
    debugger
    this.citasRFPaginate = null;
    this.citasRF = null;
  }

}
