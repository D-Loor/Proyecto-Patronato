import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http:HttpClient) { }

  AgregarCuenta(data:any) {
    let  url = 'http://127.0.0.1:8000/api/Cuentas';
    return new Promise ((resolve, reject) => {
      this.http.post(url, data ).subscribe(res => {
        resolve(res);{
        }
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
}
