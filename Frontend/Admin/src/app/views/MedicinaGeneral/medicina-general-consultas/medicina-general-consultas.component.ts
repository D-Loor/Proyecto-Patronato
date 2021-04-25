import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import Swal from 'sweetalert2';
import { CitasService } from '../../../servicios/citas.service';

@Component({
  selector: 'app-medicina-general-consultas',
  templateUrl: './medicina-general-consultas.component.html',
  styleUrls: ['./medicina-general-consultas.component.scss']
})
export class MedicinaGeneralConsultasComponent implements OnInit {

  constructor(public medicinag:MedicinaGeneralService, public rutas:Router,public citasser:CitasService) { }
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
  diagnostico='';
  plan_terapeutico='';
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
  tipo="Dianóstico";

  ngOnInit(): void {
    this.cargar();
    this.CargarDatos();
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();

  }



  funcionPreventivo(){
    this.tipo="Dianóstico Presuntivo";
  }
  funcionDefinitivo(){
    this.tipo="Dianósticos Diferenciales";
  }



  cargar(){
      this.medicinag.enfermedad().then(data =>{
      this.enfermedades=data['result'];

      this.completar();
    }).catch(error =>{
      console.log(error);
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
      this.nombres = data['result'].nombres + '' +data['result'].apellidos;
      this.cedula = data['result'].cedula;
      this.idPaciente=data['result'].id_paciente;
      this.edad = data['result'].edad;
      this.gad = data['result'].gad;
      if(this.gad==1)
       this.gadv="Miembro activo";
      else
        this.gadv="No consta como miembro activo";
    })
    .catch((error) => {
      console.log(error);
    });
  }

  selectEvent(item) {
    this.valor=item.id;
    this.confirma=true;
    this.pase=true;
  }

  onChangeSearch(){
    this.confirma=false;
    this.pase=false;
  }

  notificacion(){

    if(this.pase==false){
      Swal.fire(
        'Advertencia!',
        'La enfermedad no se encuentra registrada.',
        'warning'
      )
    }
    else{
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
  }

  eliminarCita(id:string) {
    this.citasser.elicitas(id).then(data => {
      this.rutas.navigate(['/medicinageneralcitas']);
      })
      .catch((error) => {
        console.log(error);
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
            let datos;
            datos = {
              'enfermedad':this.NuevaEnfermedad,
            }

            this.medicinag.AgregarEnfermedad(datos).then(data =>{
              this.valor = data['id'];
              this.data.push({ "id": this.valor, "name":this.NuevaEnfermedad});
              this.confirma=true;
              this.pase=true;
              Swal.fire('¡Enfermedad agregada!', '', 'success')

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

    let data;
    let cert=0;
    if(this.certificado==true){
      cert=1;
    }
     if(this.gad==0){
      data = {
        'id_enfermedad':this.valor,
        'id_paciente':this.idPaciente,
        'a_enfermedad':this.antecedentes_enfermedad,
        'fecha': this.fechaActual,
        'motivo_consulta':this.motivo,
        'tipo_atencion':this.tipo_atencion,
        'condicion_diagnostico': 'Presuntivo',
        'diagnostico': 'No admite',
        'plan_terapeutico': 'No admite',
        'lugar_atencion': this.lugar_atencion,
        'certificado': cert,
      }
     }else{
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
      }
     }
    this.eliminarCita(this.idCitas);


    this.medicinag.AgregarConsulta(data).then(data =>{

    });
  }


}

export class CollapseDemoComponent {
  isCollapsed = false;
}
