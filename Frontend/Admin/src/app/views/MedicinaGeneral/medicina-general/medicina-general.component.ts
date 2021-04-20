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
  apellidos:string; nombres:string; cedula:string; edad:string; ocupacion:string; nivel_instruccion:string; estado_civil:string;
  sexo:string; Lresidencia:string; Lprocedencia:string; fechanacimiento:string; raza:string; religion:string;



 
  historialMG:any[];
  historialMGPaginate:any[];

  ngOnInit() {
    this.cargar();
  }

  cargar(){
    this.medicina_general.historiasClinicasMg().then(data =>{
    this.historialMG=data['result']['data'];
    this.historialMGPaginate = this.historialMG.slice(0, 10);
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
    this.historialMG = null;
    this.historialMGPaginate = null;
  }
  
  DatosPaciente(cedula:string){
    this.Principal.show();
    this.medicina_general.PacientesAntecedentes(cedula).then(data =>{
    this.apellidos=data['result'].apellidos;
    this.nombres=data['result'].nombres;
    this.cedula=data['result'].cedula;
    this.edad=data['result'].edad;
    this.ocupacion=data['result'].ocupacion;
    this.sexo=data['result'].sexo;
    this.Lresidencia=data['result'].residencia;
    this.Lprocedencia=data['result'].procedencia;
    this.fechanacimiento=data['result'].fecha_nacimiento;
    this.raza=data['result'].raza;
    this.religion=data['result'].religion;
    this.nivel_instruccion=data['result'].nivel_instruccion;
    this.estado_civil=data['result'].estado_civil;

  }).catch(error =>{
    console.log(error);
});
  }

}
