import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import Swal from 'sweetalert2';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import { SecretariaService } from '../../../servicios/secretaria.service';
@Component({
  selector: 'app-registrar-historia-clinica',
  templateUrl: './registrar-historia-clinica.component.html',
  styleUrls: ['./registrar-historia-clinica.component.scss']
})
export class RegistrarHistoriaClinicaComponent implements OnInit {

  constructor(private medicinag:MedicinaGeneralService, private ServicioSecretaria:SecretariaService ) { }

  public sidebarMinimized = false;
  public navItems = navItems;
  inputCedula: boolean = false;
  inputCedula2: boolean = false;
  ClaseCdula:string="form-control form-input select-number"; 
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
  number: number = 0;
  DatosFamiliares=[];
  edit:number = 0;
  select="hola";
  actualizar:number=0;
  //id para relaciones
  id_obstetrico:number; id_patologico:number; id_e_fisico:number; 
  id_sistema:number; id_complementario:number; id_habito:number; id_paciente:number;
  id_familiar:number; id_PacienteDA:number; id_gineco:number;
  
  //classCheck
  gadClass:string;

  //cheak
  gadCSi:string='0'; gadCNo:string='1'; 

  //Variables de  Datos de Afiliación
  apellidos; nombresP; cedula; edad; ocupacion; sexo; Lresidencia; Lprocedencia; fechanacimiento;
  raza; religion; nivel_instruccion; estado_civil; gad;

  //Variables de datos de Antecedentes Patológicos Personales
  ninezT; adolescenciaT; adultezT; quirurgicosT; alergicosT; traumatologicosT; fum; fpp; edad_gestional;
  menarquia; flujo_genital; Gestas; Partos; abortos; cesareas; DBT; HTA; TBC; GEMELAR; 
  //Check Variables Antecedentes Patológicos Personales
  ninezC:number; adolescenciaC:number; adultezC:number; quirurgicosC:number; alergicosC:number; traumatologicosC:number; ginecos_obstetricosC:number;

  //Variables de Antecedentes Patológicos Familiares
  nombres; union; estado; estadoT; union2;

  //Variables de Hábitos Personales
  alcoholT; tabacoT; drogasT; alimentacionT; diuresisT; somniaT;
  //Check Variables Habitos Personales
  alcoholC:number; tabacoC:number; drogasC:number; alimentacionC:number; diuresisC:number; somniaC:number; 

  //Variables de Examenes Físicos Generales
  examen_cabezaT; examen_cuelloT; examen_toraxT; examen_abdomenT; examen_msuperiorT; examen_minferioresT; examen_genitalT; examen_analT;
  //Check Variables Examenes Físicos Generales
  examen_cabezaC:number; examen_cuelloC:number; examen_toraxC:number; examen_abdomenC:number; examen_msuperiorC:number; examen_minferioresC:number; examen_genitalC:number; examen_analC:number;


  //Variables de Examenes de Organos y Sistemas
  examen_digestivoT; examen_respiratorioT; examen_cardiacoT; examen_genitourinarioT; examen_osteomuscularT; examen_nerviosoT;
  //Check Variables Examenes de Organos y Sistemass
  examen_digestivoC:number; examen_respiratorioC:number; examen_cardiacoC:number; examen_genitourinarioC:number; examen_osteomuscularC:number; examen_nerviosoC:number;

  //Variables de Examenes Complementarios
  examen_laboratorioT; examen_electrocardiogramaT; examen_RToraxT; examen_otrosT;
  //Check Variables Examenes Complementarioss
  examen_laboratorioC:number; examen_electrocardiogramaC:number; examen_RToraxC:number; examen_otrosC:number;

