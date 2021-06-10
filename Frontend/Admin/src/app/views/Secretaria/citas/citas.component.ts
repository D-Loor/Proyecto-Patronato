import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import Swal from 'sweetalert2';
import { CitasService } from '../../../servicios/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  constructor(public citasser:CitasService, public rutas:Router) { }

  isCollapsedMG = false;
  isCollapsedRF = false;
  searchMG;
  searchRF;
  public sidebarMinimized = false;
  public navItems = navItems;

  citasMG=[];
  citasMGFilter=[];
  citasMGPaginate=[];
  citasMGPaginateFilter=[];
  citasRF=[];
  citasRFFilter=[];
  citasRFPaginate=[];
  citasRFPaginateFilter=[];
  FechaMg:string='';
  FechaRf:string='';
  validarVacio;

  today = new Date();
  fechaActual:string;

  ngOnInit(): void {
    debugger
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    this.cargarRF(this.fechaActual,0,false,false);
    this.cargarMG(this.fechaActual,0,false,false);
  }

  cargarMG(fechaActual:string,fecha:number,cambio:boolean,check:boolean){
    this.citasser.citas("Medicina General",fechaActual).then(data =>{
      this.citasMG=data['result'];
      this.validarVacio=data['code'];
      if(this.validarVacio == '202'){
        this.citasMG=null;
        this.citasMGPaginate = null;
      }else{
        this.citasMGPaginate = this.citasMG.slice(0, 10);
      }
      if(this.searchMG!=null){
        this.dataPaginateMG(event);
      }
      if(check==true){}else{
    if(data['code']!="202"){


    if(cambio==true){
      Swal.fire({
        icon: 'success',
        title: '¡Citas Filtradas..!',
        text: 'Se filtró las citas con la fecha seleccionada.'
      })
    }

    }else if(fecha==1){
    this.citasMG = [];
    this.citasMGPaginate = [];
      Swal.fire({
        icon: 'error',
        title: '¡Sin Registros..!',
        text: 'No hay citas registradas en esta fecha.'
      })
    }else if(fecha!=1 && this.searchMG==null){
      this.citasMG= null;
      this.citasMGPaginate = null;
    }else{
      if(this.searchMG!=null){

        this.dataPaginateMG(event);
      }
    }
  }
    }).catch((error) => {
      console.log(error);
      this.rutas.navigate(['/500']);
    });
  }

  dataPaginateMG(event){//Función para el filtrado con paginado sin los pipes
    this.citasMGFilter = [];
    this.citasMGPaginateFilter = [];

    if(this.searchMG==null){
      if(this.citasMG==null || this.citasMG[0]=="R"){
        this.citasMG=[];
      this.citasMGPaginate=[];
        }else{
        this.citasMGPaginate = this.citasMG.slice(0, 10);
        }
    }else{

      for (const x of this.citasMG) {

        if(x.cedula.indexOf(this.searchMG)> -1){
         this.citasMGFilter.push(x);
       };
      };

      this.citasMGPaginateFilter = this.citasMGFilter.slice(0, 10);
    }

  }

  pageChangedFiltroMG(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasMGPaginateFilter = this.citasMGFilter.slice(startItem, endItem);
  }

  citasEliminarMG:any[];
  eliminarMG(id:string) {

    this.citasser.elicitas(id).then(data => {
        this.citasEliminarMG=data['result'];

        if(this.FechaMg==''){
          this.cargarMG(this.fechaActual,0,false,false);

        }else{
          this.cargarMG(this.FechaMg,0,false,false);
        }


      }).catch((error) => {
        console.log(error);
        this.rutas.navigate(['/500']);
      });
  }

  abonar(id_cita,nombres,cedula,especialidad,fecha,abono,id_turno){

    if(abono == true || abono == 1){
      return false;
    }else{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })

      swalWithBootstrapButtons.fire({
        title: '¿Desea marcar como abonado?',
        text: "Una vez marcado no se podrá cambiar el mismo.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, marcar abonado!',
        cancelButtonText: 'No, cancelar!',
        confirmButtonColor: '#20a8d8',
        cancelButtonColor: '#f86c6b',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          let arrayLocal = {
            "id_cita": id_cita,
            "nombres": nombres,
            "cedula": cedula,
            "especialidad": especialidad,
            "fecha": fecha,
            "abono": 'DOADBA',
            "id_turno": id_turno,
        }

          this.citasser.updatecitas(arrayLocal,cedula).then(data =>{

            if(especialidad=="Rehabilitacion Fisica"){this.cargarRF(this.fechaActual,0,false,false);}
            else{this.cargarMG(this.fechaActual,0,false,true);}

          }).catch((error) => {
            console.log(error);
            this.rutas.navigate(['/500']);
          });
          swalWithBootstrapButtons.fire(
            'Modificado..!',
            'La cita ha sido modificada.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '¡Cancelado..!',
            'La cita no ha sido modificada.',
            'error'
          )
          if(especialidad=="Rehabilitacion Fisica"){this.cargarRF(this.fechaActual,0,false,false);}
            else{this.cargarMG(this.fechaActual,0,false,true);}
        }
      })
    }
  }

  cargarRF(fechaActual:string,fecha:number,cambio:boolean,check:boolean){
    this.citasser.citas("Rehabilitacion Fisica",fechaActual).then(data =>{

      this.citasRF=data['result'];
      this.citasRFPaginate = this.citasRF.slice(0, 10);
      if(check==true){}else{
    if(data['code']!="202"){
      if(cambio==true){
        Swal.fire({
          icon: 'success',
          title: '¡Citas Filtradas..!',
          text: 'Se filtró las citas con la fecha seleccionada.'
        })
      }

      if(this.searchRF!=null){

        this.dataPaginateRF(event);
      }
    }else if(fecha==1){
      this.citasRF=[];
      this.citasRFPaginate = [];
      Swal.fire({
        icon: 'error',
        title: '¡Sin Registros..!',
        text: 'No hay citas registradas en esta fecha.'
      })
    }else if(fecha!=1 && this.searchRF==null){
      this.citasRF = null;
      this.citasRFPaginate = null;
    }else{

      if(this.searchRF!=null){

        this.dataPaginateRF(event);
      }
    }
  }
    }).catch((error) => {
      console.log(error);
      this.rutas.navigate(['/500']);
    });
  }


  buscarMG(){
    if(this.searchMG== null || this.searchMG.length==0 || this.searchMG.length>10){
      Swal.fire({
        icon: 'error',
        title: '¡Cédula inválida..!',
        text: 'La Cédula a buscar no es válida.'
      })
    }else if(this.citasMGPaginateFilter.length==0){
      Swal.fire({
        icon: 'error',
        title: '¡Sin Registros..!',
        text: 'No hay Citas Registradas con esta Cédula.'
      })
    }
  }

  buscarRF(){
    if(this.searchRF== null || this.searchRF.length==0 || this.searchRF.length>10){
      Swal.fire({
        icon: 'error',
        title: '¡Cédula inválida..!',
        text: 'La Cédula a buscar no es válida.'
      })
    } else if(this.citasRFPaginateFilter.length==0){
      Swal.fire({
        icon: 'error',
        title: '¡Sin Registros..!',
        text: 'No hay Citas Registradas con esta Cedula.'
      })
    }
  }



  dataPaginateRF(event){//Función para el filtrado con paginado sin los pipes


    this.citasRFFilter=[];
    this.citasRFPaginateFilter=[];
    if(this.searchRF==null){
      if(this.citasRF==null || this.citasRF[0]=="R"){
      this.citasRF=[];
    this.citasRFPaginate=[];
      }else{
      this.citasRFPaginate = this.citasRF.slice(0, 10);
      }
    }else{

      for (const x of this.citasRF) {

        if(x.cedula.indexOf(this.searchRF)> -1){
         this.citasRFFilter.push(x);
       };
      };

      this.citasRFPaginateFilter = this.citasRFFilter.slice(0, 10);
    }

  }

  pageChangedFiltroRF(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasRFPaginateFilter = this.citasRFFilter.slice(startItem, endItem);
  }

  citasEliminarRF:any[];
  eliminarRF(id:string) {
    this.citasser.elicitas(id).then(data => {
        this.citasEliminarRF=data['result'];
        if(this.FechaRf==''){

          this.cargarRF(this.fechaActual,0,false,false);


        }else{

          this.cargarRF(this.FechaRf,0,false,false);

        }

      }).catch((error) => {
        console.log(error);
        this.rutas.navigate(['/500']);
      });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  notificacion(id:string, especialidad:string){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro de eliminar?',
      text: "Una vez eliminado no se podrá recuperar el mismo.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar cita!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonColor: '#20a8d8',
      cancelButtonColor: '#f86c6b',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if(especialidad=="MG"){

          this.eliminarMG(id);

        }else{

          this.eliminarRF(id);

        }

        swalWithBootstrapButtons.fire(
          '¡Eliminado..!',
          'La cita ha sido eliminada.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado..!',
          'La cita no ha sido eliminada.',
          'error'
        )
      }
    })
  }

  pageChangedMG(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasMGPaginate = this.citasMG.slice(startItem, endItem);

  }
  pageChangedRF(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasRFPaginate = this.citasRF.slice(startItem, endItem);
  }

  ngOnDestroy(): void{
    this.citasMG = null;
    this.citasMGPaginate = null;
    this.citasRF = null;
    this.citasRFPaginate = null;
  }

  HistoriaPaciente(cedula:string){
    localStorage.setItem('cedulaMGandRF', cedula);
    this.rutas.navigate(['/pacientes']);
  }

  ReagendarCita(cedula:string,id:string,abono:string,nombres:string){
    localStorage.setItem('cedulaCita', cedula);
    localStorage.setItem('idCita', id);
    localStorage.setItem('abonoCita', abono);
    localStorage.setItem('nombres', nombres);
    this.rutas.navigate(['/agendarcita']);
  }

  CrearHistoriaClinica(){
    this.rutas.navigate(['/registrarhistoriaclinica']);
  }


}
