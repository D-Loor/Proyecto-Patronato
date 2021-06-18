import { HttpClient } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http:HttpClient) { }

  DiarioMG(fecha:string) {
    let  url = 'http://127.0.0.1:8000/api/ValidarRegistroDiarioMedicina/'+fecha;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  DiarioRF(fecha:string) {
    let  url = 'http://127.0.0.1:8000/api/ValidarRegistroDiarioFisica/'+fecha;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  ConsolidadoMG(mes:string,year:String) {
    let  url = 'http://127.0.0.1:8000/api/ValidarConsolidadoMensualMedicinaGeneral/'+mes+'/'+year;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  ConsolidadoRF(mes:string,year:String) {
    let  url = 'http://127.0.0.1:8000/api/ValidarConsolidadoMensualTerapia/'+mes+'/'+year;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  MorbilidadMG(mes:string,year:String) {
    let  url = 'http://127.0.0.1:8000/api/ValidarMorbilidadMedicinaGeneral/'+mes+'/'+year;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  MorbilidadRF(mes:string,year:String) {
    let  url = 'http://127.0.0.1:8000/api/ValidarMorbilidadTerapia/'+mes+'/'+year;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  PacientesMensual(mes:string,year:String) {
    let  url = 'http://127.0.0.1:8000/api/ValidarReportePacientesMensual/'+mes+'/'+year;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  PacientesAnual(year:String) {
    let  url = 'http://127.0.0.1:8000/api/ValidarReportePacientesAnual/'+year;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  RecaudacionDiarioMedicina(fecha:String,id:String) {
    let  url = 'http://127.0.0.1:8000/api/ValidarRecaudacionDiarioMedicina/'+fecha+'/'+id;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  RecaudacionDiarioTerapia(fecha:String,id:String) {
    let  url = 'http://127.0.0.1:8000/api/ValidarRecaudacionDiarioTerapia/'+fecha+'/'+id;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  RecaudacionMensual(mes:String,year:String) {
    let  url = 'http://127.0.0.1:8000/api/ValidarRecaudacionMensual/'+mes+'/'+year;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }





}
