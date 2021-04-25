import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';

@Component({
  selector: 'app-medicina-general-consultas',
  templateUrl: './medicina-general-consultas.component.html',
  styleUrls: ['./medicina-general-consultas.component.scss']
})
export class MedicinaGeneralConsultasComponent implements OnInit {

  constructor(public medicinag:MedicinaGeneralService, public rutas:Router) { }
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
  gad;
  gadv;
  today = new Date();
  fechaActual;

  ngOnInit(): void {
    this.cargar();
    this.CargarDatos();
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();

  }



  funcionPreventivo(){
    this.presun=true;
    this.defini=false;
  }
  funcionDefinitivo(){
    this.presun=false;
    this.defini=true;
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
  }

  IngresarConsulta(){
    
    let data = {
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
      'certificado': true,
    }
    debugger
    this.medicinag.AgregarConsulta(data).then(data =>{

    });
  }

}

export class CollapseDemoComponent {
  isCollapsed = false;
}
