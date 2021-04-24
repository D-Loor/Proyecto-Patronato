import { Component, OnInit, ViewChild } from '@angular/core';
import { navItems } from '../../../_nav';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { VariableAst, VariableBinding } from '@angular/compiler';
@Component({
  selector: 'app-medicina-general',
  templateUrl: './medicina-general.component.html',
  styleUrls: ['./medicina-general.component.scss']
})
export class MedicinaGeneralComponent implements OnInit {

  constructor(public medicina_general:MedicinaGeneralService, public rutas:Router) { }

  @ViewChild('DatosdeConsultas') public DatosdeConsultas: ModalDirective;
  public sidebarMinimized = false;
  public navItems = navItems;
  search="";
  historialMG:any[];
  historialMGPaginate:any[];
  historialMGFilter=[];
  historialMGPaginateFilter=[];
  gad;
  NPaciente="";
  Fecha="";
  motivo;
  enfermedades;
  lugar_atencion;
  condicion_diagnostico;
  tipo_atencion;
  antecedentes_enfermedad;
  diagnostico;
  diagno;
  plan_terapeutico;
  certificado;

  ngOnInit() {
    this.cargar();
  }

  cargar(){
    this.medicina_general.historiasClinicasMg().then(data =>{
    this.historialMG=data['result'];
    this.historialMGPaginate = this.historialMG.slice(0, 10);
  }).catch(error =>{
    console.log(error);
  });

  }

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes
    this.historialMGFilter=[];
      this.historialMGPaginateFilter=[];
    if(this.search==''){
    }else{
      for (const x of this.historialMG) {

        if(x['paciente'].cedula.indexOf(this.search)> -1){
         this.historialMGFilter.push(x);
       };
      };
      this.historialMGPaginateFilter = this.historialMGFilter.slice(0, 10);
    }

  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.historialMGPaginateFilter = this.historialMGFilter.slice(startItem, endItem);
  }

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.historialMGPaginate = this.historialMG.slice(startItem, endItem);
  }

  ngOnDestroy(): void{
    this.historialMG = null;
    this.historialMGPaginate = null;
  }



  DatosConsulta(arreglo:[]){

    var paciente=arreglo['paciente'];
    var enferme=arreglo['enfermedad'];
    this.NPaciente=paciente['nombres']+" "+paciente['apellidos'];
    this.Fecha=arreglo['fecha'];
    this.gad =paciente['gad'];

    this.lugar_atencion=arreglo['lugar_atencion'];
    this.tipo_atencion=arreglo['tipo_atencion'];
    this.motivo=arreglo["motivo_consulta"];
    this.lugar_atencion=arreglo['lugar_atencion'];
    this.condicion_diagnostico=arreglo['condicion_diagnostico'];
    this.plan_terapeutico=arreglo['plan_terapeutico'];

    if(arreglo['condicion_diagnostico']=="Presuntivo"){
      this.diagnostico=arreglo['diagnostico_presuntivo'];
      this.diagno="Diagnóstio Presuntivo";
    }else{
      this.diagnostico=arreglo['diagnostico_diferencial'];
      this.diagno="Diagnóstio Diferencial";
    }

    if(arreglo['certificado']==1){
      this.certificado="Se entregó certificado al paciente.";
    }else
      this.certificado="No se entregó certificado al paciente.";


      this.enfermedades=enferme['enfermedad'];
      debugger


    this.antecedentes_enfermedad=enferme['enfermedad'];


    this.DatosdeConsultas.show();
  }


}
