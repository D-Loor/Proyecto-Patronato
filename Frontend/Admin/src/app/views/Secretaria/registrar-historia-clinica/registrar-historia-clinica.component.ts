import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import Swal from 'sweetalert2';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import { SecretariaService } from '../../../servicios/secretaria.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-registrar-historia-clinica',
  templateUrl: './registrar-historia-clinica.component.html',
  styleUrls: ['./registrar-historia-clinica.component.scss']
})
export class RegistrarHistoriaClinicaComponent implements OnInit {

  constructor(private medicinag:MedicinaGeneralService, private ServicioSecretaria:SecretariaService, private spinner: NgxSpinnerService ) { }

  loadingText = 'Guardando...';
  loadingTextA = 'Actualizando...';
  /**
   * Spinner configuration
   *
   * @type {object}
   * @memberof AppComponent
   */
  spinnerConfig: object = {
    bdColor: 'rgba(0, 0, 0, 0.8)',
    size: 'medium',
    color: '#fff',
    type: 'square-jelly-box',
    fullScreen: true,
    template: null,
    showSpinner: false
  };

  public sidebarMinimized = false;
  public navItems = navItems;
  inputCedula: boolean = false;
  inputCedula2: boolean = false;
  isCollapsed = false;
  isCollapsed2 = false;
  isCollapsed3 = false;
  isCollapsed4 = false;
  isCollapsed5 = false;
  isCollapsed6 = false;
  isCollapsed7 = false;
  existente:string;
  orden:number = 1;
  EstadoVida: boolean = true;
  guardado: boolean = false;
  number:number=0;
  DatosFamiliares=[];
  DatosFamiliaresbasedatos=[];
  DatosFamiliaresDB:number=0;
  edit:number = 0;
  select="hola";
  actualizar:number=0;
  containerSecretaria=0;
  ginecosSi:number=1;
 
  //Validación de campos vacios
  Classapellidos = "form-control"; Classnombres ="form-control"; ClaseCdula:string="form-control form-input select-number"; 
  ClaseEdad = "form-control";  ClaseOcupacion = "form-control"; ClaseGad = ""; ClaseSexo="form-control";
  ClaseLR = "form-control"; ClaseLP ="form-control"; ClaseFecha ="form-control"; ClaseRaza ="form-control";
  ClaseReligion="form-control"; ClaseNivel="form-control"; ClaseEstado="form-control"; 
  ClaseTninez="form-control"; ClaseTadolecencia="form-control"; ClaseTadultez="form-control"; ClaseDbid="";
  ClaseDbi="";ClaseHta=""; ClaseTbp=""; ClaseTquirurjicos="form-control"; ClaseTalergicos="form-control"; ClaseTtraumatologicos="form-control"; 
  ClaseFum='form-control form-input'; ClaseFpp='form-control form-input'; ClaseEdadG='form-control form-input';
  ClaseMenarquia='form-control form-input';ClaseFlujoG='form-control form-input'; ClaseGestas='form-control form-input';
  ClasePartos='form-control form-input'; ClaseAbortos='form-control form-input'; ClaseCesareas='form-control form-input';
  ClaseAlcohol=""; ClaseTabaco=""; ClaseDrogas=""; ClaseAliemtacion=""; ClaseDiurisis=""; ClaseSomnia="";
  ClaseTexamen_cabeza='form-control'; ClaseTexamen_cuello='form-control'; ClaseTexamen_torax='form-control'; ClaseTexamen_abdomen='form-control'; ClaseTexamen_msuperior='form-control'; ClaseTexamen_minferiores='form-control'; ClaseTexamen_genital='form-control'; ClaseTexamen_anal='form-control';
  ClaseTexamen_digestivo='form-control'; ClaseTexamen_respiratorio='form-control'; ClaseTexamen_cardiaco='form-control'; ClaseTexamen_genitourinario="form-control"; ClaseTexamen_osteomuscular="form-control"; ClaseTexamen_nervioso="form-control"; 
  ClaseTexamen_laboratorio='form-control'; ClaseTexamen_electrocardiograma='form-control'; ClaseTexamen_RTorax='form-control'; ClaseTexamen_otros='form-control';


  //id para relaciones
  id_obstetrico:number; id_patologico:number; id_e_fisico:number; 
  id_sistema:number; id_complementario:number; id_habito:number; id_paciente:number;
  id_familiar:number; id_PacienteDA:number; id_gineco:number;
  
  
  //cheak
  gadCSi:string='0';gadCNo:string='1'; dbidCSi:string='0';dbidCNo:string='1'; htaCSi:string='0';htaCNo:string='1'; tbpCSi:string='0';tbpCNo:string='1'; dbiCSi:string='0';dbiCNo:string='1';  
  alcoholCSi:string='0';alcoholCNo:string='1'; tabacoCSi:string='0';tabacoCNo:string='1'; drogasCSi:string='0'; drogasCNo:string='1'; alimentacionCSi:string='0';alimentacionCNo:string='1'; diuresisCSi:string='0';diuresisCNo:string='1'; somniaCSi:string='0';somniaCNo:string='1';
  //Variables de  Datos de Afiliación
  apellidos; nombresP; cedula; edad; ocupacion; sexo; Lresidencia; Lprocedencia; fechanacimiento;
  raza; religion; nivel_instruccion; estado_civil; gad;

  //Variables de datos de Antecedentes Patológicos Personales
  ninezT=""; adolescenciaT=""; adultezT=""; quirurgicosT=""; alergicosT=""; traumatologicosT=""; fum; fpp; edad_gestional;
  menarquia; flujo_genital; Gestas; Partos; abortos; cesareas; DBID; HTA; TbP; DBI; 
  //Check Variables Antecedentes Patológicos Personales
  ninezC=0; adolescenciaC=0; adultezC=0; quirurgicosC=0; alergicosC=0; traumatologicosC=0; ginecos_obstetricosC=0; ginecos_obstetricosCaux=0;

  //Variables de Antecedentes Patológicos Familiares
  nombres; union; estado; estadoT; union2;

  //Variables de Hábitos Personales
  alcohol; tabaco; drogas; alimentacion; diuresis; somnia;
  
  

  //Variables de Examenes Físicos Generales
  examen_cabezaT; examen_cuelloT; examen_toraxT; examen_abdomenT; examen_msuperiorT; examen_minferioresT; examen_genitalT; examen_analT;
  //Check Variables Examenes Físicos Generales
examen_cabezaC=0; examen_cuelloC=0; examen_toraxC=0; examen_abdomenC=0; examen_msuperiorC=0; examen_minferioresC=0; examen_genitalC=0; examen_analC=0;


  //Variables de Examenes de Organos y Sistemas
  examen_digestivoT; examen_respiratorioT; examen_cardiacoT; examen_genitourinarioT; examen_osteomuscularT; examen_nerviosoT;
  //Check Variables Examenes de Organos y Sistemass
  examen_digestivoC=0; examen_respiratorioC=0; examen_cardiacoC=0; examen_genitourinarioC=0; examen_osteomuscularC=0; examen_nerviosoC=0;

  //Variables de Examenes Complementarios
  examen_laboratorioT; examen_electrocardiogramaT; examen_RToraxT; examen_otrosT;
  //Check Variables Examenes Complementarioss
  examen_laboratorioC=0; examen_electrocardiogramaC=0; examen_RToraxC=0; examen_otrosC=0;

