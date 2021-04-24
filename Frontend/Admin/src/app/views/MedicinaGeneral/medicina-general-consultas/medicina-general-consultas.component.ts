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
  enferme='name';

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
      console.log(this.data);
    }

  }

  CargarDatos(){
    let cedula = localStorage.getItem('cedulaMG');
    this.medicinag.AtenderPaciente(cedula).then(data => {
      this.nombres = data['result'].nombres + '' +data['result'].apellidos;
      this.cedula = data['result'].cedula;
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

  IngresarConsulta(){
    var id;
    for (let item of this.enfermedades){
      debugger
      if(this.enferme==item['enfermedad']){
        id=item['id_enfermedad'];
      }
    }

    let data = {
      'id_enfermedad':id,
      'a_enfermedad':this.antecedentes_enfermedad,
      'fecha': this.fechaActual,
      'motivo_consulta':this.motivo,
      'tipo_atencion':this.tipo_atencion,
      'condicion_diagnostico': this.condicion_diagnostico,
      'diagnostico': this.diagnostico,
      'plan_terapeutico': this.plan_terapeutico,
      'lugar_atencion': this.lugar_atencion,
      'certificado': this.certificado,
    }
    this.medicinag.AgregarConsulta(data).then(data =>{

    });
  }

}

export class CollapseDemoComponent {
  isCollapsed = false;
}
