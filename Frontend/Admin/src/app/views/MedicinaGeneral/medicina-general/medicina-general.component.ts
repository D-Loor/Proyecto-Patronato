import { Component, OnInit, ViewChild } from '@angular/core';
import { navItems } from '../../../_nav';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import {ActivatedRoute, Router} from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import {ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-medicina-general',
  templateUrl: './medicina-general.component.html',
  styleUrls: ['./medicina-general.component.scss']
})
export class MedicinaGeneralComponent implements OnInit {

  constructor(public medicina_general:MedicinaGeneralService, public rutas:Router) { }


  @ViewChild('Principal') public Principal: ModalDirective;


  public sidebarMinimized = false;
  public navItems = navItems;
  search="";

  isCollapsed = false;
  isCollapsed2 = false;
  isCollapsed3 = false;
  isCollapsed4 = false;
  isCollapsed5 = false;
  isCollapsed6 = false;
  isCollapsed7 = false;



 
  historialMG:any[];
  historialMGPaginate:any[];

  ngOnInit(): void {
    this.cargar();
  }

  cargar(){this.medicina_general.historiasClinicasMg().then(data =>{
    this.historialMG=data['result']['data'];
    this.historialMGPaginate = this.historialMG.slice(0, 10);
    debugger
  }).catch(error =>{
    console.log(error);
});

  }



  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.historialMGPaginate = this.historialMG.slice(startItem, endItem);
    debugger
  }

  ngOnDestroy(): void{
    debugger
    this.historialMG = null;
    this.historialMGPaginate = null;
  }

}
