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
  buscarMG:string="";
  buscarRF:string="";

  public sidebarMinimized = false;
  public navItems = navItems;

  CitasMG:any[];
  citasTotalMG:any[];
  CitasRF:any[];
  citasTotalRF:any[];

  today = new Date();
  fechaActual:string;

  ngOnInit(): void {
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    this.cargarRF("RehabilitaciónFísica",this.fechaActual);
    this.cargarMG("MedicinaGeneral",this.fechaActual);

  }

  cargarMG(especialidad:string,fechaActual:string){
    this.citasser.citas(especialidad,fechaActual).then(data =>{
      this.CitasMG=data['result'];
    this.citasTotalMG = this.CitasMG.slice(0, 10);
    }).catch(error =>{
      console.log(error);
  });
  }

  citasEliminarMG:any[];
  eliminarMG(id:string) {
    debugger
    this.citasser.elicitas(id).then(data => {
        this.citasEliminarMG=data['result'];
      })
      .catch((error) => {
        console.log(error);
      });
  }



  cargarRF(especialidad:string,fechaActual:string){
    this.citasser.citas(especialidad,fechaActual).then(data =>{
    this.CitasRF=data['result'];
    debugger
    this.citasTotalRF = this.CitasRF.slice(0, 10);
    }).catch(error =>{
      console.log(error);
  });
  }

  citasEliminarRF:any[];
  eliminarRF(id:string) {
    debugger
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
    this.citasTotalMG = this.CitasMG.slice(startItem, endItem);
    debugger
  }
  pageChangedRF(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasTotalRF = this.CitasRF.slice(startItem, endItem);
    debugger
  }

  ngOnDestroy(): void{

    this.CitasMG = null;
    this.citasTotalMG = null;
    this.CitasRF = null;
    this.citasTotalRF = null;
  }


}
