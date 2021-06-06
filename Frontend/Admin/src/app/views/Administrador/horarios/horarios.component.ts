import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../../servicios/administrador.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {

  constructor(private administradorService:AdministradorService,private spinner: NgxSpinnerService) { }

  isCollapsed1=false;
  isCollapsed2=false;

  turnos=[];
  turnosPaginate=[];
  turnosFilter=[];
  turnosPaginateFilter=[];
  search=null;
  estado=0;
  hora="";
  tipo="";
  especialidad="";
  validarVacio="";
  id_turnos="";
  result="";

  ClaseHora:string="form-control form-input select-number";
  ClaseCEspecialidad:string="form-control form-input select-number";

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

  limpiar(){
    this.hora = ""; this.tipo="";this.especialidad=""; this.id_turnos=""; this.result="";
  }

  cargarTablas(){
    this.administradorService.cargarTurnos().then(data =>{
      debugger
      this.turnos=data['result'];
      this.validarVacio=data['code'];
      if(this.validarVacio == '202'){
        debugger
      this.turnos=[];
      this.turnosPaginate = [];
      }else{
        this.turnosPaginate = this.turnos.slice(0, 10);
      }
      if(this.search!=null){
        this.spinner.hide('sample');
        this.dataPaginate(event);
      }
      this.estado=0;
    }).catch(error =>{
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.cargarTablas();
  }

  alertEliminado(result:string){
    this.spinner.hide('sample');
    if(result=="203"){
      Swal.fire(
        '¡Turno en Uso!',
        'El turno no se puede eliminar, está en uso.',
        'error'
      )
    }else{
      Swal.fire(
        '!Turno Eliminado..!',
        'El turno ha sido eliminado.',
        'success'
      )
    }
  }

  eliminar(id:string){
    this.administradorService.eliminarTurno(id).then(data => {
      this.result=data['code'];
      this.spinner.hide('sample');
      this.alertEliminado(this.result);
      this.cargarTablas();
    })
    .catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
    });
  }

  notificacion(id:string){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro de eliminar?',
      text: "Una vez eliminado no se podrá recuperar el mismo!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar turno!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonColor: '#20a8d8',
      cancelButtonColor: '#f86c6b',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingText = 'Cargando...';
        this.spinner.show('sample');
        this.eliminar(id);

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado..!',
          'El turno no ha sido eliminado.',
          'error'
        )
      }
    })
  }

  CrearTurno(){

    if(this.hora==undefined || this.hora=="" || this.especialidad==undefined || this.especialidad==""){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para agregar el turno.'
      })

      if(this.hora==undefined || this.hora==""){
        this.ClaseHora = "form-control is-invalid select-number";
      }
      if(this.especialidad==undefined || this.especialidad==""){
        this.ClaseCEspecialidad = "form-control is-invalid select-number";
      }

    }
    else{

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })

      swalWithBootstrapButtons.fire({
        title: '¿Desea crear este turno?',
        text: "Una vez agregado podrá verlo en registros.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, crear turno!',
        cancelButtonText: 'No, cancelar!',
        confirmButtonColor: '#20a8d8',
        cancelButtonColor: '#f86c6b',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          this.guardar();

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '¡Cancelado..!',
            'El turno no se ha creado.',
            'error'
          )
        }
      })
    }

  }

  guardar(){
        let validator=0;
    for (let item of Object.keys(this.turnos)) {
      if(this.turnos[item]['hora'] == this.hora && this.turnos[item]['tipo'] == this.especialidad){
        validator=1;
      }
    }
    this.estado=0;

    if(validator==1){
      Swal.fire({
        icon: 'error',
        title: '¡Turno antes Registrado..!',
        text: 'Este turno ya se encuentra registrado.'
      })
      this.limpiar();
    }else{
      this.spinner.show('sample');
      let array={
        "hora": this.hora,
        "tipo": this.especialidad
      }
      this.administradorService.agregarTurno(array).then(data=>{
        this.limpiar();
        this.spinner.hide('sample');
        Swal.fire(
          '¡TTurno Creado..!',
          'El turno se ha crado correctamente',
          'success'
        )
        this.cargarTablas();
      })
    }



  }

  cargarEditar(id:string){
    this.estado=1;
    this.administradorService.cargarTurnosId(id).then(data =>{
      this.hora=data['result'].hora;
      this.especialidad=data['result'].tipo;
      this.id_turnos=data['result'].id_turno;

    })
  }


  ActualizarTurno(){
    if(this.hora==undefined || this.hora=="" || this.especialidad==undefined || this.especialidad==""){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para actualizar el turno.'
      })

      if(this.hora==undefined || this.hora==""){
        this.ClaseHora = "form-control is-invalid select-number";
      }
      if(this.especialidad==undefined || this.especialidad==""){
        this.ClaseCEspecialidad = "form-control is-invalid select-number";
      }

    }
    else{

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })

      swalWithBootstrapButtons.fire({
        title: '¿Desea Actualizar este Turno?',
        text: "Una vez actualizado podrá verlo en registros.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, actualizar turno!',
        cancelButtonText: 'No, cancelar!',
        confirmButtonColor: '#20a8d8',
        cancelButtonColor: '#f86c6b',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          let validator=0;
          for (let item of Object.keys(this.turnos)) {
            if(this.turnos[item]['hora'] == this.hora && this.turnos[item]['tipo'] == this.especialidad){
              validator=1;
            }
          }
          if(validator==1){
            Swal.fire({
              icon: 'error',
              title: '¡Turno ya Existe..!',
              text: 'Ya existe un turno con estos datos.'
            })
          }else{
            this.loadingText = 'Cargando...';
            this.spinner.show('sample');

            let arrayUpdate={
              "hora":this.hora,
              "tipo":this.especialidad
            }

            this.administradorService.updateTurno(arrayUpdate,this.id_turnos).then(data =>{

              data['result'];
              this.spinner.hide('sample');
              Swal.fire(
                '¡Datos Actualizados..!',
                'Datos actualizados correctamente.',
                'success'
              )
              this.cargarTablas();
              this.limpiar();
            })
          }

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '¡Cancelado..!',
            'El turno no se ha actualizado.',
            'error'
          )
        }
      })

    }

  }

  buscar(){
    if(this.search== null || this.search.length==0||this.search.length>10){

      Swal.fire({
        icon: 'error',
        title: 'Turno Inválido..!',
        text: 'El turno a buscar no es válido.'
      })

    }else if(this.turnosPaginateFilter.length==0){

      Swal.fire({
        icon: 'error',
        title: '¡No hay Registros..!',
        text: 'No hay un turno registrado con este nombre.'
      })

    }
  }

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes

    this.turnosFilter=[];
      this.turnosPaginateFilter=[];
    if(this.search==null){
      debugger
      this.turnosPaginate = this.turnos.slice(0, 10);
    }else{

      for (const x of this.turnos) {

        if(x.hora.indexOf(this.search)> -1){
         this.turnosFilter.push(x);
       };
      };
      this.turnosPaginateFilter = this.turnosFilter.slice(0, 10);

    }

  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.turnosPaginateFilter = this.turnosFilter.slice(startItem, endItem);
  }

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.turnosPaginate = this.turnos.slice(startItem, endItem);
  }

}
