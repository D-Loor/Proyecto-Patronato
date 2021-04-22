import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import {ActivatedRoute, Router} from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { RehabilitacionFisicaService } from '../../../servicios/rehabilitacion-fisica.service';
import { ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-rehabilitacion-fisica',
  templateUrl: './rehabilitacion-fisica.component.html',
  styleUrls: ['./rehabilitacion-fisica.component.scss']
})
export class RehabilitacionFisicaComponent implements OnInit {

  constructor(public historial:RehabilitacionFisicaService, public rutas:Router) { }


  public sidebarMinimized = false;
  public navItems = navItems;
  search="";
  historialRF:any[];
  historialRFPaginate:any[];
  @ViewChild('Principal') public Principal: ModalDirective;
  ngOnInit(): void {
    this.cargar();
  }

  cargar(){this.historial.historialrf().then(data =>{
    this.historialRF=data['result'];
    this.historialRFPaginate = this.historialRF.slice(0, 10);
  }).catch(error =>{
    console.log(error);
});

  }




  pageChanged(event: PageChangedEvent): void {

    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;

    const endItem = event.page * event.itemsPerPage;

    this.historialRFPaginate = this.historialRF.slice(startItem, endItem);

  }

  ngOnDestroy(): void{

    this.historialRFPaginate = null;
    this.historialRF = null;
  }
  DatosPaciente(id_paciente:string){
    this.Principal.show();
    /* this.medicina_general.PacientesAntecedentes(id_paciente).then(data =>{
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
    this.alcoholT=data['result']['habitos']['0'].alcohol;
    this.tabacoT=data['result']['habitos']['0'].tabaco;
    this.drogasT=data['result']['habitos']['0'].drogas;
    this.alimentacionT=data['result']['habitos']['0'].alimentacion;
    this.diuresisT=data['result']['habitos']['0'].diuresis;
    this.somniaT=data['result']['habitos']['0'].somnia;

  }).catch(error =>{
    console.log(error);
}); */
  }

}
