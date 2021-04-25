import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecretariaService {

  constructor(private http:HttpClient) { }

  GinecosObtestricos(data:any) {
    let  url = 'http://127.0.0.1:8000/api/AGO';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  AtecedentesPersonales(data:any) {
    let  url = 'http://127.0.0.1:8000/api/APP';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  ExamenesFisicos(data:any) {
    let  url = 'http://127.0.0.1:8000/api/ExamenesFisicos';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  ExamenesOrganosSistema(data:any) {
    let  url = 'http://127.0.0.1:8000/api/ExamenesOrganosSistemas';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  ExamenesComple(data:any) {
    let  url = 'http://127.0.0.1:8000/api/Complementarios';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  HabitosPaciente(data:any) {
    let  url = 'http://127.0.0.1:8000/api/Habitos';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }
  
  AgregarPaciente(data:any) {
    let  url = 'http://127.0.0.1:8000/api/Paciente';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  Familiares(data:any) {
    let  url = 'http://127.0.0.1:8000/api/Familiar';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }
  
  AntecedentesFamiliares(data:any) {
    let  url = 'http://127.0.0.1:8000/api/AntecedentePatologicoFamiliar';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }
  
  


  ActualizarCitas(data:any,cedula:string) {
    let  url = 'http://127.0.0.1:8000/api/Cita/'+cedula;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

}
