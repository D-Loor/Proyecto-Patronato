import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import {ActivatedRoute, Router} from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SecretariaService } from '../../../servicios/secretaria.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  constructor(public medicina_general:MedicinaGeneralService, public rutas:Router, private ServicioSecretaria:SecretariaService) { }

  @ViewChild('Principal') public Principal: ModalDirective;
  public sidebarMinimized = false;
  public navItems = navItems;
  search="";
  pacien="";
  edit=1;
  dataFechaFiltro;
  pacientesMG:any[];//variable para el paginado
  pacientesMGPaginate:any[];//variable para el paginado
  pacientesMGFilter=[];//variable para el paginado sin el pipe
  pacientesMGPaginateFilter=[];//variable para el paginado sin el pipe
  APF:any[];
  
  apellidos:string; nombres:string; cedula:string; edad:string; ocupacion:string; nivel_instruccion:string; estado_civil:string;
  sexo:string; Lresidencia:string; Lprocedencia:string; fechanacimiento:string; raza:string; religion:string; alcoholT:string;
  tabacoT:string; drogasT:string; alimentacionT:string; diuresisT:string; somniaT:string; ninezT:string; adolescenciaT:string;
  adultezT:string; quirurgicosT:string; alergicosT:string; traumatologicosT:string; fum:string; fpp:string; edad_gestional:string;
  menarquia:string; flujo_genital:string; Gestas:string; Partos:string; abortos:string; cesareas:string; DBT:string; HTA:string; TBC:string;
  GEMELAR:string; examen_cabezaT:string; examen_cuelloT:string; examen_toraxT:string; examen_abdomenT:string; examen_msuperiorT:string; examen_minferioresT:string;
  examen_genitalT:string; examen_analT:string; examen_digestivoT:string; examen_respiratorioT:string; examen_cardiacoT:string; examen_genitourinarioT:string; examen_osteomuscularT:string; 
  examen_nerviosoT:string; examen_laboratorioT:string; examen_electrocardiogramaT:string; examen_RToraxT:string; examen_otrosT:string; gad:string;

  idPaciente:string; idPatologico:string; idEFisico:string; idEOrganoSistema:string; idEComplementario:string; idHabito:string; 

  isCollapsed = false;
  isCollapsed2 = false;
  isCollapsed3 = false;
  isCollapsed4 = false;
  isCollapsed5 = false;
  isCollapsed6 = false;
  isCollapsed7 = false;
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

  inputEdit(){//editar los input (abilitarlos) 
    this.edit=0;
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
    this.edit=1;
    this.medicina_general.PacientesAntecedentes(id_paciente).then(data =>{
    debugger
    this.idPaciente=data['result'].id_paciente;
    this.idPatologico=data['result'].id_patologico;
    this.idEFisico=data['result'].id_e_fisico;
    this.idEOrganoSistema=data['result'].id_e_organo_sistema;
    this.idEComplementario=data['result'].id_e_complementario;
    this.idHabito=data['result'].id_habito;
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
    this.gad=data['result'].gad;

    this.alcoholT=data['result']['habitos'].alcohol;
    this.tabacoT=data['result']['habitos'].tabaco;
    this.drogasT=data['result']['habitos'].drogas;
    this.alimentacionT=data['result']['habitos'].alimentacion;
    this.diuresisT=data['result']['habitos'].diuresis;
    this.somniaT=data['result']['habitos'].somnia;
    

    this.ninezT=data['result']['antecedentes_patologicos_personales'].infancia;
    this.adolescenciaT=data['result']['antecedentes_patologicos_personales'].adolecencia;
    this.adultezT=data['result']['antecedentes_patologicos_personales'].adultez;
    this.DBT=data['result']['antecedentes_patologicos_personales'].DBT;
    this.HTA=data['result']['antecedentes_patologicos_personales'].HTA;
    this.TBC=data['result']['antecedentes_patologicos_personales'].TBC;
    this.GEMELAR=data['result']['antecedentes_patologicos_personales'].GEMELAR;
    this.quirurgicosT=data['result']['antecedentes_patologicos_personales'].quirujircos;
    this.alergicosT=data['result']['antecedentes_patologicos_personales'].alergias;
    this.traumatologicosT=data['result']['antecedentes_patologicos_personales'].traumas;
    
    this.APF=data['result']['familiares'];
    
    this.examen_cabezaT=data['result']['examen_fisicos'].cabeza;
    this.examen_cuelloT=data['result']['examen_fisicos'].cuello;
    this.examen_toraxT=data['result']['examen_fisicos'].torax;
    this.examen_abdomenT=data['result']['examen_fisicos'].abdomen;
    this.examen_msuperiorT=data['result']['examen_fisicos'].miembros_superiores;
    this.examen_minferioresT=data['result']['examen_fisicos'].miembros_inferiores;
    this.examen_genitalT=data['result']['examen_fisicos'].region_genital;
    this.examen_analT=data['result']['examen_fisicos'].region_anal;

    this.examen_digestivoT=data['result']['examen_organo_sistemas'].sistema_digestivo;
    this.examen_respiratorioT=data['result']['examen_organo_sistemas'].sistema_respiratorio;
    this.examen_cardiacoT=data['result']['examen_organo_sistemas'].sistema_cardiaco;
    this.examen_genitourinarioT=data['result']['examen_organo_sistemas'].sistema_genitourinarion;
    this.examen_osteomuscularT=data['result']['examen_organo_sistemas'].sistema_osteomuscular;
    this.examen_nerviosoT=data['result']['examen_organo_sistemas'].sistema_nervioso;

    this.examen_laboratorioT=data['result']['examene_complementarios'].laboratorio;
    this.examen_electrocardiogramaT=data['result']['examene_complementarios'].laboratorio;
    this.examen_RToraxT=data['result']['examene_complementarios'].laboratorio;
    this.examen_otrosT=data['result']['examene_complementarios'].laboratorio;
  }).catch(error =>{
    console.log(error);
});
  }

  actualizarDatosAfiliacion(){
    let pacientesActualizar = {
      'id_patologico':this.idPatologico,
      'id_e_fisico':this.idEFisico,
      'id_e_organo_sistema':this.idEOrganoSistema,
      'id_e_complementario':this.idEComplementario,
      'id_habito':this.idHabito,
      'apellidos':this.apellidos,
      'nombres':this.nombres,
      'cedula':this.cedula,
      'edad':this.edad,
      'ocupacion':this.ocupacion,
      'sexo':this.sexo,
      'residencia':this.Lresidencia,
      'procedencia':this.Lprocedencia,
      'fecha_nacimiento':this.fechanacimiento,
      'raza':this.raza,
      'religion':this.religion,
      'nivel_instruccion':this.nivel_instruccion,
      'estado_civil':this.estado_civil,
      'gad':this.gad,
      }

    this.ServicioSecretaria.updateDatosAfilicaion( pacientesActualizar, this.idPaciente ).then(data =>{
      this.DatosPaciente(this.idPaciente);
    });
  }
  


}
