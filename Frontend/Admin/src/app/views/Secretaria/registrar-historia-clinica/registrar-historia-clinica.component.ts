import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import Swal from 'sweetalert2';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import { SecretariaService } from '../../../servicios/secretaria.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrar-historia-clinica',
  templateUrl: './registrar-historia-clinica.component.html',
  styleUrls: ['./registrar-historia-clinica.component.scss']
})
export class RegistrarHistoriaClinicaComponent implements OnInit {

  constructor(private medicinag:MedicinaGeneralService, private ServicioSecretaria:SecretariaService, private spinner: NgxSpinnerService,
              private rutas:Router
             ) { }

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
  containerMGandRF=0;
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
  ClaseAntecedentePato="form-control"; ClaseEstados = ""; ClaseUnion="form-control";

  //id para relaciones
  id_obstetrico:number; id_patologico:number; id_e_fisico:number;
  id_sistema:number; id_complementario:number; id_habito:number; id_paciente:number;
  id_familiar:number; id_PacienteDA:number; id_gineco:number;


  //Variables de  Datos de Afiliación
  apellidos; nombresP; cedula; edad; ocupacion; sexo; Lresidencia; Lprocedencia; fechanacimiento;
  raza; religion; nivel_instruccion; estado_civil; gad; edadM;

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
  examen_cabezaT=""; examen_cuelloT=""; examen_toraxT=""; examen_abdomenT=""; examen_msuperiorT=""; examen_minferioresT=""; examen_genitalT=""; examen_analT="";
  //Check Variables Examenes Físicos Generales
examen_cabezaC=0; examen_cuelloC=0; examen_toraxC=0; examen_abdomenC=0; examen_msuperiorC=0; examen_minferioresC=0; examen_genitalC=0; examen_analC=0;


  //Variables de Examenes de Organos y Sistemas
  examen_digestivoT=""; examen_respiratorioT=""; examen_cardiacoT=""; examen_genitourinarioT=""; examen_osteomuscularT=""; examen_nerviosoT="";
  //Check Variables Examenes de Organos y Sistemass
  examen_digestivoC=0; examen_respiratorioC=0; examen_cardiacoC=0; examen_genitourinarioC=0; examen_osteomuscularC=0; examen_nerviosoC=0;

  //Variables de Examenes Complementarios
  examen_laboratorioT=""; examen_electrocardiogramaT=""; examen_RToraxT=""; examen_otrosT="";
  //Check Variables Examenes Complementarioss
  examen_laboratorioC=0; examen_electrocardiogramaC=0; examen_RToraxC=0; examen_otrosC=0;

  contador; contadorP="";

  ngOnInit() {
    let cedula="";
    let cedulaSecretaria = "";
    this.containerSecretaria=0;
    cedula = localStorage.getItem('CedulaExamenes');
    cedulaSecretaria = localStorage.getItem('historiaClinica');
    this.contadorP=localStorage.getItem('contadorT');
    if(this.contadorP=="1"){
      this.cedula=localStorage.getItem('cedulaTemporal');
      this.Consultar('0');
    }

    if(cedulaSecretaria!=null && cedulaSecretaria!=""){
      this.containerSecretaria=0;
      this.containerMGandRF=1;
      this.cedula=cedulaSecretaria;
      this.Consultar('0');
      //localStorage.removeItem('historiaClinica');
    }

    if(cedula!=""&&cedula!=null){
      this.containerSecretaria=1;
      this.containerMGandRF=1;
      this.cedula=cedula;
      this.Consultar('0');
      //localStorage.removeItem('CedulaExamenes');
    }
    let rol=  localStorage.getItem('RolV');
    if(rol == "MG" || rol == "RF"){
      this.containerSecretaria=1;
      this.containerMGandRF=0;
      if(cedula!=""&&cedula!=null){
        this.containerSecretaria=1;
        this.containerMGandRF=1;
      }
      this.edit=1;
      this.cedula=cedula;

    }
    let sesion = localStorage.getItem('sesionLoginInicio');
    if(sesion=="Secretaría"){
      this.containerSecretaria=0;
    }
  }

