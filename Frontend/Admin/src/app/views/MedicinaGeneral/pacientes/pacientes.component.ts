import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import {ActivatedRoute, Router} from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  constructor(public medicina_general:MedicinaGeneralService, public rutas:Router) { }

 
  public sidebarMinimized = false;
  public navItems = navItems;
  search="";
  pacien="";
  dataFechaFiltro;
  pacientesMG:any[];//variable para el paginado
  pacientesMGPaginate:any[];//variable para el paginado
  pacientesMGFilter=[];//variable para el paginado sin el pipe
  pacientesMGPaginateFilter=[];//variable para el paginado sin el pipe
  ngOnInit(): void {
    this.cargar();
  }

  cargar(){
    this.medicina_general.pacientes().then(data =>{
    debugger
    this.pacientesMG=data['result'];
    this.pacientesMGPaginate = this.pacientesMG.slice(0, 10);
    debugger
  }).catch(error =>{
    console.log(error);
});

  }


  dataPaginate(event){//Función para el filtrado con paginado sin los pipes
    this.pacientesMGFilter=[];
      this.pacientesMGPaginateFilter=[];
    if(this.search==''){
      debugger
    }else{
      for (const x of this.pacientesMG) {

        if(x.cedula.indexOf(this.search)> -1){
         this.pacientesMGFilter.push(x);
       };
      };
      this.pacientesMGPaginateFilter = this.pacientesMGFilter.slice(0, 10);
      debugger
    }
    
  }

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pacientesMGPaginate = this.pacientesMG.slice(startItem, endItem);
    debugger
  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pacientesMGPaginateFilter = this.pacientesMGFilter.slice(startItem, endItem);
  }

  ngOnDestroy(): void{
    debugger
    this.pacientesMG = null;
    this.pacientesMGPaginate = null;
  }

}
