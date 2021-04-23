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
  public enferme='name';
  enfermedades: any[];
  data = [];
  nombres:string; cedula:string; edad:string; gad:string;

  ngOnInit(): void {
    this.cargar();
    this.CargarDatos();
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
    })
    .catch((error) => {
      console.log(error);
    });
  }

}

export class CollapseDemoComponent {
  isCollapsed = false;
}
