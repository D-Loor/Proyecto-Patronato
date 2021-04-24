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
  historialMGFilter=[];
  historialMGPaginateFilter=[];
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

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes
    this.historialMGFilter=[];
      this.historialMGPaginateFilter=[];
    if(this.search==''){
    }else{
      for (const x of this.historialMG) {

        if(x['paciente'].cedula.indexOf(this.search)> -1){
         this.historialMGFilter.push(x);
       };
      };
      this.historialMGPaginateFilter = this.historialMGFilter.slice(0, 10);
    }
    
  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.historialMGPaginateFilter = this.historialMGFilter.slice(startItem, endItem);
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
