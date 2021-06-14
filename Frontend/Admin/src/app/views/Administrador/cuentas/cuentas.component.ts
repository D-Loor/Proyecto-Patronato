import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../../servicios/administrador.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {

  constructor(private administradorService:AdministradorService,public rutas:Router,private spinner: NgxSpinnerService) { }

  isCollapsed1=false;
  isCollapsed2=false;
  cuentas=[];
  cuentasPaginate=[];
  cuentasFilter=[];
  cuentasPaginateFilter=[];
  search=null;
  validarVacio;
  estado=0;
  nombresEditar="";
  correoEditar="";
  nombres="";
  editarA="";
  correo="";
  id_cuenta="";
  rol="";
  password="";
  foto=null;
  listaRoles:any=[];
  url; //editado
  ClaseCorreo:string="form-control form-input select-number";
  ClaseNombre:string="form-control form-input select-number";
  ClaseRol:string="form-control form-input select-number";
  ClasePassword:string="form-control form-input select-number";
  ClaseCHora:string="form-control form-input select-number";

  ClaseFoto:string="";

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
    this.nombres="";this.password="";this.correo="";this.rol=""; this.foto=""; this.url="";
  }

  ngOnInit(): void {
    this.cargarRoles();
    this.cargarTablas();
  }

  cargarRoles(){
    this.administradorService.cargarRoles().then(data=>{
      this.listaRoles=data['result'];
    }).catch(error =>{
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }

  cargarTablas(){
    this.administradorService.cargarCuenta().then(data =>{
      this.cuentas=data['result'];
      this.validarVacio=data['code'];
      if(this.validarVacio == '202'){
      this.cuentas=[];
      this.cuentasPaginate = [];
      }else{
        this.cuentasPaginate = this.cuentas.slice(0, 10);
      }

      if(this.search!=null){
        this.spinner.hide('sample');
        this.dataPaginate(event);
      }

    }).catch(error =>{
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }

  public cargandoImagen(files: Event){
    this.foto = (<HTMLInputElement>files.target).files[0];
    this.ClaseFoto="";
  }

  //Editado
  public onSelectFile(event,files:Event) { // called each time file input changes
      let tipoImagen = (<HTMLInputElement>files.target).files[0].type;
      if( tipoImagen == "image/jpeg"  || tipoImagen == "image/png" || tipoImagen == "image/svg"){
      this.foto = (<HTMLInputElement>files.target).files[0];
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target.result;
        }
      }
      }else{
        Swal.fire({
          icon: 'error',
          title: '¡No es una Imagen..!',
          text: 'Elija una imagen.'
        })
      this.foto="";
      }
      this.ClaseFoto="";
    }

  buscar(){}

  guardar(){

    let validator=0;
    for (let item of Object.keys(this.cuentas)) {
      if(this.cuentas[item]['correo'] == this.correo || this.cuentas[item]['nombres'] == this.nombres){
        validator=1;
      }
    }
    if(validator==1){
      Swal.fire({
        icon: 'error',
        title: '¡Cuenta ya Existe..!',
        text: 'Ya existe una cuenta con estos datos.'
      })
    }else{
      this.spinner.show('sample');
      let array={
        "id_rol":this.rol,
        "nombres":this.nombres,
        "correo":this.correo,
        "password":this.password,
        "imagen": this.foto
      }

      this.administradorService.AgregarCuenta(array).then(data =>{
        this.limpiar();
        this.spinner.hide('sample');
        this.ClaseFoto="";
        this.foto=null;
        Swal.fire(
          '¡Cuenta Creada..!',
          'La cuenta se ha creado correctamente',
          'success'
        )
        this.cargarTablas();
      }).catch(error =>{
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
      });
    }
  }
  CrearCuenta(){
    if(this.foto==undefined || this.foto==null || this.nombres==undefined || this.nombres==""||this.correo==undefined || this.correo=="" || this.rol==undefined || this.rol==""|| this.password==undefined || this.password==""){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para agregar la cuenta.'
      })

      if(this.foto==undefined || this.foto== null){
        this.ClaseFoto =  "invalido";
      }
      if(this.nombres==undefined || this.nombres==""){
        this.ClaseNombre = "form-control is-invalid select-number";
      }
      if(this.correo==undefined || this.correo==""){
        this.ClaseCorreo = "form-control is-invalid select-number";
      }
      if(this.rol==undefined || this.rol==""){
        this.ClaseRol = "form-control is-invalid select-number";
      }
      if(this.password==undefined || this.password==""){
        this.ClasePassword = "form-control is-invalid select-number";
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
        title: '¿Desea crear esta Cuenta?',
        text: "Una vez agregado podrá verlo en registros.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, crear cuenta!',
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
            'La cuenta no se ha creado.',
            'error'
          )
        }
      })
    }
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
      confirmButtonText: 'Si, eliminar cuenta!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonColor: '#20a8d8',
      cancelButtonColor: '#f86c6b',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingText = 'Cargando...';
        this.spinner.show('sample');
        this.eliminar(id);


        swalWithBootstrapButtons.fire(
          '!Cuenta Eliminada..!',
          'La cuenta ha sido eliminado.',
          'success'
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado..!',
          'La cuenta no ha sido eliminada.',
          'error'
        )
      }
    })
  }

  eliminar(id:string) {
    this.administradorService.eliminarCuenta(id).then(data => {
        data['result'];
        this.spinner.hide('sample');
        this.cargarTablas();
        this.limpiar();
      })
      .catch((error) => {
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
      });
  }
  cargarEditar(id:any){
    this.estado=1;
    this.isCollapsed1=false;


    this.administradorService.cargarCuentaId(id).then(data => {
      this.id_cuenta=data['result'].id_cuenta;
      this.nombres=data['result'].nombres;
      this.nombresEditar=data['result'].nombres;
      this.correo=data['result'].correo;
      this.password=data['result'].password;
      this.correoEditar=data['result'].correo;
      this.rol=data['result']['role'].id_rol;
      this.editarA=data['result']['role'].rol;
      //this.foto=data['result'].imagen;
      this.url="http://127.0.0.1:8000"+data['result'].imagen;
      window.scrollTo(0, 0);
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }

  ActualizarCuenta(){
    if(this.foto==undefined || this.foto==null || this.nombres==undefined || this.nombres==""||this.correo==undefined || this.correo=="" || this.rol==undefined || this.rol==""|| this.password==undefined || this.password==""){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para actualizar la cuenta.'
      })

      if(this.foto==undefined || this.foto== null){
        this.ClaseFoto =  "invalido";
      }
      if(this.nombres==undefined || this.nombres==""){
        this.ClaseNombre = "form-control is-invalid select-number";
      }
      if(this.correo==undefined || this.correo==""){
        this.ClaseCorreo = "form-control is-invalid select-number";
      }
      if(this.rol==undefined || this.rol==""){
        this.ClaseRol = "form-control is-invalid select-number";
      }
      if(this.password==undefined || this.password==""){
        this.ClasePassword = "form-control is-invalid select-number";
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
        title: '¿Desea Actualizar esta Cuenta?',
        text: "Una vez actualizado podrá verlo en registros.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, actualizar cuenta!',
        cancelButtonText: 'No, cancelar!',
        confirmButtonColor: '#20a8d8',
        cancelButtonColor: '#f86c6b',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          let validator=0;
          if(this.correo!= this.correoEditar || this.nombres != this.nombresEditar){

            for (let item of Object.keys(this.cuentas)) {
              if(this.correo == this.correoEditar && this.nombres == this.nombresEditar){
                if(this.cuentas[item]['correo'] == this.correo || this.cuentas[item]['nombres'] == this.nombres){
                  validator=1;
                }
              }else if(this.correo == this.correoEditar){
                if( this.cuentas[item]['nombres'] == this.nombres){
                  validator=1;
                }
              }else{
                if( this.cuentas[item]['nombres'] == this.nombres){
                  validator=1;
                }
              }

            }
          }

          if(validator==1){
            Swal.fire({
              icon: 'error',
              title: '¡Cuenta ya Existe..!',
              text: 'Ya existe una cuenta con estos datos.'
            })
          }else{
            this.loadingText = 'Cargando...';
            this.spinner.show('sample');

            this.editarA="";
            let arrayUpdate={
              "id_rol":this.rol,
              "id_cuenta":this.id_cuenta,
              "nombres":this.nombres,
              "correo":this.correo,
              "password":this.password,
              "imagen": this.foto

            }
            debugger
            this.administradorService.updateCuenta(arrayUpdate).then(data =>{
              data['result'];
              this.spinner.hide('sample');
              Swal.fire(
                '¡Datos Actualizados..!',
                'Datos actualizados correctamente.',
                'success'
              )
              this.limpiar();
              this.cargarTablas();
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
            'La cuenta no se ha actualizado.',
            'error'
          )
        }
      })

    }


  }


  dataPaginate(event){//Función para el filtrado con paginado sin los pipes

    this.cuentasFilter=[];
      this.cuentasPaginateFilter=[];
    if(this.search==null){

      //this.citasMGPaginate = this.citasMG.slice(0, 10);
    }else{

      for (const x of this.cuentas) {

        if(x.nombres.indexOf(this.search)> -1){

         this.cuentasFilter.push(x);
       };
      };
      this.cuentasPaginateFilter = this.cuentasFilter.slice(0, 10);

    }

  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.cuentasPaginateFilter = this.cuentasFilter.slice(startItem, endItem);
  }

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.cuentasPaginate = this.cuentas.slice(startItem, endItem);
  }


}
