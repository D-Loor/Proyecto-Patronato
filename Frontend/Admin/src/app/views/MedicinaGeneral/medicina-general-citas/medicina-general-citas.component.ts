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


  constructor(public citasser:CitasService, public rutas:Router, private medicina:MedicinaGeneralService) { }

  isCollapsed2 = false;
  isCollapsed = true;
  buscar:string="";
  especialidad:string="Medicina General";
  Estado:number=1;
  validacion:string;
  public sidebarMinimized = false;
  public navItems = navItems;
  citasMG:any[];
  citasMGPaginate:any[];
  Valida=[];
  citasEliminar:any[];
  today = new Date();
  fechaActual:string;
  
  
  ngOnInit(): void {
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    this.cargar();
  }

  cargar(){
    this.citasser.citas(this.especialidad,this.fechaActual).then(data =>{
    this.citasMG=data['result'];
    this.citasMGPaginate = this.citasMG.slice(0, 10);
    }).catch(error =>{
      console.log(error);
  });
  }
  // for (var item in this.Citas){
  //   this.ValidarAntecedentes(this.Citas[item].cedula);
  //  }

  
  eliminar(id:string) {
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

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasMGPaginate = this.citasMG.slice(startItem, endItem);
  }

  ngOnDestroy(): void{
    this.citasMG = null;
    this.Valida = null;
    this.citasMGPaginate = null;
  }

  ConsultarPaciente(cedula:string){
    this.rutas.navigate(['/medicinageneralconsultas']);
    localStorage.setItem('cedulaMG', cedula);
  }
  HistoriaPaciente(){
    this.rutas.navigate(['/medicinageneral']);
  }
  CrearHistoriaClinica(){
    this.rutas.navigate(['/registrarhistoriaclinica']);
  }

}