  CalcularEdad(){

      if (this.fechanacimiento != undefined) {

        //Fecha Actual
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getFullYear();
        var ahora_mes = fecha_hoy.getMonth()+1;
        var ahora_dia = fecha_hoy.getDate();
        //Fecha de nacimiento
        var fecha = new Date(this.fechanacimiento);
        var ano = fecha.getFullYear();
        var mes = fecha.getMonth()+1;
        var dia = fecha.getDate();

         // realizamos el calculo
         var edad = (ahora_ano + 1900) - ano;
         if ( ahora_mes < mes )
         {
             edad--;
         }
         if ((mes == ahora_mes) && (ahora_dia < dia))
         {
             edad--;
         }
         if (edad > 1900)
         {
             edad -= 1900;
         }
         if(edad ==1900){
           edad = 0;
         }

         // calculamos los meses
         var meses = 0;

         if (ahora_mes > mes && dia > ahora_dia)
             meses = ahora_mes - mes - 1;
         else if (ahora_mes > mes)
             meses = ahora_mes - mes
         if (ahora_mes < mes && dia < ahora_dia)
             meses = 12 - (mes - ahora_mes);
         else if (ahora_mes < mes)
             meses = 12 - (mes - ahora_mes + 1);
         if (ahora_mes == mes && dia > ahora_dia)
             meses = 11;

         // calculamos los dias
         var dias=0;
         if(ahora_dia>dia)
             dias=ahora_dia-dia;
         if(ahora_dia<dia)
         {
             var ultimoDiaMes=new Date(ahora_ano, ahora_mes, 0);
             dias=ultimoDiaMes.getDate()-(dia-ahora_dia);
         }

         if(edad == 0 && meses == 0){
           this.edad = "0.0"+dias;
           this.edadM= dias +" dias";
          }
         if(edad !=0 ){
          this.edad = edad;
          this.edadM= edad +" años";
          }
          if(edad == 0 && meses != 0){
            this.edad = "0."+meses;
            this.edadM= meses +" meses";
          }
        //alert("Edad en años:" + edad + ',' + 'Meses:' + meses + ',' + 'dias:' + dias);

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


    this.DatosFamiliares=[]; this.DatosFamiliaresbasedatos=[]; this.DatosFamiliaresDB=0; this.number=0; this.actualizar=0;
    //variables de los id Para relacionar y actualiar
    this.id_obstetrico=null; this.id_patologico=null; this.id_e_fisico=null;
    this.id_sistema=null; this.id_complementario=null; this.id_habito=null; this.id_paciente=null;
    this.id_familiar=null; this.id_PacienteDA=null;

  //Variables de  Datos de Afiliación
  this.apellidos=""; this.nombresP=""; this.cedula=""; this.edad=""; this.ocupacion=""; this.sexo=""; this.Lresidencia=""; this.Lprocedencia=""; this.fechanacimiento="";
  this.raza=""; this.religion=""; this.nivel_instruccion=""; this.estado_civil=""; this.gad=""; this.edadM="";

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

  ActualizarCitaHistorial(cedula:string){
    this.ServicioSecretaria.ActualizarCitaConHistorial(cedula).then(data => {
    })
  }

  LlenarArray(){
    if(this.nombres == undefined || this.nombres=='' || this.estado == undefined || this.estado == ''||this.union==undefined || this.union == ''){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para registrar el historial clínico.'
      })

        if(this.nombres==""||this.nombres == undefined){
          this.ClaseAntecedentePato="form-control is-invalid";
        }

        if(this.estado==undefined || this.estado==''){
          this.ClaseEstados="invalido";
        }

        if(this.union==undefined||this.union==""){
          this.ClaseUnion="form-control is-invalid";
        }

    }else{
    this.DatosFamiliaresDB=0;
    this.number ++;
    if(this.union == "Otro"){
      this.union = this.union2;
    }
    if(this.estadoT == null || this.estadoT== ""){
      this.estadoT = "Sin causas";
    }
    if(this.estado==1){
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
              if(this.gad == 1){this.gad=true }else if(this.gad == 0){this.gad=false;}
              this.ocupacion=data['result'].ocupacion;
              this.Lresidencia=data['result'].residencia;
              this.Lprocedencia=data['result'].procedencia;
              this.estado_civil=data['result'].estado_civil;
              this.raza=data['result'].raza;
              this.religion=data['result'].religion;
              this.fechanacimiento=data['result'].fecha_nacimiento;
              this.CalcularEdad();
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
              if(this.DBID == 1){this.DBID=true; }else{this.DBID=false;}
              if(this.HTA == 1){this.HTA=true; }else{this.HTA=false;}
              if(this.TbP == 1){this.TbP=true; }else{this.TbP=false;}
              if(this.DBI == 1){this.DBI=true; }else{this.DBI=false;}
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
              if(this.alcohol == 1){this.alcohol=true; }else{this.alcohol=false;}
              if(this.tabaco == 1){this.tabaco=true;}else{this.tabaco=false;}
              if(this.drogas == 1){this.drogas=true; }else{this.drogas=false;}
              if(this.alimentacion == 1){this.alimentacion=true; }else{this.alimentacion=false;}
              if(this.diuresis == 1){this.diuresis=true; }else{this.diuresis=false;}
              if(this.somnia == 1){this.somnia=true;}else{this.somnia=false;}

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
              if(this.examen_cabezaT=="1"){this.examen_cabezaC=1; this.examen_cabezaT='';}
              if(this.examen_cuelloT=="1"){this.examen_cuelloC=1;this.examen_cuelloT='';}
              if(this.examen_toraxT=="1"){this.examen_toraxC=1;this.examen_toraxT='';}
              if(this.examen_abdomenT=="1"){this.examen_abdomenC=1;this.examen_abdomenT='';}
              if(this.examen_msuperiorT=="1"){this.examen_msuperiorC=1;this.examen_msuperiorT='';}
              if(this.examen_minferioresT=="1"){this.examen_minferioresC=1;this.examen_minferioresT='';}
              if(this.examen_genitalT=="1"){this.examen_genitalC=1;this.examen_genitalT='';}
              if(this.examen_analT=="1"){this.examen_analC=1;this.examen_analT='';}

              this.examen_digestivoT=data['result']['examen_organo_sistemas'].sistema_digestivo;
              this.examen_respiratorioT=data['result']['examen_organo_sistemas'].sistema_respiratorio;
              this.examen_cardiacoT=data['result']['examen_organo_sistemas'].sistema_cardiaco;
              this.examen_genitourinarioT=data['result']['examen_organo_sistemas'].sistema_genitourinarion;
              this.examen_osteomuscularT=data['result']['examen_organo_sistemas'].sistema_osteomuscular;
              this.examen_nerviosoT=data['result']['examen_organo_sistemas'].sistema_nervioso;
              //Condiciones para los check
              if(this.examen_digestivoT=="1"){this.examen_digestivoC=1; this.examen_digestivoT='';}
              if(this.examen_respiratorioT=="1"){this.examen_respiratorioC=1;this.examen_respiratorioT='';}
              if(this.examen_cardiacoT=="1"){this.examen_cardiacoC=1;this.examen_cardiacoT='';}
              if(this.examen_genitourinarioT=="1"){this.examen_genitourinarioC=1;this.examen_genitourinarioT='';}
              if(this.examen_osteomuscularT=="1"){this.examen_osteomuscularC=1;this.examen_osteomuscularT='';}
              if(this.examen_nerviosoT=="1"){this.examen_nerviosoC=1;this.examen_nerviosoT='';}

              this.examen_laboratorioT=data['result']['examene_complementarios'].laboratorio;
              this.examen_electrocardiogramaT=data['result']['examene_complementarios'].electrocardiograma;
              this.examen_RToraxT=data['result']['examene_complementarios'].radiografia_torax;
              this.examen_otrosT=data['result']['examene_complementarios'].otros;
              //Condiciones para los check
              if(this.examen_laboratorioT=="1"){this.examen_laboratorioC=1; this.examen_laboratorioT='';}
              if(this.examen_electrocardiogramaT=="1"){this.examen_electrocardiogramaC=1;this.examen_electrocardiogramaT='';}
              if(this.examen_RToraxT=="1"){this.examen_RToraxC=1;this.examen_RToraxT='';}
              if(this.examen_otrosT=="1"){this.examen_otrosC=1;this.examen_otrosT='';}
  }


  Consultar(n:string){
    let ce=""; let ce2="";
    ce=  localStorage.getItem('CedulaExamenes');
    ce2 = localStorage.getItem('historiaClinica');
    if(this.cedula== undefined || this.cedula=="undefined"){

      this.limpiar();
      Swal.fire({
        icon: 'error',
        title: '¡Campo vacío...!',
        text: 'Ingrese un número de cédula.'
      })

    }else{
      this.containerMGandRF=1;
      this.medicinag.AtenderPaciente(this.cedula).then(data => {
        if(data['code'] === '201'){
          if((ce!=""&&ce!=null) && n=="0" ){
            this.CargarDatosPaciente(data);
            ce=""; ce2="";
            //localStorage.removeItem('CedulaExamenes');
          }else if(this.contadorP=="1" && n=="0"){
            this.CargarDatosPaciente(data);
          }else{
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: true
              })
               swalWithBootstrapButtons.fire({
                title: 'Historial encontrado, ¿Cargar Datos?',
                text: "Cargar sus datos para editarlos.",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Si, cargar registros!',
                cancelButtonText: 'No, cancelar!',
                confirmButtonColor: '#20a8d8',
                cancelButtonColor: '#f86c6b',
                reverseButtons: true

              }).then((result) => {

                if (result.isConfirmed) {
                  this.CargarDatosPaciente(data);
                  localStorage.removeItem('CedulaExamenes');
                  this.contadorP="1";
                  localStorage.setItem('cedulaTemporal', this.cedula);
                  localStorage.setItem('contadorT', this.contadorP);
                  debugger
                }else if (/* Read more about handling dismissals below */result.dismiss === Swal.DismissReason.cancel) {
                  this.edit=0; this.limpiar();
                  swalWithBootstrapButtons.fire(
                    '¡Cancelado..!',
                    'No se han cargado los datos.',
                    'error'
                  )
                }
              })
          }

         }
         else{
          this.limpiar();
          Swal.fire(
            '¡Paciente no encontrado..!',
            'No se cuenta con un historial clínico con esta cédula.',
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

    if(this.examen_cabezaC==1){this.examen_cabezaT="1";}
    if(this.examen_cuelloC==1){this.examen_cuelloT="1";}
    if(this.examen_toraxC==1){this.examen_toraxT="1";}
    if(this.examen_abdomenC==1){this.examen_abdomenT="1";}
    if(this.examen_msuperiorC==1){this.examen_msuperiorT="1";}
    if(this.examen_minferioresC==1){this.examen_minferioresT="1";}
    if(this.examen_genitalC==1){this.examen_genitalT="1";}
    if(this.examen_analC==1){this.examen_analT="1";}
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

    if(this.examen_digestivoC==1){this.examen_digestivoT="1";}
    if(this.examen_respiratorioC==1){this.examen_respiratorioT="1";}
    if(this.examen_cardiacoC==1){this.examen_cardiacoT="1";}
    if(this.examen_genitourinarioC==1){this.examen_genitourinarioT="1";}
    if(this.examen_osteomuscularC==1){this.examen_osteomuscularT="1";}
    if(this.examen_nerviosoC==1){this.examen_nerviosoT="1";}

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

      if(this.examen_laboratorioC==1){this.examen_laboratorioT="1"; }
      if(this.examen_electrocardiogramaC==1){this.examen_electrocardiogramaT="1";}
      if(this.examen_RToraxC==1){this.examen_RToraxT="1";}
      if(this.examen_otrosC==1){this.examen_otrosT="1";}

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
      this.ActualizarCitaHistorial(this.cedula);
      this.limpiar();
      this.spinner.hide('sample');
      Swal.fire(
        '¡Historial Clínico Creado..!',
        'El historial clínico se ha creado correctamente',
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
    this.DBID=0; this.DBI=0;this.HTA=0;this.TbP=0;
    this.ClaseDbid="";this.ClaseDbi="";this.ClaseHta="";this.ClaseTbp="";
  }
  RestaurarMujer(){
    this.ClaseFum='form-control form-input'; this.ClaseFpp='form-control form-input'; this.ClaseEdadG='form-control form-input';
    this.ClaseMenarquia='form-control form-input';this.ClaseFlujoG='form-control form-input'; this.ClaseGestas='form-control form-input';
    this.ClasePartos='form-control form-input'; this.ClaseAbortos='form-control form-input'; this.ClaseCesareas='form-control form-input';
    this.fum=0; this.fpp=0; this.edad_gestional=0; this.menarquia=0; this.flujo_genital=0; this.Gestas=0; this.Partos=0; this.cesareas=0;this.abortos=0;
  }

  ValidarMujer(){
    if(this.sexo=="Mujer" && this.ginecos_obstetricosC==0){
      if(this.fum==undefined|| this.fum==""|| this.fpp==undefined||this.fpp==""||this.edad_gestional==undefined||
         this.edad_gestional==null|| this.menarquia==undefined||this.menarquia==""||this.flujo_genital==undefined||
         this.flujo_genital==""||this.Gestas==undefined||this.Gestas==null||this.Partos==undefined||this.Partos==null||
         this.abortos==undefined||this.abortos==null||this.cesareas==undefined||this.cesareas==null
      ){
        if(this.fum==undefined|| this.fum==""){
          this.ClaseFum="form-control is-invalid";
        }
        if(this.fpp==undefined||this.fpp==""){
          this.ClaseFpp="form-control is-invalid";
        }
        if(this.edad_gestional==undefined||this.edad_gestional==null){
          this.ClaseEdadG="form-control is-invalid";
        }
        if(this.menarquia==undefined||this.menarquia==""){
          this.ClaseMenarquia="form-control is-invalid";
        }
        if(this.flujo_genital==undefined||this.flujo_genital==""){
          this.ClaseFlujoG="form-control is-invalid";
        }
        if(this.Gestas==undefined||this.Gestas==null){
          this.ClaseGestas="form-control is-invalid";
        }
        if(this.Partos==undefined||this.Partos==null){
          this.ClasePartos="form-control is-invalid";
        }
        if(this.abortos==undefined||this.abortos==null){
          this.ClaseAbortos="form-control is-invalid";
        }
        if(this.cesareas==undefined||this.cesareas==null){
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
    if(this.examen_cabezaC==0){
      if(this.examen_cabezaT=="" ||this.examen_cabezaT==undefined){
        this.ClaseTexamen_cabeza="form-control is-invalid";
      }
    }
    if(this.examen_cuelloC==0){
      if(this.examen_cuelloT==""||this.examen_cuelloT==undefined){
        this.ClaseTexamen_cuello="form-control is-invalid";
      }
    }
    if(this.examen_toraxC==0){
      if(this.examen_toraxT==""||this.examen_toraxT==undefined){
        this.ClaseTexamen_torax="form-control is-invalid";
      }
    }
    if(this.examen_abdomenC==0){
      if(this.examen_abdomenT==""||this.examen_abdomenT==undefined){
        this.ClaseTexamen_abdomen="form-control is-invalid";
      }
    }
    if(this.examen_msuperiorC==0){
      if(this.examen_msuperiorT==""||this.examen_msuperiorT==undefined){
        this.ClaseTexamen_msuperior="form-control is-invalid";
      }
    }
    if(this.examen_minferioresC==0){
      if(this.examen_minferioresT==""||this.examen_minferioresT==undefined){
        this.ClaseTexamen_minferiores="form-control is-invalid";
      }
    }
    if(this.examen_genitalC==0){
      if(this.examen_genitalT==""||this.examen_genitalT==undefined){
        this.ClaseTexamen_genital="form-control is-invalid";
      }
    }
    if(this.examen_analC==0){
      if(this.examen_analT==""||this.examen_analT==undefined){
        this.ClaseTexamen_anal="form-control is-invalid";
      }
    }
    if(this.examen_otrosC==0){
      if(this.examen_otrosT==""||this.examen_otrosT==undefined){
        this.ClaseTexamen_otros="form-control is-invalid";
      }
    }
    if(this.examen_digestivoC==0){
      if(this.examen_digestivoT==""||this.examen_digestivoT==undefined){
        this.ClaseTexamen_digestivo="form-control is-invalid";
      }
    }
    if(this.examen_respiratorioC==0){
      if(this.examen_respiratorioT==""||this.examen_respiratorioT==undefined){
        this.ClaseTexamen_respiratorio="form-control is-invalid";
      }
    }
    if(this.examen_cardiacoC==0){
      if(this.examen_cardiacoT==""||this.examen_cardiacoT==undefined){
        this.ClaseTexamen_cardiaco="form-control is-invalid";
      }
    }
    if(this.examen_genitourinarioC==0){
      if(this.examen_genitourinarioT==""||this.examen_genitourinarioT==undefined){
        this.ClaseTexamen_genitourinario="form-control is-invalid";
      }
    }
    if(this.examen_osteomuscularC==0){
      if(this.examen_osteomuscularT==""||this.examen_osteomuscularT==undefined){
        this.ClaseTexamen_osteomuscular="form-control is-invalid";
      }
    }
    if(this.examen_nerviosoC==0){
      if(this.examen_nerviosoT==""||this.examen_nerviosoT==undefined){
        this.ClaseTexamen_nervioso="form-control is-invalid";
      }
    }
    if(this.examen_laboratorioC==0){
      if(this.examen_laboratorioT==""||this.examen_laboratorioT==undefined){
        this.ClaseTexamen_laboratorio="form-control is-invalid";
      }
    }
    if(this.examen_electrocardiogramaC==0){
      if(this.examen_electrocardiogramaT==""||this.examen_electrocardiogramaT==undefined){
        this.ClaseTexamen_electrocardiograma="form-control is-invalid";
      }
    }
    if(this.examen_RToraxC==0){
      if(this.examen_RToraxT==""||this.examen_RToraxT==undefined){
        this.ClaseTexamen_RTorax="form-control is-invalid";
      }
    }


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
    if(this.edad==undefined||this.edad==null){
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
    let validarCampoMGandRF=0;
    if(this.containerSecretaria!=0){
      if(this.examen_cabezaC==0 && this.examen_cabezaT==""||this.examen_cuelloC==0 && this.examen_cuelloT==""||
      this.examen_toraxC==0 && this.examen_toraxT==""||this.examen_abdomenC==0 && this.examen_abdomenT==""||this.examen_msuperiorC==0 && this.examen_msuperiorT==""||this.examen_minferioresC==0 && this.examen_minferioresT==""||
      this.examen_genitalC==0 && this.examen_genitalT==""||this.examen_analC==0 && this.examen_analT==""|| this.examen_digestivoC==0 && this.examen_digestivoT==""||this.examen_respiratorioC==0 && this.examen_respiratorioT==""||
      this.examen_cardiacoC==0 && this.examen_cardiacoT=="" || this.examen_genitourinarioC==0 && this.examen_genitourinarioT==""|| this.examen_osteomuscularC==0 && this.examen_osteomuscularT==""|| this.examen_nerviosoC==0 && this.examen_nerviosoT==""||
      this.examen_laboratorioC==0 && this.examen_laboratorioT==""|| this.examen_electrocardiogramaC==0 && this.examen_electrocardiogramaT==""||this.examen_RToraxC==0 && this.examen_RToraxT==""|| this.examen_otrosC==0 && this.examen_otrosT==""){
        validarCampoMGandRF=1;
      }
    };
    if(this.apellidos==undefined||this.apellidos==""||this.nombresP==undefined||this.nombresP==""||
    this.cedula==undefined||this.cedula==""||this.edad==undefined||this.edad==null||this.gad==undefined||this.ocupacion==undefined||this.ocupacion==""||this.sexo==undefined||this.sexo==""||
    this.Lresidencia==undefined||this.Lresidencia==""||this.Lprocedencia==undefined||this.Lprocedencia==""||
    this.fechanacimiento==undefined||this.fechanacimiento==""||this.religion==undefined||this.religion==""||
    this.nivel_instruccion==undefined||this.nivel_instruccion==""||this.estado_civil==undefined||this.estado_civil==""||
    this.raza==undefined||this.raza==""||this.ninezC==0 && this.ninezT==""||this.adolescenciaC==0 && this.adolescenciaT==""||this.adultezC==0 &&this.adultezT==""||
    this.quirurgicosC==0 && this.quirurgicosT==""||this.alergicosC==0 && this.alergicosT==""||this.traumatologicosC==0 &&
    this.traumatologicosT==""||mujer==true||this.alcohol==undefined||this.tabaco==undefined||this.drogas==undefined||
    this.alimentacion==undefined||this.diuresis==undefined||this.somnia==undefined||validarCampoMGandRF==1
 ){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para registrar el historial clínico.'
      })

      this.validacionTotal();


    }else{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
        })
         swalWithBootstrapButtons.fire({
          title: '¿Crear Historia Clínica?',
          text: "Una vez creada podrá ser atendido el paciente.",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si, crear!',
          cancelButtonText: 'No, cancelar!',
          confirmButtonColor: '#20a8d8',
          cancelButtonColor: '#f86c6b',
          reverseButtons: true

        }).then((result) => {

          if (result.isConfirmed) {
            this.ServicioSecretaria.ValidarIngreso(this.cedula).then(data =>{
              if(data ['code'] == '201'){
                Swal.fire(
                  '¡Paciente ya Registrado..!',
                  'El paciente ya cuenta con historial clínico',
                  'error'
                )
              }else{
                this.spinner.show('sample');
                this.IngresarDatosPaciente();
              }

            });
          }else if (/* Read more about handling dismissals below */result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              '¡Cancelado..!',
              'No se ha creado la historia clínica.',
              'error'
            )
          }
        })

    }


  }


  actualizarDatos(){
    let mujer = this.ValidarMujer();
    let validarCampoMGandRF=0;
    if(this.containerSecretaria!=0){
      if(this.examen_cabezaC==0 && this.examen_cabezaT==""||this.examen_cuelloC==0 && this.examen_cuelloT==""||
      this.examen_toraxC==0 && this.examen_toraxT==""||this.examen_abdomenC==0 && this.examen_abdomenT==""||this.examen_msuperiorC==0 && this.examen_msuperiorT==""||this.examen_minferioresC==0 && this.examen_minferioresT==""||
      this.examen_genitalC==0 && this.examen_genitalT==""||this.examen_analC==0 && this.examen_analT==""|| this.examen_digestivoC==0 && this.examen_digestivoT==""||this.examen_respiratorioC==0 && this.examen_respiratorioT==""||
      this.examen_cardiacoC==0 && this.examen_cardiacoT=="" || this.examen_genitourinarioC==0 && this.examen_genitourinarioT==""|| this.examen_osteomuscularC==0 && this.examen_osteomuscularT==""|| this.examen_nerviosoC==0 && this.examen_nerviosoT==""||
      this.examen_laboratorioC==0 && this.examen_laboratorioT==""|| this.examen_electrocardiogramaC==0 && this.examen_electrocardiogramaT==""||this.examen_RToraxC==0 && this.examen_RToraxT==""|| this.examen_otrosC==0 && this.examen_otrosT==""){
        validarCampoMGandRF=1;
      }
    };
    if(this.apellidos==undefined||this.apellidos==""||this.nombresP==undefined||this.nombresP==""||
       this.cedula==undefined||this.cedula==""||this.edad==undefined||this.edad==null||this.gad==undefined||this.ocupacion==undefined||this.ocupacion==""||this.sexo==undefined||this.sexo==""||
       this.Lresidencia==undefined||this.Lresidencia==""||this.Lprocedencia==undefined||this.Lprocedencia==""||
       this.fechanacimiento==undefined||this.fechanacimiento==""||this.religion==undefined||this.religion==""||
       this.nivel_instruccion==undefined||this.nivel_instruccion==""||this.estado_civil==undefined||this.estado_civil==""||
       this.raza==undefined||this.raza==""||this.ninezC==0 && this.ninezT==""||this.adolescenciaC==0 && this.adolescenciaT==""||this.adultezC==0 &&this.adultezT==""||
       this.quirurgicosC==0 && this.quirurgicosT==""||this.alergicosC==0 && this.alergicosT==""||this.traumatologicosC==0 &&
       this.traumatologicosT==""||mujer==true||this.alcohol==undefined||this.tabaco==undefined||this.drogas==undefined||
       this.alimentacion==undefined||this.diuresis==undefined||this.somnia==undefined||validarCampoMGandRF==1
    ){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para actualizar el historial clínico.'
      })
      this.validacionTotal();

    }else{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
        })
         swalWithBootstrapButtons.fire({
          title: '¿Actualizar Historia Clínica?',
          text: "La historia clínica se modificará.",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si, actualizar!',
          cancelButtonText: 'No, cancelar!',
          confirmButtonColor: '#20a8d8',
          cancelButtonColor: '#f86c6b',
          reverseButtons: true

        }).then((result) => {

          if (result.isConfirmed) {
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

    if(this.examen_cabezaC==1){this.examen_cabezaT="1";}
    if(this.examen_cuelloC==1){this.examen_cuelloT="1";}
    if(this.examen_toraxC==1){this.examen_toraxT="1";}
    if(this.examen_abdomenC==1){this.examen_abdomenT="1";}
    if(this.examen_msuperiorC==1){this.examen_msuperiorT="1";}
    if(this.examen_minferioresC==1){this.examen_minferioresT="1";}
    if(this.examen_genitalC==1){this.examen_genitalT="1";}
    if(this.examen_analC==1){this.examen_analT="1";}

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
    if(this.examen_digestivoC==1){this.examen_digestivoT="1";}
    if(this.examen_respiratorioC==1){this.examen_respiratorioT="1";}
    if(this.examen_cardiacoC==1){this.examen_cardiacoT="1";}
    if(this.examen_genitourinarioC==1){this.examen_genitourinarioT="1";}
    if(this.examen_osteomuscularC==1){this.examen_osteomuscularT="1";}
    if(this.examen_nerviosoC==1){this.examen_nerviosoT="1";}
    let EOSActualizar = {
      'sistema_digestivo':this.examen_digestivoT,
      'sistema_respiratorio':this.examen_respiratorioT,
      'sistema_cardiaco':this.examen_cardiacoT,
      'sistema_genitourinarion':this.examen_genitourinarioT,
      'sistema_osteomuscular':this.examen_osteomuscularT,
      'sistema_nervioso':this.examen_nerviosoT,
    }

    this.ServicioSecretaria.updateEOS( EOSActualizar, this.id_sistema ).then(data =>{});

    if(this.examen_laboratorioC==1){this.examen_laboratorioT="1"; }
    if(this.examen_electrocardiogramaC==1){this.examen_electrocardiogramaT="1";}
    if(this.examen_RToraxC==1){this.examen_RToraxT="1";}
    if(this.examen_otrosC==1){this.examen_otrosT="1";}
    let examenesComplementariosActualizar = {
      'laboratorio':this.examen_laboratorioT,
      'electrocardiograma':this.examen_electrocardiogramaT,
      'radiografia_torax':this.examen_RToraxT,
      'otros':this.examen_otrosT,
    }

    this.ServicioSecretaria.updateComplementario( examenesComplementariosActualizar, this.id_complementario ).then(data =>{
      this.spinner.hide('sampleA');
      Swal.fire(
        '¡Correcto..!',
        'Datos actualizados correctamente.',
        'success'
      )
      this.limpiar();
      this.rutas.navigate(['/pacientes']);
    });

          }else if (/* Read more about handling dismissals below */result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              '¡Cancelado..!',
              'No se ha actualizado la historia clínica.',
              'error'
            )
          }
        })
    }
}

