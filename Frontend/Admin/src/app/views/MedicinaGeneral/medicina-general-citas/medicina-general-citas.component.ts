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
  search:string="";
  especialidad:string="Medicina General";
  Estado:number=1;
  validacion:string;
  public sidebarMinimized = false;
  public navItems = navItems;
  citasMG:any[];
  citasMGPaginate:any[];
  citasMGFilter=[];
  citasMGPaginateFilter=[];
  Valida=[];
  citasEliminar:any[];
  today = new Date();
  fechaActual:string;
  Porcentaje1:number;
  EstiloPorcentajeH:string;
  EstiloPorcentajeM:string;
  TotalPacientes; TotalCitasPendientes; ServidoresPublicos; TotalHombres; TotalMujeres;

  //Obtener inicio y fin de mes
  primerDia = new Date(this.today.getFullYear(), this.today.getMonth()+1, 1);
  ultimoDia = new Date(this.today.getFullYear(), this.today.getMonth() + 2, 1);
  dia = this.primerDia.getDate();
  mes = this.primerDia.getMonth();
  yyy = this.primerDia.getFullYear();
  FechaInicio:string = this.yyy +'-'+this.mes+'-'+this.dia;
  diaF = this.ultimoDia.getDate();
  mesF = this.ultimoDia.getMonth();
  yyyF = this.ultimoDia.getFullYear();
  FechaFin:string = this.yyyF +'-'+this.mesF+'-'+this.diaF;




  ngOnInit(): void {
    this.Estadisticas(this.FechaInicio,this.FechaFin);
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    this.cargar();
  }
  buscarMG(){
    if(this.search== null || this.search.length==0||this.search.length>10){
      Swal.fire({
        icon: 'warning',
        title: '¡Advertencia!',
        text: 'La Cédula a buscar no es válida!'
      })
    }else if(this.citasMGPaginateFilter.length==0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay Citas Registradas con esta Cédula!'
      })
    }
  }
  Estadisticas(Inicio:string, Fin:string){

    this.medicina.Estadisticas(Inicio,Fin).then(data =>{
      this.TotalPacientes = data['totalP'];
      this.TotalCitasPendientes = data['totalC'];
      this.ServidoresPublicos = data['totalG'];
      this.TotalHombres =Math.round( data['totalH']*100/this.TotalPacientes);
      this.TotalMujeres = Math.round(data['totalM']*100/this.TotalPacientes);
      this.EstiloPorcentajeH ="width: "+ this.TotalHombres+"%"
      this.EstiloPorcentajeM ="width: "+ this.TotalMujeres+"%"
    }).catch(error =>{
      console.log(error);
    });
  }

  cargar(){
    this.citasser.citas(this.especialidad,this.fechaActual).then(data =>{
    this.citasMG=data['result'];
    this.citasMGPaginate = this.citasMG.slice(0, 10);
    }).catch(error =>{
      console.log(error);
  });
  }
  actualizar(){
    this.cargar();
    Swal.fire(
      'Citas Actualizadas!',
      'La lista de Citas ha sido actualizada.',
      'success'
    )
  }
  // for (var item in this.Citas){
  //   this.ValidarAntecedentes(this.Citas[item].cedula);
  //  }

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes
    this.citasMGFilter=[];
      this.citasMGPaginateFilter=[];
    debugger
    if(this.search==null){

      this.citasMGPaginate = this.citasMG.slice(0, 10);
    }else{
      for (const x of this.citasMG) {

        if(x.cedula.indexOf(this.search)> -1){
         this.citasMGFilter.push(x);
       };
      };
      this.citasMGPaginateFilter = this.citasMGFilter.slice(0, 10);
    }

  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasMGPaginateFilter = this.citasMGFilter.slice(startItem, endItem);
  }

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
      confirmButtonColor: '#20a8d8',
      cancelButtonColor: '#f86c6b',
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

  ConsultarPaciente(cedula:string,idCita:string){
    this.rutas.navigate(['/medicinageneralconsultas']);
    localStorage.setItem('cedulaMG', cedula);
    localStorage.setItem('idCita', idCita);
  }

  HistoriaPaciente(cedula:string){
    localStorage.setItem('cedulaMGandRF', cedula);
    this.rutas.navigate(['/pacientes']);
  }

  CrearHistoriaClinica(){
    this.rutas.navigate(['/registrarhistoriaclinica']);
  }


}
