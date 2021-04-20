import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( arreglo: any, arg: any, ): any {

     const resultado=[];

     for (const x of arreglo) {

       if(x.cedula.indexOf(arg)> -1){
        resultado.push(x);
      };

     };
     return resultado;

  }

}
