import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( arreglo: any, arg: any, arg2:any, ): any { // definir si se borra
    debugger
     const resultado=[];
     let resultadoPaginate=[];

      for (const x of arreglo) {

        if(x.cedula.indexOf(arg)> -1){
         resultado.push(x);
       };
 
      };
      if(arg2==0){
      resultadoPaginate=resultado.slice(0,10);
      debugger
      return resultadoPaginate;
     }else{
       debugger
      return resultado.length;
     }
  }

}
