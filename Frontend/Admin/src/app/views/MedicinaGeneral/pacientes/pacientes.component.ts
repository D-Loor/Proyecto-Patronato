import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import {ActivatedRoute, Router} from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  constructor(public medicina_general:MedicinaGeneralService, public rutas:Router) { }

  @ViewChild('Principal') public Principal: ModalDirective;
  public sidebarMinimized = false;
  public navItems = navItems;
  search="";
  pacien="";
  dataFechaFiltro;
  pacientesMG:any[];//variable para el paginado
  pacientesMGPaginate:any[];//variable para el paginado
  pacientesMGFilter=[];//variable para el paginado sin el pipe
  pacientesMGPaginateFilter=[];//variable para el paginado sin el pipe
  apellidos:string; nombres:string; cedula:string; edad:string; ocupacion:string; nivel_instruccion:string; estado_civil:string;
  sexo:string; Lresidencia:string; Lprocedencia:string; fechanacimiento:string; raza:string; religion:string; alcoholT:string;
  tabacoT:string; drogasT:string; alimentacionT:string; diuresisT:string; somniaT:string;
  ngOnInit(): void {
    this.cargar();
  }

  cargar(){
    this.medicina_general.pacientes().then(data =>{
    this.pacientesMG=data['result'];
    this.pacientesMGPaginate = this.pacientesMG.slice(0, 10);
  }).catch(error =>{
    console.log(error);
});

  }


  dataPaginate(event){//Función para el filtrado con paginado sin los pipes
    this.pacientesMGFilter=[];
      this.pacientesMGPaginateFilter=[];
    if(this.search==''){
    }else{
      for (const x of this.pacientesMG) {

        if(x.cedula.indexOf(this.search)> -1){
         this.pacientesMGFilter.push(x);
       };
      };
      this.pacientesMGPaginateFilter = this.pacientesMGFilter.slice(0, 10);
    }
    
  }

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pacientesMGPaginate = this.pacientesMG.slice(startItem, endItem);
  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.pacientesMGPaginateFilter = this.pacientesMGFilter.slice(startItem, endItem);
  }

  ngOnDestroy(): void{
    this.pacientesMG = null;
    this.pacientesMGPaginate = null;
  }
  
  DatosPaciente(id_paciente:string){
    this.Principal.show();
    this.medicina_general.PacientesAntecedentes(id_paciente).then(data =>{
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
});
  }

}
