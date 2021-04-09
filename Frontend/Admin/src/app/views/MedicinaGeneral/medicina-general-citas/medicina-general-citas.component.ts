import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import {CitasService} from '../../../servicios/citas.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-medicina-general-citas',
  templateUrl: './medicina-general-citas.component.html',
  styleUrls: ['./medicina-general-citas.component.scss']
})
export class MedicinaGeneralCitasComponent implements OnInit {


  constructor(public citas:CitasService, public rutas:Router) { }

  isCollapsed2 = false;
  isCollapsed = true;
  search="";

  public sidebarMinimized = false;
  public navItems = navItems;
  citasTotal:any[];
  ngOnInit(): void {
    this.cargar();
  }

  cargar(){
    this.citas.citas().then(data =>{
      this.citasTotal=data['result'];
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
        this.cargar();
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

}
