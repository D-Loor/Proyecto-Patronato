
import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { SecretariaService } from '../../../servicios/secretaria.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { CitasService } from '../../../servicios/citas.service';
import { AdministradorService } from '../../../servicios/administrador.service';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss']
})

export class AgendarCitaComponent implements OnInit {

  constructor(public rutas:Router,private administradorService:AdministradorService, public citasser:CitasService, private ServicioSecretaria:SecretariaService, private spinner: NgxSpinnerService) { }

  @ViewChild('smallModal') public smallModal: ModalDirective;
  loadingText = 'Guardando...';



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

  isCollapsed = false;
  public sidebarMinimized = false;
  public navItems = navItems;
  idCita="";
  abonoCita="";
  cedulaCita="";
  //Variables para validar
  ClaseCdula:string="form-control form-input select-number";
  ClaseCNombre:string="form-control form-input select-number";
  ClaseCEspecialidad:string="form-control form-input select-number";
  ClaseCFecha:string="form-control form-input select-number";
  ClaseCHora:string="form-control form-input select-number";
  ClasePrecio='form-control form-input select-number';
  ClaseObser='form-control';
  ClaseGad;

  //Variables para datos pacientes
  nombres; fecha_consulta; cedula; especialidad="Medicina General"; idT:string;abono=false; HorasTurnos;
  estado=0;
  ArrayTurnos: any = []
  listaRoles:any=[];
  pago=0;
  exo=0;
  recau=0;
  gad;
  Validar; observaciones;

  //Recaudacion
  precio; idPaciente;

  today = new Date();
  fechaActual:string;

  AbrirModal(){
    if(this.fecha_consulta==undefined||this.fecha_consulta==null){
      Swal.fire(
        '¡La fecha no ha sido seleccionada..!',
        'Debe selecionar la fecha de la cita primero.',
        'error'
      );
      return false;
    }else{
      this.smallModal.show();
    }

  }

  CargarRecaudacion(){
    if(this.precio==null || this.precio==undefined || this.observaciones==""|| this.observaciones==undefined
      || this.gad==undefined||this.gad==null
      ){
        Swal.fire({
          icon: 'error',
          title: '¡Hay campos vacíos..!',
          text: 'Debe de completar todo el formulario para agregar la recaudación.'
        })
        if(this.observaciones=="" || this.observaciones == undefined){
          this.ClaseObser ="form-control is-invalid";
        }
        if(this.precio == undefined||this.precio == null){
          this.ClasePrecio ="form-control is-invalid";
        }
        if(this.gad==undefined||this.gad==null){
          this.ClaseGad="invalido";
        }
    }else{
      this.ServicioSecretaria.Roles(this.especialidad).then(data=>{
        this.spinner.show('sample');
        let idR = data['result'].id_rol;
        let datosA={
          'id_paciente':this.idPaciente,
          'id_rol':idR,
          'fecha':this.fecha_consulta,
          'valor':this.precio,
          'exonera':this.gad,
          'observaciones':this.observaciones,
        }
        this.GuardarRecaudacion(datosA);
      }).catch((error) => {
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
      });
    }


  }

