import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import {CitasService} from '../../../servicios/citas.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-medicina-general-citas',
  templateUrl: './medicina-general-citas.component.html',
  styleUrls: ['./medicina-general-citas.component.scss']
})
export class MedicinaGeneralCitasComponent implements OnInit {


  constructor(public citas:CitasService, public rutas:Router) { }

  isCollapsed2 = false;
  isCollapsed = false;

  public sidebarMinimized = false;
  public navItems = navItems;
  citasTotal:any[];
  ngOnInit(): void {
    this.citas.citas().then(data =>{
      this.citasTotal=data['result'];
    }).catch(error =>{
      console.log(error);
  });
    
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

}
