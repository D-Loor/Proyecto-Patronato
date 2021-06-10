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
  idpaciente; lugar_atencion; motivo_consultaT; diagnosticoT; anamnesisT; certificado; receta;

  //variables para el tratamiento
  idTratamiento; estimulacion_temprana=false; magnetoterapia=false; electroestimulacion=false; ultrasonido=false; CQC_OH=false;
  masaje=false; ejercicios_PR=false; laser=false; otros=false; otrosT=""; 

  //Variables de Validacion
  ClaseLugar='';ClaseMotivoC="form-control"; ClaseDiagnostico='form-control';ClaseAnammesi='form-control';
  ClaseReceta='form-control';ClaseOtrosT='form-control'; ClaseTratamiento='';

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
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
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
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
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
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
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
      'receta':this.receta
    }

    this.RFService.AgregarConsulta(dataC).then(data=>{
      this.spinner.hide('sample');
      this.EliminarCita(this.idcita);
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });

  }

  ValidarTratamiento(){
    if(this.estimulacion_temprana==false&&this.magnetoterapia==false&&this.electroestimulacion==false&&
       this.ultrasonido==false&&this.CQC_OH==false&&this.masaje==false&&this.ejercicios_PR==false&&this.laser==false&&
       this.otros==false
      ){
        return true;
    }else
      return false
  }
  

  ValidarVacios(){
    let tratamient=this.ValidarTratamiento();
    if(this.lugar_atencion==undefined||this.motivo_consultaT==undefined||this.motivo_consultaT==""||
       this.diagnosticoT==undefined||this.diagnosticoT==""||this.anamnesisT==undefined||this.anamnesisT==""||
       this.receta==undefined||this.receta==undefined||this.receta==""||tratamient==true||this.otros==true&&this.otrosT==""
    ){

      if(this.otros==true&&this.otrosT==""){
        this.ClaseOtrosT="form-control is-invalid";
      }
      if(tratamient==true){
        this.ClaseTratamiento="invalido";
      }
      if(this.lugar_atencion==undefined){
        this.ClaseLugar="invalido";
      }
      if(this.motivo_consultaT==undefined||this.motivo_consultaT==""){
        this.ClaseMotivoC="form-control is-invalid";
      }
      if(this.diagnosticoT==undefined||this.diagnosticoT==""){
        this.ClaseDiagnostico="form-control is-invalid";
      }
      if(this.anamnesisT==undefined||this.anamnesisT==""){
        this.ClaseAnammesi="form-control is-invalid";
      }
      if(this.receta==undefined||this.receta==""){
        this.ClaseReceta="form-control is-invalid";
      }
            

      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para registrar la consulta.'
      });
    }else{
      this.Alert();
    }
  }

}


