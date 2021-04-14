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

  constructor(public citas:CitasService, public rutas:Router) { }
  isCollapsed2 = false;
  isCollapsed = true;
  buscar:string="";
  especialidad:string="RehabilitaciónFísica";
  public sidebarMinimized = false;
  public navItems = navItems;
  Citas:any[];
  citasTotal:any[];


  ngOnInit(): void {
    this.cargar(this.especialidad);
  }

  cargar2(especialidad:string){
    this.citas.citas(especialidad).then(data =>{
      this.Citas=data['result'];
    this.citasTotal = this.Citas.slice(0, 10);
    }).catch(error =>{
      console.log(error);
  });
  }

  citasEliminar2:any[];
  eliminar2(id:string) {
    debugger
    this.citas.elicitas(id).then(data => {
        this.citasEliminar=data['result'];
      })
      .catch((error) => {
        console.log(error);
      });
  }

  cargar(especialidad:string){
    this.citas.citas(especialidad).then(data =>{
    this.Citas=data['result'];
    this.citasTotal = this.Citas.slice(0, 10);
    }).catch(error =>{
      console.log(error);
  });
  }

  citasEliminar:any[];
  eliminar(id:string) {
    debugger
    this.citas.elicitas(id).then(data => {
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
        this.cargar(this.especialidad);
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
    this.citasTotal = this.Citas.slice(startItem, endItem);
    debugger
  }

  ngOnDestroy(): void{
    debugger
    this.Citas = null;
    this.citasTotal = null;
  }


}
