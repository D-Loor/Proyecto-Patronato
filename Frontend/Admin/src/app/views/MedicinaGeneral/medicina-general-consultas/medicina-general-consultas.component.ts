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
  enfermedadesC:any[];
  data = [
    {
      id: 1,
      name: 'Usa'
    },
    {
      id: 2,
      name: 'England'
    }
 ];

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

  debugger
    // Obteniendo todas las claves del JSON
  for (var clave in this.enfermedades){
    // Controlando que json realmente tenga esa propiedad
    if (this.enfermedades.hasOwnProperty(clave)) {
      // Mostrando en pantalla la clave junto a su valor
      alert("La clave es " + clave+ " y el valor es " + this.enfermedades[clave]);
    }
  }

  }

}

export class CollapseDemoComponent {
  isCollapsed = false;
}
