import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  constructor() { }

  isCollapsed1=true;
  isCollapsed2=true;
  isCollapsed3=true;
  isCollapsed4=true;
  isCollapsed5=true;

  today = new Date();
  YearActual;
  YearInicio=2019;
  YearD=[];
  FechaDia="";
  CMes="";
  CYear="";
  MMes="";
  MYear="";
  PMes="";
  PYear="";
  PAYear="";

  ClaseRol:string="form-control form-input select-number";
  ClaseCMes:string="form-control form-input select-number";
  ClaseCYear:string="form-control form-input select-number";
  ClaseMMes:string="form-control form-input select-number";
  ClaseMYear:string="form-control form-input select-number";
  ClasePMes:string="form-control form-input select-number";
  ClasePYear:string="form-control form-input select-number";


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



  ngOnInit(): void {
    this.YearActual=this.today.getFullYear();

    this.cargarYears();
  }

  cargarYears(){
    debugger
      for(let i=this.YearInicio; i<=this.YearActual ;i++){
        this.YearD.push(i);

      }

  }


   Reporte(tipo:string){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-info',
        cancelButton: 'btn btn-danger'

      },
      buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
      title: '¿Desea Generar Reporte?',
      text: "Una vez generado podrá visualizarlo y descargarlo.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Generar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#20a8d8',
      cancelButtonColor: '#f86c6b',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if(tipo=="Diario"){
          window.open('http://127.0.0.1:8000/api/RegistroDiarioMedicina/'+this.FechaDia, '_blank');
        }else if(tipo=="Consolidado"){
          window.open('http://127.0.0.1:8000/api/ConsolidadoMensualMedicinaGeneral/'+this.CMes+'/'+this.CYear, '_blank');
        }else if(tipo=="Morbilidad"){
          window.open('http://127.0.0.1:8000/api/MorbilidadMedicinaGeneral/'+this.MMes+'/'+this.MYear, '_blank');
        }else if(tipo=="Pacientes Mensual"){
          window.open('http://127.0.0.1:8000/api/ReportePacientesMensual/'+this.PMes+'/'+this.PYear, '_blank');
        }else if(tipo=="Pacientes Anual"){
          window.open('http://127.0.0.1:8000/api/ReportePacientesAnual/'+this.PAYear, '_blank');
        }

      } else if (

        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado!',
          'No se ha agendado la cita médica.',
          'error'
        )
      }
      return false;
    })

  }






}