  aggArrayDB(){
    if(this.nombres == undefined || this.nombres=='' || this.estado == undefined || this.estado == ''||this.union==undefined || this.union == ''){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para registrar el historial clínico.'
      })

        if(this.nombres==""||this.nombres == undefined){
          this.ClaseAntecedentePato="form-control is-invalid";
        }

        if(this.estado==undefined || this.estado==''){
          this.ClaseEstados="invalido";
        }

        if(this.union==undefined||this.union==""){
          this.ClaseUnion="form-control is-invalid";
        }

    }else{
    let  arrayLocal:any;

    if(this.union == "Otro"){
      this.union = this.union2;
    }
    if(this.estadoT == null || this.estadoT== ""){
      this.estadoT = "Sin causas";
    }
    if(this.estado==1){
      this.estadoT = "Sin causas";
    }
    this.spinner.show('sampleA');
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
    this.spinner.hide('sampleA');
  }

  eliminarFamiliarBD(id_familiar:number){
    this.spinner.show('sampleA');
    this.ServicioSecretaria.eliFamiliares(id_familiar,this.id_PacienteDA).then(data =>{
      this.LlenarArrayDB();
    });
  }

  ngOnDestroy(): void{
    localStorage.removeItem('CedulaExamenes');
    localStorage.removeItem('historiaClinica');
  }
}



