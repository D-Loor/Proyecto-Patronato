import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {

  constructor(public rehabilifacionF:MedicinaGeneralService, public rutas:Router) { }

  isCollapsed = false;
  public sidebarMinimized = false;
  public navItems = navItems;
  nombres:string; ocupacion:string; edad:string;
  ngOnInit(): void {
    this.CargarDatos();
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  CargarDatos(){
    let cedula = localStorage.getItem('cedulaRF');
    this.rehabilifacionF.AtenderPaciente(cedula).then(data => {      
      this.nombres = data['result'].nombres + '' +data['result'].apellidos;
      this.ocupacion = data['result'].ocupacion;
      this.edad = data['result'].edad;
    })
    .catch((error) => {
      console.log(error);
    });
  }

}


