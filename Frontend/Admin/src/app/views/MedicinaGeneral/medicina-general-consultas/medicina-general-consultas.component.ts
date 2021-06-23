import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import Swal from 'sweetalert2';
import { CitasService } from '../../../servicios/citas.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-medicina-general-consultas',
  templateUrl: './medicina-general-consultas.component.html',
  styleUrls: ['./medicina-general-consultas.component.scss']
})
export class MedicinaGeneralConsultasComponent implements OnInit {

  constructor(public medicinag:MedicinaGeneralService, public rutas:Router,public citasser:CitasService, private spinner: NgxSpinnerService) { }
  isCollapsed = false;
  presun=false;
  defini=false;
  salida="¡No se encontró!";
  enferme="name";
  valor;
  lugar_atencion;
  condicion_diagnostico;
  tipo_atencion;
  motivo;
  antecedentes_enfermedad;
  diagnostico;
  plan_terapeutico;
  certificado;
  enfermedades: any[];
  data = [];
  nombres:string;
  cedula:string;
  edad:string;
  idPaciente;
  idCitas;
  gad;
  gadv;
  today = new Date();
  fechaActual;
  NuevaEnfermedad;
  confirma= false;
  pase=false;
  tipo="Diagnóstico";
  edadR;
  indicaciones;

  ClaseMotivo:string="form-control form-input";
  ClaseAntecedentes:string="form-control form-input";
  ClaseDiagnostico:string="form-control form-input";
  ClasePlan:string="form-control form-input";
  ClaseIndicaciones='form-control form-input';
  ClaseprescripcionR='form-control form-input';
  Claserp='form-control form-input';

  //Variables del modal receta 
  nombresR; pesoR; tallaR; taR; edadRe; fechaR; rpR; prescripcionR;

  ClaseLugar:string="";
  ClaseTipo:string="";
  ClaseCondicion:string="";
  ClaseEnfermedad:string="";

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
  @ViewChild('largeModal') public Modal: ModalDirective;

  ngOnInit(): void {
    localStorage.removeItem('cedulaMGandRF');
    this.cargar();
    this.CargarDatos();
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();

  }



  funcionPreventivo(){
    this.tipo="Dianóstico Presuntivo";
    this.ClaseCondicion='';
  }
  funcionDefinitivo(){
    this.tipo="Dianósticos Diferenciales";
    this.ClaseCondicion='';
  }

  cargar(){
      this.medicinag.enfermedad().then(data =>{
      this.enfermedades=data['result'];

      this.completar();
    }).catch(error =>{
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
  });


  }

  completar(){
    for (let x in this.enfermedades){
      this.data.push({ "id":this.enfermedades[x]["id_enfermedad"], "name":this.enfermedades[x]["enfermedad"]});

    }

  }

  CargarDatos(){
    let cedula = localStorage.getItem('cedulaMG');
    this.idCitas = localStorage.getItem('idCita');

    this.medicinag.AtenderPaciente(cedula).then(data => {
      this.nombres = data['result'].nombres + ' ' +data['result'].apellidos;
      this.cedula = data['result'].cedula;
      this.idPaciente=data['result'].id_paciente;
      this.edad = this.CalcEdad(data['result'].edad);
      this.edadR = data['result'].edad;
      this.gad = data['result'].gad;
      localStorage.removeItem('cedulaMG');
      localStorage.removeItem('idCita');
      if(this.gad==1)
       this.gadv="Miembro activo";
      else
        this.gadv="No consta como miembro activo";
      if(this.gad==0){
        this.condicion_diagnostico='Presuntivo';
        this.diagnostico='No admite';
        this.plan_terapeutico='No admite';
      }
    })
    .catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }

  selectEvent(item) {
    this.ClaseEnfermedad='';
    this.valor=item.id;
    this.confirma=true;
    this.pase=true;
  }

  onChangeSearch(){
    this.ClaseEnfermedad='';
    this.confirma=false;
    this.pase=false;
  }
  
  NotiCampos(){
    Swal.fire({
      icon: 'error',
      title: '¡Hay campos vacíos..!',
      text: 'Debe de completar todo el formulario para registrar la consulta.'
    })
  }

