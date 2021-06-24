import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import {ActivatedRoute, Router} from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SecretariaService } from '../../../servicios/secretaria.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  constructor(public medicina_general:MedicinaGeneralService, private spinner: NgxSpinnerService, public rutas:Router) { }

  @ViewChild('Principal') public Principal: ModalDirective;
  public sidebarMinimized = false;
  public navItems = navItems;
  search;
  pacien="";
  edit=1;
  dataFechaFiltro;
  pacientesMG=[];//variable para el paginado
  pacientesMGPaginate=[];//variable para el paginado
  pacientesMGFilter=[];//variable para el paginado sin el pipe
  pacientesMGPaginateFilter=[];//variable para el paginado sin el pipe
  APF:any[];
  CedulaPaciente = null;
  TotalPacientes;
  apellidos:string; nombres:string; cedula:string; edad:string; ocupacion:string; nivel_instruccion:string; estado_civil:string;
  sexo:string; Lresidencia:string; Lprocedencia:string; fechanacimiento:string; raza:string; religion:string; alcoholT:string;
  tabacoT:string; drogasT:string; alimentacionT:string; diuresisT:string; somniaT:string; ninezT:string; adolescenciaT:string;
  adultezT:string; quirurgicosT:string; alergicosT:string; traumatologicosT:string; fum:string; fpp:string; edad_gestional:string;
  menarquia:string; flujo_genital:string; Gestas:string; Partos:string; abortos:string; cesareas:string; DBID:string; HTA:string; TbP:string;
  DBI:string; examen_cabezaT:string; examen_cuelloT:string; examen_toraxT:string; examen_abdomenT:string; examen_msuperiorT:string; examen_minferioresT:string;
  examen_genitalT:string; examen_analT:string; examen_digestivoT:string; examen_respiratorioT:string; examen_cardiacoT:string; examen_genitourinarioT:string; examen_osteomuscularT:string;
  examen_nerviosoT:string; examen_laboratorioT:string; examen_electrocardiogramaT:string; examen_RToraxT:string; examen_otrosT:string; gad:string;

  idPaciente:number; idPatologico:string; idEFisico:string; idEOrganoSistema:string; idEComplementario:string; idHabito:string;

  rolP;
  isCollapsed = false;
  isCollapsed2 = false;
  isCollapsed3 = false;
  isCollapsed4 = false;
  isCollapsed5 = false;
  isCollapsed6 = false;
  isCollapsed7 = false;

  loadingText = 'Cargando...';
  spinnerConfig: object = {
    bdColor: 'rgba(0, 0, 0, 0.8)',
    size: 'medium',
    color: '#fff',
    type: 'square-jelly-box',
    fullScreen: true,
    template: null,
    showSpinner: false
  };

  ngOnInit(){
      this.rolP = localStorage.getItem('rol');
      if(localStorage.getItem('cedulaMGandRF') == null){
        this.search="";
      }else{
        this.search = localStorage.getItem('cedulaMGandRF');
      }

      this.cargar();
  }
  actualizar(){
    this.spinner.show('sample');
    this.cargar();

    Swal.fire(
      '¡Pacientes Actualizados..!',
      'La lista de pacientes ha sido actualizada.',
      'success'
    )
  }

  CalcEdad(edad:string){
    var coma = "";
    let sepa = edad.split(coma);
    let punto = sepa[1]
    let almacenar = sepa[2];
    let dias =sepa[3]
    let valor;
    if(sepa.length==5){
      dias=sepa[3]+""+sepa[4];
    }
    if(punto=="."){
      if(almacenar=="0"){
        return  valor = dias+" dias";
      }else if(almacenar!="0"){
        if(sepa.length==4){
          almacenar = sepa[2]+""+sepa[3];
        }
        return  valor = almacenar+" meses";
      }
    }else{
      return valor = edad+" años";
    }
    

  }

  cargar(){
    this.spinner.show('sample');
    this.medicina_general.pacientes().then(data =>{
    this.pacientesMG=data['result'];
    this.TotalPacientes=data['total'];
    let validador = data['code'];
    if(this.TotalPacientes == null){
      this.TotalPacientes=0;
    }
    if(validador=='202'){
      this.pacientesMG=[];
      this.pacientesMGPaginate=[];
    }else{
      this.pacientesMGPaginate = this.pacientesMG.slice(0, 10);
      this.spinner.hide('sample');
    }
    if(this.search!=null){
      this.dataPaginate(event);
    }
    this.spinner.hide('sample');
  }).catch(error =>{
    console.log(error);
  });

  }

  buscarMG(){
    if(this.search== null || this.search==undefined || this.search==""){
      Swal.fire({
        icon: 'error',
        title: '¡Campo vacío...!',
        text: 'Ingrese una cédula a buscar.'
      })
    }else if(this.pacientesMGFilter.length==0){
      Swal.fire({
        icon: 'error',
        title: '¡No hay Registros..!',
        text: 'No hay pacientes registrados con esta cédula.'
      })
    }
  }

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes
    this.pacientesMGFilter=[];
      this.pacientesMGPaginateFilter=[];
      this.CedulaPaciente=null;
    if(this.search==null){
      this.pacientesMGPaginate = this.pacientesMG.slice(0, 10);
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
    this.pacientesMG = [];
    this.pacientesMGPaginate = [];

  }

  DatosPaciente(id_paciente:number){
    this.Principal.show();
    this.edit=1;
    this.medicina_general.PacientesAntecedentes(id_paciente).then(data =>{
    this.idPaciente=data['result'].id_paciente;
    this.idPatologico=data['result'].id_patologico;
    this.idEFisico=data['result'].id_e_fisico;
    this.idEOrganoSistema=data['result'].id_e_organo_sistema;
    this.idEComplementario=data['result'].id_e_complementario;
    this.idHabito=data['result'].id_habito;
    this.apellidos=data['result'].apellidos;
    this.nombres=data['result'].nombres;
    this.cedula=data['result'].cedula;
    this.edad=this.CalcEdad(data['result'].edad);
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

    if(data['result']['habitos'].alcohol==1){
      this.alcoholT='Si';
    }else{
      this.alcoholT='No';
    }

    if(data['result']['habitos'].tabaco==1){
      this.tabacoT='Si';
    }else{
      this.tabacoT='No';
    }

    if(data['result']['habitos'].drogas==1){
      this.drogasT='Si';
    }else{
      this.drogasT='No';
    }

    if(data['result']['habitos'].alimentacion==1){
      this.alimentacionT='Si';
    }else{
      this.alimentacionT='No';
    }

    if(data['result']['habitos'].diuresis==1){
      this.diuresisT='Si';
    }else{
      this.diuresisT='No';
    }

    if(data['result']['habitos'].somnia==1){
      this.somniaT='Si';
    }else{
      this.somniaT='No';
    }

    if(data['result']['antecedentes_patologicos_personales'].infancia==1){
      this.ninezT = 'Sin antecedentes';
    }else{
      this.ninezT=data['result']['antecedentes_patologicos_personales'].infancia;
    }

    if(data['result']['antecedentes_patologicos_personales'].adolecencia==1){
      this.adolescenciaT = 'Sin antecedentes';
    }else{
      this.adolescenciaT=data['result']['antecedentes_patologicos_personales'].adolecencia;
    }

    if(data['result']['antecedentes_patologicos_personales'].adultez==1){
      this.adultezT = 'Sin antecedentes';
    }else{
      this.adultezT=data['result']['antecedentes_patologicos_personales'].adultez;
    }

    if(data['result']['antecedentes_patologicos_personales'].DBID==0){
      this.DBID = 'No';
    }else{
      this.DBID = 'Si';
    }

    if(data['result']['antecedentes_patologicos_personales'].HTA==0){
      this.HTA = 'No';
    }else{
      this.HTA = 'Si';
    }

    if(data['result']['antecedentes_patologicos_personales'].TbP==0){
      this.TbP = 'No';
    }else{
      this.TbP = 'Si';
    }

    if(data['result']['antecedentes_patologicos_personales'].DBI==0){
      this.DBI = 'No';
    }else{
      this.DBI = 'Si';
    }

    if(data['result']['antecedentes_patologicos_personales'].quirujircos==1){
      this.quirurgicosT = 'Sin antecedentes';
    }else{
      this.quirurgicosT=data['result']['antecedentes_patologicos_personales'].quirujircos;
    }

    if(data['result']['antecedentes_patologicos_personales'].alergias==1){
      this.alergicosT = 'Sin antecedentes';
    }else{
      this.alergicosT=data['result']['antecedentes_patologicos_personales'].alergias;
    }

    if(data['result']['antecedentes_patologicos_personales'].traumas==1){
      this.traumatologicosT = 'Sin antecedentes';
    }else{
      this.traumatologicosT=data['result']['antecedentes_patologicos_personales'].traumas;
    }


    this.APF=data['result']['familiares'];

    if(data['result']['examen_fisicos'].cabeza==1){
      this.examen_cabezaT = 'Sin antecedentes';
    }else{
      this.examen_cabezaT=data['result']['examen_fisicos'].cabeza;
    }

    if(data['result']['examen_fisicos'].cuello==1){
      this.examen_cuelloT = 'Sin antecedentes';
    }else{
      this.examen_cuelloT=data['result']['examen_fisicos'].cuello;
    }

    if(data['result']['examen_fisicos'].torax==1){
      this.examen_toraxT = 'Sin antecedentes';
    }else{
      this.examen_toraxT = data['result']['examen_fisicos'].torax;
    }

    if(data['result']['examen_fisicos'].abdomen==1){
      this.examen_abdomenT = 'Sin antecedentes';
    }else{
      this.examen_abdomenT = data['result']['examen_fisicos'].abdomen;
    }

    if(data['result']['examen_fisicos'].miembros_superiores==1){
      this.examen_msuperiorT = 'Sin antecedentes';
    }else{
      this.examen_msuperiorT = data['result']['examen_fisicos'].miembros_superiores;
    }

    if(data['result']['examen_fisicos'].miembros_inferiores==1){
      this.examen_minferioresT = 'Sin antecedentes';
    }else{
      this.examen_minferioresT = data['result']['examen_fisicos'].miembros_inferiores;
    }

    if(data['result']['examen_fisicos'].region_genital==1){
      this.examen_genitalT = 'Sin antecedentes';
    }else{
      this.examen_genitalT = data['result']['examen_fisicos'].region_genital;
    }

    if(data['result']['examen_fisicos'].region_anal==1){
      this.examen_analT = 'Sin antecedentes';
    }else{
      this.examen_analT = data['result']['examen_fisicos'].region_anal;
    }
    
    if(data['result']['examen_organo_sistemas'].sistema_digestivo==1){
      this.examen_digestivoT = 'Sin antecedentes';
    }else{
      this.examen_digestivoT = data['result']['examen_organo_sistemas'].sistema_digestivo;
    }
    if(data['result']['examen_organo_sistemas'].sistema_respiratorio==1){
      this.examen_respiratorioT = 'Sin antecedentes';
    }else{
      this.examen_respiratorioT = data['result']['examen_organo_sistemas'].sistema_respiratorio;
    }
    if(data['result']['examen_organo_sistemas'].sistema_cardiaco==1){
      this.examen_cardiacoT = 'Sin antecedentes';
    }else{
      this.examen_cardiacoT = data['result']['examen_organo_sistemas'].sistema_cardiaco;
    }
    if(data['result']['examen_organo_sistemas'].sistema_genitourinarion==1){
      this.examen_genitourinarioT = 'Sin antecedentes';
    }else{
      this.examen_genitourinarioT = data['result']['examen_organo_sistemas'].sistema_genitourinarion;
    }
    if(data['result']['examen_organo_sistemas'].sistema_osteomuscular==1){
      this.examen_osteomuscularT = 'Sin antecedentes';
    }else{
      this.examen_osteomuscularT = data['result']['examen_organo_sistemas'].sistema_osteomuscular;
    }
    if(data['result']['examen_organo_sistemas'].sistema_nervioso==1){
      this.examen_nerviosoT = 'Sin antecedentes';
    }else{
      this.examen_nerviosoT = data['result']['examen_organo_sistemas'].sistema_nervioso;
    }

    if(data['result']['examene_complementarios'].laboratorio==1){
      this.examen_laboratorioT = 'Sin antecedentes';
    }else{
      this.examen_laboratorioT = data['result']['examene_complementarios'].laboratorio;
    }
    if(data['result']['examene_complementarios'].electrocardiograma==1){
      this.examen_electrocardiogramaT = 'Sin antecedentes';
    }else{
      this.examen_electrocardiogramaT = data['result']['examene_complementarios'].electrocardiograma;
    }
    if(data['result']['examene_complementarios'].radiografia_torax==1){
      this.examen_RToraxT = 'Sin antecedentes';
    }else{
      this.examen_RToraxT = data['result']['examene_complementarios'].radiografia_torax;
    }
    if(data['result']['examene_complementarios'].otros==1){
      this.examen_otrosT = 'Sin antecedentes';
    }else{
      this.examen_otrosT = data['result']['examene_complementarios'].otros;
    }
  }).catch(error =>{
    console.log(error);
    this.spinner.hide('sample');
    this.rutas.navigate(['/500']);
});
  }



  Consultar(id_paciente:string){
    localStorage.setItem('id_paciente', id_paciente);
    if(localStorage.getItem('rol')=="Medicina General"){
      this.rutas.navigate(['/medicinageneral']);
    }
    if(localStorage.getItem('rol')=="Rehabilitación Física"){
      this.rutas.navigate(['/rehabilitacionfisica']);
    }
  }

  IrHistorial(cedul:string){
    let secretariaEdit = localStorage.getItem('secretariaEdit');
    if(secretariaEdit == 'SE'){
      localStorage.setItem('historiaClinica', cedul);
      this.rutas.navigate(['/registrarhistoriaclinica']);
    }else{
      localStorage.setItem('CedulaExamenes', cedul);
      this.rutas.navigate(['/registrarhistoriaclinica']);
    }

  }





}
