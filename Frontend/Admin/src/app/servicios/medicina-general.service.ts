import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicinaGeneralService {

  constructor(private http: HttpClient) { }

  pacientes() {
    let  url = 'http://127.0.0.1:8000/api/Paciente';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }


  enfermedad() {
    let  url = 'http://127.0.0.1:8000/api/Enfermedad';

    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {

        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  AgregarEnfermedad(data:any) {
    let  url = 'http://127.0.0.1:8000/api/Enfermedad';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  historiasClinicasMg(){
    let  url = 'http://127.0.0.1:8000/api/HistorialClinicoMedicinaGeneral';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }



  PacientesAntecedentes($id) {
    let  url = 'http://127.0.0.1:8000/api/Paciente/'+$id;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  AtenderPaciente(cedula:string) {
    let  url = 'http://127.0.0.1:8000/api/atender/'+cedula;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  AgregarConsulta(data:any) {
    let  url = 'http://127.0.0.1:8000/api/HistorialClinicoMedicinaGeneral';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  FiltroFecha(fechaInicio:Date, fechaFin:Date){
    let  url = 'http://127.0.0.1:8000/api/FechasRangosMG/'+fechaInicio+"/"+fechaFin;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  ConsultasPacientes(id:string){
    let  url = 'http://127.0.0.1:8000/api/pacientesConcultas/'+id;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  Estadisticas(fechaInicio:string, fechaFin:string, especialidad:string){
    let  url = 'http://127.0.0.1:8000/api/estadisticas/'+fechaInicio+"/"+fechaFin+"/"+especialidad;
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
