import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicina-general-consultas',
  templateUrl: './medicina-general-consultas.component.html',
  styleUrls: ['./medicina-general-consultas.component.scss']
})
export class MedicinaGeneralConsultasComponent implements OnInit {

  constructor() { }
  isCollapsed = false;
  ngOnInit(): void {
  }

}
export class CollapseDemoComponent {
  isCollapsed = false;
}
