import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { PacientesService } from '../../../servicios/pacientes.service';
import {ActivatedRoute, Router} from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'app-medicina-general',
  templateUrl: './medicina-general.component.html',
  styleUrls: ['./medicina-general.component.scss']
})
export class MedicinaGeneralComponent implements OnInit {

  constructor(public pacientes:PacientesService, public rutas:Router) { }

  data
  isCollapsed2 = false;
  isCollapsed = false;

  public sidebarMinimized = false;
  public navItems = navItems;

  pacientesTotal:any[];
  pacientesTotalTotal:any[];
  ngOnInit(): void {
    this.cargar();
  }

  getHClinica(event){
    debugger
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
