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
  @ViewChild('DatosAfiliacion') public DatosAfiliacion: ModalDirective;
  @ViewChild('AntecedentesPersonales') public AntecedentesPersonales: ModalDirective;
  @ViewChild('AntecedentesFamiliares') public AntecedentesFamiliares: ModalDirective;
  @ViewChild('HabitosPersonales') public HabitosPersonales: ModalDirective;
  @ViewChild('ExamenesFisicos') public ExamenesFisicos: ModalDirective;
  @ViewChild('ExamenesOrganos') public ExamenesOrganos: ModalDirective;
  @ViewChild('ExamenesComplementarios') public ExamenesComplementarios: ModalDirective;

  

  

  public sidebarMinimized = false;
  public navItems = navItems;
  search="";
  dataFechaFiltro;
  pacientes:any[];
  pacientesTotal:any[];
  ngOnInit(): void {
    this.cargar();
  }
 
  cargar(){this.medicina_general.historiasClinicasMg().then(data =>{
    this.pacientes=data['result'];
    this.pacientesTotal = this.pacientes.slice(0, 10);
    debugger
  }).catch(error =>{
    console.log(error);
});

  }
  
  fechaFiltre(event){
    this.dataFechaFiltro;
    debugger
  }

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pacientesTotal = this.pacientes.slice(startItem, endItem);
    debugger
  }

  ngOnDestroy(): void{
    debugger
    this.pacientes = null;
    this.pacientesTotal = null;
  }

}
