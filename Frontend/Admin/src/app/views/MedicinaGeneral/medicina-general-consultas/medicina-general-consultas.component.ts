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
  salida:"No se encontró..";
  public enferme='name';
  enfermedades: any[];
  
  ngOnInit(): void {
    this.cargar();
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
    
    }).catch(error =>{
      console.log(error);
  });
 
    
  }

}

export class CollapseDemoComponent {
  isCollapsed = false;
}
