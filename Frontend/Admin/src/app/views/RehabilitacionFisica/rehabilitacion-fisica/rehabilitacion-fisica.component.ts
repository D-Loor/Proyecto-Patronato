import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import {ActivatedRoute, Router} from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { RehabilitacionFisicaService } from '../../../servicios/rehabilitacion-fisica.service';

@Component({
  selector: 'app-rehabilitacion-fisica',
  templateUrl: './rehabilitacion-fisica.component.html',
  styleUrls: ['./rehabilitacion-fisica.component.scss']
})
export class RehabilitacionFisicaComponent implements OnInit {

  constructor(public historial:RehabilitacionFisicaService, public rutas:Router) { }


  public sidebarMinimized = false;
  public navItems = navItems;
  search="";
  
  pacientesTotal:any[];
  pacientesTotalTotal:any[];
  ngOnInit(): void {
    this.cargar();
  }

  cargar(){this.historial.historialrf().then(data =>{
    debugger
    this.pacientesTotal=data['result']['data'];
    this.pacientesTotalTotal = this.pacientesTotal.slice(0, 10);
    debugger
  }).catch(error =>{
    console.log(error);
});

  }




  pageChanged(event: PageChangedEvent): void {

    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;

    const endItem = event.page * event.itemsPerPage;

    this.pacientesTotalTotal = this.pacientesTotal.slice(startItem, endItem);

  }

  ngOnDestroy(): void{

    this.pacientesTotal = null;
    this.pacientesTotalTotal = null;
  }

}
