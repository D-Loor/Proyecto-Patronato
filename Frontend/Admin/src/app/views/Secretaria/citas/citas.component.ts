import { Component, DebugElement, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import Swal from 'sweetalert2';
import { CitasService } from '../../../servicios/citas.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewChild } from '@angular/core';
import { SecretariaService } from '../../../servicios/secretaria.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  constructor(public citasser:CitasService, private ServicioSecretaria:SecretariaService, public rutas:Router, private spinner: NgxSpinnerService) { }

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
  validarVacioRF;
  filtfecha=0;
  checkMG=false;
  today = new Date();
  fechaActual:string;
  desabilitar=true;
  desabilitarTxt=true;

  @ViewChild('smallModal') public smallModal: ModalDirective;

   //Recaudacion
  precio; idPaciente;
  fecha_consulta="";
  abono=false;
  exo=0;
  recau=0;
  gad=0;
  Validar=0;
  observaciones="*";
  idrolmodal;
  cancelomg=false;
  cancelorf=false;
  idcitamodal;
  nombresmodal;
  cedulamodal;
  estadomodal;
  id_turnomodal;
  ingresoMG;
  ingresoRF;

  ClasePrecio='form-control form-input select-number';
  ClaseObser='form-control';
  ClaseGad;

  HabilitarValor(valor:number){
    if(valor==1){
      this.exo=1;
      this.gad=1;
      this.precio=0;
      this.desabilitar=true;
      this.desabilitarTxt=false;
      this.observaciones="";
      this.ClasePrecio='form-control form-input select-number';
    }else{
      this.exo=0;
      this.gad=0;
      this.desabilitar=false;
      this.precio="";
      this.ClasePrecio='form-control form-input select-number';
      this.desabilitarTxt=true;
      this.observaciones="*";
    }

  }

  AbrirModal(idcitamodal:string,nombre:string, cedula:string,  fecha:string,abono, id_turnomodal:string,idrol:string,especialidad:string){

    if(abono == true || abono == 1){
      return false;
    }else{
    if(especialidad == 'MG'){
      this.ingresoMG=1;
      this.ingresoRF=0;
      this.desabilitar=false;
    }else if(especialidad == 'RF'){
      this.ingresoRF=1;
      this.ingresoMG=0;
      this.desabilitar=false;
    }

    this.smallModal.show();
    this.idcitamodal=idcitamodal,
    this.nombresmodal=nombre,
    this.cedulamodal=cedula,
    this.id_turnomodal=id_turnomodal,
    this.fecha_consulta= fecha;
    this.idrolmodal=idrol;

    this.ServicioSecretaria.ValidarIngreso(cedula).then(data =>{
        this.idPaciente = data['result'].id_paciente;


    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });

    }
  }


  CargarRecaudacion(){
    this.Validar=0;
    this.abono=false;
    debugger
    let validacion=0;
    let validacion2=0;
    if(this.desabilitar==true && (this.observaciones=="" || this.observaciones==undefined)){
      debugger
      validacion=1;
    }
    if(this.desabilitarTxt==true && (this.precio=="" || this.precio==undefined)){
      debugger
      validacion2=1;
    }
    if(this.precio==null || this.precio==undefined || validacion==1 || validacion2==1
      || this.gad==undefined||this.gad==null
      ){
        Swal.fire({
          icon: 'error',
          title: '??Hay campos vac??os..!',
          text: 'Debe de completar todo el formulario para agregar la recaudaci??n.'
        })
        if(this.desabilitar==true){
          if(this.observaciones=="" || this.observaciones == undefined){
            this.ClaseObser ="form-control is-invalid";
          }
        }

        if(this.desabilitar==false){
          if(this.precio == undefined||this.precio == ""){
            this.ClasePrecio ="form-control is-invalid";
          }
        }

        if(this.gad==undefined||this.gad==null){
          this.ClaseGad="invalido";
        }
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
          title: '??Desea marcar como abonado?',
          text: "Una vez marcado no se podr?? cambiar el mismo.",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si, marcar abonado!',
          cancelButtonText: 'No, cancelar!',
          confirmButtonColor: '#20a8d8',
          cancelButtonColor: '#f86c6b',
          reverseButtons: true
        }).then((result) => {
          this.spinner.show('sample');
          if (result.isConfirmed) {

            this.abono=true;
            this.Validar=1;
            let datosA={
              'id_paciente':this.idPaciente,
              'id_rol':this.idrolmodal,
              'fecha':this.fecha_consulta,
              'valor':this.precio,
              'exonera':this.gad,
              'observaciones':this.observaciones,
            }

            this.GuardarRecaudacion(datosA);
            let arrayLocal = {
              "id_cita": this.idcitamodal,
              "nombres": this.nombresmodal,
              "cedula": this.cedulamodal,
              "fecha": this.fecha_consulta,
              "abono": 'DOADBA',
              "id_turno": this.id_turnomodal,
           }
            this.citasser.updatecitas(arrayLocal,this.cedulamodal).then(data =>{
                this.cargarRF(this.FechaRf,0,false,true,false);
                this.cargarMG(this.FechaMg,0,false,true,false);


            }).catch((error) => {
              console.log(error);
              this.rutas.navigate(['/500']);
            });
            this.smallModal.hide();
            swalWithBootstrapButtons.fire(
              '??Cita Actualizada..!',
              'La cita ha sido actualizada.',
              'success'
            )
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            this.smallModal.hide();
            this.spinner.hide('sample');
            swalWithBootstrapButtons.fire(
              '??Cancelado..!',
              'La cita no ha sido actualizada.',
              'error'
            )

          }
        })

    }

  }


  GuardarRecaudacion(data:any){
    this.ServicioSecretaria.Recaudacion(data).then(data=>{
      this.LimpiarR();
      this.recau=1;
      this.spinner.hide('sample');
    }).catch((error) => {
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }

  LimpiarR(){
    this.precio="";
    this.gad=0;
    this.observaciones="";
    this.ClasePrecio='form-control form-input select-number';
    this.ClaseObser='form-control';
    this.ClaseGad="";


  }

  ngOnInit(): void {
    localStorage.removeItem('cedulaTemporal');
    localStorage.removeItem('contadorT');
    this.spinner.show('sample');
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
    this.FechaMg = this.fechaActual;
    this.FechaRf = this.fechaActual;
    this.cargarMG(this.fechaActual,0,false,false,false);
    this.cargarRF(this.fechaActual,0,false,false,false);
    localStorage.removeItem('cedulaMGandRF');
  }

  alertActualizado(){
    Swal.fire({
      icon: 'success',
      title: '??Citas Actualizadas..!',
      text: 'Se actualiz?? las citas con la fecha seleccionada.'
    })
  }





  cargarMG(fechaActual:string,fecha:number,cambio:boolean,check:boolean,actualizado:boolean){
    this.citasser.citas("Medicina General",fechaActual).then(data =>{
      debugger
      this.spinner.hide('sample');
      this.citasMG=data['result'];
      this.validarVacio=data['code'];
      if(this.validarVacio == '202'){
        this.citasMG=[];
        this.citasMGPaginate = [];
      }else{
        this.citasMGPaginate = this.citasMG.slice(0, 10);
      }

      if(check==true){
        this.dataPaginateMG(event);
      }else{
        if(this.citasMG.length==0){
          data['code']="202";
        };
        if(data['code']!="202" || this.citasMG.length!=0){
          if(cambio==true){
            if(actualizado==true){
              this.alertActualizado();
            }else{
              Swal.fire({
                icon: 'success',
                title: '??Citas Filtradas..!',
                text: 'Se filtr?? las citas con la fecha seleccionada.'
              })

            }
          }

          if(this.searchMG!=null){
            this.dataPaginateMG(event);
          }
        }else if(fecha==1){
          this.citasMG = [];
          this.citasMGPaginate = [];
          this.citasMGFilter = [];
          this.citasMGPaginateFilter = [];
            Swal.fire({
              icon: 'error',
              title: '??Sin Registros..!',
              text: 'No hay citas registradas en esta fecha.'
            })
        }else if(fecha!=1 && this.searchMG==null){
          this.citasMG= [];
          this.citasMGPaginate = [];
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

  cargarRF(fechaActual:string,fecha:number,cambio:boolean,check:boolean,actualizado:boolean){
    this.citasser.citas("Rehabilitaci??n F??sica",fechaActual).then(data =>{
      this.spinner.hide('sample');
      this.citasRF=data['result'];
      this.validarVacioRF=data['code'];
      debugger
      if(this.validarVacioRF == '202'){
        this.citasRF=[];
        this.citasRFPaginate = [];
      }else{
        this.citasRFPaginate = this.citasRF.slice(0, 10);
      }

      if(check==true){
        this.dataPaginateRF(event);
      }else{
        if(this.citasRF.length==0){
          data['code']="202";
        };
        if(data['code']!="202"){
          if(cambio==true){
          if(actualizado==true){
            this.alertActualizado();
          }else{
            Swal.fire({
              icon: 'success',
              title: '??Citas Filtradas..!',
              text: 'Se filtr?? las citas con la fecha seleccionada.'
            })

          }
        }

        if(this.searchRF!=null){
          this.dataPaginateRF(event);
        }
      }else if(fecha==1){
        this.citasRF=[];
        this.citasRFPaginate = [];
        this.citasRFFilter = [];
        this.citasRFPaginateFilter  = [];
        Swal.fire({
          icon: 'error',
          title: '??Sin Registros..!',
          text: 'No hay citas registradas en esta fecha.'
        })
      }else if(fecha!=1 && this.searchRF==null){
        this.citasRF = [];
        this.citasRFPaginate = [];
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

  dataPaginateMG(event){//Funci??n para el filtrado con paginado sin los pipes
    this.citasMGFilter = [];
    this.citasMGPaginateFilter = [];
    debugger
    if(this.searchMG==null || this.searchMG==undefined){
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
          this.cargarMG(this.fechaActual,0,false,false,false);

        }else{
          this.cargarMG(this.FechaMg,0,false,false,false);
        }


      }).catch((error) => {
        console.log(error);
        this.rutas.navigate(['/500']);
      });
  }



  recaudar(){
    this.cargarRF(this.fechaActual,0,false,true,false);
    this.cargarMG(this.fechaActual,0,false,true,false);
  }



  buscarMG(){
      if(this.searchMG== null || this.searchMG==undefined || this.searchMG==""){
        Swal.fire({
          icon: 'error',
          title: '??Campo vac??o...!',
          text: 'Ingrese una c??dula a buscar.'
        })
    }else if(this.citasMGPaginateFilter.length==0){
      Swal.fire({
        icon: 'error',
        title: '??Sin Registros..!',
        text: 'No hay citas registradas con esta c??dula.'
      })
    }
  }

  buscarRF(){
      if(this.searchRF== null || this.searchRF==undefined || this.searchRF==""){
        Swal.fire({
          icon: 'error',
          title: '??Campo vac??o...!',
          text: 'Ingrese una c??dula a buscar.'
        })
    } else if(this.citasRFPaginateFilter.length==0){
      Swal.fire({
        icon: 'error',
        title: '??Sin Registros..!',
        text: 'No hay citas registradas con esta c??dula.'
      })
    }
  }



  dataPaginateRF(event){//Funci??n para el filtrado con paginado sin los pipes


    this.citasRFFilter=[];
    this.citasRFPaginateFilter=[];
    if(this.searchRF==null || this.searchRF==undefined){
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

          this.cargarRF(this.fechaActual,0,false,false,false);


        }else{

          this.cargarRF(this.FechaRf,0,false,false,false);

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
      title: '??Est?? seguro de eliminar?',
      text: "Una vez eliminado no se podr?? recuperar el mismo.",
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
          '??Eliminado..!',
          'La cita ha sido eliminada.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '??Cancelado..!',
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
    localStorage.setItem('secretariaEdit', 'SE');
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