  contador
  ngOnInit() {
    let cedula="";
    this.containerSecretaria=0;
    cedula=  localStorage.getItem('CedulaExamenes');
    if(cedula!=""&&cedula!=null){
      this.containerSecretaria=1
      this.cedula=cedula;
      this.Consultar();
      localStorage.removeItem('CedulaExamenes');
    }
  }

  limpiar(){

    this.ClaseCdula="form-control form-input select-number"; 
    this.ginecosSi=1;
    //cheak
    
    this.ninezC=0; this.adolescenciaC=0; this.adultezC=0; this.quirurgicosC=0; this.alergicosC=0; this.alergicosC=0; this.ginecos_obstetricosC=0; this.traumatologicosC=0; this.ginecos_obstetricosCaux=0;
    this.examen_cabezaC=0; this.examen_cuelloC=0; this.examen_toraxC=0; this.examen_abdomenC=0; this.examen_msuperiorC=0; this.examen_minferioresC=0; this.examen_genitalC=0; this.examen_analC=0;
    this.examen_digestivoC=0; this.examen_respiratorioC=0; this.examen_cardiacoC=0; this.examen_genitourinarioC=0; this.examen_osteomuscularC=0; this.examen_nerviosoC=0;
    this.examen_laboratorioC=0; this.examen_electrocardiogramaC=0; this.examen_RToraxC=0; this.examen_otrosC=0;
    this.gadCSi='2'; this.gadCNo='2'; this.dbidCSi='2';this.dbidCNo='2'; this.htaCSi='2';this.htaCNo='2'; this.tbpCSi='2';this.tbpCNo='2'; this.dbiCSi='2';this.dbiCNo='2';
    this.alcoholCSi='2';this.alcoholCNo='2'; this.tabacoCSi='2';this.tabacoCNo='2'; this.drogasCSi='2'; this.drogasCNo='2'; this.alimentacionCSi='2';this.alimentacionCNo='2'; this.diuresisCSi='2';this.diuresisCNo='2'; this.somniaCSi='2';this.somniaCNo='2';

    this.DatosFamiliares=[]; this.DatosFamiliaresbasedatos=[]; this.DatosFamiliaresDB=0; this.number=0; this.edit=0; this.actualizar=0;
    //variables de los id Para relacionar y actualiar
    this.id_obstetrico=null; this.id_patologico=null; this.id_e_fisico=null; 
    this.id_sistema=null; this.id_complementario=null; this.id_habito=null; this.id_paciente=null;
    this.id_familiar=null; this.id_PacienteDA=null;
  
  //Variables de  Datos de Afiliación
  this.apellidos=""; this.nombresP=""; this.cedula=""; this.edad=""; this.ocupacion=""; this.sexo=""; this.Lresidencia=""; this.Lprocedencia=""; this.fechanacimiento="";
  this.raza=""; this.religion=""; this.nivel_instruccion=""; this.estado_civil=""; this.gad="";

  //Variables de datos de Antecedentes Patológicos Personales
  this.ninezT=""; this.adolescenciaT=""; this.adultezT=""; this.quirurgicosT=""; this.alergicosT=""; this.traumatologicosT=""; this.fum=""; this.fpp=""; this.edad_gestional="";
  this.menarquia=""; this.flujo_genital=""; this.Gestas=""; this.Partos=""; this.abortos=""; this.cesareas=""; this.DBI=""; this.HTA=""; this.TbP=""; this.DBID=""; 

  //Variables de Antecedentes Patológicos Familiares
  this.nombres=""; this.union=""; this.estado=""; this.estadoT=""; this.union2="";

  //Variables de Hábitos Personales
  this.alcohol=""; this.tabaco=""; this.drogas=""; this.alimentacion=""; this.diuresis=""; this.somnia="";

  //Variables de Examenes Físicos Generales
  this.examen_cabezaT=""; this.examen_cuelloT=""; this.examen_toraxT=""; this.examen_abdomenT=""; this.examen_msuperiorT=""; this.examen_minferioresT=""; this.examen_genitalT=""; this.examen_analT="";

  //Variables de Examenes de Organos y Sistemas
  this.examen_digestivoT=""; this.examen_respiratorioT=""; this.examen_cardiacoT=""; this.examen_genitourinarioT=""; this.examen_osteomuscularT=""; this.examen_nerviosoT="";

  //Variables de Examenes Complementarios
  this.examen_laboratorioT=""; this.examen_electrocardiogramaT=""; this.examen_RToraxT=""; this.examen_otrosT="";
  }

  
  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  vidaVer(){
    this.EstadoVida = true;
  }
  vidaOcultar(){
    this.EstadoVida = false;
  }

  LlenarArray(){
    
    this.DatosFamiliaresDB=0;
    this.number ++;
    if(this.union == "Otro"){
      this.union = this.union2;
    }
    if(this.estadoT == null || this.estadoT== ""){
      this.estadoT = "Sin causas";
    }
    let DatosFamiliares2 = [
      {
          "nombres": this.nombres,
          "union": this.union,
          "vida": this.estado,
          "causas":this.estadoT,
      }];
      this.DatosFamiliares.push(DatosFamiliares2[0]);
      this.nombres = "";
      this.union = "";
      this.union2 = "";
      this.estado = "";
      this.estadoT = "";

  }


  EliminarDatosArray(elimina:string){
    for (var i=0;i<this.DatosFamiliares.length;i++){
      if(this.DatosFamiliares[i].nombres == elimina){
        this.DatosFamiliares.splice(i, 1);
        this.number --;
        break;
      }
    }
  }

