import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import {ActivatedRoute, Router} from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { RehabilitacionFisicaService } from '../../../servicios/rehabilitacion-fisica.service';
import { ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-rehabilitacion-fisica',
  templateUrl: './rehabilitacion-fisica.component.html',
  styleUrls: ['./rehabilitacion-fisica.component.scss']
})
export class RehabilitacionFisicaComponent implements OnInit {

  constructor(public historial:RehabilitacionFisicaService, public rutas:Router, private spinner: NgxSpinnerService) { }


  public sidebarMinimized = false;
  public navItems = navItems;
  search="";
  historialRF:any[];
  historialRFPaginate:any[];
  historialRFFilter:any[];
  historialRFPaginateFilter:any[];
  @ViewChild('Principal') public Principal: ModalDirective;
  FechaFin; FechaInicio;
  //variables para el modal
  NPaciente; Fecha; lugar_atencion; ocupacion; residencia; motivo; diagnostico; anamnesis; certificado

  loadingText = 'Guardando...';

  spinnerConfig: object = {
    bdColor: 'rgba(0, 0, 0, 0.8)',
    size: 'medium',
    color: '#fff',
    type: 'square-jelly-box',
    fullScreen: true,
    template: null,
    showSpinner: false
  };


  ngOnInit(): void {
    this.cargar();
  }

  buscarRH(){
    if(this.search== null || this.search.length==0 || this.search.length>10){
      Swal.fire({
        icon: 'error',
        title: '¡Cédula Inválida..!',
        text: 'La cédula a buscar no es válida.'
      })
    }else if(this.historialRFFilter.length==0){
      Swal.fire({
        icon: 'error',
        title: '¡No hay Registros..!',
        text: 'No hay citas registradas con esta cédula.'
      })
    }
  }
  cargar(){
    this.historial.historialrf().then(data =>{
    this.historialRF=data['result'];
    this.historialRFPaginate = this.historialRF.slice(0, 10);
  }).catch(error =>{
    console.log(error);
});

  }

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes
    this.historialRFFilter=[];
      this.historialRFPaginateFilter=[];
    if(this.search==''){
    }else{
      debugger
      for (const x of this.historialRF) {
        debugger
        if(x['paciente'].cedula.indexOf(this.search)> -1){
         this.historialRFFilter.push(x);
       };
      };
      debugger
      this.historialRFPaginateFilter = this.historialRFFilter.slice(0, 10);
    }

  }


  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.historialRFPaginate = this.historialRF.slice(startItem, endItem);
  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.historialRFPaginateFilter = this.historialRFFilter.slice(startItem, endItem);
  }

  ngOnDestroy(): void{
    this.historialRFPaginate = null;
    this.historialRF = null;
  }

  DatosPaciente(arreglo:[]){
    var paciente=arreglo['paciente'];
    let tratamiento=arreglo['tratamiento'];
    this.NPaciente=paciente['nombres']+" "+paciente['apellidos'];
    this.Fecha=arreglo['fecha'];
    this.lugar_atencion=arreglo['lugar_atencion'];
    this.ocupacion=paciente['ocupacion'];
    this.residencia=paciente['residencia'];
    this.motivo=arreglo['motivo_consulta'];
    this.diagnostico=arreglo['diagnostico'];
    this.anamnesis=arreglo['anamnesis'];

    if(arreglo['certificado']==1){
      this.certificado="Se entregó certificado al paciente.";
    }else
      this.certificado="No se entregó certificado al paciente.";

    this.Principal.show();
  }

  FiltroFecha(){
    if(this.FechaInicio === undefined || this.FechaFin === undefined || this.FechaInicio === "" || this.FechaFin === ""){
      Swal.fire(
        '¡Campos Incorrectos..!',
        'Ingrese las fechas a filtrar completas.',
        'error'
      )
    }else{
      this.loadingText = 'Cargando...';
      this.spinner.show('sample');

      this.historial.FiltroFecha(this.FechaInicio, this.FechaFin).then(data =>{
        if(data['code']=='203'){
         Swal.fire(
            '¡Fecha Incorrecta..!',
            'La fecha de incio debe ser menor a la fecha final.',
            'error'
          )
        }else if(data['code']=='202'){
          Swal.fire(
            '¡Sin Registros..!',
            'No hay consultas resgistradas en esta fecha.',
            'error'
          )
          this.cargar();
          this.FechaFin = "";
          this.FechaInicio = "";
          this.historialRF=[];
          this.historialRFPaginate = this.historialRF.slice(0, 10);
        }else{
          Swal.fire(
            'Consultas Filtradas!',
            'La lista de consultas ha sido filtrada.',
            'success'
          )
          this.historialRF=data['result'];
          this.historialRFPaginate = this.historialRF.slice(0, 10);
          this.FechaFin = "";
          this.FechaInicio = "";
        }
        this.spinner.hide('sample');

    }).catch(error =>{
      console.log(error);
      this.spinner.hide('sample');
    });
    }

  }

}
