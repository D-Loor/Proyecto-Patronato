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
  pacientesMG:any[];
  pacientesMGPaginate:any[];
  ngOnInit(): void {
    this.cargar();
  }

  cargar(){this.medicina_general.pacientes().then(data =>{
    this.pacientesMG=data['result'];
    this.pacientesMGPaginate = this.pacientesMG.slice(0, 10);
    debugger
  }).catch(error =>{
    console.log(error);
});

  }

  fechaFiltre(event){
    this.pacien;
    debugger
  }

  dataPaginate(event){
    this.pacien;
    debugger
  }

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pacientesMGPaginate = this.pacientesMG.slice(startItem, endItem);
    debugger
  }

  pageChangedFiltro(event: PageChangedEvent,pacientesFiltro:any[]) :void{
    pacientesFiltro;
    debugger
  }

  ngOnDestroy(): void{
    debugger
    this.pacientesMG = null;
    this.pacientesMGPaginate = null;
  }

}
