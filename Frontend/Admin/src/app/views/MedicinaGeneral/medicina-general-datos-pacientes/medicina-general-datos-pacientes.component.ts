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
  Ver: boolean = true;
  Ocultar: boolean = false;
  Ver2: boolean = true;
  Ocultar2: boolean = false;
  Ver3: boolean = true;
  Ocultar3: boolean = false;

  public sidebarMinimized = false;
  public navItems = navItems;

  ngOnInit(): void {
  }
  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
    funcionVer(){
      this.Ocultar = false;
      this.Ver = false;
  }
  funcionOcultar(){
      this.Ver = true;
      this.Ocultar = true;
  }

  funcionVer2(){
      this.Ocultar2 = false;
      this.Ver2 = false;
  }
  funcionOcultar2(){
      this.Ver2 = true;
      this.Ocultar2 = true;
  }
    funcionVer3(){
      this.Ocultar3 = false;
      this.Ver3 = false;
  }
  funcionOcultar3(){
      this.Ver3 = true;
      this.Ocultar3 = true;
  }
  

}
