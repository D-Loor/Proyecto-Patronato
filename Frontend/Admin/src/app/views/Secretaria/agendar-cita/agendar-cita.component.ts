import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss']
})
export class AgendarCitaComponent implements OnInit {

  constructor() { }


  isCollapsed = false;
  public sidebarMinimized = false;
  public navItems = navItems;
  ngOnInit(): void {
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

}
