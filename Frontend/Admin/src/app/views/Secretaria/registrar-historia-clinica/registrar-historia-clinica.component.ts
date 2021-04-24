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
  EstadoVida: boolean = true;
  number: number = 0;
  DatosFamiliares: any = [];
  edit:number = 0;

  //Variables de  Datos de Afiliación
  apellidos; nombresP; cedula; edad; ocupacion; sexo; Lresidencia; Lprocedencia; fechanacimiento;
  raza; religion; nivel_instrucciong; estado_civil;

  //Variables de datos de Antecedentes Patológicos Personales
  ninezT; adolescenciaT; adultezT; quirurgicosT; alergicosT; traumatologicosT; fum; fpp; edad_gestional;
  menarquia; flujo_genital; Gestas; Partos; abortos; cesareas; DBT; HTA; TBC; GEMELAR; 

  //Variables de Antecedentes Patológicos Familiares
  nombres; union; estado; estadoT; union2;

  //Variables de Hábitos Personales
  alcoholT; tabacoT; drogasT; alimentacionT; diuresisT; somniaT; 

  //Variables de Examenes Físicos Generales
  examen_cabezaT; examen_cuelloT; examen_toraxT; examen_abdomenT; examen_msuperiorT; examen_minferioresT; examen_genitalT; examen_analT;

  //Variables de Examenes de Organos y Sistemas
  examen_digestivoT; examen_respiratorioT; examen_cardiacoT; examen_genitourinarioT; examen_osteomuscularT; examen_nerviosoT;

  //Variables de Examenes Complementarios
  examen_laboratorioT; examen_electrocardiogramaT; examen_RToraxT; examen_otrosT;
  


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
          "nombresF": this.nombres,
          "unionF": this.union,
          "estadoF": this.estado,
          "causasF":this.estadoT,
      }];
      this.DatosFamiliares.push(DatosFamiliares2);
  }

  EliminarDatosArray(elimina:string){
    this.DatosFamiliares.splice(this.DatosFamiliares.indexOf(dato => dato.nombresF === elimina), 1);
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

  Consultar(){
    debugger
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
            //llamar los datos y llenarlos
            this.edit=1;
            
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
         }
        })
        .catch((error) => {
          console.log(error);
        });

    }
    
  
  }

  IngresarDatosPaciente(){
    let id_obstetrico;
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
      id_obstetrico = data['id'];
      debugger
    });



  }
  

}
