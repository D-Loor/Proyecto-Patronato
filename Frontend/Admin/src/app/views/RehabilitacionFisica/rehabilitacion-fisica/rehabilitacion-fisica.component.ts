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
  search;
  historialRF=[];
  historialRFPaginate=[];
  historialRFFilter=[];
  historialRFPaginateFilter=[];
  @ViewChild('Principal') public Principal: ModalDirective;
  FechaFin; FechaInicio;
  //variables para el modal
  NPaciente; Fecha; lugar_atencion; ocupacion; residencia; motivo; diagnostico; anamnesis; certificado;receta; tratamiento="";

  idPaciente = localStorage.getItem('id_paciente');

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
    localStorage.removeItem('cedulaTemporal');
    localStorage.removeItem('contadorT');
    localStorage.removeItem('cedulaMGandRF');
    if(this.idPaciente == 'Undefined' || this.idPaciente == null){
      this.cargar();
    }else{
        this.historial.ConsultasPacientes(this.idPaciente).then(data =>{
        this.historialRF=data['result'];
        this.historialRFPaginate = this.historialRF.slice(0, 10);
        localStorage.removeItem('id_paciente');
      }).catch(error =>{
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
      });
    }
  }

  buscarRH(){
    if(this.search== null || this.search==undefined || this.search==""){
      Swal.fire({
        icon: 'error',
        title: '¡Campo vacío...!',
        text: 'Ingrese una cédula a buscar.'
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
    this.loadingText = 'Cargando...';
    this.spinner.show('sample');
    this.historial.historialrf().then(data =>{
    this.historialRF=data['result'];
    let validarVacio=data['code'];
      if(validarVacio == '202'){
        this.historialRF=[];
        this.historialRFPaginate = [];
      }else{
        this.historialRFPaginate = this.historialRF.slice(0, 10);
      }
      this.spinner.hide('sample');
  }).catch((error) => {
    console.log(error);
    this.spinner.hide('sample');
    this.rutas.navigate(['/500']);
  });

  }

  CalcEdad(edad:string){
    var coma = "";
    let sepa = edad.split(coma);
    let punto = sepa[1]
    let almacenar = sepa[2];
    let dias =sepa[3]
    let valor;
    if(sepa.length==5){
      dias=sepa[3]+""+sepa[4];
    }
    if(punto=="."){
      if(almacenar=="0"){
        return  valor = dias+" dias";
      }else if(almacenar!="0"){
        if(sepa.length==4){
          almacenar = sepa[2]+""+sepa[3];
        }
        return  valor = almacenar+" meses";
      }
    }else{
      return valor = edad+" años";
    }
    

  }

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes
    this.historialRFFilter=[];
      this.historialRFPaginateFilter=[];
    if(this.search==null){
      this.historialRFPaginate = this.historialRF.slice(0, 10);
    }else{
      for (const x of this.historialRF) {
        if(x['paciente'].cedula.indexOf(this.search)> -1){
         this.historialRFFilter.push(x);
       };
      };
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
    this.historialRFPaginate = [];
    this.historialRF = [];
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
    this.diagnostico=arreglo['diagnostico'].diagnostico;
    this.anamnesis=arreglo['anamnesis'];
    this.receta=arreglo['receta'];

    let conta=0;
    if(tratamiento['estimulacion_temprana']!="No aplica"){
      this.tratamiento = tratamiento['estimulacion_temprana'];
      conta++;
    }
    if(tratamiento['magnetoterapia']!="No aplica"){
      if(conta>=1){
        this.tratamiento = this.tratamiento+"\r\n"+tratamiento['magnetoterapia'];
      }else{
        this.tratamiento = tratamiento['magnetoterapia'];
        conta++;
      }
      
    }
    if(tratamiento['electroestimulacion']!="No aplica"){
      if(conta>=1){
        this.tratamiento = this.tratamiento+"\r\n"+tratamiento['electroestimulacion'];
      }else{
        this.tratamiento = tratamiento['electroestimulacion'];
        conta++;
      }
      
    }
    if(tratamiento['C_Q_C_O_H']!="No aplica"){
      if(conta>=1){
        this.tratamiento = this.tratamiento+"\r\n"+tratamiento['C_Q_C_O_H'];
      }else{
        this.tratamiento = tratamiento['C_Q_C_O_H'];
        conta++;
      }
      
    }
    if(tratamiento['masaje']!="No aplica"){
      if(conta>=1){
        this.tratamiento = this.tratamiento+"\r\n"+tratamiento['masaje'];
      }else{
        this.tratamiento = tratamiento['masaje'];
        conta++;
      }
      
    }
    if(tratamiento['ejercicios_pasivos_resistidos']!="No aplica"){
      if(conta>=1){
        this.tratamiento = this.tratamiento+"\r\n"+tratamiento['ejercicios_pasivos_resistidos'];
      }else{
        this.tratamiento = tratamiento['ejercicios_pasivos_resistidos'];
        conta++;
      }
      
    }
    if(tratamiento['laser']!="No aplica"){
      if(conta>=1){
        this.tratamiento = this.tratamiento+"\r\n"+tratamiento['laser'];
      }else{
        this.tratamiento = tratamiento['laser'];
        conta++;
      }
      
    }
    if(tratamiento['otros']!="No aplica"){
      if(conta>=1){
        this.tratamiento = this.tratamiento+"\r\n"+tratamiento['otros'];
      }else{
        this.tratamiento = tratamiento['otros'];
        conta++
      }
      
    }
    
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
  }).catch((error) => {
    console.log(error);
    this.spinner.hide('sample');
    this.rutas.navigate(['/500']);
  });
  }


}

}
