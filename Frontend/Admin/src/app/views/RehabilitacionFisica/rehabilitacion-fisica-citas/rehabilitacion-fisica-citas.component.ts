import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import {CitasService} from '../../../servicios/citas.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { RehabilitacionFisicaService } from '../../../servicios/rehabilitacion-fisica.service';

@Component({
  selector: 'app-rehabilitacion-fisica-citas',
  templateUrl: './rehabilitacion-fisica-citas.component.html',
  styleUrls: ['./rehabilitacion-fisica-citas.component.scss']
})
export class RehabilitacionFisicaCitasComponent implements OnInit {

  constructor(public citasser:CitasService, public rehabilita:RehabilitacionFisicaService, public rutas:Router, private spinner: NgxSpinnerService) { }
  isCollapsed2 = false;
  isCollapsed = true;
  search;
  especialidad=localStorage.getItem('rol');
  public sidebarMinimized = false;
  public navItems = navItems;
  citasRF=[];
  citasRFPaginate=[];
  citasRFPaginateFilter=[];
  citasRFFilter=[];
  today = new Date();
  fechaActual:string;
  validarVacio;
  TotalHombres; TotalMujeres; TotalPacientes; TotalCitasPendientes; horas; minutos; patronato; domicilio;

  loadingText = 'Cargando...';
  spinnerConfig: object = {
    bdColor: 'rgba(0, 0, 0, 0.8)',
    size: 'medium',
    color: '#fff',
    type: 'square-jelly-box',
    fullScreen: true,
    template: null,
    showSpinner: false
  };

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
    this.Estadisticas(this.FechaInicio,this.FechaFin, this.especialidad);
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    this.cargar();
  }
  actualizar(){
    localStorage.removeItem('cedulaMGandRF');
    this.spinner.show('sample');
    this.cargar();

    Swal.fire(
      'Citas Actualizadas..!',
      'La lista de citas ha sido actualizada.',
      'success'
    )
  }
  Estadisticas(Inicio:string,Fin:string, especialidad:string){

    this.rehabilita.Estadisticas(Inicio,Fin, especialidad).then(data =>{
      this.TotalPacientes = data['totalP'];
      this.TotalCitasPendientes = data['totalC'];
      this.TotalHombres = data['totalH'];
      this.TotalMujeres = data['totalM'];
      this.patronato= data['patronato'];
      this.domicilio= data['domicilio'];
      let tiempocita=this.TotalPacientes*20;
      this.horas=tiempocita/60;
      this.horas=parseInt(this.horas);
      this.minutos = tiempocita%60;
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }

  cargar(){
    this.citasser.citas(this.especialidad,this.fechaActual).then(data =>{
      this.citasRF=data['result'];
      this.citasRFPaginate = this.citasRF.slice(0, 10);
      this.validarVacio=data['code'];
      if(this.validarVacio == '202'){
        this.citasRF=[];
        this.citasRFPaginate = [];

      }else{
        this.citasRFPaginate = this.citasRF.slice(0, 10);
      }
      if(this.search!=null){

        this.dataPaginate(event);
      }
      this.spinner.hide('sample');
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }

  buscarRH(){
    if(this.search== null || this.search==undefined || this.search==""){
      Swal.fire({
        icon: 'error',
        title: '¡Campo vacío...!',
        text: 'Ingrese una cédula a buscar.'
      })
    }else if(this.citasRFFilter.length==0){

      Swal.fire({
        icon: 'error',
        title: '¡No hay Registros..!',
        text: 'No hay citas registradas con esta cédula.'
      })

    }

  }


  dataPaginate(event){//Función para el filtrado con paginado sin los pipes

    this.citasRFFilter=[];
      this.citasRFPaginateFilter=[];
    if(this.search==null){
      this.citasRFPaginate = this.citasRF.slice(0, 10);
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
      }).catch((error) => {
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
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
    this.citasRFPaginate = [];
    this.citasRF = [];
  }
  ConsultarPaciente(cedula:string, idCita:string){
    this.rutas.navigate(['/rehabilitacionfisicaconsultas']);
    localStorage.setItem('cedulaRF', cedula);
    localStorage.setItem('idCita', idCita);
  }

  CrearHistoriaClinica(algo:string){
    localStorage.setItem('RolV', algo);
    this.rutas.navigate(['/registrarhistoriaclinica']);
  }



}
