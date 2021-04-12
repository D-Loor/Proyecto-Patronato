import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { PacientesService } from '../../../servicios/pacientes.service';
import {ActivatedRoute, Router} from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  constructor(public pacientes:PacientesService, public rutas:Router) { }


  isCollapsed2 = false;
  isCollapsed = false;

  public sidebarMinimized = false;
  public navItems = navItems;
  search="";
  dataFechaFiltro;
  pacientesTotal:any[];
  pacientesTotalTotal:any[];
  ngOnInit(): void {
    this.cargar();
  }

  cargar(){this.pacientes.pacientes().then(data =>{
    this.pacientesTotal=data['result'];
    debugger
    this.pacientesTotalTotal = this.pacientesTotal.slice(0, 10);
    debugger
  }).catch(error =>{
    console.log(error);
});

  }

  fechaFiltre(event){
    this.dataFechaFiltro;
    debugger
  }

  pageChanged(event: PageChangedEvent): void {
    debugger
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    debugger
    const endItem = event.page * event.itemsPerPage;
    debugger
    this.pacientesTotalTotal = this.pacientesTotal.slice(startItem, endItem);
    debugger
  }

  ngOnDestroy(): void{
    debugger
    this.pacientesTotal = null;
    this.pacientesTotalTotal = null;
  }

}
