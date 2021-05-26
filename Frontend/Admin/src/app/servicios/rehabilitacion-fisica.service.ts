import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RehabilitacionFisicaService {

  constructor(private http:HttpClient) { }

  historialrf() {
    let  url = 'http://127.0.0.1:8000/api/HistoriasClinicasRF';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  FiltroFecha(fechaInicio:Date, fechaFin:Date){
    let  url = 'http://127.0.0.1:8000/api/FechasRangosRF/'+fechaInicio+"/"+fechaFin;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  AgregarTratamiento(data:any) {
    let  url = 'http://127.0.0.1:8000/api/Tratamiento';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  AgregarConsulta(data:any) {
    let  url = 'http://127.0.0.1:8000/api/HistoriasClinicasRF';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }
  Estadisticas(fechaInicio:string, fechaFin:string){
    let  url = 'http://127.0.0.1:8000/api/estadisticasRF/'+fechaInicio+"/"+fechaFin;
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
