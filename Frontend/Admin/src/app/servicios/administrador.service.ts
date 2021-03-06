import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http:HttpClient) { }

  AgregarCuenta(data:any) {
    let  url = 'http://127.0.0.1:8000/api/Cuentas';
    var formData = new FormData();
    formData.append('id_rol', data.id_rol);
    formData.append('nombres', data.nombres);
    formData.append('correo', data.correo);
    formData.append('password', data.password);
    formData.append('imagen', data.imagen);
    formData.append('estado', data.estado);
    return new Promise ((resolve, reject) => {
      this.http.post(url, formData ).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  updateCuenta(data:any){
    let  url = 'http://127.0.0.1:8000/api/actualizarCuenta';
    var formData = new FormData();
    formData.append('id_rol', data.id_rol);
    formData.append('id_cuenta', data.id_cuenta);
    formData.append('nombres', data.nombres);
    formData.append('correo', data.correo);
    formData.append('password', data.password);
    formData.append('imagen', data.imagen);
    formData.append('estado', data.estado);
    return new Promise ((resolve, reject) => {
      this.http.post(url, formData).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  cargarRoles(){
    let  url = 'http://127.0.0.1:8000/api/Roles';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  cargarRolesMedicos(){
    let  url = 'http://127.0.0.1:8000/api/cargarRoles';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  cargarCuenta(){
    let  url = 'http://127.0.0.1:8000/api/Cuentas';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  cargarCuentaId($id){
    let  url = 'http://127.0.0.1:8000/api/Cuentas/'+$id;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  eliminarCuenta($id){
    let  url = 'http://127.0.0.1:8000/api/eliminarCuenta/'+$id;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }


  agregarRol(data:any){
    let  url = 'http://127.0.0.1:8000/api/Roles';
    return new Promise ((resolve, reject) => {
      this.http.post(url,data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  cargarRol(){
    let  url = 'http://127.0.0.1:8000/api/Roles';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }



  cargarRolId($id){
    let  url = 'http://127.0.0.1:8000/api/Roles/'+$id;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  eliminarRol($id){
    let  url = 'http://127.0.0.1:8000/api/Roles/'+$id;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  updateRol(data:any,$id){
    let  url = 'http://127.0.0.1:8000/api/Roles/'+$id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  cargarTurnos(){
    let  url = 'http://127.0.0.1:8000/api/Turnos';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  cargarTurnosId($id){
    let  url = 'http://127.0.0.1:8000/api/Turnos/'+$id;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  agregarTurno(data:any){
    let  url = 'http://127.0.0.1:8000/api/Turnos';
    return new Promise ((resolve, reject) => {
      this.http.post(url,data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  updateTurno(data:any,$id){
    let  url = 'http://127.0.0.1:8000/api/Turnos/'+$id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  eliminarTurno($id){
    let  url = 'http://127.0.0.1:8000/api/Turnos/'+$id;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

}
