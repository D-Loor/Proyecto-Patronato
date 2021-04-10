import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicinaGeneralService {

  constructor(private http: HttpClient) { }
  enfermedad() {
    let  url = 'http://127.0.0.1:8000/api/Enfermedad';
    debugger
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        debugger
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

}
