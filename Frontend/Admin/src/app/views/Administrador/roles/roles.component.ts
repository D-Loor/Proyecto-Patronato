import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../../servicios/administrador.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Router } from '@angular/router';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  constructor(private administradorService:AdministradorService,public rutas:Router,private spinner: NgxSpinnerService) { }

  isCollapsed1=false;
  isCollapsed2=false;
  rol=[];
  rolPaginate=[];
  rolFilter=[];
  rolPaginateFilter=[];
  search=null;
  estado=0;
  Rol="";
  RolActualizar="";
  validarVacio;
  id_rol="";
  result="";
  EstadoRol;
  categoria;

  ClaseRol:string="form-control form-input select-number";
  ClaseEstado:string="form-control form-input select-number";
  ClaseCategoria='form-control form-input select-number'

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
    this.Rol="";
    this.EstadoRol="";
    this.categoria="";
  }

  ngOnInit(): void {
    this.cargarTablas();
  }

  guardar(){
    let validator=0;
    for (let item of Object.keys(this.rol)) {
      if(this.rol[item]['rol'] == this.Rol){
        validator=1;
      }
    }

    this.estado=0;

    if(validator==1){
      Swal.fire({
        icon: 'error',
        title: '¡Rol antes Registrado..!',
        text: 'Este rol ya se encuentra registrado.'
      })
    }else{
      this.spinner.show('sample');
      let array={
        "rol": this.Rol,
        "estado": this.EstadoRol,
        "atencion":this.categoria
      }
      this.administradorService.agregarRol(array).then(data=>{
        this.limpiar();
        this.spinner.hide('sample');
        Swal.fire(
          '¡Rol Creado..!',
          'El rol se ha crado correctamente',
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
  CrearRol(){
    if(this.Rol==undefined || this.Rol=="" || this.EstadoRol==undefined || this.EstadoRol==""){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para agregar el rol.'
      })
      if(this.Rol==undefined || this.Rol==""){
        this.ClaseRol = "form-control is-invalid select-number";
      }
      if(this.EstadoRol==undefined || this.EstadoRol==""){
        this.ClaseEstado ="form-control is-invalid select-number";
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
        title: '¿Desea crear este rol?',
        text: "Una vez agregado podrá verlo en registros.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, crear rol!',
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
            'El rol no se ha creado.',
            'error'
          )
        }
      })
    }

  }

  cargarTablas(){
    this.spinner.show('sample');
    this.administradorService.cargarRol().then(data =>{

      this.rol=data['result'];
      this.validarVacio=data['code'];
      if(this.validarVacio == '202'){

      this.rol=[];
      this.rolPaginate = [];
      }else{
        this.rolPaginate = this.rol.slice(0, 10);
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

  ActualizarRol(){

    if(this.Rol==undefined || this.Rol==""){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para actualizar el rol.'
      })
        this.ClaseRol = "form-control is-invalid select-number";


    }else{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })

      swalWithBootstrapButtons.fire({
        title: '¿Desea Actualizar este Rol?',
        text: "Una vez actualizado podrá verlo en registros.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, actualizar rol!',
        cancelButtonText: 'No, cancelar!',
        confirmButtonColor: '#20a8d8',
        cancelButtonColor: '#f86c6b',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          let validator=0;

          if(this.RolActualizar!=this.Rol){

            for (let item of Object.keys(this.rol)) {
              if(this.rol[item]['rol'] == this.Rol){
                validator=1;
              }
            }
          }

          if(validator==1){
            Swal.fire({
              icon: 'error',
              title: '¡Rol antes Registrado..!',
              text: 'Este rol ya se encuentra registrado.'
            })
          }else{
            this.loadingText = 'Cargando...';
            this.spinner.show('sample');
            let arrayUpdate={
              "rol":this.Rol,
              "estado": this.EstadoRol,
              "atencion":this.categoria
            }

            this.administradorService.updateRol(arrayUpdate,this.id_rol).then(data =>{

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
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '¡Cancelado..!',
            'El rol no se ha actualizado.',
            'error'
          )
        }
      })
    }


  }

  cargarEditar(id:string){
    this.estado=1;
    this.isCollapsed1=false;

    this.administradorService.cargarRolId(id).then(data =>{

      this.Rol=data['result'].rol;
      this.id_rol=data['result'].id_rol;
      this.RolActualizar=data['result'].rol;
      this.EstadoRol =data['result'].estado;
      this.categoria=data['result'].atencion;
      window.scrollTo(0, 0);
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });

  }

  buscar(){
    if(this.search== null || this.search.length==0){

      Swal.fire({
        icon: 'error',
        title: '¡Campo vacío...!',
        text: 'Ingrese un rol a buscar.'
      })

    }else if(this.rolPaginateFilter.length==0){

      Swal.fire({
        icon: 'error',
        title: '¡No hay Registros..!',
        text: 'No hay un rol registrado con este nombre.'
      })

    }
  }

  alertEliminado(result:string){
    if(result=="203"){
      Swal.fire(
        '¡Rol en Uso!',
        'El rol no se puede eliminar, está en uso.',
        'error'
      )
    }else{
      Swal.fire(
        '!Rol Eliminado..!',
        'El rol ha sido eliminado.',
        'success'
      )
    }
  }

  eliminar(id:string){
    this.administradorService.eliminarRol(id).then(data => {
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
      confirmButtonText: 'Si, eliminar rol!',
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
          'El rol no ha sido eliminado.',
          'error'
        )
      }
    })
  }

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes

    this.rolFilter=[];
      this.rolPaginateFilter=[];
    if(this.search==null){

      //this.citasMGPaginate = this.citasMG.slice(0, 10);
    }else{

      for (const x of this.rol) {

        if(x.rol.indexOf(this.search)> -1){
         this.rolFilter.push(x);
       };
      };
      this.rolPaginateFilter = this.rolFilter.slice(0, 10);

    }

  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.rolPaginateFilter = this.rolFilter.slice(startItem, endItem);
  }

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.rolPaginate = this.rol.slice(startItem, endItem);
  }
}
