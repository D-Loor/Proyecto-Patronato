import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../../servicios/administrador.service';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {

  constructor(private administradorService:AdministradorService,private spinner: NgxSpinnerService) { }

  isCollapsed1=false;
  isCollapsed2=false;
  cuentas=[];
  cuentasPaginate=[];
  cuentasFilter=[];
  cuentasPaginateFilter=[];
  search=null;
  validarVacio;
  estado=0;
  nombres="";
  correo="";
  id_cuenta="";
  rol;
  password="";
  foto;
  listaRoles:any=[];
  
  ClaseCorreo:string="form-control form-input select-number";
  ClaseNombre:string="form-control form-input select-number";
  ClaseRol:string="form-control form-input select-number";
  ClasePassword:string="form-control form-input select-number";
  ClaseCHora:string="form-control form-input select-number";

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
    this.nombres="";this.password="";this.correo="";this.rol=""; this.foto="";
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
    });
  }

  cargarTablas(){
    this.administradorService.cargarCuenta().then(data =>{
      debugger
      this.cuentas=data['result'];
      this.validarVacio=data['code'];
      if(this.validarVacio == '202'){
        debugger
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
    });
  }

  public cargandoImagen(files: Event){
    this.foto = (<HTMLInputElement>files.target).files[0];
    debugger
  }

  CrearCuenta(){
    let array={
      "id_rol":this.rol,
      "nombres":this.nombres,
      "correo":this.correo,
      "password":this.password,
      "imagen": this.foto
    }
    debugger
    this.administradorService.AgregarCuenta(array).then(data =>{
      this.limpiar(); 
      this.spinner.hide('sample');
      Swal.fire(
        'Correcto',
        'Datos guardados correctamente',
        'success'
      )
      this.cargarTablas();
    }).catch(error =>{
      console.log(error);
    });
  }

  notificacion(id:string){
    debugger
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
      confirmButtonText: 'Si, eliminar cita!',
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
          'Eliminado!',
          'La cita ha sido eliminada.',
          'success'
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado!',
          'La cita no ha sido eliminada.',
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
      })
      .catch((error) => {
        console.log(error);
        this.spinner.hide('sample');
      });
  }
  cargarEditar(id:any){
    this.estado=1;
    debugger
    this.administradorService.cargarCuentaId(id).then(data => {
      this.id_cuenta=data['result'].id_cuenta;
      this.nombres=data['result'].nombres;
      this.correo=data['result'].correo;
      this.password=data['result'].password;
      this.rol=data['result']['role'].rol;
      this.foto=data['result'].imagen;
      debugger
    }).catch((error) => {
      console.log(error);
    });
  }

  ActualizarCuenta(){
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
        'Correcto',
        'Datos actualizados correctamente',
        'success'
      )
      this.limpiar();
    })
  }

  buscar(){

  }

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes
 debugger
    this.cuentasFilter=[];
      this.cuentasPaginateFilter=[];
    if(this.search==null){

      //this.citasMGPaginate = this.citasMG.slice(0, 10);
    }else{
      
      for (const x of this.cuentas) {

        if(x.nombres.indexOf(this.search)> -1){
          debugger
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
