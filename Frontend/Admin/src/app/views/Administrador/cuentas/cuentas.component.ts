import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {

  constructor() { }

  isCollapsed1=false;
  isCollapsed2=false;

  cuentasFilter=[];
  cuewntasPaginateFilter=[];
  search="";

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
  }

  buscar(){

  }

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes

    this.cuentasFilter=[];
      this.cuewntasPaginateFilter=[];
    if(this.search==null){

      //this.citasMGPaginate = this.citasMG.slice(0, 10);
    }else{
      /*
      for (const x of this.citasMG) {

        if(x.cedula.indexOf(this.search)> -1){
         this.citasMGFilter.push(x);
       };
      };
      this.citasMGPaginateFilter = this.citasMGFilter.slice(0, 10);
      */
    }

  }


}