  limpiar(){

    this.ClaseCdula="form-control form-input select-number"; 

    //cheak
    this.alcoholC=0;this.tabacoC=0;this.drogasC=0;this.alimentacionC=0;this.diuresisC=0;this.somniaC=0;
    this.ninezC=0; this.adolescenciaC=0; this.adultezC=0; this.quirurgicosC=0; this.alergicosC=0; this.alergicosC=0; this.ginecos_obstetricosC=0; this.traumatologicosC=0;
    this.examen_cabezaC=0; this.examen_cuelloC=0; this.examen_toraxC=0; this.examen_abdomenC=0; this.examen_msuperiorC=0; this.examen_minferioresC=0; this.examen_genitalC=0; this.examen_analC=0;
    this.examen_digestivoC=0; this.examen_respiratorioC=0; this.examen_cardiacoC=0; this.examen_genitourinarioC=0; this.examen_osteomuscularC=0; this.examen_nerviosoC=0;
    this.examen_laboratorioC=0; this.examen_electrocardiogramaC=0; this.examen_RToraxC=0; this.examen_otrosC=0;
    this.gadCSi='2'; this.gadCNo='2';

    this.DatosFamiliares=[]; this.number=0; this.edit=0; this.actualizar=0;
    //variables de los id Para relacionar y actualizar
    this.id_obstetrico=null; this.id_patologico=null; this.id_e_fisico=null; 
    this.id_sistema=null; this.id_complementario=null; this.id_habito=null; this.id_paciente=null;
    this.id_familiar=null; this.id_PacienteDA=null;
  
  //Variables de  Datos de Afiliación
  this.apellidos=""; this.nombresP=""; this.cedula=""; this.edad=""; this.ocupacion=""; this.sexo=""; this.Lresidencia=""; this.Lprocedencia=""; this.fechanacimiento="";
  this.raza=""; this.religion=""; this.nivel_instruccion=""; this.estado_civil=""; this.gad="";

  //Variables de datos de Antecedentes Patológicos Personales
  this.ninezT=""; this.adolescenciaT=""; this.adultezT=""; this.quirurgicosT=""; this.alergicosT=""; this.traumatologicosT=""; this.fum=""; this.fpp=""; this.edad_gestional="";
  this.menarquia=""; this.flujo_genital=""; this.Gestas=""; this.Partos=""; this.abortos=""; this.cesareas=""; this.DBT=""; this.HTA=""; this.TBC=""; this.GEMELAR=""; 

  //Variables de Antecedentes Patológicos Familiares
  this.nombres=""; this.union=""; this.estado=""; this.estadoT=""; this.union2="";

  //Variables de Hábitos Personales
  this.alcoholT=""; this.tabacoT=""; this.drogasT=""; this.alimentacionT=""; this.diuresisT=""; this.somniaT=""; 

  //Variables de Examenes Físicos Generales
  this.examen_cabezaT=""; this.examen_cuelloT=""; this.examen_toraxT=""; this.examen_abdomenT=""; this.examen_msuperiorT=""; this.examen_minferioresT=""; this.examen_genitalT=""; this.examen_analT="";

  //Variables de Examenes de Organos y Sistemas
  this.examen_digestivoT=""; this.examen_respiratorioT=""; this.examen_cardiacoT=""; this.examen_genitourinarioT=""; this.examen_osteomuscularT=""; this.examen_nerviosoT="";

  //Variables de Examenes Complementarios
  this.examen_laboratorioT=""; this.examen_electrocardiogramaT=""; this.examen_RToraxT=""; this.examen_otrosT="";
  }

  ngOnInit(): void {

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
      debugger
      this.nombres = "";
      this.union = "";
      this.union2 = "";
      this.estado = "";
      this.estadoT = "";

  }