  notificacion(){

    if(this.antecedentes_enfermedad==undefined||this.condicion_diagnostico==undefined||this.NuevaEnfermedad==undefined||this.NuevaEnfermedad==""||this.NuevaEnfermedad==null||this.condicion_diagnostico==""||this.lugar_atencion==undefined||this.lugar_atencion==""||this.tipo_atencion==undefined||this.tipo_atencion==""||this.antecedentes_enfermedad==""||this.motivo==undefined||this.motivo==""||this.diagnostico==undefined||this.diagnostico==""||this.plan_terapeutico==undefined||this.plan_terapeutico==""){

      if(this.NuevaEnfermedad==undefined||this.NuevaEnfermedad==""||this.NuevaEnfermedad==null){
        this.ClaseEnfermedad = "invalido";
      }
      if(this.antecedentes_enfermedad==undefined||this.antecedentes_enfermedad==""){
        this.ClaseAntecedentes = "form-control is-invalid";
      }

      if(this.condicion_diagnostico==undefined||this.condicion_diagnostico==""){
        this.ClaseCondicion = "invalido";
      }
      if(this.lugar_atencion==undefined||this.lugar_atencion==""){
        this.ClaseLugar = "invalido";
      }
      if(this.tipo_atencion==undefined||this.tipo_atencion==""){
        this.ClaseTipo = "invalido";
      }
      if(this.motivo==undefined||this.motivo==""){
        this.ClaseMotivo = "form-control is-invalid";
      }
      if(this.diagnostico==undefined||this.diagnostico==""){
        this.ClaseDiagnostico = "form-control is-invalid";
      }
      if(this.plan_terapeutico==undefined||this.plan_terapeutico==""){
        this.ClasePlan = "form-control is-invalid";
      }
      if(this.indicaciones==undefined||this.indicaciones==""){
        this.ClaseIndicaciones = "form-control is-invalid";
      }
      

      this.NotiCampos();
    }
    else if(this.pase==false){
      this.ClaseEnfermedad = "invalido";
      Swal.fire(
        'Error!',
        'La enfermedad no se encuentra registrada.',
        'error'
      )
    }else{
        this.Modal.show();
        debugger
        this.nombresR = this.nombres;
        this.edadRe = this.edad;
        this.rpR = this.plan_terapeutico;
        this.prescripcionR =this.indicaciones;
        this.fechaR = this.fechaActual;
    }
  }

  GuardarConsulta(){
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

        this.IngresarConsulta();

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

  eliminarCita(id:string) {
    this.citasser.elicitas(id).then(data => {
      this.rutas.navigate(['/medicinageneralcitas']);
      this.spinner.hide('sample');
      })
      .catch((error) => {
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
      });
  }

  IngresarEnfermedad(){

    if(this.NuevaEnfermedad!=undefined){
      if(this.confirma==false){

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-info',
            cancelButton: 'btn btn-danger'

          },
          buttonsStyling: true
        })
        swalWithBootstrapButtons.fire({
          title: '¿Agregar enfermedad?',
          text: "Una vez agregada no se podrá cambiar.",
          showCancelButton: true,
          confirmButtonText: 'Agregar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#20a8d8',
          cancelButtonColor: '#f86c6b',
          reverseButtons: true
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.loadingText = 'Cargando...';
            this.spinner.show('sample');
            let datos;
            datos = {
              'enfermedad':this.NuevaEnfermedad,
            }

            this.medicinag.AgregarEnfermedad(datos).then(data =>{
              this.valor = data['id'];
              this.data.push({ "id": this.valor, "name":this.NuevaEnfermedad});
              this.confirma=true;
              this.pase=true;
              this.spinner.hide('sample');
              Swal.fire('¡Enfermedad Agregada..!', '', 'success')

            }).catch((error) => {
              console.log(error);
              this.spinner.hide('sample');
              this.rutas.navigate(['/500']);
            });


          } else if (result.isDenied) {
            Swal.fire('¡Se ha cancelado!', '', 'error')
          }
        })


      }else{
        Swal.fire({
          icon: 'error',
          title: '¡Ya existe..!',
          text: 'Esta enfermedad ya se encuentra registrada.'
        })
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: '¡Campo vacío..!',
        text: 'Ingrese el nombre de la enfermedad a registrar.'
      })
    }

    console.log(this.NuevaEnfermedad);

  }


  IngresarConsulta(){
    this.loadingText = 'Guardando...';
    this.spinner.show('sample');
    

    let data;
    let cert=0;
    if(this.certificado==true){
      cert=1;
    }

       data = {
        'id_enfermedad':this.valor,
        'id_paciente':this.idPaciente,
        'a_enfermedad':this.antecedentes_enfermedad,
        'fecha': this.fechaActual,
        'motivo_consulta':this.motivo,
        'tipo_atencion':this.tipo_atencion,
        'condicion_diagnostico': this.condicion_diagnostico,
        'diagnostico': this.diagnostico,
        'plan_terapeutico': this.plan_terapeutico,
        'lugar_atencion': this.lugar_atencion,
        'certificado': cert,
        'edad':this.edadR
      }


    this.eliminarCita(this.idCitas);


    this.medicinag.AgregarConsulta(data).then(data =>{

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


}

export class CollapseDemoComponent {
  isCollapsed = false;
}
