import { Component, OnInit, ViewChild } from '@angular/core';
import { navItems } from '../../../_nav';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import {ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-medicina-general',
  templateUrl: './medicina-general.component.html',
  styleUrls: ['./medicina-general.component.scss']
})
export class MedicinaGeneralComponent implements OnInit {

  constructor(public medicina_general:MedicinaGeneralService, public rutas:Router) { }

  @ViewChild('DatosdeConsultas') public DatosdeConsultas: ModalDirective;
  public sidebarMinimized = false;
  public navItems = navItems;
  search=""; 
  historialMG:any[];
  historialMGPaginate:any[];
  gad:string;

  ngOnInit() {
    this.cargar();
  }

  cargar(){
    this.medicina_general.historiasClinicasMg().then(data =>{
    this.historialMG=data['result'];
    this.historialMGPaginate = this.historialMG.slice(0, 10);
  }).catch(error =>{
    console.log(error);
});

  }



  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.historialMGPaginate = this.historialMG.slice(startItem, endItem);
  }

  ngOnDestroy(): void{
    this.historialMG = null;
    this.historialMGPaginate = null;
  }
  
  DatosConsulta(gad:string){
    this.gad = gad;
    this.DatosdeConsultas.show();
  }
  

}
