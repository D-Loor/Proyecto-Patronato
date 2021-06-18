import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportesService } from '../../../servicios/reportes.service';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../../servicios/administrador.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportesrecaudacion.component.html',
  styleUrls: ['./reportesrecaudacion.component.scss']
})
export class ReportesRecaudacionComponent implements OnInit {

  constructor(public Report:ReportesService, public rutas:Router,private administradorService:AdministradorService) { }
  isCollapsed1=true;
  isCollapsed2=true;
  isCollapsed3=true;

  today = new Date();
  YearActual;
  YearInicio=2021;
  YearD=[];
  listaRoles:any=[];
  FechaDiaMG="";
  FechaDiaRF="";
  MMes="";
  MYear="";
  Espe="";
  idEspe;

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
    localStorage.removeItem('cedulaMGandRF');
    this.YearActual=this.today.getFullYear();
    this.cargarRoles();
    this.cargarYears();
  }

  cargarRoles(){
    this.administradorService.cargarRolesMedicos().then(data=>{
      this.listaRoles=data['result'];
    }).catch((error) => {
      console.log(error);
      this.rutas.navigate(['/500']);
    });
  }

  ClaseMMes:string="form-control form-input select-number";
  ClaseMYear:string="form-control form-input select-number";


  cargarYears(){
    for(let i=this.YearInicio; i<=this.YearActual ;i++){
      this.YearD.push(i);
    }
  }

  Turno(){
    for (const item of this.listaRoles) {
      if(item['rol']==this.Espe){
        this.idEspe=item['id_rol'];
      }
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

          if(this.Espe == "Medicina General"){
            this.Report.RecaudacionDiarioMedicina(this.FechaDiaMG,this.idEspe).then(data =>{
              if(data['code']=="202"){
                Swal.fire(
                  '¡No hay Registros..!',
                  'No se encuentran registros en la fecha seleccionada.',
                  'error'
                )
              }else{
                window.open('http://127.0.0.1:8000/api/RecaudacionDiarioMedicinaGeneral/'+this.FechaDiaMG+'/'+this.idEspe, '_blank');
              }
            }).catch((error) => {
              console.log(error);
              this.rutas.navigate(['/500']);
            });
          }else if(this.Espe == "Rehabilitación Física"){
            this.Report.RecaudacionDiarioTerapia(this.FechaDiaMG,this.idEspe).then(data =>{
              if(data['code']=="202"){
                Swal.fire(
                  '¡No hay Registros..!',
                  'No se encuentran registros en la fecha seleccionada.',
                  'error'
                )
              }else{
                window.open('http://127.0.0.1:8000/api/RecaudacionDiarioTerapia/'+this.FechaDiaMG+'/'+this.idEspe, '_blank');
              }
            }).catch((error) => {
              console.log(error);
              this.rutas.navigate(['/500']);
            });
          }

        }else if(tipo=="Mensual"){
          this.Report.RecaudacionMensual(this.MMes,this.MYear).then(data =>{
            if(data['code']=="202"){
              Swal.fire(
                '¡No hay Registros..!',
                'No se encuentran registros en la fecha seleccionada.',
                'error'
              )
            }else{
              window.open('http://127.0.0.1:8000/api/RecaudacionMensual/'+this.MMes+'/'+this.MYear, '_blank');
            }
          }).catch((error) => {
            console.log(error);
            this.rutas.navigate(['/500']);
          });
        }

      } else if (

        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado..!',
          'No se ha generado el reporte.',
          'error'
        )
      }
      return false;
    })

  }



}
