import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  isCollapsed1=false;
  isCollapsed2=false;

  rolFilter=[];
  rolPaginateFilter=[];
  search="";
  estado=0;
  rol="";


  ClaseRol:string="form-control form-input select-number";

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

  CrearRol(){

  }

  ActualizarROL(){

  }

  buscar(){

  }

  dataPaginate(event){//Función para el filtrado con paginado sin los pipes

    this.rolFilter=[];
      this.rolPaginateFilter=[];
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
