import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import {CitasService} from '../../../servicios/citas.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { MedicinaGeneralService } from '../../../servicios/medicina-general.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-medicina-general-citas',
  templateUrl: './medicina-general-citas.component.html',
  styleUrls: ['./medicina-general-citas.component.scss']
})
export class MedicinaGeneralCitasComponent implements OnInit {


  constructor(public citasser:CitasService, public rutas:Router, private medicina:MedicinaGeneralService, private spinner: NgxSpinnerService) { }

  isCollapsed2 = false;
  isCollapsed = true;
  search=null;
  especialidad=localStorage.getItem('rol');
  Estado:number=1;
  validacion:string;
  public sidebarMinimized = false;
  public navItems = navItems;
  validarVacio;
  citasMG=[];
  citasMGPaginate=[];
  citasMGFilter=[];
  citasMGPaginateFilter=[];
  Valida=[];
  citasEliminar=[];
  today = new Date();
  fechaActual:string;
  Porcentaje1:number;
  horas;
  minutos;
  presun;
  defini;
  EstiloPorcentajeH:string;
  EstiloPorcentajeM:string;
  TotalPacientes; TotalCitasPendientes; ServidoresPublicos; TotalHombres; TotalMujeres;
  loadingText = 'Guardando...';

  spinnerConfig: object = {
    bdColor: 'rgba(0, 0, 0, 0.8)',
    size: 'medium',
    color: '#fff',
    type: 'square-jelly-box',
    fullScreen: true,
    template: null,
    showSpinner: false
  };


  //Obtener inicio y fin de mes
  primerDia = new Date(this.today.getFullYear(), this.today.getMonth()+1, 1);
  ultimoDia = new Date(this.today.getFullYear(), this.today.getMonth() + 2, 1);
  dia = this.primerDia.getDate();
  mes = this.primerDia.getMonth();
  yyy = this.primerDia.getFullYear();
  FechaInicio:string = this.yyy +'-'+this.mes+'-'+this.dia;
  diaF = this.ultimoDia.getDate();
  mesF = this.ultimoDia.getMonth();
  yyyF = this.ultimoDia.getFullYear();
  FechaFin:string = this.yyyF +'-'+this.mesF+'-'+this.diaF;




  ngOnInit(): void {
    localStorage.removeItem('cedulaTemporal');
    localStorage.removeItem('contadorT');
    localStorage.removeItem('cedulaMGandRF');
    this.Estadisticas(this.FechaInicio,this.FechaFin, this.especialidad);
    this.fechaActual=this.today.getFullYear() + "-" + (this.today.getMonth() +1) + "-" + this.today.getDate();
    this.cargar();
  }

  buscarMG(){
    if(this.search== null || this.search==undefined || this.search==""){
      Swal.fire({
        icon: 'error',
        title: '??Campo vac??o...!',
        text: 'Ingrese una c??dula a buscar.'
      })
    }else if(this.citasMGPaginateFilter.length==0){

      Swal.fire({
        icon: 'error',
        title: '??No hay Registros..!',
        text: 'No hay citas registradas con esta c??dula.'
      })

    }
  }

  Estadisticas(Inicio:string, Fin:string, especialidad:string){

    this.medicina.Estadisticas(Inicio,Fin, especialidad).then(data =>{
      this.TotalPacientes = data['totalP'];
      this.TotalCitasPendientes = data['totalC'];
      this.ServidoresPublicos = data['totalG'];
      this.TotalHombres = data['totalH'];
      this.TotalMujeres = data['totalM'];
      this.presun= data['presuntivo'];
      this.defini= data['definitivo'];
      let tiempocita=this.TotalPacientes*20;
      //this.horas=tiempocita/60;
      this.horas=data['horas']*8;
      //this.horas=parseInt(this.horas);
      this.minutos = 0;
    }).catch(error =>{
      console.log(error);
      this.spinner.hide('sample');
      this.rutas.navigate(['/500']);
    });
  }

  cargar(){
    this.loadingText = 'Cargando...';
    this.spinner.show('sample');
    this.citasser.citas(this.especialidad,this.fechaActual).then(data =>{
    this.citasMG=data['result'];
    this.validarVacio=data['code'];
    if(this.validarVacio == '202'){
      this.spinner.hide('sample');
      this.citasMG=[];
      this.citasMGPaginate = [];
    }else{
      this.spinner.hide('sample');
      this.citasMGPaginate = this.citasMG.slice(0, 10);
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

  actualizar(){
    this.loadingText = 'Cargando...';
    this.spinner.show('sample');
    this.cargar();

    Swal.fire(
      '??Citas Actualizadas..!',
      'La lista de citas ha sido actualizada.',
      'success'
    )
  }
  // for (var item in this.Citas){
  //   this.ValidarAntecedentes(this.Citas[item].cedula);
  //  }

  dataPaginate(event){//Funci??n para el filtrado con paginado sin los pipes

    this.citasMGFilter=[];
      this.citasMGPaginateFilter=[];
    if(this.search==null){

      this.citasMGPaginate = this.citasMG.slice(0, 10);
    }else{
      for (const x of this.citasMG) {

        if(x.cedula.indexOf(this.search)> -1){
         this.citasMGFilter.push(x);
       };
      };
      this.citasMGPaginateFilter = this.citasMGFilter.slice(0, 10);
    }

  }

  pageChangedFiltro(event: PageChangedEvent) :void{ //paginado sin los pipes
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasMGPaginateFilter = this.citasMGFilter.slice(startItem, endItem);
  }

  eliminar(id:string) {

    this.citasser.elicitas(id).then(data => {

        this.citasEliminar=data['result'];
        this.spinner.hide('sample');
        this.cargar();

      })
      .catch((error) => {
        console.log(error);
        this.spinner.hide('sample');
        this.rutas.navigate(['/500']);
      });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
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
      title: '??Est?? seguro de eliminar?',
      text: "Una vez eliminado no se podr?? recuperar el mismo!",
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
          '??Cancelado!',
          'La cita no ha sido eliminada.',
          'error'
        )
      }
    })
  }

  pageChanged(event: PageChangedEvent): void {
    event.itemsPerPage = 10; //opcional
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.citasMGPaginate = this.citasMG.slice(startItem, endItem);
  }

  ngOnDestroy(): void{
    this.citasMG = [];
    this.Valida = null;
    this.citasMGPaginate = [];
  }

  ConsultarPaciente(cedula:string,idCita:string){
    this.rutas.navigate(['/medicinageneralconsultas']);
    localStorage.setItem('cedulaMG', cedula);
    localStorage.setItem('idCita', idCita);
  }

  HistoriaPaciente(cedula:string){
    localStorage.setItem('cedulaMGandRF', cedula);
    this.rutas.navigate(['/pacientes']);
  }

  CrearHistoriaClinica(algo:string){
    localStorage.setItem('RolV', algo);
    this.rutas.navigate(['/registrarhistoriaclinica']);
  }


}
