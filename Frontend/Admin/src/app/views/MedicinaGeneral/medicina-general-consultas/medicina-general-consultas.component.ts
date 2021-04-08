import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicina-general-consultas',
  templateUrl: './medicina-general-consultas.component.html',
  styleUrls: ['./medicina-general-consultas.component.scss']
})
export class MedicinaGeneralConsultasComponent implements OnInit {

  constructor() { }
  isCollapsed = false;
  presun=false;
  defini=false;
  ngOnInit(): void {
  }

  funcionPreventivo(){
    this.presun=true;
    this.defini=false;
  }
  funcionDefinitivo(){
    this.presun=false;
    this.defini=true;
  }

}
export class CollapseDemoComponent {
  isCollapsed = false;
}
