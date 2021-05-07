import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import { Router } from '@angular/router';
import { CitasService } from '../../../servicios/citas.service';
import { RehabilitacionFisicaService } from '../../../servicios/rehabilitacion-fisica.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, public rehabilifacionF:MedicinaGeneralService, public rutas:Router, public citasRF:CitasService, private RFService:RehabilitacionFisicaService) { }

  isCollapsed = false;
  public sidebarMinimized = false;
  public navItems = navItems;
  today = new Date();
  fechaActual:string;
  nombres:string; ocupacion:string; edad:string; idcita;

  //variables para agregar la consulta
  idpaciente; lugar_atencion; motivo_consultaT; diagnosticoT; anamnesisT; certificado

  //variables para el tratamiento
  idTratamiento; estimulacion_temprana; magnetoterapia; electroestimulacion; ultrasonido; CQC_OH; 
  masaje; ejercicios_PR; laser; otros; otrosT

  loadingText = 'Guardando...';

  /**
   * Spinner configuration
   *
   * @type {object}
   * @memberof AppComponent
   */
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
    this.CargarDatos();
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  EliminarCita(id:string) {
    this.citasRF.elicitas(id).then(data => {
      this.rutas.navigate(['/rehabilitacionfisicacitas']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  CargarDatos(){
    let cedula = localStorage.getItem('cedulaRF');
    this.idcita = localStorage.getItem('idCita');
    this.rehabilifacionF.AtenderPaciente(cedula).then(data => {      
      this.nombres = data['result'].nombres + '' +data['result'].apellidos;
      this.ocupacion = data['result'].ocupacion;
      this.edad = data['result'].edad;
      this.idpaciente = data['result'].id_paciente;
      localStorage.removeItem('cedulaMG');
      localStorage.removeItem('idCita');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  Alert(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-info',
        cancelButton: 'btn btn-danger'

      },
      buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro de guardar?',
      text: "Una vez guardada no se podrá cambiar.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#20a8d8',
      cancelButtonColor: '#f86c6b',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show('sample');
        this.Tratamiento();
        this.spinner.hide('sample');
        swalWithBootstrapButtons.fire(
          '¡Guardado!',
          'La consulta ha sido guardada.',
          'success'
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado!',
          'No se ha resgistrado.',
          'error'
        )
      }
    })
  }

  Tratamiento(){
    let ET, MG, ELEC, ULT, CQ, MAJ, EPR, LSR, OT

    if(this.estimulacion_temprana==true){
      ET="Estimulación temprana";
    }else{
      ET="No aplica";
    }if(this.magnetoterapia==true){
      MG="Magnetoterapia";
    }else{
      MG="No aplica";
    }if(this.electroestimulacion==true){
      ELEC="Electroestimulación";
    }else{
      ELEC="No aplica";
    }if(this.ultrasonido==true){
      ULT="Ultrasonido";
    }else{
      ULT="No aplica";
    }if(this.CQC_OH==true){
      CQ="C.Q.C. O H.";
    }else{
      CQ="No aplica"
    }if(this.masaje==true){
      MAJ="Masaje";
    }else{
      MAJ="No aplica";
    }if(this.ejercicios_PR==true){
      EPR="Ejercicios pasivos y resistidos";
    }else{
      EPR="No aplica";
    }if(this.laser==true){
      LSR="Láser";
    }else{
      LSR="No aplica";
    }if(this.otros==true){
      OT=this.otrosT;
    }else{
      OT="No aplica";
    }
    
    let dataT ={
      'estimulacion_temprana': ET,
      'magnetoterapia': MG,
      'electroestimulacion': ELEC,
      'ultrasonido': ULT,
      'C_Q_C_O_H': CQ,
      'masaje': MAJ,
      'ejercicios_pasivos_resistidos':EPR,
      'laser': LSR,
      'otros': OT,
    }

    this.RFService.AgregarTratamiento(dataT).then(data=>{
      this.idTratamiento = data['id'];
      this.AddConsultas();
    });
  }

  AddConsultas(){
    let certificadoValor=0;
    if(this.certificado==true){
      certificadoValor=1;
    }
    let dataC={
      'id_paciente': this.idpaciente,
      'id_tratamiento' : this.idTratamiento,
      'diagnostico': this.diagnosticoT,
      'lugar_atencion':this.lugar_atencion,
      'certificado':certificadoValor,
      'motivo_consulta':this.motivo_consultaT,
      'anamnesis':this.anamnesisT,
      'fecha':this.fechaActual,
    }

    this.RFService.AgregarConsulta(dataC).then(data=>{
      this.EliminarCita(this.idcita);
    });

  }

}


