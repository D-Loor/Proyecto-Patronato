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

  Actualizar(data:any,id:string) {
    let  url = 'http://127.0.0.1:8000/api/AGO'+id;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);
      }, error => {
        debugger
        reject(error);
      });
    });
  }

}
