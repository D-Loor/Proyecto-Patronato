import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http:HttpClient) { }

  citas() {
    let  url = 'http://127.0.0.1:8000/api/Cita';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  elicitas($id) {
    let  url = 'http://127.0.0.1:8000/api/Cita/'+$id;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
}
