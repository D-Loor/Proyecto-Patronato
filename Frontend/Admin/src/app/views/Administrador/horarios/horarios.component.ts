import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../../servicios/administrador.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {

  constructor(private administradorService:AdministradorService,public rutas:Router,private spinner: NgxSpinnerService) { }

  isCollapsed1=false;
  isCollapsed2=false;

  turnos=[];
  Comboespecialidad=[];
  turnosPaginate=[];
  turnosFilter=[];
  turnosPaginateFilter=[];
  search=null;
  estado=0;
  hora="";
  especialidad="";
  validarVacio="";
  id_turnos="";
  result="";
  EstadoTur=1;
  cantidad;
  Ver=0;
  contador=0;

  ClaseHora:string="form-control form-input select-number";
  ClaseCEspecialidad:string="form-control form-input select-number";
  ClaseCantidad='form-control form-input select-number';
  ClaseEstado='form-control form-input select-number';

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

  ngOnInit(): void {
    this.cargarTablas();
    this.CargarEspecialidad();
  }
   
  CargarCantidad(){
    this.administradorService.cargarRolId(this.especialidad).then(data =>{
      let temporal = data['result'].rol;
      if(temporal=="Medicina General"){
        this.cantidad=1;
        this.Ver=1;
        this.contador=0;
      }else if(this.contador==0){
        this.cantidad="";
        this.Ver=0;
      }else if(this.contador != 0){
        this.Ver=0;
        this.contador=0;
      }
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });    
  }

  CargarEspecialidad(){
    this.administradorService.cargarRolesMedicos().then(data =>{
      if(data['code']=="201"){
        this.Comboespecialidad = data['result'];
      }else{
        this.Comboespecialidad =null;
      }
      //for (let i of temporal)
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }

  limpiar(){
    this.hora = "";this.EstadoTur=1; this.id_turnos=""; this.result=""; this.cantidad=""; this.especialidad="";this.Ver=0;
  }

  cargarTablas(){
    this.spinner.show('sample');
    this.administradorService.cargarTurnos().then(data =>{
      this.turnos=data['result'];
      this.validarVacio=data['code'];
      if(this.validarVacio == '202'){
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
      this.spinner.hide('sample');
    }).catch(error =>{
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
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
      this.limpiar();
      this.estado=0;
    })
    .catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
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
    if(this.hora==undefined || this.hora=="" || this.especialidad==undefined || this.especialidad==""||
       this.cantidad==undefined || this.cantidad==null
      ){
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
      if(this.cantidad==undefined || this.cantidad==null){
        this.ClaseCantidad = "form-control is-invalid select-number";
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
      });
    }

  }

  guardar(){
        let validator=0;
    for (let item of Object.keys(this.turnos)) {
      if(this.turnos[item]['hora'] == this.hora && this.turnos[item]['id_rol'] == this.especialidad){
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
    }else{
      this.spinner.show('sample');
      let array={
        "hora": this.hora,
        "id_rol": this.especialidad,
        "cantidad":this.cantidad,
        "estado":this.EstadoTur
      }
      this.administradorService.agregarTurno(array).then(data=>{
        this.limpiar();
        this.spinner.hide('sample');
        Swal.fire(
          '¡Turno Creado..!',
          'El turno se ha crado correctamente',
          'success'
        )
        this.cargarTablas();
      }).catch((error) => {
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
      });
    }



  }

  cargarEditar(id:string){
    this.estado=1;
    this.isCollapsed1=false;

    this.administradorService.cargarTurnosId(id).then(data =>{
      this.hora=data['result'].hora;
      this.especialidad=data['result'].id_rol;
      this.id_turnos=data['result'].id_turno;
      this.EstadoTur=data['result'].estado;
      this.cantidad=data['result'].cantidad;
      this.contador++;
      this.CargarCantidad();
      window.scrollTo(0, 0);
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }


  ActualizarTurno(){
    if(this.hora==undefined || this.hora=="" || this.especialidad==undefined || this.especialidad==""||
       this.cantidad==undefined || this.cantidad==null
      ){
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
      if(this.cantidad==undefined || this.cantidad==null){
        this.ClaseCantidad = "form-control is-invalid select-number";
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

          this.loadingText = 'Cargando...';
          this.spinner.show('sample');

          let arrayUpdate={
            "hora":this.hora,
            "id_rol":this.especialidad,
            "cantidad":this.cantidad,
            "estado":this.EstadoTur
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
          }).catch((error) => {
            console.log(error);
            this.spinner.hide('sample');
            this.rutas.navigate(['/500']);
          });

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
        title: '¡Campo vacío...!',
        text: 'Ingrese un turno a buscar.'
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
