import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { SecretariaService } from '../../../servicios/secretaria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss']
})
export class AgendarCitaComponent implements OnInit {

  constructor(private ServicioSecretaria:SecretariaService) { }


  isCollapsed = false;
  public sidebarMinimized = false;
  public navItems = navItems;
  ClaseCdula:string="form-control form-input select-number"; 
  //Variables para datos pacientes 
  nombres; fecha_consulta; cedula; especialidad; idT:number;

  Array_Turnos:any [];

  ngOnInit() {
    
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
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

  AgendarCita(){
    let paciente = {
      'nombres':this.nombres,
      'cedula':this.cedula,
      'fecha':this.fecha_consulta,
      'especialidad':this.especialidad,
      'id_turno':this.idT[0],
    }
    this.ServicioSecretaria.AddCitas(paciente).then(data =>{
      Swal.fire(
        'Correcto',
        'Cita agendada correctamente',
        'success'
      )
    });
  }

  ValidarCita(){
    this.ServicioSecretaria.ValidarCitas(this.cedula, this.fecha_consulta).then(data =>{
      if(data ['code'] == '201'){
        Swal.fire(
          'Error!',
          'El usuaria ya cuenta con una cita en esta fecha',
          'error'
        )
      }else
        this.AgendarCita();
    });
  }

  Turnos(fecha:Date){
    this.Array_Turnos =null;
    this.ServicioSecretaria.ValidarTurno(fecha).then(data =>{
      this.Array_Turnos = data ['result'];
    });
  }



}
