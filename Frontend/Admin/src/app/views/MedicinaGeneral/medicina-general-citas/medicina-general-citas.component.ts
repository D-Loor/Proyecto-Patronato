import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import {CitasService} from '../../../servicios/citas.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
@Component({
  selector: 'app-medicina-general-citas',
  templateUrl: './medicina-general-citas.component.html',
  styleUrls: ['./medicina-general-citas.component.scss']
})
export class MedicinaGeneralCitasComponent implements OnInit {


  constructor(public citas:CitasService, public rutas:Router, private medicina:MedicinaGeneralService) { }

  isCollapsed2 = false;
  isCollapsed = true;
  buscar:string="";
  especialidad:string="Medicina General";
  Estado:number=1;
  validacion:string;
  public sidebarMinimized = false;
  public navItems = navItems;
  Citas:any[];
  citasTotal:any[];
  Valida=[];
  ngOnInit(): void {
    this.cargar(this.especialidad);
  }

  cargar(especialidad:string){
    this.citas.citas(especialidad).then(data =>{
    this.Citas=data['result'];
    this.citasTotal = this.Citas.slice(0, 10);
    }).catch(error =>{
      console.log(error);
  });
  }
  // for (var item in this.Citas){
  //   this.ValidarAntecedentes(this.Citas[item].cedula);
  //  }

  citasEliminar:any[];
  eliminar(id:string) {
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
    this.Valida = this.Citas.slice(startItem, endItem);
  }

  ngOnDestroy(): void{
    this.Citas = null;
    this.Valida = null;

    this.citasTotal = null;
  }

  ConsultarPaciente(){
    this.rutas.navigate(['/medicinageneralconsultas']);
  }
  HistoriaPaciente(){
    this.rutas.navigate(['/medicinageneral']);
  }

}