  GuardarRecaudacion(data:any){
    this.ServicioSecretaria.Recaudacion(data).then(data=>{
      this.LimpiarR();
      this.smallModal.hide();
      this.recau=1;
      Swal.fire(
        '¡Valor Registrado!',
        'La recaudación fue ingresada correctamente.',
        'success'
      );
      this.spinner.hide('sample');
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }

  LimpiarR(){
    this.precio="";
    this.gad=undefined;
    this.observaciones="";
    this.ClasePrecio='form-control form-input select-number';
    this.ClaseObser='form-control';
    this.ClaseGad="";

  }


  ngOnInit() {
    if((this.today.getMonth()+1)<10 || this.today.getDate()<10){
      if((this.today.getMonth()+1)<10 && this.today.getDate()<10){
        this.fechaActual=this.today.getFullYear() + "-0" + (this.today.getMonth() +1) + "-0" + this.today.getDate();
      }
      if((this.today.getMonth()+1)<10 && this.today.getDate()>10){
        this.fechaActual=this.today.getFullYear() + "-0" + (this.today.getMonth() +1) + "-" + this.today.getDate();
      }
      if((this.today.getMonth()+1)>10 && this.today.getDate()<10){
       this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-0" + this.today.getDate();
      }
    }else{
      this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    }

    console.log(this.fechaActual);
    this.cargarRoles();
    this.idCita = localStorage.getItem('idCita');
    this.cedulaCita= localStorage.getItem('cedulaCita');
    if(localStorage.getItem('abonoCita')=="1"){
      this.abono=true;
    }

    if(this.cedulaCita != "" && this.cedulaCita != undefined){
      this.nombres=localStorage.getItem('nombres');
      this.cedula=localStorage.getItem('cedulaCita');
      this.estado=1;
    }
  }

  cargarRoles(){
    this.administradorService.cargarRolesMedicos().then(data=>{
      if(data['code']=="201"){
        this.listaRoles = data['result'];
      }else{
        this.listaRoles =null;
      }
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }


  ngOnDestroy(){
    localStorage.removeItem('cedulaCita');
    localStorage.removeItem('idCita');
    localStorage.removeItem('abonoCita');
    localStorage.removeItem('nombres');
  }

  Consultar(cedula:string){
    this.loadingText = 'Cargando...';
    this.spinner.show('sample');

       if(this.cedula==undefined || this.cedula==""){
      this.spinner.hide('sample');
      Swal.fire({
        icon: 'error',
        title: '¡Cédula Inválida..!',
        text: 'La cédula a buscar no es válida.'
      })
    }else{
      this.ServicioSecretaria.ValidarIngreso(cedula).then(data =>{
        if(data ['code'] == '202'){
          this.spinner.hide('sample');
          Swal.fire(
            '¡Sin registros..!',
            'El paciente no cuenta con un historial clínico.',
            'error'
          );
        }else{
          Swal.fire(
            '¡Encontrado!',
            'El paciente cuenta con un historial clínico.',
            'success'
          );
          this.pago=1;
          this.nombres = data['result'].nombres+ " " + data['result'].apellidos;
          this.spinner.hide('sample');
        }
      }).catch((error) => {
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
      });
    }



  }

  ValidarCedula(cedulaV: number) {
    let cedula = String(cedulaV);
    this.pago=0;
    if(cedula === "undefined" ||  cedula === "null"){

      this.ClaseCdula="form-control form-input select-number";

    }else if (cedula.length === 10) {
      this.ServicioSecretaria.ValidarIngreso(cedula).then(data =>{
        if(data['code']=="201"){
          this.idPaciente= data['result'].id_paciente;
          this.pago=1;
        }else{
          this.abono = false;
        }

      }).catch((error) => {
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
      });
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

  GuardarCita(name:string){
    let compro="";
    if(this.abono==true){
      compro="DOADBA";
    }else{
      compro="FALSO";
    }
    let paciente = {
      'nombres':this.nombres,
      'cedula':this.cedula,
      'fecha':this.fecha_consulta,
      'especialidad':this.especialidad,
      'abono':compro,
      'id_turno':this.idT[0],
      'fecha_actual':this.fechaActual,
    }

    this.ServicioSecretaria.AddCitas(paciente).then(data =>{
      this.spinner.hide(name);
      Swal.fire(
        '¡Cita Agendada..!',
        'La cita médica fue agendada correctamente.',
        'success'
      );
      this.nombres="";
      this.cedula ="";
      this.fecha_consulta="";
      this.idT="";
      this.abono=false;
      this.recau=0;
      this.exo=0;
      this.pago=0;
      this.especialidad="Medicina General";
      this.ClaseCdula="form-control form-input select-number";
      this.ArrayTurnos = [];
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }

  AgendarCita(){
    this.loadingText = 'Guardando...';
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-info',
        cancelButton: 'btn btn-danger'

      },
      buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
      title: '¿Desea Agendar la Cita?',
      text: "Una vez agendada no se podrá modificar.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Agendar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#20a8d8',
      cancelButtonColor: '#f86c6b',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show('sample');
        this.GuardarCita('sample');

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado!',
          'No se ha agendado la cita médica.',
          'error'
        )
      }
    })

  }

  ActualizarCita(){

    if( this.nombres==undefined || this.nombres=="" || this.cedula==undefined || this.cedula=="" || this.especialidad==undefined || this.especialidad=="" || this.fecha_consulta==undefined || this.fecha_consulta=="" ||this.idT==undefined || this.idT==""){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para reagendar la cita médica.'
      })
      if(this.nombres==undefined || this.nombres==""){
        this.ClaseCNombre = "form-control is-invalid select-number";
      }
      if(this.cedula==undefined || this.cedula==""){
        this.ClaseCdula = "form-control is-invalid select-number";
      }
      if(this.especialidad==undefined || this.especialidad==""){
        this.ClaseCEspecialidad = "form-control is-invalid select-number";
      }
      if(this.fecha_consulta==undefined || this.fecha_consulta==""){
        this.ClaseCFecha = "form-control is-invalid select-number";
      }
      if(this.idT==undefined || this.idT==""){
        this.ClaseCHora = "form-control is-invalid select-number";
      }

    }else{
      this.ReagendarCita();
    }



  }

  Actualizar(id_cita,nombres,cedula,especialidad,fecha,abono,id_turno){

    let abo="NoExiste"
    if(abono==1){
      abo='DOADBA';
    }
    let arrayLocal = {
      "id_cita": id_cita,
      "nombres": nombres,
      "cedula": cedula,
      "especialidad": especialidad,
      "fecha": fecha,
      "abono": abo,
      "id_turno": id_turno,
      'fecha_actual':this.fechaActual,
    }

    this.citasser.updatecitas(arrayLocal,cedula).then(data =>{
      Swal.fire(
        '¡Cita Reagendada..!',
        'Se ha reagendado la cita médica.',
        'success'
      )
      this.spinner.hide('sample');
      this.rutas.navigate(['/citas']);
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });


  }

  ReagendarCita(){
    this.loadingText = 'Guardando...';
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-info',
        cancelButton: 'btn btn-danger'

      },
      buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
      title: '¿Desea Reagendar la Cita?',
      text: "Una vez reagendada no se podrá modificar.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Reagendar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#20a8d8',
      cancelButtonColor: '#f86c6b',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show('sample');
        this.Actualizar(this.idCita,this.nombres,this.cedulaCita,this.especialidad,this.fecha_consulta,this.abono,this.idT[0]);

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado!',
          'No se ha reagendado la cita médica.',
          'error'
        )
      }
    })

  }

  ValidarCita(name:string){

    if( this.nombres==undefined || this.nombres=="" || this.cedula==undefined || this.cedula=="" || this.especialidad==undefined || this.especialidad=="" || this.fecha_consulta==undefined || this.fecha_consulta=="" ||this.idT==undefined || this.idT==""){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para agendar la cita médica.'
      })
      if(this.nombres==undefined || this.nombres==""){
        this.ClaseCNombre = "form-control is-invalid select-number";
      }
      if(this.cedula==undefined || this.cedula==""){
        this.ClaseCdula = "form-control is-invalid select-number";
      }
      if(this.especialidad==undefined || this.especialidad==""){
        this.ClaseCEspecialidad = "form-control is-invalid select-number";
      }
      if(this.fecha_consulta==undefined || this.fecha_consulta==""){
        this.ClaseCFecha = "form-control is-invalid select-number";
      }
      if(this.idT==undefined || this.idT==""){
        this.ClaseCHora = "form-control is-invalid select-number";
      }

    }else{
      this.ServicioSecretaria.ValidarCitas(this.cedula, this.fecha_consulta).then(data =>{
        if(data ['code'] == '201'){
          Swal.fire(
            '¡No se pudo Agendar..!',
            'El usuario ya cuenta con una cita en esta fecha.',
            'error'
          )
        }else{
          this.AgendarCita();
        }

      }).catch((error) => {
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
      });
    }



  }

  Turnos(fecha:Date){

    this.loadingText = 'Cargando...';
    this.spinner.show('sample');
    let array ={};
    this.ServicioSecretaria.ValidarTurno(fecha,this.especialidad).then(data =>{
        if(data['code']=='202'){
          Swal.fire(
            '¡Lo sentimos..!',
            'No existen citas disponibles en esta fecha.',
            'error'
          )
          this.spinner.hide('sample');
          this.ArrayTurnos = [];
        }else{
        array = data['result'];
        this.TurnosDisponibles(array);
        this.spinner.hide('sample');
        }
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });


  }

  TurnosDisponibles(array:any){
    let turnos = { }
    this.ArrayTurnos = [];
    for (let item of Object.keys(array)) {
      turnos = {
          "id": array[item].id_turno,
          "hora": array[item].hora,
      }
      this.ArrayTurnos.push(turnos);
    }
  }

  LimpiarTurno(){
    this.fecha_consulta="";
    this.ArrayTurnos=undefined;
  }

  HabilitarValor(valor:number){
    if(valor==1){
      this.exo=1;
      this.gad=1;
      this.precio=0;
      this.ClasePrecio='form-control form-input select-number';
    }else{
      this.exo=0;
      this.gad=0;
      this.precio=1;
      this.ClasePrecio='form-control form-input select-number';
    }

  }




}
