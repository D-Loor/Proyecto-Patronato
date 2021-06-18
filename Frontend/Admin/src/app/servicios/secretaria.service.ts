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

  Familiares2(data:any) {
    let  url = 'http://127.0.0.1:8000/api/Familiar';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  eliFamiliares($id_familiar,$id_paciente) {
    let  url = 'http://127.0.0.1:8000/api/eliminarATPF/'+$id_familiar+'/'+$id_paciente;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
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

  ValidarIngreso(cedula:string) {
    let  url = 'http://127.0.0.1:8000/api/atender/'+cedula;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  AddCitas(data:any) {
    let  url = 'http://127.0.0.1:8000/api/Cita/';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  ValidarCitas(cedula:string,fecha:string) {
    let  url = 'http://127.0.0.1:8000/api/validarcita/'+cedula+"/"+fecha;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  ValidarTurno(fecha:Date, tipo:string) {
    let  url = 'http://127.0.0.1:8000/api/validarturno/'+fecha+"/"+tipo;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  datoGinecoObstetricos(id:number) {
    let  url = 'http://127.0.0.1:8000/api/AGO/'+id;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  updateDatosAfilicaion(data:any,id:number){

    let  url = 'http://127.0.0.1:8000/api/Paciente/'+id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  updateHabitos(data:any,id:number){

    let  url = 'http://127.0.0.1:8000/api/Habitos/'+id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  updateEFG(data:any,id:number){

    let  url = 'http://127.0.0.1:8000/api/ExamenesFisicos/'+id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  updateEOS(data:any,id:number){

    let  url = 'http://127.0.0.1:8000/api/ExamenesOrganosSistemas/'+id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  updateComplementario(data:any,id:number){

    let  url = 'http://127.0.0.1:8000/api/Complementarios/'+id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  updateAntecedentesPatologicoPersonales(data:any,id:number){

    let  url = 'http://127.0.0.1:8000/api/APP/'+id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  updateGinecos(data:any,id:number){
    let  url = 'http://127.0.0.1:8000/api/AGO/'+id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  ActualizarCitaConHistorial(cedula:string){
    let  url = 'http://127.0.0.1:8000/api/actualizarCita/'+cedula;
    return new Promise ((resolve, reject) => {
      this.http.put(url, cedula).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  Roles(rol:string) {
    let  url = 'http://127.0.0.1:8000/api/idrol/'+rol;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  Recaudacion(data:any) {
    let  url = 'http://127.0.0.1:8000/api/Recaudacion';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  AddEgreso(data:any) {
    let  url = 'http://127.0.0.1:8000/api/Egreso/';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  ActualizarEgreso(data:any,id:string) {
    let  url = 'http://127.0.0.1:8000/api/Egreso/'+id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  Egresos() {
    let  url = 'http://127.0.0.1:8000/api/Egreso';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  EliminarEgresos($id) {
    let  url = 'http://127.0.0.1:8000/api/Egreso/'+$id;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

}
