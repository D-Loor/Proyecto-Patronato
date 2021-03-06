import { Component, OnInit, ViewChild } from '@angular/core';
import { navItems } from '../../../_nav';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import { VariableAst, VariableBinding } from '@angular/compiler';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-medicina-general',
  templateUrl: './medicina-general.component.html',
  styleUrls: ['./medicina-general.component.scss']
})
export class MedicinaGeneralComponent implements OnInit {

  constructor(public medicina_general:MedicinaGeneralService, public rutas:Router, private spinner: NgxSpinnerService) { }
  @ViewChild('DatosdeConsultas') public DatosdeConsultas: ModalDirective;
  public sidebarMinimized = false;
  public navItems = navItems;
  search;
  historialMG=[];
  historialMGPaginate=[];
  historialMGFilter=[];
  historialMGPaginateFilter=[];
  gad; NPaciente=""; Fecha=""; motivo; enfermedades; lugar_atencion; condicion_diagnostico;
  tipo_atencion; antecedentes_enfermedad; diagnostico; diagno; plan_terapeutico; certificado;
  FechaFin; FechaInicio;
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

  ngOnInit() {
    localStorage.removeItem('cedulaTemporal');
    localStorage.removeItem('contadorT');
    localStorage.removeItem('cedulaMGandRF');
    if(this.idPaciente == 'Undefined' || this.idPaciente == null){
      this.cargar();
    }else{
      this.medicina_general.ConsultasPacientes(this.idPaciente).then(data =>{
        this.historialMG=data['result'];
        this.historialMGPaginate = this.historialMG.slice(0, 10);
        localStorage.removeItem('id_paciente');
      }).catch(error =>{
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
      });
    }
  }



  cargar(){
    this.loadingText = 'Cargando...';
    this.spinner.show('sample');
    this.medicina_general.historiasClinicasMg().then(data =>{
    this.historialMG=data['result'];
    let validarVacio=data['code'];
      if(validarVacio == '202'){
        this.historialMG=[];
        this.historialMGPaginate = [];
        this.spinner.hide('sample');
      }else{
        this.historialMGPaginate = this.historialMG.slice(0, 10);
        this.spinner.hide('sample');
      }

  }).catch(error =>{
    console.log(error);
    this.spinner.hide('sample');
    this.rutas.navigate(['/500']);
  });

  }

  buscarMG(){
    if(this.search== null || this.search==undefined || this.search==""){
      Swal.fire({
        icon: 'error',
        title: '??Campo vac??o...!',
        text: 'Ingrese una c??dula a buscar.'
      })
    }else if(this.historialMGFilter.length==0){
      Swal.fire({
        icon: 'error',
        title: '??No hay Registros..!',
        text: 'No hay citas registradas con esta c??dula.'
      })
    }
  }
  dataPaginate(event){//Funci??n para el filtrado con paginado sin los pipes
    this.historialMGFilter=[];
      this.historialMGPaginateFilter=[];
    if(this.search==null){
      this.historialMGPaginate = this.historialMG.slice(0, 10);
    }else{
      for (const x of this.historialMG) {

        if(x['paciente'].cedula.indexOf(this.search)> -1){
         this.historialMGFilter.push(x);
       };
      };
      this.historialMGPaginateFilter = this.historialMGFilter.slice(0, 10);
    }

  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.historialMGPaginateFilter = this.historialMGFilter.slice(startItem, endItem);
  }

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.historialMGPaginate = this.historialMG.slice(startItem, endItem);
  }

  ngOnDestroy(): void{
    this.historialMG = [];
    this.historialMGPaginate = [];
  }



  DatosConsulta(arreglo:[]){

    var paciente=arreglo['paciente'];
    var enferme=arreglo['enfermedad'];
    this.NPaciente=paciente['nombres']+" "+paciente['apellidos'];
    this.Fecha=arreglo['fecha'];
    this.gad =paciente['gad'];
    this.lugar_atencion=arreglo['lugar_atencion'];
    this.tipo_atencion=arreglo['tipo_atencion'];
    this.motivo=arreglo["motivo_consulta"];
    this.lugar_atencion=arreglo['lugar_atencion'];
    this.condicion_diagnostico=arreglo['condicion_diagnostico'];
    this.plan_terapeutico=arreglo['plan_terapeutico'];
    this.diagnostico=arreglo['diagnostico'];
    if(arreglo['condicion_diagnostico']=="Presuntivo"){

      this.diagno="Diagn??stio Presuntivo";
    }else{

      this.diagno="Diagn??stio Diferencial";
    }

    if(arreglo['certificado']==1){
      this.certificado="Se entreg?? certificado al paciente.";
    }else
      this.certificado="No se entreg?? certificado al paciente.";


      this.enfermedades=enferme['enfermedad'];



    this.antecedentes_enfermedad=arreglo['a_enfermedad'];


    this.DatosdeConsultas.show();
  }

  FiltroFecha(){

    if(this.FechaInicio === undefined || this.FechaFin === undefined || this.FechaInicio === "" || this.FechaFin === ""){
      Swal.fire(
        '??Campos Incorrectos..!',
        'Ingrese las fechas a filtrar completas.',
        'error'
      )
    }else{
      this.loadingText = 'Cargando...';
      this.spinner.show('sample');

      this.medicina_general.FiltroFecha(this.FechaInicio, this.FechaFin).then(data =>{



        if(data['code']=='203'){
          Swal.fire(
            '??Fecha Incorrecta..!',
            'La fecha de incio debe ser menor a la fecha final.',
            'error'
          )
        }else if(data['code']=='202'){
          Swal.fire(
            '??Sin Registros..!',
            'No hay consultas resgistradas en esta fecha.',
            'error'
          )
          this.cargar();
          this.FechaFin = "";
          this.FechaInicio = "";
          this.historialMG=[];
          this.historialMGPaginate = this.historialMG.slice(0, 10);
        }else{
          Swal.fire(
            'Consultas Filtradas!',
            'La lista de consultas ha sido filtrada.',
            'success'
          )
          this.historialMG=data['result'];
          this.historialMGPaginate = this.historialMG.slice(0, 10);
          this.FechaFin = "";
          this.FechaInicio = "";
        }

      this.spinner.hide('sample');
    }).catch(error =>{
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);

    });
    }


  }


}
