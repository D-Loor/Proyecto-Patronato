import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';

@Component({
  selector: 'app-medicina-general-datos-pacientes',
  templateUrl: './medicina-general-datos-pacientes.component.html',
  styleUrls: ['./medicina-general-datos-pacientes.component.scss']
})
export class MedicinaGeneralDatosPacientesComponent implements OnInit {

  constructor() {  }

  edad;
  isCollapsed = false;
  isCollapsed2 = false;
  isCollapsed3 = false;
  isCollapsed4 = false;
  isCollapsed5 = false;
  isCollapsed6 = false;
  isCollapsed7 = false;
  Ver: boolean = true;
  Ocultar: boolean = false;
  Ver2: boolean = true;
  Ocultar2: boolean = false;
  Ver3: boolean = true;
  Ocultar3: boolean = false;
  EstadoVida: boolean = true;
  nombres:string;
  estado:string;
  estadoT:string;
  union:string;
  union2:string;
  number: number = 0;
  DatosFamiliares: any = [];

  public sidebarMinimized = false;
  public navItems = navItems;

  
  


  ngOnInit(): void {
  }
  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  funcionVer(){
    this.Ocultar = false;
    this.Ver = false;
  }
  funcionOcultar(){
    this.Ver = true;
    this.Ocultar = true;
  }

  funcionVer2(){
    this.Ocultar2 = false;
    this.Ver2 = false;
  }
  funcionOcultar2(){
    this.Ver2 = true;
    this.Ocultar2 = true;
  }
  funcionVer3(){
    this.Ocultar3 = false;
    this.Ver3 = false;
  }
  funcionOcultar3(){
    this.Ver3 = true;
    this.Ocultar3 = true;
  }
  vidaVer(){
    this.EstadoVida = true;
  }
  vidaOcultar(){
    this.EstadoVida = false;
  }

  LlenarArray(){
    this.number ++;
    if(this.union == "Otro"){
      this.union = this.union2;
    }
    if(this.estadoT == null || this.estadoT== ""){
      this.estadoT = "Sin causas";
    }
    let DatosFamiliares2 = [
      {
          "nombresF": this.nombres,
          "unionF": this.union,
          "estadoF": this.estado,
          "causasF":this.estadoT,
      }];
      this.DatosFamiliares.push(DatosFamiliares2);
  }

  EliminarDatosArray(elimina:string){
    this.DatosFamiliares.splice(this.DatosFamiliares.indexOf(dato => dato.nombresF === elimina), 1);
    this.number --;
  }
  
  

}