  ValidarCedula(cedulaV: number) {
    let cedula = String(cedulaV);
    
    if(cedula.length === 9 || cedula === "undefined" ||  cedula === "null"){
      this.ClaseCdula="form-control form-input select-number"; 
    }

    else if (cedula.length === 10) {
  
      // Obtenemos el digito de la region que sonlos dos primeros digitos
      const digitoRegion = cedula.substring(0, 2);
  
      // Pregunto si la region existe ecuador se divide en 24 regiones
      if (digitoRegion >= String(1) && digitoRegion <= String(24)) {
  
        // Extraigo el ultimo digito
        const ultimoDigito = Number(cedula.substring(9, 10));
  
        // Agrupo todos los pares y los sumo
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));
  
        // Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }
  
        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }
  
        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }
  
        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }
  
        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }
  
        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;
  
        // Suma total
        const sumaTotal = (pares + impares);
  
        // extraemos el primero digito
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);
  
        // Obtenemos la decena inmediata
        const decena = (Number(primerDigitoSuma) + 1) * 10;
  
        // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digitoValidador = decena - sumaTotal;
  
        // Si el digito validador es = a 10 toma el valor de 0
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }
  
        // Validamos que el digito validador sea igual al de la cedula
        if (digitoValidador === ultimoDigito) {
          this.ClaseCdula = "form-control is-valid select-number";
          console.log("Correcto");
          return true;
        } else {
          this.ClaseCdula = "form-control is-invalid select-number";
          console.log("Incorrecto");
          return false;
        }
  
      } else {
        // imprimimos en consola si la region no pertenece
        this.ClaseCdula = "form-control is-invalid select-number";
        console.log("No pertenece a la región");
        return false;
      }
    } else {
      // Imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      this.ClaseCdula = "form-control is-invalid select-number";
      console.log("Cedula incompleta")
      return false;
    }
  
  }

   //Es para actualizar...

   checkRadioSi(radioCheck:string){
    if(radioCheck=='gad'){this.gad=1;}
    if(radioCheck=='dbid'){this.DBID=1;}
    if(radioCheck=='hta'){this.HTA=1;}
    if(radioCheck=='tbp'){this.TbP=1;}
    if(radioCheck=='dbi'){this.DBI=1;}
    if(radioCheck=='alcohol'){this.alcohol=1;}
    if(radioCheck=='tabaco'){this.tabaco=1;}
    if(radioCheck=='drogas'){this.drogas=1;}
    if(radioCheck=='alimentacion'){this.alimentacion=1;}
    if(radioCheck=='diuresis'){this.diuresis=1;}
    if(radioCheck=='somnia'){this.somnia=1;}
    
   }
   checkRadioNo(radioCheck:string){
    if(radioCheck=='gad'){this.gad=0;}
    if(radioCheck=='dbid'){this.DBID=0;}
    if(radioCheck=='hta'){this.HTA=0;}
    if(radioCheck=='tbp'){this.TbP=0;}
    if(radioCheck=='dbi'){this.DBI=0;}
    if(radioCheck=='alcohol'){this.alcohol=0;}
    if(radioCheck=='tabaco'){this.tabaco=0;}
    if(radioCheck=='drogas'){this.drogas=0;}
    if(radioCheck=='alimentacion'){this.alimentacion=0;}
    if(radioCheck=='diuresis'){this.diuresis=0;}
    if(radioCheck=='somnia'){this.somnia=0;}
    
  }

  cargarGinecoPersonal(id_gineco:number){
    this.ServicioSecretaria.datoGinecoObstetricos(id_gineco).then(data => {
      this.fum=data['result'].FUM;
      this.fpp=data['result'].FPP;
      this.edad_gestional=data['result'].edad_gestional;
      this.menarquia=data['result'].menarquia;
      this.flujo_genital=data['result'].flujo_genital;
      this.Gestas=data['result'].gestas;
      this.Partos=data['result'].partos;
      this.cesareas=data['result'].cesareas;
      this.abortos=data['result'].abortos;
      debugger
      if(id_gineco==1){this.ginecos_obstetricosC=1; this.ginecos_obstetricosCaux=this.ginecos_obstetricosC; this.fum='';this.fpp='';this.edad_gestional='';this.menarquia='';this.Gestas='';this.Partos='';
      this.cesareas=''; this.abortos=''; this.flujo_genital='';}else{this.ginecosSi=0;}
    })
  }

 

  actualizarGinecosPersonal(){
    let ginecoPersonal = {
      'FUM':this.fum,
      'FPP':this.fpp,
      'edad_gestional':this.edad_gestional,
      'menarquia':this.menarquia,
      'flujo_genital':this.flujo_genital,
      'gestas':this.Gestas,
      'partos':this.Partos,
      'cesareas':this.cesareas,
      'abortos':this.abortos
    }
 
    this.ServicioSecretaria.updateGinecos( ginecoPersonal, this.id_gineco ).then(data =>{});
  }

  CargarDatosPaciente(data:any){
    this.id_PacienteDA=data['result'].id_paciente;
              this.apellidos=data['result'].apellidos;
              this.nombresP=data['result'].nombres;
              this.edad=data['result'].edad;
              this.sexo=data['result'].sexo;
              this.gad=data['result'].gad;
              if(this.gad == 1){this.gadCSi='1'; this.gadCNo='1'; }else{this.gadCNo='0'; this.gadCSi='0';}
              this.ocupacion=data['result'].ocupacion;
              this.Lresidencia=data['result'].residencia;
              this.Lprocedencia=data['result'].procedencia;
              this.estado_civil=data['result'].estado_civil;
              this.raza=data['result'].raza;
              this.religion=data['result'].religion;
              this.fechanacimiento=data['result'].fecha_nacimiento;
              this.nivel_instruccion=data['result'].nivel_instruccion;
              this.id_patologico=data['result'].id_patologico;
              this.id_e_fisico=data['result'].id_e_fisico;
              this.id_sistema=data['result'].id_e_organo_sistema;
              this.id_complementario=data['result'].id_e_complementario;
              this.id_habito=data['result'].id_habito;

              this.ninezT=data['result']['antecedentes_patologicos_personales'].infancia;
              this.adolescenciaT=data['result']['antecedentes_patologicos_personales'].adolecencia;
              this.adultezT=data['result']['antecedentes_patologicos_personales'].adultez;
              this.DBID=data['result']['antecedentes_patologicos_personales'].DBID;
              this.HTA=data['result']['antecedentes_patologicos_personales'].HTA;
              this.TbP=data['result']['antecedentes_patologicos_personales'].TbP;
              this.DBI=data['result']['antecedentes_patologicos_personales'].DBI;
              if(this.DBID == 1){this.dbidCSi='1'; this.dbidCNo='1'; }else{this.dbidCNo='0'; this.dbidCSi='0';}
              if(this.HTA == 1){this.htaCSi='1'; this.htaCNo='1'; }else{this.htaCNo='0'; this.htaCSi='0';}
              if(this.TbP == 1){this.tbpCSi='1'; this.tbpCNo='1'; }else{this.tbpCNo='0'; this.tbpCSi='0';}
              if(this.DBI == 1){this.dbiCSi='1'; this.dbiCNo='1'; }else{this.dbiCNo='0'; this.dbiCSi='0';}
              this.quirurgicosT=data['result']['antecedentes_patologicos_personales'].quirujircos;
              this.alergicosT=data['result']['antecedentes_patologicos_personales'].alergias;
              this.traumatologicosT=data['result']['antecedentes_patologicos_personales'].traumas;
              this.id_gineco=data['result']['antecedentes_patologicos_personales'].id_gineco;  
              //Condiciones para los check
              if(this.ninezT=="1"){this.ninezC=1; this.ninezT='';}
              if(this.adolescenciaT=="1"){this.adolescenciaC=1;this.adolescenciaT='';}
              if(this.adultezT=="1"){this.adultezC=1;this.adultezT='';}
              if(this.quirurgicosT=="1"){this.quirurgicosC=1;this.quirurgicosT='';}
              if(this.traumatologicosT=="1"){this.traumatologicosC=1;this.traumatologicosT='';}
              if(this.alergicosT=="1"){this.alergicosC=1;this.alergicosT='';}
             
              if(this.sexo == "Mujer"){
                this.cargarGinecoPersonal(this.id_gineco);
              }
              
              this.alcohol=data['result']['habitos'].alcohol;
              this.tabaco=data['result']['habitos'].tabaco;
              this.drogas=data['result']['habitos'].drogas;
              this.alimentacion=data['result']['habitos'].alimentacion;
              this.diuresis=data['result']['habitos'].diuresis;
              this.somnia=data['result']['habitos'].somnia;
              //Condiciones para los check
              if(this.alcohol == 1){this.alcoholCSi='1'; this.alcoholCNo='1'; }else{this.alcoholCNo='0'; this.alcoholCSi='0';}
              if(this.tabaco == 1){this.tabacoCSi='1'; this.tabacoCNo='1'; }else{this.tabacoCNo='0'; this.tabacoCSi='0';}
              if(this.drogas == 1){this.drogasCSi='1'; this.drogasCNo='1'; }else{this.drogasCNo='0'; this.drogasCSi='0';}
              if(this.alimentacion == 1){this.alimentacionCSi='1'; this.alimentacionCNo='1'; }else{this.alimentacionCNo='0'; this.alimentacionCSi='0';}
              if(this.diuresis == 1){this.diuresisCSi='1'; this.diuresisCNo='1'; }else{this.diuresisCNo='0'; this.diuresisCSi='0';}
              if(this.somnia == 1){this.somniaCSi='1'; this.somniaCNo='1'; }else{this.somniaCNo='0'; this.somniaCSi='0';}
              
              //this.DatosFamiliaresDB=data['result']['familiares'];
              this.DatosFamiliaresbasedatos=data['result']['familiares'];
              this.DatosFamiliaresDB=1;
              //this.id_familiar=data['result']['familiares'][0].id_familiar;
              this.number=this.DatosFamiliaresbasedatos.length;
              this.actualizar=1;
              this.edit=1;
              
              this.examen_cabezaT=data['result']['examen_fisicos'].cabeza;
              this.examen_cuelloT=data['result']['examen_fisicos'].cuello;
              this.examen_toraxT=data['result']['examen_fisicos'].torax;
              this.examen_abdomenT=data['result']['examen_fisicos'].abdomen;
              this.examen_msuperiorT=data['result']['examen_fisicos'].miembros_superiores;
              this.examen_minferioresT=data['result']['examen_fisicos'].miembros_inferiores;
              this.examen_genitalT=data['result']['examen_fisicos'].region_genital;
              this.examen_analT=data['result']['examen_fisicos'].region_anal;
              //Condiciones para los check
              if(this.examen_cabezaT==1){this.examen_cabezaC=1; this.examen_cabezaT='';}
              if(this.examen_cuelloT==1){this.examen_cuelloC=1;this.examen_cuelloT='';}
              if(this.examen_toraxT==1){this.examen_toraxC=1;this.examen_toraxT='';}
              if(this.examen_abdomenT==1){this.examen_abdomenC=1;this.examen_abdomenT='';}
              if(this.examen_msuperiorT==1){this.examen_msuperiorC=1;this.examen_msuperiorT='';}
              if(this.examen_minferioresT==1){this.examen_minferioresC=1;this.examen_minferioresT='';}
              if(this.examen_genitalT==1){this.examen_genitalC=1;this.examen_genitalT='';}
              if(this.examen_analT==1){this.examen_analC=1;this.examen_analT='';}
              
              this.examen_digestivoT=data['result']['examen_organo_sistemas'].sistema_digestivo;
              this.examen_respiratorioT=data['result']['examen_organo_sistemas'].sistema_respiratorio;
              this.examen_cardiacoT=data['result']['examen_organo_sistemas'].sistema_cardiaco;
              this.examen_genitourinarioT=data['result']['examen_organo_sistemas'].sistema_genitourinarion;
              this.examen_osteomuscularT=data['result']['examen_organo_sistemas'].sistema_osteomuscular;
              this.examen_nerviosoT=data['result']['examen_organo_sistemas'].sistema_nervioso;
              //Condiciones para los check
              if(this.examen_digestivoT==1){this.examen_digestivoC=1; this.examen_digestivoT='';}
              if(this.examen_respiratorioT==1){this.examen_respiratorioC=1;this.examen_respiratorioT='';}
              if(this.examen_cardiacoT==1){this.examen_cardiacoC=1;this.examen_cardiacoT='';}
              if(this.examen_genitourinarioT==1){this.examen_genitourinarioC=1;this.examen_genitourinarioT='';}
              if(this.examen_osteomuscularT==1){this.examen_osteomuscularC=1;this.examen_osteomuscularT='';}
              if(this.examen_nerviosoT==1){this.examen_nerviosoC=1;this.examen_nerviosoT='';}
              
              this.examen_laboratorioT=data['result']['examene_complementarios'].laboratorio;
              this.examen_electrocardiogramaT=data['result']['examene_complementarios'].electrocardiograma;
              this.examen_RToraxT=data['result']['examene_complementarios'].radiografia_torax;
              this.examen_otrosT=data['result']['examene_complementarios'].otros;
              //Condiciones para los check
              if(this.examen_laboratorioT==1){this.examen_laboratorioC=1; this.examen_laboratorioT='';}
              if(this.examen_electrocardiogramaT==1){this.examen_electrocardiogramaC=1;this.examen_electrocardiogramaT='';}
              if(this.examen_RToraxT==1){this.examen_RToraxC=1;this.examen_RToraxT='';}
              if(this.examen_otrosT==1){this.examen_otrosC=1;this.examen_otrosT='';}
  }

  Consultar(){
    let ce="";
    ce=  localStorage.getItem('CedulaExamenes');
    if(this.cedula== undefined || this.cedula=="undefined"){
      this.gadCSi='2'; this.gadCNo='2'; this.dbidCSi='2';this.dbidCNo='2'; this.htaCSi='2';this.htaCNo='2'; this.tbpCSi='2';this.tbpCNo='2'; this.dbiCSi='2';this.dbiCNo='2';
      this.limpiar();
      Swal.fire(
        'Campo vacío',
        'Ingrese un número de cédula',
        'warning'
      )
    }else{
      this.medicinag.AtenderPaciente(this.cedula).then(data => { 
        this.alcoholCSi='2';this.alcoholCNo='2'; this.tabacoCSi='2';this.tabacoCNo='2'; this.drogasCSi='2'; this.drogasCNo='2'; this.alimentacionCSi='2';this.alimentacionCNo='2'; this.diuresisCSi='2';this.diuresisCNo='2'; this.somniaCSi='2';this.somniaCNo='2';
        this.gadCSi='2'; this.gadCNo='2'; this.dbidCSi='2';this.dbidCNo='2'; this.htaCSi='2';this.htaCNo='2'; this.tbpCSi='2';this.tbpCNo='2'; this.dbiCSi='2';this.dbiCNo='2'; 
        if(data['code'] === '201'){
          if(ce!=""&&ce!=null){
            this.CargarDatosPaciente(data);
            localStorage.removeItem('CedulaExamenes');
          }else{
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: true
              })
               swalWithBootstrapButtons.fire({
                title: 'El paciente cuenta con historial clínico',
                text: "Desea observar sus datos para poderlos editar",
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Si, editar registros!',
                cancelButtonText: 'No, cancelar!',
                confirmButtonColor: '#4BB543',
                cancelButtonColor: '#d33',
                reverseButtons: true
                
              }).then((result) => {
                
                if (result.isConfirmed) {
                  this.CargarDatosPaciente(data);
    
                }else if (/* Read more about handling dismissals below */result.dismiss === Swal.DismissReason.cancel) {
                  this.edit=0;
                  this.gadCSi='2'; this.gadCNo='2'; this.dbidCSi='2';this.dbidCNo='2'; this.htaCSi='2';this.htaCNo='2'; this.tbpCSi='2';this.tbpCNo='2'; this.dbiCSi='2';this.dbiCNo='2';
                  this.limpiar();
                  swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'Se ha cancelado correctamente',
                    'error'
                  )
                }
              })
          }
          
         }
         else{ 
          this.gadCSi='2'; this.gadCNo='2'; this.dbidCSi='2';this.dbidCNo='2'; this.htaCSi='2';this.htaCNo='2'; this.tbpCSi='2';this.tbpCNo='2'; this.dbiCSi='2';this.dbiCNo='2';
          this.limpiar();
          Swal.fire(
            'Paciente no encontrado',
            'El paciente con la cedula ' + this.cedula + ' no cuenta con historial clínico',
            'error'
          )
          this.edit=0;
         }
        })
        .catch((error) => {
          console.log(error);
        });

    }
    
  
  }

  IngresarObstetrico(){
    
    if(this.ginecos_obstetricosC==1){
      this.IngresarAntecedesPersonales();
    }else{
    let obstetricos = {
      'FUM':this.fum,
      'FPP':this.fpp,
      'edad_gestional': this.edad_gestional,
      'menarquia':this.menarquia,
      'flujo_genital':this.flujo_genital,
      'gestas': this.Gestas,
      'partos': this.Partos,
      'cesareas': this.cesareas,
      'abortos': this.abortos,
    }
  
    this.ServicioSecretaria.GinecosObtestricos(obstetricos).then(data =>{
      this.id_obstetrico = data['id'];
      this.IngresarAntecedesPersonales();
    });
  }
  }

  IngresarAntecedesPersonales(){
    
    if(this.sexo=="Hombre" || this.ginecos_obstetricosC==1){
      this.id_obstetrico = 1;
    }
      if(this.ninezC==1){this.ninezT="1";}
      if(this.adolescenciaC==1){this.adolescenciaT="1";}
      if(this.adultezC==1){this.adultezT="1";}
      if(this.quirurgicosC==1){this.quirurgicosT="1";}
      if(this.traumatologicosC==1){this.traumatologicosT="1";}
      if(this.alergicosC==1){this.alergicosT="1";}  
    
    let APerosonales = {
      'id_gineco':this.id_obstetrico,
      'infancia':this.ninezT,
      'adolecencia': this.adolescenciaT,
      'adultez':this.adultezT,
      'DBID':this.DBID,
      'HTA': this.HTA,
      'TbP': this.TbP,
      'DBI': this.DBI,
      'quirujircos': this.quirurgicosT,
      'alergias': this.alergicosT,
      'traumas': this.traumatologicosT,
    }
    this.ServicioSecretaria.AtecedentesPersonales(APerosonales).then(data =>{
      this.id_patologico = data['id'];
      this.ExamenesFisicos();
    });
  }

  ExamenesFisicos(){
    
    if(this.examen_cabezaC==1){this.examen_cabezaT=1;}
    if(this.examen_cuelloC==1){this.examen_cuelloT=1;}
    if(this.examen_toraxC==1){this.examen_toraxT=1;}
    if(this.examen_abdomenC==1){this.examen_abdomenT=1;}
    if(this.examen_msuperiorC==1){this.examen_msuperiorT=1;}
    if(this.examen_minferioresC==1){this.examen_minferioresT=1;}
    if(this.examen_genitalC==1){this.examen_genitalT=1;}
    if(this.examen_analC==1){this.examen_analT=1;}
    if(this.containerSecretaria==0){
      this.examen_cabezaT='*';
      this.examen_cuelloT='*';
      this.examen_toraxT='*';
      this.examen_abdomenT='*';
      this.examen_msuperiorT='*';
      this.examen_minferioresT='*';
      this.examen_genitalT='*';
      this.examen_analT='*';
    }
  let EFisicos = {
    'cabeza':this.examen_cabezaT,
    'cuello':this.examen_cuelloT,
    'torax': this.examen_toraxT,
    'abdomen':this.examen_abdomenT,
    'miembros_superiores':this.examen_msuperiorT,
    'miembros_inferiores': this.examen_minferioresT,
    'region_genital': this.examen_genitalT,
    'region_anal': this.examen_analT,
  }
    this.ServicioSecretaria.ExamenesFisicos(EFisicos).then(data =>{
     this.id_e_fisico = data['id'];
     this.ExamenesOrganos();
    });
  }

  ExamenesOrganos(){
    
    if(this.examen_digestivoC==1){this.examen_digestivoT=1;}
    if(this.examen_respiratorioC==1){this.examen_respiratorioT=1;}
    if(this.examen_cardiacoC==1){this.examen_cardiacoT=1;}
    if(this.examen_genitourinarioC==1){this.examen_genitourinarioT=1;}
    if(this.examen_osteomuscularC==1){this.examen_osteomuscularT=1;}
    if(this.examen_nerviosoC==1){this.examen_nerviosoT=1;}

    if(this.containerSecretaria==0){
      this.examen_digestivoT='*';
      this.examen_respiratorioT='*';
      this.examen_cardiacoT='*';
      this.examen_genitourinarioT='*';
      this.examen_osteomuscularT='*';
      this.examen_nerviosoT='*';
    }
    let ESitemas = {
      'sistema_digestivo':this.examen_digestivoT,
      'sistema_respiratorio':this.examen_respiratorioT,
      'sistema_cardiaco': this.examen_cardiacoT,
      'sistema_genitourinarion':this.examen_genitourinarioT,
      'sistema_osteomuscular':this.examen_osteomuscularT,
      'sistema_nervioso': this.examen_nerviosoT,
    }
    this.ServicioSecretaria.ExamenesOrganosSistema(ESitemas).then(data =>{
     this.id_sistema = data['id'];
     this.ExamenesComplemenrarios();
    });
  }

  ExamenesComplemenrarios(){
    
      if(this.examen_laboratorioC==1){this.examen_laboratorioT=1; }
      if(this.examen_electrocardiogramaC==1){this.examen_electrocardiogramaT=1;}
      if(this.examen_RToraxC==1){this.examen_RToraxT=1;}
      if(this.examen_otrosC==1){this.examen_otrosT=1;}

      if(this.containerSecretaria==0){
        this.examen_laboratorioT='*';
        this.examen_electrocardiogramaT='*';
        this.examen_RToraxT='*';
        this.examen_otrosT='*';
      }
    
    let EComplementarios = {
      'laboratorio':this.examen_laboratorioT,
      'electrocardiograma':this.examen_electrocardiogramaT,
      'radiografia_torax': this.examen_toraxT,
      'otros':this.examen_otrosT,
    }
    this.ServicioSecretaria.ExamenesComple(EComplementarios).then(data =>{
      this.id_complementario = data['id'];
      this.Habitos();
    });
  }

  Habitos(){
    
    let habitosA = {
      'alcohol':this.alcohol,
      'tabaco':this.tabaco,
      'drogas': this.drogas,
      'alimentacion':this.alimentacion,
      'diuresis':this.diuresis,
      'somnia':this.somnia,
    }
    this.ServicioSecretaria.HabitosPaciente(habitosA).then(data =>{
      this.id_habito = data['id'];
      this.Pacientes();
    });
  }

  Pacientes(){
    
    let pacientesA = {
      'id_patologico':this.id_patologico,
      'id_e_fisico':this.id_e_fisico,
      'id_e_organo_sistema': this.id_sistema,
      'id_e_complementario':this.id_complementario,
      'id_habito':this.id_habito,
      'nombres':this.nombresP,
      'cedula':this.cedula,
      'apellidos':this.apellidos,
      'edad':this.edad,
      'sexo':this.sexo,
      'gad':this.gad,
      'ocupacion':this.ocupacion,
      'residencia':this.Lresidencia,
      'procedencia':this.Lprocedencia,
      'estado_civil':this.estado_civil,
      'raza':this.raza,
      'religion':this.religion,
      'fecha_nacimiento':this.fechanacimiento,
      'nivel_instruccion':this.nivel_instruccion,
    }
    this.ServicioSecretaria.AgregarPaciente(pacientesA).then(data =>{
      this.id_paciente = data['id'];
      this.AntecedentesFamiliares();
    });
  }

  AntecedentesFamiliares(){
    debugger
    if(this.DatosFamiliares.length==0){
      this.ActualizarEstadoCitas();
    }else{
    let  arrayLocal={};
    for (let item of this.DatosFamiliares) { 
      arrayLocal = {
          "nombres": item.nombres,
          "union": item.union,
          "vida": item.vida,
          "causas":item.causas,
      }
      this.ServicioSecretaria.Familiares(arrayLocal).then(data =>{
        this.id_familiar = data['id'];
        this.AntecedentesPatologicosF();
      });
    }
  }
  }

  AntecedentesPatologicosF(){
    
    let AntecedentesPF = {
      'id_familiar':this.id_familiar,
      'id_paciente':this.id_paciente,
    }
    this.ServicioSecretaria.AntecedentesFamiliares(AntecedentesPF).then(data =>{
      this.ActualizarEstadoCitas();
    });
  }

  ActualizarEstadoCitas(){
    
    let citas = {
      'nombres':this.nombresP + " " + this.apellidos,
    }
    this.ServicioSecretaria.ActualizarCitas( citas, this.cedula ).then(data =>{
      
      this.limpiar(); 
      this.spinner.hide('sample');
      Swal.fire(
        'Correcto',
        'Datos guardados correctamente',
        'success'
      )
    });
  }
  
  IngresarDatosPaciente(){
      if(this.sexo=="Mujer"){
        this.IngresarObstetrico();
      }else{
       this.IngresarAntecedesPersonales();
      } 
  }
  
  Restaurar(){
    this.ClaseTadultez='form-control';
    this.DBID=undefined; this.DBI=undefined;this.HTA=undefined;this.TbP==undefined;
    this.ClaseDbid="";this.ClaseDbi="";this.ClaseHta="";this.ClaseTbp="";
  }
  RestaurarMujer(){
    this.ClaseFum='form-control form-input'; this.ClaseFpp='form-control form-input'; this.ClaseEdadG='form-control form-input';
    this.ClaseMenarquia='form-control form-input';this.ClaseFlujoG='form-control form-input'; this.ClaseGestas='form-control form-input';
    this.ClasePartos='form-control form-input'; this.ClaseAbortos='form-control form-input'; this.ClaseCesareas='form-control form-input'
  }

  ValidarMujer(){
    if(this.sexo=="Mujer" && this.ginecos_obstetricosC==0){
      if(this.fum==undefined|| this.fum==""|| this.fpp==undefined||this.fpp==""||this.edad_gestional==undefined||
         this.edad_gestional==""|| this.menarquia==undefined||this.menarquia==""||this.flujo_genital==undefined||
         this.flujo_genital==""||this.Gestas==undefined||this.Gestas==""||this.Partos==undefined||this.Partos==""||
         this.abortos==undefined||this.abortos==""||this.cesareas==undefined||this.cesareas==""
      ){
        if(this.fum==undefined|| this.fum==""){
          this.ClaseFum="form-control is-invalid";
        }
        if(this.fpp==undefined||this.fpp==""){
          this.ClaseFpp="form-control is-invalid";
        }
        if(this.edad_gestional==undefined||this.edad_gestional==""){
          this.ClaseEdadG="form-control is-invalid";
        }
        if(this.menarquia==undefined||this.menarquia==""){
          this.ClaseMenarquia="form-control is-invalid";
        }
        if(this.flujo_genital==undefined||this.flujo_genital==""){
          this.ClaseFlujoG="form-control is-invalid";
        }
        if(this.Gestas==undefined||this.Gestas==""){
          this.ClaseGestas="form-control is-invalid";
        }
        if(this.Partos==undefined||this.Partos==""){
          this.ClasePartos="form-control is-invalid";
        }
        if(this.abortos==undefined||this.abortos==""){
          this.ClaseAbortos="form-control is-invalid";
        }
        if(this.cesareas==undefined||this.cesareas==""){
          this.ClaseCesareas="form-control is-invalid";
        }
        
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  validacionTotal(){
    if(this.alcohol==undefined){
      this.ClaseAlcohol="invalido";
    }
    if(this.tabaco==undefined){
      this.ClaseTabaco="invalido";
    }
    if(this.drogas==undefined){
      this.ClaseDrogas="invalido";
    }
    if(this.alimentacion==undefined){
      this.ClaseAliemtacion="invalido";
    }
    if(this.diuresis==undefined){
      this.ClaseDiurisis="invalido";
    }
    if(this.somnia==undefined){
      this.ClaseSomnia="invalido";
    }
    if(this.traumatologicosC==0){
      if(this.traumatologicosT==""){
        this.ClaseTtraumatologicos="form-control is-invalid";
      }
    }
    if(this.alergicosC==0){
      if(this.alergicosT==""){
        this.ClaseTalergicos="form-control is-invalid";
      }
    }
    if(this.quirurgicosC==0){
      if(this.quirurgicosT==""){
        this.ClaseTquirurjicos="form-control is-invalid";
      }
    }
    if(this.adultezC==0){
      if(this.adultezT==""){
        this.ClaseTadultez="form-control is-invalid";
      }
      if(this.DBID==undefined){
        this.ClaseDbid="invalido";
      }
      if(this.DBI==undefined){
        this.ClaseDbi="invalido";
      }
      if(this.HTA==undefined){
        this.ClaseHta="invalido";
      }
      if(this.TbP==undefined){
        this.ClaseTbp="invalido";
      }
    }
    if(this.adolescenciaC==0){
      if(this.adolescenciaT==""){
        this.ClaseTadolecencia="form-control is-invalid";
      }
    }
    if(this.ninezC==0){
      if(this.ninezT==""){
        this.ClaseTninez="form-control is-invalid";
      }
    }
    if(this.apellidos==undefined||this.apellidos==""){
      this.Classapellidos="form-control is-invalid";
    }
    if(this.nombresP==undefined||this.nombresP==""){
      this.Classnombres="form-control is-invalid";
    }
    if(this.cedula==undefined||this.cedula==""){
      this.ClaseCdula="form-control is-invalid";
    }
    if(this.edad==undefined||this.edad==""){
      this.ClaseEdad="form-control is-invalid";
    }
    if(this.gad==undefined){
      this.ClaseGad="invalido";
    }
    if(this.ocupacion==undefined||this.ocupacion==""){
      this.ClaseOcupacion="form-control is-invalid";
    }
    if(this.sexo==undefined||this.sexo==""){
      this.ClaseSexo="form-control is-invalid";
    }
    if(this.Lresidencia==undefined||this.Lresidencia==""){
      this.ClaseLR="form-control is-invalid";
    }
    if(this.Lprocedencia==undefined||this.Lprocedencia==""){
      this.ClaseLP="form-control is-invalid";
    }
    if(this.religion==undefined||this.religion==""){
      this.ClaseReligion="form-control is-invalid";
    }
    if(this.raza==undefined||this.raza==""){
      this.ClaseRaza="form-control is-invalid";
    }
    if(this.fechanacimiento==undefined||this.fechanacimiento==""){
      this.ClaseFecha="form-control is-invalid";
    }
    if(this.nivel_instruccion==undefined||this.nivel_instruccion==""){
      this.ClaseNivel="form-control is-invalid";
    }
    if(this.estado_civil==undefined||this.estado_civil==""){
      this.ClaseEstado="form-control is-invalid";
    }
  }


  VaidarPaciente(){
    let mujer = this.ValidarMujer();
    if(this.apellidos==undefined||this.apellidos==""||this.nombresP==undefined||this.nombresP==""||
       this.cedula==undefined||this.cedula==""||this.edad==undefined||this.edad==""||this.gad==undefined||this.ocupacion==undefined||this.ocupacion==""||this.sexo==undefined||this.sexo==""||
       this.Lresidencia==undefined||this.Lresidencia==""||this.Lprocedencia==undefined||this.Lprocedencia==""||
       this.fechanacimiento==undefined||this.fechanacimiento==""||this.religion==undefined||this.religion==""||
       this.nivel_instruccion==undefined||this.nivel_instruccion==""||this.estado_civil==undefined||this.estado_civil==""||
       this.raza==undefined||this.raza==""||this.ninezC==0 && this.ninezT==""||this.adolescenciaC==0 && this.adolescenciaT==""||this.adultezC==0 &&this.adultezT==""||
       this.quirurgicosC==0 && this.quirurgicosT==""||this.alergicosC==0 && this.alergicosT==""||this.traumatologicosC==0 && 
       this.traumatologicosT==""||mujer==true||this.alcohol==undefined||this.tabaco==undefined||this.drogas==undefined||
       this.alimentacion==undefined||this.diuresis==undefined||this.somnia==undefined
    ){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para registrar el historial clínico.'
      })
      this.validacionTotal();
      
      
    }else{
      this.ServicioSecretaria.ValidarIngreso(this.cedula).then(data =>{
        if(data ['code'] == '201'){
          Swal.fire(
            'Error!',
            'El paciente ya cuenta con historial clínico',
            'error'
          )
        }else{
          this.spinner.show('sample');
          this.IngresarDatosPaciente();
        }
          
      });
    }
    
    
  }


  actualizarDatos(){
    let mujer = this.ValidarMujer();
    debugger
    if(this.apellidos==undefined||this.apellidos==""||this.nombresP==undefined||this.nombresP==""||
       this.cedula==undefined||this.cedula==""||this.edad==undefined||this.edad==""||this.gad==undefined||this.ocupacion==undefined||this.ocupacion==""||this.sexo==undefined||this.sexo==""||
       this.Lresidencia==undefined||this.Lresidencia==""||this.Lprocedencia==undefined||this.Lprocedencia==""||
       this.fechanacimiento==undefined||this.fechanacimiento==""||this.religion==undefined||this.religion==""||
       this.nivel_instruccion==undefined||this.nivel_instruccion==""||this.estado_civil==undefined||this.estado_civil==""||
       this.raza==undefined||this.raza==""||this.ninezC==0 && this.ninezT==""||this.adolescenciaC==0 && this.adolescenciaT==""||this.adultezC==0 &&this.adultezT==""||
       this.quirurgicosC==0 && this.quirurgicosT==""||this.alergicosC==0 && this.alergicosT==""||this.traumatologicosC==0 && 
       this.traumatologicosT==""||mujer==true||this.alcohol==undefined||this.tabaco==undefined||this.drogas==undefined||
       this.alimentacion==undefined||this.diuresis==undefined||this.somnia==undefined||this.examen_cabezaC==0 && this.examen_cabezaT==""||this.examen_cuelloC==0 && this.examen_cuelloT==""||
       this.examen_toraxC==0 && this.examen_toraxT==""||this.examen_abdomenC==0 && this.examen_abdomenT==""||this.examen_msuperiorC==0 && this.examen_msuperiorT==""||this.examen_minferioresC==0 && this.examen_minferioresT==""||
       this.examen_genitalC==0 && this.examen_genitalT==""||this.examen_analC==0 && this.examen_analT==""|| this.examen_digestivoC==0 && this.examen_digestivoT==""||this.examen_respiratorioC==0 && this.examen_respiratorioT==""||
       this.examen_cardiacoC==0 && this.examen_cardiacoT=="" || this.examen_genitourinarioC==0 && this.examen_genitourinarioT==""|| this.examen_osteomuscularC==0 && this.examen_osteomuscularT==""|| this.examen_nerviosoC==0 && this.examen_nerviosoT==""||
       this.examen_laboratorioC==0 && this.examen_laboratorioT==""|| this.examen_electrocardiogramaC==0 && this.examen_electrocardiogramaT==""||this.examen_toraxC==0 && this.examen_toraxT==""|| this.examen_otrosC==0 && this.examen_otrosT==""
    ){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para actualizar el historial clínico.'
      })
      if(this.examen_cabezaC==0){
        if(this.examen_cabezaT==""){
          this.ClaseTexamen_cabeza="form-control is-invalid";
        }
      }
      if(this.examen_cuelloC==0){
        if(this.examen_cuelloT==""){
          this.ClaseTexamen_cuello="form-control is-invalid";
        }
      }
      if(this.examen_toraxC==0){
        if(this.examen_toraxT==""){
          this.ClaseTexamen_torax="form-control is-invalid";
        }
      }
      if(this.examen_abdomenC==0){
        if(this.examen_abdomenT==""){
          this.ClaseTexamen_abdomen="form-control is-invalid";
        }
      }
      if(this.examen_msuperiorC==0){
        if(this.examen_msuperiorT==""){
          this.ClaseTexamen_msuperior="form-control is-invalid";
        }
      }
      if(this.examen_minferioresC==0){
        if(this.examen_minferioresT==""){
          this.ClaseTexamen_minferiores="form-control is-invalid";
        }
      }
      if(this.examen_genitalC==0){
        if(this.examen_genitalT==""){
          this.ClaseTexamen_genital="form-control is-invalid";
        }
      }
      if(this.examen_analC==0){
        if(this.examen_analT==""){
          this.ClaseTexamen_anal="form-control is-invalid";
        }
      }
      if(this.examen_otrosC==0){
        if(this.examen_otrosT==""){
          this.ClaseTexamen_otros="form-control is-invalid";
        }
      }
      if(this.examen_digestivoC==0){
        if(this.examen_digestivoT==""){
          this.ClaseTexamen_digestivo="form-control is-invalid";
        }
      }
      if(this.examen_respiratorioC==0){
        if(this.examen_respiratorioT==""){
          this.ClaseTexamen_respiratorio="form-control is-invalid";
        }
      }
      if(this.examen_cardiacoC==0){
        if(this.examen_cardiacoT==""){
          this.ClaseTexamen_cardiaco="form-control is-invalid";
        }
      }
      if(this.examen_genitourinarioC==0){
        if(this.examen_genitourinarioT==""){
          this.ClaseTexamen_genitourinario="form-control is-invalid";
        }
      }
      if(this.examen_osteomuscularC==0){
        if(this.examen_osteomuscularT==""){
          this.ClaseTexamen_osteomuscular="form-control is-invalid";
        }
      }
      if(this.examen_nerviosoC==0){
        if(this.examen_nerviosoT==""){
          this.ClaseTexamen_nervioso="form-control is-invalid";
        }
      }
      if(this.examen_laboratorioC==0){
        if(this.examen_laboratorioT==""){
          this.ClaseTexamen_laboratorio="form-control is-invalid";
        }
      }
      if(this.examen_electrocardiogramaC==0){
        if(this.examen_electrocardiogramaT==""){
          this.ClaseTexamen_electrocardiograma="form-control is-invalid";
        }
      }
      if(this.examen_toraxC==0){
        if(this.examen_toraxT==""){
          this.ClaseTexamen_torax="form-control is-invalid";
        }
      }
      if(this.examen_toraxC==0){
        if(this.examen_toraxT==""){
          this.ClaseTexamen_torax="form-control is-invalid";
        }
      }
      
      this.validacionTotal();

    }else{  
    this.spinner.show('sampleA');
    let pacientesActualizar = {
      'id_patologico':this.id_patologico,
      'id_e_fisico':this.id_e_fisico,
      'id_e_organo_sistema':this.id_sistema,
      'id_e_complementario':this.id_complementario,
      'id_habito':this.id_habito,
      'apellidos':this.apellidos,
      'nombres':this.nombresP,
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

      
    this.ServicioSecretaria.updateDatosAfilicaion( pacientesActualizar, this.id_PacienteDA ).then(data =>{});

    if(this.ninezC==1){this.ninezT="1"}
      if(this.adolescenciaC==1){this.adolescenciaT="1";}
      if(this.adultezC==1){this.adultezT="1";}
      if(this.quirurgicosC==1){this.quirurgicosT="1";}
      if(this.traumatologicosC==1){this.traumatologicosT="1";}
      if(this.alergicosC==1){this.alergicosT="1";}    
      if(this.sexo=='Hombre'){
        this.id_gineco=1;
      }

      let APPActualizar = {
        'infancia':this.ninezT,
        'adolecencia':this.adolescenciaT,
        'adultez':this.adultezT,
        'DBID':this.DBID,
        'HTA':this.HTA,
        'TbP':this.TbP,
        'DBI':this.DBI,
        'quirujircos':this.quirurgicosT,
        'alergias':this.alergicosT,
        'traumas':this.traumatologicosT,
        'id_gineco':this.id_gineco,
      }
      
    this.ServicioSecretaria.updateAntecedentesPatologicoPersonales( APPActualizar, this.id_patologico ).then(data =>{});
      
      if(this.ginecos_obstetricosCaux==1 && this.ginecos_obstetricosC!=this.ginecos_obstetricosCaux){
        let obstetricos = {
          'FUM':this.fum,
          'FPP':this.fpp,
          'edad_gestional': this.edad_gestional,
          'menarquia':this.menarquia,
          'flujo_genital':this.flujo_genital,
          'gestas': this.Gestas,
          'partos': this.Partos,
          'cesareas': this.cesareas,
          'abortos': this.abortos,
        }
        
        this.ServicioSecretaria.GinecosObtestricos(obstetricos).then(data =>{
          this.id_gineco = data['id'];
          let APPActualizar = {
            'infancia':this.ninezT,
            'adolecencia':this.adolescenciaT,
            'adultez':this.adultezT,
            'DBID':this.DBID,
            'HTA':this.HTA,
            'TbP':this.TbP,
            'DBI':this.DBI,
            'quirujircos':this.quirurgicosT,
            'alergias':this.alergicosT,
            'traumas':this.traumatologicosT,
            'id_gineco':this.id_gineco,
          }
          
        this.ServicioSecretaria.updateAntecedentesPatologicoPersonales( APPActualizar, this.id_patologico ).then(data =>{});
        });
      }
    //Condicionales del checkHabitos
  
    let habitosActualizar = {
      'alcohol':this.alcohol,
      'tabaco':this.tabaco,
      'drogas': this.drogas,
      'alimentacion':this.alimentacion,
      'diuresis':this.diuresis,
      'somnia':this.somnia,         
    }

    this.ServicioSecretaria.updateHabitos( habitosActualizar, this.id_habito ).then(data =>{});

    if(this.examen_cabezaC==1){this.examen_cabezaT=1;}
    if(this.examen_cuelloC==1){this.examen_cuelloT=1;}
    if(this.examen_toraxC==1){this.examen_toraxT=1;}
    if(this.examen_abdomenC==1){this.examen_abdomenT=1;}
    if(this.examen_msuperiorC==1){this.examen_msuperiorT=1;}
    if(this.examen_minferioresC==1){this.examen_minferioresT=1;}
    if(this.examen_genitalC==1){this.examen_genitalT=1;}
    if(this.examen_analC==1){this.examen_analT=1;}    

    let EFGActualizar = {
      'cabeza':this.examen_cabezaT,
      'cuello':this.examen_cuelloT,
      'torax':this.examen_toraxT,
      'abdomen':this.examen_abdomenT,
      'miembros_superiores':this.examen_msuperiorT,
      'miembros_inferiores':this.examen_minferioresT,
      'region_genital':this.examen_genitalT,
      'region_anal':this.examen_analT,       
    }

    this.ServicioSecretaria.updateEFG( EFGActualizar, this.id_e_fisico ).then(data =>{});
    if(this.examen_digestivoC==1){this.examen_digestivoT=1;}
    if(this.examen_respiratorioC==1){this.examen_respiratorioT=1;}
    if(this.examen_cardiacoC==1){this.examen_cardiacoT=1;}
    if(this.examen_genitourinarioC==1){this.examen_genitourinarioT=1;}
    if(this.examen_osteomuscularC==1){this.examen_osteomuscularT=1;}
    if(this.examen_nerviosoC==1){this.examen_nerviosoT=1;}
    let EOSActualizar = {
      'sistema_digestivo':this.examen_digestivoT,
      'sistema_respiratorio':this.examen_respiratorioT,
      'sistema_cardiaco':this.examen_cardiacoT,
      'sistema_genitourinarion':this.examen_genitourinarioT,
      'sistema_osteomuscular':this.examen_osteomuscularT,
      'sistema_nervioso':this.examen_nerviosoT,    
    }

    this.ServicioSecretaria.updateEOS( EOSActualizar, this.id_sistema ).then(data =>{});

    if(this.examen_laboratorioC==1){this.examen_laboratorioT=1; }
    if(this.examen_electrocardiogramaC==1){this.examen_electrocardiogramaT=1;}
    if(this.examen_RToraxC==1){this.examen_RToraxT=1;}
    if(this.examen_otrosC==1){this.examen_otrosT=1;}
    let examenesComplementariosActualizar = {
      'laboratorio':this.examen_laboratorioT,
      'electrocardiograma':this.examen_electrocardiogramaT,
      'radiografia_torax':this.examen_RToraxT,
      'otros':this.examen_otrosT,
    }

    this.ServicioSecretaria.updateComplementario( examenesComplementariosActualizar, this.id_complementario ).then(data =>{
      this.spinner.hide('sampleA');
      Swal.fire(
        'Correcto',
        'Datos actualizados correctamente',
        'success'
      )
      this.limpiar();
    });
  }
}

  aggArrayDB(){
    let  arrayLocal:any;
    
    if(this.union == "Otro"){
      this.union = this.union2;
    }
    if(this.estadoT == null || this.estadoT== ""){
      this.estadoT = "Sin causas";
    }
      arrayLocal = {
          "nombres": this.nombres,
          "union": this.union,
          "vida": this.estado,
          "causas":this.estadoT,
        }
      this.ServicioSecretaria.Familiares2(arrayLocal).then(data =>{
        this.id_familiar = data['id'];
        this.AntecedentesPatologicosDB();
      });
  }
  

  AntecedentesPatologicosDB(){
    let AntecedentesPF = {
      'id_familiar':this.id_familiar,
      'id_paciente':this.id_PacienteDA,
    }
    this.ServicioSecretaria.AntecedentesFamiliares(AntecedentesPF).then(data =>{
      this.LlenarArrayDB();
    });
  }

  LlenarArrayDB(){
    this.medicinag.AtenderPaciente(this.cedula).then(data => {
      this.DatosFamiliaresbasedatos=data['result']['familiares'];
      
      if (this.DatosFamiliaresbasedatos.length == 0){
        this.number=0;
      }
      if (this.DatosFamiliaresbasedatos.length ==1){
        this.number=1;
      }
      this.nombres = "";
      this.union = "";
      this.union2 = "";
      this.estado = "";
      this.estadoT = "";
    }); 
  }

  eliminarFamiliarBD(id_familiar:number){
    this.ServicioSecretaria.eliFamiliares(id_familiar,this.id_PacienteDA).then(data =>{
      this.LlenarArrayDB();
    });
  }
}
  


