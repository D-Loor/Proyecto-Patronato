import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { SecretariaService } from '../../../servicios/secretaria.service';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.scss']
})
export class EgresosComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,public rutas:Router, public egresoservice:SecretariaService) { }

  isCollapsed1=false;
  isCollapsed2=false;

  fecha;
  valor;
  descripcion;
  estado=0;
  search=null;
  egresos=[];
  egresosPaginate=[];
  egresosFilter=[];
  egresosPaginateFilter=[];
  id_actualizar;

  ClaseValor:string="form-control form-input select-number";
  ClaseDescripcion:string="form-control form-input select-number";
  ClaseFecha:string="form-control form-input select-number";


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
    this.estado=0;
    this.fecha="";
    this.descripcion="";
    this.valor="";
  }


  ngOnInit(): void {
    this.cargarEgresos();
    localStorage.removeItem('cedulaMGandRF');
  }

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes

    this.egresosFilter.length = 0;
    this.egresosPaginateFilter.length = 0;
    if(this.search==null){

      this.egresosPaginate = this.egresos.slice(0, 10);
    }else{

      for (const x of this.egresos) {

        if(x.fecha.indexOf(this.search)> -1){

         this.egresosFilter.push(x);
       };
      };
      this.egresosPaginateFilter = this.egresosFilter.slice(0, 10);

    }

  }

  buscar(){
    if(this.search== null || this.search.length==0){
      Swal.fire({
        icon: 'error',
        title: '¡Campo vacío...!',
        text: 'Ingrese una fecha a buscar.'
      })
    }else if(this.egresosFilter.length==0){
      Swal.fire({
        icon: 'error',
        title: '¡No hay Registros..!',
        text: 'No hay registrados con esta fecha.'
      })
    }
  }

  cargarEgresos(){
    
    this.spinner.show('sample');

    this.egresoservice.Egresos().then(data =>{
      let validarVacio;

      validarVacio=data['code'];

      if(validarVacio == '202'){
      this.egresos.length = 0;
      this.egresosPaginate.length = 0;
      
      }else{
        this.egresos=data['result'];
        this.egresosPaginate = this.egresos.slice(0, 10);
        
      }
      if(this.search!=null){
        this.dataPaginate(event);
      }
      this.spinner.hide('sample');
    }).catch(error =>{
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }

  guardar(){

      this.spinner.show('sample');
      let array={
        "fecha":this.fecha,
        "valor":this.valor,
        "descripcion":this.descripcion
      }

      this.egresoservice.AddEgreso(array).then(data =>{
        this.limpiar();
        this.spinner.hide('sample');
        Swal.fire(
          '¡Egreso Registrado..!',
          'El egreso se ha registrado correctamente',
          'success'
        )
        this.cargarEgresos();
      }).catch(error =>{
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
      });

  }

  Registrar(){
    if( this.valor==undefined || this.valor==""||this.fecha==undefined || this.fecha=="" || this.descripcion==undefined || this.descripcion==""){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para registrar el egreso.'
      })
      if(this.valor==undefined || this.valor==""){
        this.ClaseValor = "form-control is-invalid select-number";
      }
      if(this.fecha==undefined || this.fecha==""){
        this.ClaseFecha = "form-control is-invalid select-number";
      }
      if(this.descripcion==undefined || this.descripcion==""){
        this.ClaseDescripcion = "form-control is-invalid select-number";
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
        title: '¿Desea registrar Egreso?',
        text: "Una vez agregado podrá verlo en registros.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, registrar!',
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
            'El egreso no ha sido registrado.',
            'error'
          )
        }
      })
    }
  }

  ActualizarCuenta(){
    if( this.valor==undefined || this.valor==""||this.fecha==undefined || this.fecha=="" || this.descripcion==undefined || this.descripcion==""){
      Swal.fire({
        icon: 'error',
        title: '¡Hay campos vacíos..!',
        text: 'Debe de completar todo el formulario para actualizar el egreso.'
      })
      if(this.valor==undefined || this.valor==""){
        this.ClaseValor = "form-control is-invalid select-number";
      }
      if(this.fecha==undefined || this.fecha==""){
        this.ClaseFecha = "form-control is-invalid select-number";
      }
      if(this.descripcion==undefined || this.descripcion==""){
        this.ClaseDescripcion = "form-control is-invalid select-number";
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
        title: '¿Desea Actualizar Egreso?',
        text: "Una vez actualizado podrá verlo en registros.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, actualizar!',
        cancelButtonText: 'No, cancelar!',
        confirmButtonColor: '#20a8d8',
        cancelButtonColor: '#f86c6b',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            this.loadingText = 'Cargando...';
            this.spinner.show('sample');

            let array={
              "fecha":this.fecha,
              "valor":this.valor,
              "descripcion":this.descripcion
            }

            this.egresoservice.ActualizarEgreso(array,this.id_actualizar).then(data =>{
              data['result'];
              this.spinner.hide('sample');
              Swal.fire(
                '¡Datos Actualizados..!',
                'Datos actualizados correctamente.',
                'success'
              )
              this.limpiar();
              this.estado=0;
              this.cargarEgresos();
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
            'El egreso no se ha actualizado.',
            'error'
          )
        }
      })

    }


  }

  cargarEditar(id:any,val:any,fech:any,des:String){
    this.estado=1;
    this.isCollapsed1=false;
    this.id_actualizar=id;
    this.valor=val;
    this.fecha=fech;
    this.descripcion=des;
  }

  verificarEliminar(id:string){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro de eliminar?',
      text: "Una vez eliminado no se podrá recuperar!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
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
          '!Egreso Eliminado..!',
          'El egreso ha sido eliminado.',
          'success'
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado..!',
          'El egreso no ha sido eliminado.',
          'error'
        )
      }
    })
  }

  eliminar(id:string) {
    this.egresoservice.EliminarEgresos(id).then(data => {
        data['result'];
        this.spinner.hide('sample');
        this.cargarEgresos();
        this.estado=0;
        this.limpiar();
      })
      .catch((error) => {
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
      });
  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.egresosPaginateFilter = this.egresosFilter.slice(startItem, endItem);
  }

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.egresosPaginate = this.egresos.slice(startItem, endItem);
  }

}
