import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { PacientesService } from '../../../servicios/pacientes.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-medicina-general',
  templateUrl: './medicina-general.component.html',
  styleUrls: ['./medicina-general.component.scss']
})
export class MedicinaGeneralComponent implements OnInit {

  constructor(public pacientes:PacientesService, public rutas:Router) { }


  isCollapsed2 = false;
  isCollapsed = false;

  public sidebarMinimized = false;
  public navItems = navItems;

  pacientesTotal:any[];
  ngOnInit(): void {
    this.pacientes.pacientes().then(data =>{
      this.pacientesTotal=data['result'];
    }).catch(error =>{
      console.log(error);
  });
  }

}
