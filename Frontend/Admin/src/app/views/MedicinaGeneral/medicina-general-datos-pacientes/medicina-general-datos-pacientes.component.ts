import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';

@Component({
  selector: 'app-medicina-general-datos-pacientes',
  templateUrl: './medicina-general-datos-pacientes.component.html',
  styleUrls: ['./medicina-general-datos-pacientes.component.scss']
})
export class MedicinaGeneralDatosPacientesComponent implements OnInit {

  constructor() { }

  
  isCollapsed = false;
  isCollapsed2 = false;
  isCollapsed3 = true;
  Ver: boolean=false;

  public sidebarMinimized = false;
  public navItems = navItems;

  ngOnInit(): void {
  }
  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  VerFunction(){
    this.Ver=!this.Ver;
  }
}