  EliminarDatosArray(elimina:string){
    this.DatosFamiliares.splice(this.DatosFamiliares.indexOf(dato => dato.nombres === elimina), 1);
    this.number --;
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
   }
   checkRadioNo(radioCheck:string){
    if(radioCheck=='gad'){this.gad=0;}
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
      if(id_gineco==1){this.ginecos_obstetricosC=1;this.fum='';this.fpp='';this.edad_gestional='';this.menarquia='';this.Gestas='';this.Partos='';
      this.cesareas=''; this.abortos=''; this.flujo_genital='';}
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

  Consultar(){
    if(this.cedula== undefined || this.cedula=="undefined"){
      Swal.fire(
        'Campo vacío',
        'Ingrese un número de cédula',
        'warning'
      )
    }else{
      this.medicinag.AtenderPaciente(this.cedula).then(data => {  
           
        if(data['code'] === '201'){
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
              this.gadCSi=''; this.gadCNo='';  
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
              this.DBT=data['result']['antecedentes_patologicos_personales'].DBT;
              this.HTA=data['result']['antecedentes_patologicos_personales'].HTA;
              this.TBC=data['result']['antecedentes_patologicos_personales'].TBC;
              this.GEMELAR=data['result']['antecedentes_patologicos_personales'].GEMELAR;
              this.quirurgicosT=data['result']['antecedentes_patologicos_personales'].quirujircos;
              this.alergicosT=data['result']['antecedentes_patologicos_personales'].alergias;
              this.traumatologicosT=data['result']['antecedentes_patologicos_personales'].traumas;
              this.id_gineco=data['result']['antecedentes_patologicos_personales'].id_gineco;  
              //Condiciones para los check
              if(this.ninezT==1){this.ninezC=1; this.ninezT='';}
              if(this.adolescenciaT==1){this.adolescenciaC=1;this.adolescenciaT='';}
              if(this.adultezT==1){this.adultezC=1;this.adultezT='';}
              if(this.quirurgicosT==1){this.quirurgicosC=1;this.quirurgicosT='';}
              if(this.traumatologicosT==1){this.traumatologicosC=1;this.traumatologicosT='';}
              if(this.alergicosT==1){this.alergicosC=1;this.alergicosT='';}
             
              if(this.sexo == "Mujer"){
                this.cargarGinecoPersonal(this.id_gineco);
              }
              
              this.alcoholT=data['result']['habitos'].alcohol;
              this.tabacoT=data['result']['habitos'].tabaco;
              this.drogasT=data['result']['habitos'].drogas;
              this.alimentacionT=data['result']['habitos'].alimentacion;
              this.diuresisT=data['result']['habitos'].diuresis;
              this.somniaT=data['result']['habitos'].somnia;
              //Condiciones para los check
              if(this.alcoholT==1){this.alcoholC=1; this.alcoholT='';}
              if(this.tabacoT==1){this.tabacoC=1;this.tabacoT='';}
              if(this.drogasT==1){this.drogasC=1;this.drogasT='';}
              if(this.alimentacionT==1){this.alimentacionC=1;this.alimentacionT='';}
              if(this.diuresisT==1){this.diuresisC=1;this.diuresisT='';}
              if(this.somniaT==1){this.somniaC=1;this.somniaT='';}
         
              this.DatosFamiliares=data['result']['familiares'];
              this.id_familiar=data['result']['familiares'][0].id_familiar;
              this.number=1;
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
              
              
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              this.edit=0;
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'Se ha cancelado correctamente',
                'error'
              )
            }
          })
         }
         else{
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

  IngresarAntecedesPersonales(){
    if(this.sexo=="Hombre"){
      this.id_obstetrico = 1;
    }
    let APerosonales = {
      'id_gineco':this.id_obstetrico,
      'infancia':this.ninezT,
      'adolecencia': this.adolescenciaT,
      'adultez':this.adultezT,
      'DBT':this.DBT,
      'HTA': this.HTA,
      'TBC': this.TBC,
      'GEMELAR': this.GEMELAR,
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
      'alcohol':this.alcoholT,
      'tabaco':this.tabacoT,
      'drogas': this.drogasT,
      'alimentacion':this.alimentacionT,
      'diuresis':this.diuresisT,
      'somnia':this.somniaT,
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
    debugger
    this.ServicioSecretaria.AgregarPaciente(pacientesA).then(data =>{
      this.id_paciente = data['id'];
      this.AntecedentesFamiliares();
    });
  }

  AntecedentesFamiliares(){
    let  arrayLocal={};
    for (let item of this.DatosFamiliares) { 
      arrayLocal = {
          "nombres": item[0].nombres,
          "union": item[0].union,
          "vida": item[0].vida,
          "causas":item[0].causas,
      }
      this.ServicioSecretaria.Familiares(arrayLocal).then(data =>{
        this.id_familiar = data['id'];
        this.AntecedentesPatologicosF();
      });
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

  VaidarPaciente(){
    this.ServicioSecretaria.ValidarIngreso(this.cedula).then(data =>{
      if(data ['code'] == '201'){
        Swal.fire(
          'Error!',
          'El paciente ya cuenta con historial clínico',
          'error'
        )
      }else
        this.IngresarDatosPaciente();
    });
  }


  actualizarDatos(){
    
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

    if(this.sexo=="Hombre"){
      if(this.ninezC==1){this.ninezT=1}
      if(this.adolescenciaC==1){this.adolescenciaT=1;}
      if(this.adultezC==1){this.adultezT=1;}
      if(this.quirurgicosC==1){this.quirurgicosT=1;}
      if(this.traumatologicosC==1){this.traumatologicosT=1;}
      if(this.alergicosC==1){this.alergicosT=1;}     
      let APPActualizar = {
        'infancia':this.ninezT,
        'adolecencia':this.adolescenciaT,
        'adultez':this.adultezT,
        'DBT':this.DBT,
        'HTA':this.HTA,
        'TBC':this.TBC,
        'GEMELAR':this.GEMELAR,
        'quirujircos':this.quirurgicosT,
        'alergias':this.alergicosT,
        'traumas':this.traumatologicosT,
        'id_gineco':1,
      }
 
      this.ServicioSecretaria.updateAntecedentesPatologicoPersonales( APPActualizar, this.id_patologico ).then(data =>{});
    }else{
      debugger
        this.actualizarGinecosPersonal();
    }

    //Condicionales del checkHabitos
    if(this.alcoholC==1){this.alcoholT=1;}
    if(this.tabacoC==1){this.tabacoT=1;}
    if(this.drogasC==1){this.drogasT=1;}
    if(this.alimentacionC==1){this.alimentacionT=1;}
    if(this.diuresisC==1){this.diuresisT=1;}
    if(this.somniaC==1){this.somniaT=1;}

    let habitosActualizar = {
      'alcohol':this.alcoholT,
      'tabaco':this.tabacoT,
      'drogas':this.drogasT,
      'alimentacion':this.alimentacionT,
      'diuresis':this.diuresisT,
      'somnia':this.somniaT,         
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
      Swal.fire(
        'Correcto',
        'Datos actualizados correctamente',
        'success'
      )
      this.limpiar();
    });
  }
}
  


