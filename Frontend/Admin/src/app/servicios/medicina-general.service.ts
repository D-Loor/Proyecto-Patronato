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
 
  

}
